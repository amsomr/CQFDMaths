'use client';

import React, { useState } from 'react';
import { CURRICULUM_LEVELS } from '@/data/curriculum';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useLanguage } from '@/components/LanguageProvider';
import { LevelId } from '@/data/types';
import { BookOpen, GraduationCap, Search, Sparkles } from 'lucide-react';

export default function CoursesPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | 'all'>('2eme-bac');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, isRtl } = useLanguage();

  const filteredLevels = CURRICULUM_LEVELS.filter((lvl) => {
    if (selectedLevelId === 'all') return true;
    return lvl.id === selectedLevelId;
  });

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: 'Tous les Cours', url: '/cours' }]} />

        {/* Page Header - Editorial Layout */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.courses.curriculumStructure}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
            {t.courses.title}
          </h1>
          
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.courses.subtitle} Chaque chapitre est conçu comme un parcours complet : cours vidéo magistral, propriétés clés rédigées et exercices résolus pas à pas.
          </p>
        </div>

        {/* Level Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F172A]/10">
          
          {/* Level Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                selectedLevelId === 'all'
                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                  : 'bg-white text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40 hover:text-[#0F172A]'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  selectedLevelId === lvl.id
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                    : 'bg-white text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40 hover:text-[#0F172A]'
                }`}
              >
                {isRtl ? lvl.nameAr : lvl.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer un chapitre (ex: Limites, TVI)..."
              className="w-full pl-10 pr-4 py-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] shadow-2xs"
            />
          </div>
        </div>

        {/* Curriculum Display grouped by Level & Branch */}
        <div className="space-y-16">
          {filteredLevels.map((lvl) => (
            <div key={lvl.id} className="space-y-8">
              
              {/* Level Heading */}
              <div className="flex items-center gap-3 border-b border-[#0F172A]/10 pb-4">
                <div className="w-10 h-10 rounded-[8px] bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    {isRtl ? lvl.nameAr : lvl.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    {lvl.description}
                  </p>
                </div>
              </div>

              {/* Branches inside this level */}
              {lvl.branches.map((branch) => {
                const visibleChapters = branch.chapters.filter((ch) =>
                  ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  ch.description.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (visibleChapters.length === 0 && searchQuery) return null;

                return (
                  <div key={branch.id} className="space-y-5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                        {isRtl ? branch.nameAr : branch.name}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-[6px] bg-white text-[#1D4ED8] border border-[#1D4ED8]/20 shadow-2xs">
                        {branch.shortName}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleChapters.map((chapter) => (
                        <CourseCard
                          key={chapter.slug}
                          chapter={chapter}
                          levelId={lvl.id}
                          branchId={branch.id}
                          branchName={branch.shortName}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
