import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Memory cache for cleaned PDFs to avoid re-processing on every request
const pdfCache = new Map<string, Uint8Array>();

function isAllowedPdfUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    return (
      hostname === 'alloschool.com' ||
      hostname.endsWith('.alloschool.com') ||
      hostname === 'cqfdmaths.ma' ||
      hostname.endsWith('.cqfdmaths.ma')
    );
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');
  const elementId = searchParams.get('id');

  if (!targetUrl && !elementId) {
    return new NextResponse('Paramètre url ou id manquant', { status: 400 });
  }

  // Validate elementId is strictly numeric
  if (elementId && !/^\d+$/.test(elementId)) {
    return new NextResponse('Identifiant élément invalide', { status: 400 });
  }

  // Fast path: if R2 CDN is configured, redirect directly to pre-cleaned document
  const r2PublicUrl = process.env.R2_PUBLIC_URL;
  if (r2PublicUrl && elementId && !targetUrl) {
    const cleanR2Url = `${r2PublicUrl.replace(/\/$/, '')}/pdfs/${elementId}.pdf`;
    return NextResponse.redirect(cleanR2Url, 307);
  }

  let finalPdfUrl: string | null = null;

  // Validate targetUrl against allowed domains and HTTPS protocol
  if (targetUrl) {
    if (!isAllowedPdfUrl(targetUrl)) {
      return new NextResponse('Hôte ou protocole non autorisé', { status: 403 });
    }
    finalPdfUrl = targetUrl;
  }

  // If elementId is provided, resolve direct PDF URL from AlloSchool element
  if (elementId && !finalPdfUrl) {
    try {
      const elRes = await fetch(`https://www.alloschool.com/element/${elementId}`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!elRes.ok) throw new Error('Élément introuvable');
      const elHtml = await elRes.text();
      const pdfMatch = elHtml.match(/https:\/\/[^\"]+\.pdf/i);
      if (pdfMatch && isAllowedPdfUrl(pdfMatch[0])) {
        finalPdfUrl = pdfMatch[0];
      }
    } catch (err) {
      console.error(`Erreur résolution élément ${elementId}:`, err);
    }
  }

  if (!finalPdfUrl) {
    return new NextResponse('PDF introuvable', { status: 404 });
  }

  // Check cache
  if (pdfCache.has(finalPdfUrl)) {
    const cachedBytes = pdfCache.get(finalPdfUrl)!;
    return new NextResponse(Buffer.from(cachedBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="CQFDMaths_document.pdf"',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  try {
    // Fetch source PDF with bounded timeout
    const res = await fetch(finalPdfUrl, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return new NextResponse('Impossible de récupérer le document source', { status: 502 });
    }
    const arrayBuffer = await res.arrayBuffer();

    // Clean header with pdf-lib (Option A: Clean mask + CQFDMaths branding)
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const bannerHeight = 28; // Height in points covering AlloSchool top logo

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      // 1. Draw solid white rectangle over header
      page.drawRectangle({
        x: 0,
        y: height - bannerHeight,
        width: width,
        height: bannerHeight,
        color: rgb(1, 1, 1),
      });

      // 2. Draw fine separation rule
      page.drawLine({
        start: { x: 20, y: height - bannerHeight + 2 },
        end: { x: width - 20, y: height - bannerHeight + 2 },
        thickness: 0.6,
        color: rgb(0.82, 0.86, 0.92),
      });

      // 3. Stamp Brand: CQFDMaths
      page.drawText('CQFDMaths', {
        x: 24,
        y: height - bannerHeight + 11,
        size: 9.5,
        font: helveticaBold,
        color: rgb(0.11, 0.31, 0.85),
      });

      // 4. Stamp Subtitle: Prof: Jamaa Aknari (Enseignant Indépendant)
      page.drawText(';  Prof: Jamaa Aknari (Enseignant Indépendant)  |  Maths Lycée BIOF', {
        x: 82,
        y: height - bannerHeight + 11,
        size: 7.8,
        font: helvetica,
        color: rgb(0.28, 0.33, 0.41),
      });

      // 5. Pagination
      const pageStr = `${index + 1} / ${pages.length}`;
      const pageStrWidth = helvetica.widthOfTextAtSize(pageStr, 7.5);
      page.drawText(pageStr, {
        x: width - 24 - pageStrWidth,
        y: height - bannerHeight + 11,
        size: 7.5,
        font: helvetica,
        color: rgb(0.4, 0.45, 0.53),
      });
    });

    // Set internal PDF metadata for search engines & AI crawlers
    pdfDoc.setAuthor('Prof. Jamaa Aknari — CQFDMaths');
    pdfDoc.setProducer('CQFDMaths.ma (Ce qu\'il fallait démontrer)');
    pdfDoc.setCreator('CQFDMaths Plateforme Éducative');
    pdfDoc.setSubject('Mathématiques Lycée BIOF Maroc — Cours et Exercices Corrigés');

    const cleanPdfBytes = await pdfDoc.save();

    // Cache the cleaned document (keep up to 100 in memory)
    if (pdfCache.size > 100) {
      const firstKey = pdfCache.keys().next().value;
      if (firstKey) pdfCache.delete(firstKey);
    }
    pdfCache.set(finalPdfUrl, cleanPdfBytes);

    return new NextResponse(Buffer.from(cleanPdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="CQFDMaths_document.pdf"',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Erreur nettoyage PDF:', error);
    return new NextResponse('Erreur lors du traitement du document', { status: 500 });
  }
}
