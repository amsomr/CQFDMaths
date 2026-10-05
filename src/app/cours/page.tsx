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
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.courses.curriculumStructure}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
            {t.courses.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-3xl font-sans">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Level Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
          
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs whitespace-nowrap transition-colors ${
                selectedLevelId === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs whitespace-nowrap transition-colors ${
                  selectedLevelId === lvl.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {isRtl ? lvl.nameAr : lvl.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par chapitre..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-stone-400"
            />
          </div>
        </div>

        {/* Curriculum Display grouped by Level & Branch */}
        <div className="space-y-12 sm:space-y-16">
          {filteredLevels.map((lvl) => (
            <div key={lvl.id} className="space-y-6">
              
              {/* Level Heading */}
              <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
                <div className="w-7 h-7 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">
                    {isRtl ? lvl.nameAr : lvl.name}
                  </h2>
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-stone-800 dark:text-stone-200">
                        {isRtl ? branch.nameAr : branch.name}
                      </h3>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700">
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
