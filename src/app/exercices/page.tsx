'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ExerciseCard } from '@/components/ExerciseCard';
import { getAllExercises, CURRICULUM_LEVELS } from '@/data/curriculum';
import { Difficulty, LevelId } from '@/data/types';
import { useLanguage } from '@/components/LanguageProvider';
import { Calculator, Filter, Search, Award } from 'lucide-react';

export default function ExercisesPage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelId | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const allExercises = useMemo(() => getAllExercises(), []);

  const filteredExercises = useMemo(() => {
    return allExercises.filter((exo) => {
      if (selectedLevel !== 'all' && exo.levelId !== selectedLevel) return false;
      if (selectedDifficulty !== 'all' && exo.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          exo.title.toLowerCase().includes(q) ||
          exo.question.toLowerCase().includes(q) ||
          exo.chapterSlug.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [allExercises, selectedLevel, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Exercices Corrigés', url: '/exercices' }]} />

        {/* Page Header (Coursera Catalog Style) */}
        <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Calculator className="w-3.5 h-3.5 text-[#0056d2]" />
            <span>Banque de Problèmes & Annales BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.exercises.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {t.exercises.subtitle} Entraînez-vous avec des indications méthodologiques progressives et des corrigés types rédigés selon les exigences ministérielles.
          </p>
        </div>

        {/* Multi-Filters: Level, Difficulty, Search (Coursera Filter Bar) */}
        <div className="p-6 rounded-md bg-[#f8fafc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          
          {/* Top row: search & stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par notion (ex: TVI, logarithme, complexe)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-[#0056d2] focus:ring-1 focus:ring-[#0056d2] text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 shrink-0 font-medium">
              <span className="font-bold text-slate-900 dark:text-slate-100">{filteredExercises.length}</span> exercices trouvés
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#0056d2]" />
              Niveau :
            </span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-[#0056d2] text-white shadow-xs'
                  : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              Tous
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedLevel === lvl.id
                    ? 'bg-[#0056d2] text-white shadow-xs'
                    : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Difficulté :
            </span>
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'facile', label: 'Facile' },
              { id: 'moyen', label: 'Moyen' },
              { id: 'difficile', label: 'Difficile' },
              { id: 'type-examen', label: 'Type Examen National' },
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id as Difficulty | 'all')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff.id
                    ? 'bg-[#0056d2] text-white shadow-xs'
                    : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

        </div>

        {/* Exercises Stream */}
        <div className="space-y-4">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exo) => (
              <ExerciseCard key={exo.id} exercise={exo} showLessonLink={true} />
            ))
          ) : (
            <div className="text-center py-16 bg-[#f8fafc] dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
              <p className="text-slate-800 dark:text-slate-200 font-semibold">
                Aucun exercice ne correspond à vos critères de recherche.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-semibold text-[#0056d2] hover:underline"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
