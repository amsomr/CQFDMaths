'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { BAC_EXAMS, BAC_ESSENTIAL_FORMULAS } from '@/data/bac-exams';
import { GraduationCap, FileText, Download, Calendar, CheckCircle2, Sparkles, Award } from 'lucide-react';
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
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-[#090d16]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Révision Bac', url: '/bac' }]} />

        {/* Hero Section: Luminous & Royal Sapphire Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bac.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {t.bac.title}
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {t.bac.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#examens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-blue-50 transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Consulter les Annales Nationales</span>
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulaire Officiel Résumé</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. EXAM FILTER & REPOSITORY */}
        <section id="examens" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Annales Officielles du Ministère de l&apos;Éducation Nationale
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Examens Nationaux Corrigés (2ème Bac)
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Sujets conformes aux cadres de référence officiels
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-4">
            
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 mr-1">Année :</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedYear === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
              >
                Toutes
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedYear === y ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Session Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 mr-1">Session :</span>
              {['all', 'Normale', 'Rattrapage'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSession(s as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedSession === s ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
                >
                  {s === 'all' ? 'Toutes' : s}
                </button>
              ))}
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 mr-1">Filière :</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 focus:outline-none text-xs"
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
        <section id="formulaire" className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <FileText className="w-4 h-4" />
                <span>Fiche Mémoire & Synthèse Officielle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t.bac.essentialFormulas}
              </h2>
            </div>
            <a
              href="/docs/formulaire-bac-maroc-officiel.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.bac.downloadFormulaSheet}</span>
            </a>
          </div>

          <div className="space-y-6">
            {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                  <span>{isRtl ? group.categoryAr : group.category}</span>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                    {group.formulas.length} formules
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {group.formulas.map((item, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
                    >
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
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
        <section className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <span>{t.bac.studyPlan30Days}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Pour réussir l&apos;épreuve de mathématiques avec mention Très Bien, consacre 2 heures par jour selon cette planification :
            <br />
            <strong className="text-slate-900 dark:text-white">Semaine 1 :</strong> Étude de fonctions numériques & TVI • <strong className="text-slate-900 dark:text-white">Semaine 2 :</strong> Suites numériques & Nombres Complexes • <strong className="text-slate-900 dark:text-white">Semaine 3 :</strong> Calcul intégral & Probabilités • <strong className="text-slate-900 dark:text-white">Semaine 4 :</strong> Sujets complets d&apos;examens nationaux en conditions réelles (3h ou 4h sans interruption).
          </p>
        </section>

      </div>
    </div>
  );
}
