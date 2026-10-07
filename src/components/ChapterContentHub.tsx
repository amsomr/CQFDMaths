'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Play, 
  ArrowRight, 
  Download, 
  Eye, 
  ArrowRightLeft, 
  Award,
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Chapter, Level, Branch, ChapterResource } from '@/data/types';
import { PdfViewerModal } from './PdfViewerModal';

interface ChapterContentHubProps {
  chapter: Chapter;
  level: Level;
  branch: Branch;
}

export function ChapterContentHub({ chapter, level, branch }: ChapterContentHubProps) {
  const [activeTab, setActiveTab] = useState<'lecons' | 'fiches' | 'exercices' | 'devoirs'>('lecons');
  const [selectedResource, setSelectedResource] = useState<ChapterResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPdf = (res: ChapterResource) => {
    setSelectedResource(res);
    setIsModalOpen(true);
  };

  const resources = chapter.resources || [];
  const fichesList = resources.filter((r) => r.category === 'cours' || r.category === 'resume');
  const seriesList = resources.filter((r) => r.category === 'serie' || r.category === 'corrige');
  const devoirsList = resources.filter((r) => r.category === 'devoir' || r.category === 'examen');

  // Pair series with their solutions if separate
  const standaloneSeries = seriesList.filter((s) => s.category === 'serie');

  return (
    <div className="space-y-8">
      {/* 1. TABS HEADER NAVIGATION */}
      <div className="border-b border-[#0F172A]/10">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px" aria-label="Onglets du chapitre">
          <button
            type="button"
            onClick={() => setActiveTab('lecons')}
            className={`py-3.5 px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'lecons'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Leçons &amp; Vidéos</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-mono">
              {chapter.lessons.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fiches')}
            className={`py-3.5 px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'fiches'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Fiches &amp; Résumés PDF</span>
            {fichesList.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold">
                {fichesList.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exercices')}
            className={`py-3.5 px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'exercices'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. Séries d&apos;Exercices &amp; Corrigés</span>
            {standaloneSeries.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono font-bold">
                {standaloneSeries.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('devoirs')}
            className={`py-3.5 px-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'devoirs'
                ? 'border-[#1D4ED8] text-[#1D4ED8]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>4. Devoirs Surveillés (Contrôles)</span>
            {devoirsList.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono font-bold">
                {devoirsList.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* 2. TAB 1: LESSONS & VIDEOS */}
      {activeTab === 'lecons' && (
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            Syllabus pédagogique officiel du chapitre :
          </div>

          {chapter.lessons.length === 0 ? (
            <div className="p-8 rounded-[12px] bg-white border border-[#0F172A]/10 text-center text-[#64748B]">
              Leçons en cours de numérisation par Prof. Jamaa Aknari.
            </div>
          ) : (
            chapter.lessons.map((lesson, idx) => (
              <div
                key={lesson.slug}
                className="rounded-[12px] border border-[#0F172A]/10 bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#1D4ED8] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[8px] bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-[#1D4ED8]/20">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-1 line-clamp-2">
                      {lesson.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#64748B] mt-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>~{lesson.estimatedMinutes} min</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#CC0000] font-semibold">
                        <Play className="w-3.5 h-3.5 fill-[#CC0000]" />
                        <span>Cours Vidéo</span>
                      </span>
                      {lesson.exercises.length > 0 && (
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lesson.exercises.length} exercices interactifs</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] transition-colors shrink-0 shadow-xs"
                >
                  <span>Accéder à la leçon</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. TAB 2: FICHES & COURS PDF */}
      {activeTab === 'fiches' && (
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            Fiches de cours magistraux, formulaires et résumés imprimables :
          </div>

          {fichesList.length === 0 ? (
            <div className="p-8 rounded-[12px] bg-white border border-[#0F172A]/10 text-center text-[#64748B]">
              Aucune fiche de cours ajoutée pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fichesList.map((fiche) => (
                <div
                  key={fiche.id}
                  className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-[6px] text-xs font-bold bg-blue-50 text-[#1D4ED8] border border-blue-200">
                        {fiche.category === 'resume' ? 'Fiche Résumé' : 'Cours Officiel'}
                      </span>
                      {fiche.pagesCount && (
                        <span className="text-xs font-mono text-[#64748B]">
                          {fiche.pagesCount} pages
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors mb-2">
                      {fiche.title}
                    </h4>
                    {fiche.source && (
                      <p className="text-xs text-[#64748B]">
                        Source : {fiche.source}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#0F172A]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openPdf(fiche)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter (Aperçu)</span>
                    </button>
                    <a
                      href={fiche.fileUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-xs font-semibold bg-[#FAF9F5] text-[#475569] hover:bg-slate-100 border border-[#0F172A]/10 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 3: SÉRIES D'EXERCICES ET CORRIGÉS */}
      {activeTab === 'exercices' && (
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            Séries d&apos;exercices progressifs et corrigés détaillés :
          </div>

          {standaloneSeries.length === 0 ? (
            <div className="p-8 rounded-[12px] bg-white border border-[#0F172A]/10 text-center text-[#64748B]">
              Aucune série d&apos;exercices indexée pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {standaloneSeries.map((serie) => (
                <div
                  key={serie.id}
                  className="p-6 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-[6px] text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Série d&apos;Entraînement
                      </span>
                      {serie.difficulty && (
                        <span className="px-2 py-0.5 rounded-[6px] text-xs font-semibold bg-slate-100 text-slate-700">
                          {serie.difficulty}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                      {serie.title}
                    </h4>
                    {serie.source && (
                      <p className="text-xs text-[#64748B]">
                        Conforme au cadre d&apos;évaluation • Source : {serie.source}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openPdf(serie)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter la Série</span>
                    </button>

                    {serie.solutionUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedResource({
                            ...serie,
                            fileUrl: serie.solutionUrl!,
                            title: `[Corrigé] ${serie.title}`,
                            category: 'corrige'
                          });
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Corrigé Détaillé</span>
                      </button>
                    )}

                    <a
                      href={serie.fileUrl}
                      download
                      className="p-2 rounded-[8px] bg-[#FAF9F5] hover:bg-slate-100 text-slate-600 border border-[#0F172A]/10 transition-colors"
                      title="Télécharger l'énoncé (PDF)"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 4: DEVOIRS SURVEILLÉS */}
      {activeTab === 'devoirs' && (
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            Devoirs surveillés des lycées marocains avec barème et correction :
          </div>

          {devoirsList.length === 0 ? (
            <div className="p-8 rounded-[12px] bg-white border border-[#0F172A]/10 text-center text-[#64748B]">
              Aucun devoir surveillé indexé pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devoirsList.map((devoir) => (
                <div
                  key={devoir.id}
                  className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-[6px] text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {devoir.category === 'examen' ? 'Examen Blanc' : 'Devoir Surveillé'}
                      </span>
                      {devoir.semester && (
                        <span className="text-xs font-mono text-[#64748B]">
                          Semestre {devoir.semester}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors mb-2">
                      {devoir.title}
                    </h4>
                    {devoir.source && (
                      <p className="text-xs text-[#64748B]">
                        Source : {devoir.source}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#0F172A]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openPdf(devoir)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter</span>
                    </button>

                    {devoir.solutionUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedResource({
                            ...devoir,
                            fileUrl: devoir.solutionUrl!,
                            title: `[Correction] ${devoir.title}`,
                            category: 'corrige'
                          });
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correction</span>
                      </button>
                    )}

                    <a
                      href={devoir.fileUrl}
                      download
                      className="p-2 rounded-[8px] bg-[#FAF9F5] text-[#475569] hover:bg-slate-100 border border-[#0F172A]/10 transition-colors"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. REUSABLE IN-APP PDF VIEWER MODAL */}
      <PdfViewerModal
        resource={selectedResource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
