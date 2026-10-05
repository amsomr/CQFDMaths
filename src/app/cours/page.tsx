'use client';

import React, { useState } from 'react';
import { CURRICULUM_LEVELS } from '@/data/curriculum';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useLanguage } from '@/components/LanguageProvider';
import { LevelId } from '@/data/types';
import { BookOpen, GraduationCap, Search } from 'lucide-react';

export default function CoursesPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | 'all'>('2eme-bac');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, isRtl } = useLanguage();

  const filteredLevels = CURRICULUM_LEVELS.filter((lvl) => {
    if (selectedLevelId === 'all') return true;
    return lvl.id === selectedLevelId;
  });

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: 'Tous les Cours', url: '/cours' }]} />

        {/* Page Header */}
        <div className="mt-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t.courses.curriculumStructure}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
            {t.courses.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl font-sans">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Level Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          
          {/* Level Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                selectedLevelId === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 shadow-2xs'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedLevelId === lvl.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 shadow-2xs'
                }`}
              >
                {isRtl ? lvl.nameAr : lvl.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par chapitre..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 shadow-xs placeholder-slate-400"
            />
          </div>
        </div>

        {/* Curriculum Display grouped by Level & Branch */}
        <div className="space-y-12 sm:space-y-16">
          {filteredLevels.map((lvl) => (
            <div key={lvl.id} className="space-y-6">
              
              {/* Level Heading */}
              <div className="flex items-center gap-3.5 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-2xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium text-slate-900 dark:text-white">
                    {isRtl ? lvl.nameAr : lvl.name}
                  </h2>
                  <span className="font-sans text-xs text-slate-500 dark:text-slate-400">
                    {lvl.description}
                  </span>
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
                  <div key={branch.id} className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200">
                        {isRtl ? branch.nameAr : branch.name}
                      </h3>
                      <span className="font-sans text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
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
