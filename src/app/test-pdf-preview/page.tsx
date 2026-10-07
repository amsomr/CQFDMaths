'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Download, ExternalLink, ShieldCheck, Sparkles, FileText, ArrowLeft } from 'lucide-react';

export default function TestPdfPreviewPage() {
  const [selectedDoc, setSelectedDoc] = useState<'cours' | 'serie'>('cours');

  const pdfUrl = selectedDoc === 'cours' 
    ? '/test/cqfdmaths_cours_clean.pdf' 
    : '/test/cqfdmaths_serie_clean.pdf';

  const origPdfUrl = selectedDoc === 'cours' 
    ? '/test/original_cours.pdf' 
    : '/test/original_serie.pdf';

  const previewCleanImg = selectedDoc === 'cours'
    ? '/test/clean_cours-01.png'
    : '/test/clean_cours-02.png';

  const previewOrigImg = selectedDoc === 'cours'
    ? '/test/orig_cours-01.png'
    : '/test/orig_cours-02.png';

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      <div className="absolute inset-0 math-grid-bg opacity-25 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#1D4ED8] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="rounded-[16px] bg-[#0A192F] text-white p-6 sm:p-10 border border-[#1E293B] shadow-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Résultat du Test de Nettoyage (Option A)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Aperçu Avant / Après : En-tête Officiel CQFDMaths
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Voici le résultat concret du traitement appliqué sur un document source d&apos;AlloSchool (2ème Bac Sciences Maths &mdash; <em>Limites et Continuité</em>). L&apos;en-tête supérieur a été nettoyé et remplacé par l&apos;en-tête officiel de la plateforme, avec conservation intégrale des formules vectorielles et de la pagination.
          </p>

          {/* Document switch tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setSelectedDoc('cours')}
              className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all ${
                selectedDoc === 'cours'
                  ? 'bg-white text-[#0A192F] shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
              }`}
            >
              📄 Échantillon 1 : Fiche de Cours (17 pages)
            </button>
            <button
              onClick={() => setSelectedDoc('serie')}
              className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all ${
                selectedDoc === 'serie'
                  ? 'bg-white text-[#0A192F] shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
              }`}
            >
              ✍️ Échantillon 2 : Série d&apos;Exercices TD (7 pages)
            </button>
          </div>
        </div>

        {/* 1. DIRECT HEADER ZOOM COMPARISON */}
        <section className="bg-white rounded-[16px] border border-[#0F172A]/10 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#0F172A]/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Zoom Haute Précision
              </span>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Comparaison de l&apos;En-tête (Haut de Page)
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold bg-[#F0FDF4] px-3 py-1 rounded-[6px] border border-[#BBF7D0]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Vectoriel & Net</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEFORE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#B91C1C]">
                <span>❌ AVANT : Document Brut</span>
                <span className="text-[11px] text-[#94A3B8] font-normal">En-tête non standardisé</span>
              </div>
              <div className="rounded-[10px] border border-[#FCA5A5]/60 bg-[#FEF2F2]/30 p-2 overflow-hidden shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/test/header_before.png"
                  alt="En-tête avant nettoyage"
                  className="w-full h-auto rounded-[6px] border border-[#0F172A]/5"
                />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Haut de page avec titres épars ou marques tierces sans identité visuelle.
              </p>
            </div>

            {/* AFTER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1D4ED8]">
                <span>✅ APRÈS : Standardisé CQFDMaths (Option A)</span>
                <span className="text-[11px] text-[#16A34A] font-semibold">Prêt pour le site</span>
              </div>
              <div className="rounded-[10px] border border-[#93C5FD] bg-[#EFF6FF]/40 p-2 overflow-hidden shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/test/header_after_cqfdmaths.png"
                  alt="En-tête CQFDMaths après nettoyage"
                  className="w-full h-auto rounded-[6px] border border-[#1D4ED8]/20 shadow-xs"
                />
              </div>
              <p className="text-[11px] text-[#1D4ED8] font-medium">
                Logo <strong>CQFDMaths</strong> ; mention <em>Prof: Jamaa Aknari (Enseignant Indépendant) | Maths Lycée BIOF</em>, séparation fine et pagination dynamique.
              </p>
            </div>
          </div>
        </section>

        {/* 2. FULL PAGE PREVIEW SIDE BY SIDE */}
        <section className="bg-white rounded-[16px] border border-[#0F172A]/10 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F172A]/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Vue Complète de la Page A4
              </span>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Intégrité du Contenu Pédagogique (Mathématiques Intactes)
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors text-xs font-bold shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ouvrir le PDF Nettoyé (.pdf)</span>
              </a>
              <a
                href={origPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#FAF9F5] text-[#475569] hover:bg-[#F1F5F9] border border-[#0F172A]/10 transition-colors text-xs font-semibold"
              >
                <span>Original brut</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#64748B] flex items-center justify-between">
                <span>Page 1 Originale</span>
                <span className="font-mono text-[11px]">Format A4</span>
              </div>
              <div className="rounded-[12px] border border-[#0F172A]/10 bg-[#FAF9F5] p-3 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewOrigImg}
                  alt="Page originale"
                  className="w-full h-auto rounded-[8px] shadow-sm bg-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-[#1D4ED8] flex items-center justify-between">
                <span>Page 1 Nettoyée avec En-tête CQFDMaths</span>
                <span className="font-mono text-[11px] text-[#16A34A] font-bold">100% vectoriel</span>
              </div>
              <div className="rounded-[12px] border border-[#1D4ED8]/30 bg-[#EFF6FF]/20 p-3 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewCleanImg}
                  alt="Page nettoyée CQFDMaths"
                  className="w-full h-auto rounded-[8px] shadow-sm bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE PDF VIEWER EMBED */}
        <section className="bg-white rounded-[16px] border border-[#0F172A]/10 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F172A]/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Visionneuse Interactive Directe
              </span>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Testez le Défilement Réel du PDF Nettoyé
              </h2>
            </div>
            <a
              href={pdfUrl}
              download="cqfdmaths_cours_limites.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#FAF9F5] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#0F172A]/15 text-xs font-bold shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le fichier test</span>
            </a>
          </div>

          <div className="w-full h-[650px] rounded-[12px] border border-[#0F172A]/10 overflow-hidden bg-slate-100 shadow-inner">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Lecteur PDF interactif"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
