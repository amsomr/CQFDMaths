'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { BAC_EXAMS, BAC_ESSENTIAL_FORMULAS } from '@/data/bac-exams';
import { GraduationCap, FileText, Download, Calendar, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Révision Bac', url: '/bac' }]} />

        {/* Hero Section of Bac Hub */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bac.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t.bac.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.bac.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#examens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Voir les Examens Nationaux</span>
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Le Formulaire Officiel</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. EXAM FILTER & REPOSITORY */}
        <section id="examens" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Annales Officielles du Ministère</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Examens Nationaux Corrigés (2ème Bac)
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Sujets officiels en PDF + Barème indicatif
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-4">
            
            {/* Year Selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold text-slate-400 mr-1">Année :</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${selectedYear === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
              >
                Toutes
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded-lg font-semibold ${selectedYear === y ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Session Selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold text-slate-400 mr-1">Session :</span>
              {['all', 'Normale', 'Rattrapage'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSession(s as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold ${selectedSession === s ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  {s === 'all' ? 'Toutes' : s}
                </button>
              ))}
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold text-slate-400 mr-1">Filière :</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 mb-2">
                <FileText className="w-4 h-4" />
                <span>Fiche Mémoire Obligatoire</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.bac.essentialFormulas}
              </h2>
            </div>
            <a
              href="/docs/formulaire-bac-maroc-officiel.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.bac.downloadFormulaSheet}</span>
            </a>
          </div>

          <div className="space-y-8">
            {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                  {isRtl ? group.categoryAr : group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {group.formulas.map((item, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
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
        <section className="p-8 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>{t.bac.studyPlan30Days}</span>
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Pour réussir l&apos;épreuve de mathématiques avec mention Très Bien, consacre 2 heures par jour selon cette répartition :
            Semaine 1 (Étude de fonctions & TVI) • Semaine 2 (Suites & Nombres Complexes) • Semaine 3 (Calcul intégral & Probabilités) • Semaine 4 (Sujets d&apos;examens nationaux complets en temps réel de 3h ou 4h).
          </p>
        </section>

      </div>
    </div>
  );
}
