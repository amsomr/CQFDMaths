'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Maximize2, Minimize2, CheckCircle2, FileText, ExternalLink, ArrowRightLeft } from 'lucide-react';
import { ChapterResource } from '@/data/types';

interface PdfViewerModalProps {
  resource: ChapterResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfViewerModal({ resource, isOpen, onClose }: PdfViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showingSolution, setShowingSolution] = useState(false);

  useEffect(() => {
    // Reset state when opening a new resource
    if (isOpen) {
      setShowingSolution(false);
    }
  }, [isOpen, resource]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const currentUrl = showingSolution && resource.solutionUrl ? resource.solutionUrl : resource.fileUrl;
  const currentTitle = showingSolution ? `[Corrigé] ${resource.title}` : resource.title;

  const categoryBadgeColors = {
    cours: 'bg-blue-50 text-blue-700 border-blue-200',
    resume: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    serie: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    corrige: 'bg-teal-50 text-teal-700 border-teal-200',
    devoir: 'bg-amber-50 text-amber-700 border-amber-200',
    examen: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
  };

  const categoryLabels = {
    cours: 'Cours Magistral',
    resume: 'Fiche Résumé',
    serie: "Série d'Exercices",
    corrige: 'Corrigé Officiel',
    devoir: 'Devoir Surveillé',
    examen: 'Examen National',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`bg-white rounded-[16px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-5xl h-[90vh]'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-[#FAF9F5] border-b border-[#0F172A]/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`px-2.5 py-0.5 rounded-[6px] text-xs border font-semibold shrink-0 ${
                categoryBadgeColors[resource.category] || 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {categoryLabels[resource.category] || resource.category}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] truncate">
              {currentTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle Solution if paired */}
            {resource.solutionUrl && (
              <button
                type="button"
                onClick={() => setShowingSolution(!showingSolution)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all border cursor-pointer ${
                  showingSolution
                    ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600'
                    : 'bg-[#1D4ED8] text-white border-[#1E40AF] hover:bg-[#1E40AF]'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {showingSolution ? "Revenir à l'énoncé" : "Voir le corrigé"}
                </span>
                <span className="sm:hidden">
                  {showingSolution ? "Énoncé" : "Corrigé"}
                </span>
              </button>
            )}

            {/* Direct download */}
            <a
              href={currentUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-slate-50 text-[#0F172A] border border-[#0F172A]/15 text-xs font-semibold shadow-2xs transition-colors"
              title="Télécharger le fichier PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Télécharger</span>
            </a>

            {/* Open in new tab */}
            <a
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-[8px] hover:bg-slate-200/60 text-slate-600 transition-colors"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-[8px] hover:bg-slate-200/60 text-slate-600 transition-colors hidden sm:inline-block cursor-pointer"
              title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-[8px] hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              title="Fermer (Échap)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe
            src={currentUrl}
            className="w-full h-full border-0"
            title={currentTitle}
          />
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-5 py-2 bg-[#FAF9F5] border-t border-[#0F172A]/10 flex items-center justify-between text-xs text-[#64748B] shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>CQFDMaths • Prof. Jamaa Aknari</span>
          </div>
          <div className="flex items-center gap-3">
            {resource.source && <span>Source : {resource.source}</span>}
            <span>Format Vectoriel A4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
