'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Branch, Level } from '@/data/types';
import { CourseCard } from './CourseCard';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Calendar, 
  GraduationCap, 
  FileText, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface BranchChaptersViewProps {
  branch: Branch;
  level: Level;
}

export function BranchChaptersView({ branch, level }: BranchChaptersViewProps) {
  const { isRtl } = useLanguage();
  const [activeSemester, setActiveSemester] = useState<'all' | 1 | 2>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const s1Chapters = useMemo(() => {
    return branch.chapters.filter((c) => c.semester === 1);
  }, [branch.chapters]);

  const s2Chapters = useMemo(() => {
    return branch.chapters.filter((c) => c.semester === 2);
  }, [branch.chapters]);

  const totalLessons = useMemo(() => {
    return branch.chapters.reduce((acc, c) => acc + (c.lessons?.length || 0), 0);
  }, [branch.chapters]);

  const totalResources = useMemo(() => {
    return branch.chapters.reduce((acc, c) => acc + (c.resources?.length || 0), 0);
  }, [branch.chapters]);

  // Filter chapters based on semester and search query
  const filteredChapters = useMemo(() => {
    return branch.chapters.filter((ch) => {
      // Semester filter
      if (activeSemester !== 'all' && ch.semester !== activeSemester) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ch.title.toLowerCase().includes(q);
        const matchTitleAr = ch.titleAr?.includes(searchQuery);
        const matchDesc = ch.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchTitleAr && !matchDesc) return false;
      }
      return true;
    });
  }, [branch.chapters, activeSemester, searchQuery]);

  return (
    <div className="space-y-10">
      {/* 1. Branch Header Hero */}
      <div className="rounded-[20px] bg-white border border-[#0F172A]/10 p-6 sm:p-10 shadow-2xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Programme Officiel BIOF • {level.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/exercices"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-bold bg-[#FAF9F5] text-[#1D4ED8] border border-[#1D4ED8]/20 hover:bg-[#1D4ED8]/10 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Séries d&apos;Exercices</span>
            </Link>

            {level.id === '2eme-bac' && (
              <Link
                href="/bac"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Annales du Bac</span>
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
              {branch.name}
            </h1>
            {branch.nameAr && (
              <span className="text-xl sm:text-2xl font-bold text-[#64748B] font-arabic" dir="rtl">
                {branch.nameAr}
              </span>
            )}
          </div>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl">
            {branch.description} Retrouvez l&apos;ensemble des chapitres du programme structurés par semestre, avec cours magistraux, fiches résumés, séries d&apos;exercices et corrigés détaillés.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#0F172A]/08">
          <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/06">
            <div className="text-xs text-[#64748B] font-semibold">Total Chapitres</div>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">{branch.chapters.length}</div>
          </div>
          <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/06">
            <div className="text-xs text-[#64748B] font-semibold">Semestre 1</div>
            <div className="text-xl font-black text-[#1D4ED8] mt-0.5">{s1Chapters.length} chapitres</div>
          </div>
          <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/06">
            <div className="text-xs text-[#64748B] font-semibold">Semestre 2</div>
            <div className="text-xl font-black text-[#1D4ED8] mt-0.5">{s2Chapters.length} chapitres</div>
          </div>
          <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/06">
            <div className="text-xs text-[#64748B] font-semibold">Documents &amp; Séries</div>
            <div className="text-xl font-black text-emerald-700 mt-0.5">{totalResources > 0 ? `${totalResources} indexés` : 'En enrichissement'}</div>
          </div>
        </div>
      </div>

      {/* 2. Semesters Navigation & Live Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0F172A]/10">
        {/* Semester Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSemester('all')}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeSemester === 'all'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                : 'bg-white text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40 hover:text-[#0F172A]'
            }`}
          >
            Tous les Chapitres ({branch.chapters.length})
          </button>
          
          <button
            type="button"
            onClick={() => setActiveSemester(1)}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeSemester === 1
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                : 'bg-white text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40 hover:text-[#0F172A]'
            }`}
          >
            Semestre 1 • الدورة الأولى ({s1Chapters.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveSemester(2)}
            className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeSemester === 2
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                : 'bg-white text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40 hover:text-[#0F172A]'
            }`}
          >
            Semestre 2 • الدورة الثانية ({s2Chapters.length})
          </button>
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer un chapitre..."
            className="w-full pl-10 pr-4 py-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Chapters Display */}
      {searchQuery.trim() || activeSemester !== 'all' ? (
        // Filtered Flat View
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            {filteredChapters.length} {filteredChapters.length > 1 ? 'chapitres correspondants' : 'chapitre correspondant'} :
          </div>

          {filteredChapters.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-[16px] border border-[#0F172A]/10 space-y-3">
              <BookOpen className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <div className="text-base font-bold text-[#0F172A]">Aucun chapitre trouvé</div>
              <p className="text-xs text-[#64748B]">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter) => (
                <CourseCard
                  key={chapter.slug}
                  chapter={chapter}
                  levelId={level.id}
                  branchId={branch.id}
                  branchName={branch.shortName}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Default View: Grouped by Semestre 1 and Semestre 2
        <div className="space-y-14">
          {/* SEMESTRE 1 */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0F172A]/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-xs">
                  S1
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                    Semestre 1 — الدورة الأولى
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Fondements théoriques et contrôles continus N°1, 2 et 3
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#1D4ED8] px-2.5 py-1 rounded-[6px] bg-blue-50 border border-blue-200">
                {s1Chapters.length} chapitres
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {s1Chapters.map((chapter) => (
                <CourseCard
                  key={chapter.slug}
                  chapter={chapter}
                  levelId={level.id}
                  branchId={branch.id}
                  branchName={branch.shortName}
                />
              ))}
            </div>
          </div>

          {/* SEMESTRE 2 */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0F172A]/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[8px] bg-[#0A192F] text-white flex items-center justify-center font-bold text-xs">
                  S2
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                    Semestre 2 — الدورة الثانية
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Approfondissements, synthèses et préparation aux examens officiels
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#0A192F] px-2.5 py-1 rounded-[6px] bg-slate-100 border border-slate-200">
                {s2Chapters.length} chapitres
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {s2Chapters.map((chapter) => (
                <CourseCard
                  key={chapter.slug}
                  chapter={chapter}
                  levelId={level.id}
                  branchId={branch.id}
                  branchName={branch.shortName}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
