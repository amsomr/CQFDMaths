'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { BAC_EXAMS, BAC_ESSENTIAL_FORMULAS } from '@/data/bac-exams';
import { GraduationCap, FileText, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function BacRevisionPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSession, setSelectedSession] = useState<'all' | 'Normale' | 'Rattrapage'>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const { t, isRtl } = useLanguage();

  const years = [2025, 2024, 2023];

  const filteredExams = BAC_EXAMS.filter((exam) => {
    if (selectedYear !== 'all' && exam.year !== selectedYear) return false;
    if (selectedSession !== 'all' && exam.session !== selectedSession) return false;
    if (selectedBranch !== 'all' && exam.branchId !== selectedBranch) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Révision Bac', url: '/bac' }]} />

        {/* Hero Section: Distinguished Editorial Banner */}
        <div className="rounded-xl border border-stone-800 bg-[#1c1917] text-stone-100 p-8 sm:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-stone-900 border border-stone-700 text-stone-300">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.bac.badge}</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              {t.bac.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              {t.bac.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#examens"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-stone-100 text-stone-950 hover:bg-white transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Consulter les Annales Nationales</span>
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulaire Officiel Résumé</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. EXAM FILTER & REPOSITORY */}
        <section id="examens" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Annales Officielles du Ministère de l&apos;Éducation Nationale
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100">
                Examens Nationaux Corrigés (2ème Bac)
              </h2>
            </div>
            <div className="font-mono text-xs text-stone-500">
              Sujets conformes aux cadres de référence
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-4">
            
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 mr-1">Année :</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${selectedYear === 'all' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'}`}
              >
                Toutes
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${selectedYear === y ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'}`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Session Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 mr-1">Session :</span>
              {['all', 'Normale', 'Rattrapage'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSession(s as any)}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${selectedSession === s ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'}`}
                >
                  {s === 'all' ? 'Toutes' : s}
                </button>
              ))}
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 mr-1">Filière :</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium border border-stone-200 dark:border-stone-700 focus:outline-none font-sans text-xs"
              >
                <option value="all">Toutes les filières</option>
                <option value="sciences-maths">Sciences Maths (A & B)</option>
                <option value="sciences-physiques">Sciences Physiques (PC & SVT)</option>
              </select>
            </div>

          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <BacExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </section>

        {/* 2. ESSENTIAL FORMULAS CHEAT SHEET */}
        <section id="formulaire" className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Fiche Mémoire & Synthèse
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100">
                {t.bac.essentialFormulas}
              </h2>
            </div>
            <a
              href="/docs/formulaire-bac-maroc-officiel.pdf"
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.bac.downloadFormulaSheet}</span>
            </a>
          </div>

          <div className="space-y-6">
            {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4"
              >
                <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
                  {isRtl ? group.categoryAr : group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {group.formulas.map((item, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200/70 dark:border-stone-800 flex flex-col justify-between"
                    >
                      <span className="font-mono text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                        {item.name}
                      </span>
                      <div className="overflow-x-auto text-center py-1">
                        <MathView math={item.latex} inline={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 30-DAY INTENSIVE REVISION STRATEGY */}
        <section className="p-6 sm:p-8 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            <span>{t.bac.studyPlan30Days}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl font-sans">
            Pour réussir l&apos;épreuve de mathématiques avec mention Très Bien, consacre 2 heures par jour selon cette planification :
            <br />
            <strong className="text-stone-900 dark:text-stone-100">Semaine 1 :</strong> Étude de fonctions numériques & TVI • <strong className="text-stone-900 dark:text-stone-100">Semaine 2 :</strong> Suites numériques & Nombres Complexes • <strong className="text-stone-900 dark:text-stone-100">Semaine 3 :</strong> Calcul intégral & Probabilités • <strong className="text-stone-900 dark:text-stone-100">Semaine 4 :</strong> Sujets complets d&apos;examens nationaux en conditions réelles (3h ou 4h sans interruption).
          </p>
        </section>

      </div>
    </div>
  );
}
