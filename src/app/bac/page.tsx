'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { BAC_EXAMS, BAC_ESSENTIAL_FORMULAS } from '@/data/bac-exams';
import { GraduationCap, FileText, Download, Calendar, CheckCircle2, Award, Sparkles, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Révision Bac', url: '/bac' }]} />

        {/* Campaign Banner - Deep Royal Academic Aesthetic */}
        <div className="rounded-[20px] bg-[#0A192F] text-white p-8 sm:p-14 border border-[#1E293B] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 math-grid-bg opacity-10 pointer-events-none" />
          
          <div className="relative max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>{t.bac.badge}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans">
              {t.bac.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.bac.subtitle} Retrouvez les sujets officiels des sessions normales et de rattrapage, des corrigés types rédigés selon les exigences ministérielles et les vidéos explicatives de Prof. Omar Alami.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <a
                href="#examens"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-xs sm:text-sm font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Consulter les Annales Nationales</span>
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulaire Officiel Résumé</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. EXAM FILTER & REPOSITORY */}
        <section id="examens" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
                <span>Annales Officielles du Ministère de l&apos;Éducation Nationale</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                Examens Nationaux Corrigés (2ème Bac)
              </h2>
            </div>
            <div className="text-xs text-[#64748B] font-medium">
              Sujets conformes aux cadres de référence officiels (BIOF & Général)
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs flex flex-wrap items-center gap-5">
            
            {/* Year Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#475569] mr-1">Année :</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border ${
                  selectedYear === 'all'
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                Toutes
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border ${
                    selectedYear === y
                      ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Session Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#475569] mr-1">Session :</span>
              <button
                onClick={() => setSelectedSession('all')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border ${
                  selectedSession === 'all'
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedSession('Normale')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border ${
                  selectedSession === 'Normale'
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                Normale
              </button>
              <button
                onClick={() => setSelectedSession('Rattrapage')}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border ${
                  selectedSession === 'Rattrapage'
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                Rattrapage
              </button>
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-2 text-xs ml-auto">
              <span className="font-bold text-[#475569]">Filière :</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-1.5 rounded-[6px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
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
        <section id="formulaire" className="space-y-6 pt-8 border-t border-[#0F172A]/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1">
                Formulaire Officiel Résumé
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                Les Formules Essentielles à Maîtriser
              </h2>
            </div>
            <a
              href="/documents/bac-formulaire-officiel.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le Formulaire Complet (PDF)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-[14px] border border-[#0F172A]/10 space-y-4 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-[#0F172A]/10 pb-3">
                  <h3 className="font-extrabold text-base text-[#0F172A]">
                    {group.category}
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-[#64748B] bg-[#FAF9F5] border border-[#0F172A]/10 px-2 py-0.5 rounded-[4px]">
                    2ème Bac
                  </span>
                </div>

                <div className="space-y-3">
                  {group.formulas.map((item, fIdx) => (
                    <div key={fIdx} className="p-3.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10">
                      <span className="text-xs font-bold text-[#1D4ED8] block mb-1">
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
