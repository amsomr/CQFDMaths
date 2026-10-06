'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { BAC_EXAMS, BAC_ESSENTIAL_FORMULAS } from '@/data/bac-exams';
import { GraduationCap, FileText, Download, Calendar, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function BacRevisionPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSession, setSelectedSession] = useState<'all' | 'Normale' | 'Rattrapage'>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const { t } = useLanguage();

  const years = [2025, 2024, 2023];

  const filteredExams = BAC_EXAMS.filter((exam) => {
    if (selectedYear !== 'all' && exam.year !== selectedYear) return false;
    if (selectedSession !== 'all' && exam.session !== selectedSession) return false;
    if (selectedBranch !== 'all' && exam.branchId !== selectedBranch) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-[#0f141c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Révision Bac', url: '/bac' }]} />

        {/* Hero Section: Coursera Specialization Banner */}
        <div className="rounded-lg bg-[#002661] text-white p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-md">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400 text-gray-950 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{t.bac.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {t.bac.title}
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
              {t.bac.subtitle}
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="#examens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold bg-white text-[#002661] hover:bg-gray-100 transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Consulter les Annales Nationales</span>
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold bg-white/15 hover:bg-white/20 text-white border border-white/25 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulaire Officiel Résumé</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. EXAM FILTER & REPOSITORY */}
        <section id="examens" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 mb-1">
                Annales Officielles du Ministère de l&apos;Éducation Nationale
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Examens Nationaux Corrigés (2ème Bac)
              </h2>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Sujets conformes aux cadres de référence officiels (BIOF & Général)
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-lg bg-[#f5f7fa] dark:bg-[#1a2332] border border-gray-200 dark:border-gray-700/80 flex flex-wrap items-center gap-4">
            
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-gray-600 dark:text-gray-300 mr-1">Année :</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border ${selectedYear === 'all' ? 'bg-[#0056d2] text-white border-[#0056d2]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'}`}
              >
                Toutes
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border ${selectedYear === y ? 'bg-[#0056d2] text-white border-[#0056d2]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'}`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Session Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-gray-600 dark:text-gray-300 mr-1">Session :</span>
              <button
                onClick={() => setSelectedSession('all')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border ${selectedSession === 'all' ? 'bg-[#0056d2] text-white border-[#0056d2]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'}`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedSession('Normale')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border ${selectedSession === 'Normale' ? 'bg-[#0056d2] text-white border-[#0056d2]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'}`}
              >
                Normale
              </button>
              <button
                onClick={() => setSelectedSession('Rattrapage')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border ${selectedSession === 'Rattrapage' ? 'bg-[#0056d2] text-white border-[#0056d2]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'}`}
              >
                Rattrapage
              </button>
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-gray-600 dark:text-gray-300">Filière :</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-2.5 py-1.5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#0056d2]"
              >
                <option value="all">Toutes les filières</option>
                <option value="sciences-maths">Sciences Mathématiques (SM)</option>
                <option value="sciences-physiques">Sciences Expérimentales (PC & SVT)</option>
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

        {/* 2. OFFICIAL SUMMARY FORMULAS SECTION */}
        <section id="formulaire" className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 mb-1">
                Formulaire Officiel Résumé
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Les Formules Essentielles à Retenir
              </h2>
            </div>
            <a
              href="/documents/bac-formulaire-officiel.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-bold text-white bg-[#0056d2] hover:bg-[#00419e] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le Formulaire Complet (PDF)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
              <div
                key={idx}
                className="coursera-card bg-white dark:bg-[#1a2332] p-5 rounded-lg border border-gray-200 dark:border-gray-700/80 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {group.category}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    2ème Bac
                  </span>
                </div>

                <div className="space-y-3">
                  {group.formulas.map((item, fIdx) => (
                    <div key={fIdx} className="p-3 rounded bg-[#f5f7fa] dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700">
                      <span className="text-[11px] font-bold text-[#0056d2] dark:text-blue-400 block mb-1">
                        {item.name} :
                      </span>
                      <div className="overflow-x-auto text-xs py-1">
                        <MathView math={item.latex} inline={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
