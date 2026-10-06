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
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-[#0f141c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: 'Tous les Cours', url: '/cours' }]} />

        {/* Page Header */}
        <div className="mt-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">
            <BookOpen className="w-4 h-4 text-[#0056d2] dark:text-blue-400" />
            <span>{t.courses.curriculumStructure}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight font-sans">
            {t.courses.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Level Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          
          {/* Level Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-3.5 py-2 rounded text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border ${
                selectedLevelId === 'all'
                  ? 'bg-[#0056d2] text-white border-[#0056d2]'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-3.5 py-2 rounded text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border ${
                  selectedLevelId === lvl.id
                    ? 'bg-[#0056d2] text-white border-[#0056d2]'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50'
                }`}
              >
                {isRtl ? lvl.nameAr : lvl.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par chapitre..."
              className="w-full pl-9 pr-3.5 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0056d2]"
            />
          </div>
        </div>

        {/* Curriculum Display grouped by Level & Branch */}
        <div className="space-y-12 sm:space-y-16">
          {filteredLevels.map((lvl) => (
            <div key={lvl.id} className="space-y-6">
              
              {/* Level Heading */}
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="w-8 h-8 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {isRtl ? lvl.nameAr : lvl.name}
                  </h2>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
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
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {isRtl ? branch.nameAr : branch.name}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
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
