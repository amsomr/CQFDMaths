'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CURRICULUM_LEVELS } from '@/data/curriculum';
import { CourseCard } from '@/components/CourseCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useLanguage } from '@/components/LanguageProvider';
import { LevelId } from '@/data/types';
import { BookOpen, GraduationCap, Search, Filter } from 'lucide-react';

export default function CoursesPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | 'all'>('2eme-bac');
  const [searchQuery, setSearchQuery] = useState('');
  const { t, isRtl } = useLanguage();

  const filteredLevels = CURRICULUM_LEVELS.filter((lvl) => {
    if (selectedLevelId === 'all') return true;
    return lvl.id === selectedLevelId;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: 'Tous les Cours', url: '/cours' }]} />

        {/* Page Header */}
        <div className="mt-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{t.courses.curriculumStructure}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.courses.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Level Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          
          {/* Level Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedLevelId === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedLevelId === lvl.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isRtl ? lvl.nameAr : lvl.name}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par chapitre..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Curriculum Display grouped by Level & Branch */}
        <div className="space-y-12 sm:space-y-16">
          {filteredLevels.map((lvl) => (
            <div key={lvl.id} className="space-y-6">
              
              {/* Level Heading */}
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {isRtl ? lvl.nameAr : lvl.name}
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
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
                  <div key={branch.id} className="space-y-4 pl-0 sm:pl-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                        {isRtl ? branch.nameAr : branch.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
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
