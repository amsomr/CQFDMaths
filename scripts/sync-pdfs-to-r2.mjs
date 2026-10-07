import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

// Configuration & Environment Variables
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'cqfdmaths-pdfs';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || (R2_ACCOUNT_ID ? `https://pub-${R2_ACCOUNT_ID.slice(0, 8)}.r2.dev` : '');

const hasR2Credentials = Boolean(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);

const s3 = hasR2Credentials
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    })
  : null;

// Parse CLI Flags
const args = process.argv.slice(2);
function getArg(flag, defaultValue = null) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) return args[index + 1];
  return defaultValue;
}

const isDryRun = args.includes('--dry-run') || !hasR2Credentials;
const targetId = getArg('--id');
const limit = getArg('--limit') ? parseInt(getArg('--limit'), 10) : null;
const concurrency = parseInt(getArg('--concurrency', '3'), 10);
const outputDir = getArg('--out-dir', 'data/clean-pdfs');
const forceRebuild = args.includes('--force');

// Load or initialize sync manifest
const MANIFEST_PATH = path.resolve(process.cwd(), 'scripts/r2-sync-manifest.json');
let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch {
    manifest = {};
  }
}

function saveManifest() {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
}

// Extract unique element IDs from chapter-resources.json
function getTargetResources() {
  const resourcesPath = path.resolve(process.cwd(), 'src/data/chapter-resources.json');
  if (!fs.existsSync(resourcesPath)) {
    throw new Error(`Fichier ${resourcesPath} introuvable`);
  }

  const data = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));
  const uniqueItems = new Map();

  for (const chapterKey of Object.keys(data)) {
    for (const item of data[chapterKey]) {
      if (item.fileUrl && item.fileUrl.includes('id=')) {
        const idMatch = item.fileUrl.match(/id=(\d+)/);
        if (idMatch) {
          const elId = idMatch[1];
          if (!uniqueItems.has(elId)) {
            uniqueItems.set(elId, {
              elementId: elId,
              title: item.title,
              category: item.category,
              chapter: chapterKey,
            });
          }
        }
      }
    }
  }

  return Array.from(uniqueItems.values());
}

// Fetch AlloSchool PDF download link for given element
async function resolveAlloSchoolPdfUrl(elementId) {
  try {
    const res = await fetch(`https://www.alloschool.com/element/${elementId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;
    const html = await res.text();
    const pdfMatch = html.match(/https:\/\/[^\"]+\.pdf/i);
    return pdfMatch ? pdfMatch[0] : null;
  } catch (err) {
    console.error(`  [!] Erreur résolution element ${elementId}:`, err.message);
    return null;
  }
}

// Download PDF buffer with timeout
async function downloadPdfBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} lors du téléchargement`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Apply CQFDMaths clean mask and header watermark
async function cleanAndBrandPdf(pdfBuffer, meta = {}) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const bannerHeight = 28;

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();

    // 1. Draw solid white rectangle over original AlloSchool header
    page.drawRectangle({
      x: 0,
      y: height - bannerHeight,
      width: width,
      height: bannerHeight,
      color: rgb(1, 1, 1),
    });

    // 2. Draw separation hairline
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

  // Stamp PDF Metadata for SEO and AI crawlers
  pdfDoc.setAuthor('Prof. Jamaa Aknari — CQFDMaths');
  pdfDoc.setProducer('CQFDMaths.ma (Ce qu\'il fallait démontrer)');
  pdfDoc.setCreator('CQFDMaths Plateforme Éducative');
  pdfDoc.setSubject(meta.title ? `${meta.title} — Mathématiques BIOF Maroc` : 'Mathématiques Lycée BIOF Maroc');

  return await pdfDoc.save();
}

// Check if object already exists in R2
async function checkObjectExistsR2(key) {
  if (!s3) return false;
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    return true;
  } catch (err) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      return false;
    }
    return false;
  }
}

// Upload cleaned PDF to R2
async function uploadToR2(key, pdfBytes, filename) {
  if (!s3) throw new Error('Client R2 non initialisé');

  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(pdfBytes),
      ContentType: 'application/pdf',
      ContentDisposition: `inline; filename="${encodeURIComponent(filename)}"`,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
}

// Process a single element ID
async function processElement(resource) {
  const { elementId, title } = resource;
  const key = `pdfs/${elementId}.pdf`;
  const sanitizedFilename = `CQFDMaths_${elementId}_${(title || 'document').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

  // Check manifest & R2
  if (!forceRebuild) {
    if (manifest[elementId]?.status === 'uploaded') {
      return { elementId, status: 'skipped', reason: 'manifest_uploaded' };
    }
    if (isDryRun && manifest[elementId]?.status === 'local_saved') {
      const localPath = path.resolve(process.cwd(), manifest[elementId].localPath);
      if (fs.existsSync(localPath)) {
        return { elementId, status: 'skipped', reason: 'local_file_exists' };
      }
    }
  }

  if (!isDryRun && !forceRebuild && (await checkObjectExistsR2(key))) {
    manifest[elementId] = {
      status: 'uploaded',
      key,
      url: R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : key,
      updatedAt: new Date().toISOString(),
    };
    return { elementId, status: 'skipped', reason: 'r2_exists' };
  }

  // 1. Resolve source PDF URL
  const pdfUrl = await resolveAlloSchoolPdfUrl(elementId);
  if (!pdfUrl) {
    return { elementId, status: 'failed', reason: 'url_resolution_failed' };
  }

  // 2. Download original PDF
  const rawBytes = await downloadPdfBuffer(pdfUrl);

  // 3. Clean & Brand
  const cleanBytes = await cleanAndBrandPdf(rawBytes, { title });

  // 4. Save to R2 or Local
  if (isDryRun) {
    const localDir = path.resolve(process.cwd(), outputDir);
    fs.mkdirSync(localDir, { recursive: true });
    const localPath = path.join(localDir, `${elementId}.pdf`);
    fs.writeFileSync(localPath, cleanBytes);

    manifest[elementId] = {
      status: 'local_saved',
      localPath: path.relative(process.cwd(), localPath),
      sizeBytes: cleanBytes.length,
      updatedAt: new Date().toISOString(),
    };
    return { elementId, status: 'success', mode: 'dry_run', size: cleanBytes.length };
  } else {
    await uploadToR2(key, cleanBytes, sanitizedFilename);
    const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;

    manifest[elementId] = {
      status: 'uploaded',
      key,
      url: publicUrl,
      sizeBytes: cleanBytes.length,
      updatedAt: new Date().toISOString(),
    };
    return { elementId, status: 'success', mode: 'r2', url: publicUrl, size: cleanBytes.length };
  }
}

// Concurrency runner helper
async function runWithConcurrency(items, fn, limit) {
  const results = [];
  const executing = new Set();

  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);
    executing.add(p);

    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('  CQFDMaths — Pipeline de Traitement & Hébergement Cloudflare R2');
  console.log('='.repeat(60));

  if (isDryRun) {
    if (!hasR2Credentials) {
      console.log('ℹ️  Identifiants R2 absents dans l\'environnement : mode --dry-run actif par défaut.');
      console.log(`ℹ️  Les PDF nettoyés seront enregistrés localement dans : ./${outputDir}/`);
    } else {
      console.log('ℹ️  Mode --dry-run activé via flag.');
    }
  } else {
    console.log(`🚀 Mode Upload Cloudflare R2 actif`);
    console.log(`   Bucket : ${R2_BUCKET_NAME}`);
    console.log(`   Public : ${R2_PUBLIC_URL || '(Non configuré)'}`);
  }

  let targets = getTargetResources();
  console.log(`📚 Nombre total de ressources identifiées : ${targets.length}`);

  if (targetId) {
    targets = targets.filter((t) => t.elementId === targetId);
    console.log(`🎯 Filtre ID spécifique : ${targetId} (${targets.length} trouvé)`);
  }

  if (limit) {
    targets = targets.slice(0, limit);
    console.log(`⚡ Limite appliquée : ${limit} éléments`);
  }

  if (targets.length === 0) {
    console.log('Aucun élément à traiter.');
    return;
  }

  console.log(`\nTraitement en cours (concurrence: ${concurrency})...\n`);

  let processed = 0;
  let successes = 0;
  let skipped = 0;
  let failures = 0;

  const results = await runWithConcurrency(
    targets,
    async (item) => {
      try {
        const res = await processElement(item);
        processed++;
        if (res.status === 'success') {
          successes++;
          console.log(`[${processed}/${targets.length}] ✔️ ID ${item.elementId} — Nettoyé & Sauvegardé (${Math.round(res.size / 1024)} Ko)`);
        } else if (res.status === 'skipped') {
          skipped++;
          console.log(`[${processed}/${targets.length}] ⏭️ ID ${item.elementId} — Déjà présent (${res.reason})`);
        } else {
          failures++;
          console.log(`[${processed}/${targets.length}] ❌ ID ${item.elementId} — Échec (${res.reason})`);
        }
        return res;
      } catch (err) {
        processed++;
        failures++;
        console.error(`[${processed}/${targets.length}] ❌ ID ${item.elementId} — Erreur :`, err.message);
        return { elementId: item.elementId, status: 'error', error: err.message };
      }
    },
    concurrency
  );

  saveManifest();

  console.log('\n' + '='.repeat(60));
  console.log('  RÉSUMÉ DU TRAITEMENT');
  console.log('='.repeat(60));
  console.log(`Total traités   : ${processed}`);
  console.log(`Succès          : ${successes}`);
  console.log(`Ignorés (exist) : ${skipped}`);
  console.log(`Échecs          : ${failures}`);
  console.log(`Manifeste sauvé : scripts/r2-sync-manifest.json`);
  if (isDryRun) {
    console.log(`Dossier local   : ./${outputDir}/`);
  }
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
