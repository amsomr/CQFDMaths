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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Exercices Corrigés', url: '/exercices' }]} />

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            <Calculator className="w-3.5 h-3.5" />
            <span>Banque de Problèmes & Annales</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
            {t.exercises.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans">
            {t.exercises.subtitle}
          </p>
        </div>

        {/* Multi-Filters: Level, Difficulty, Search */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          
          {/* Top row: search & stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par notion (ex: TVI, logarithme, complexe)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-stone-400"
              />
            </div>
            <div className="font-mono text-xs text-stone-500 shrink-0">
              <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredExercises.length}</span> exercices trouvés
            </div>
          </div>

          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Niveau :
            </span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Tous
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                  selectedLevel === lvl.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mr-2 flex items-center gap-1">
              <Award className="w-3 h-3" />
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
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                  selectedDifficulty === diff.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200'
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
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
              <p className="font-serif text-stone-800 dark:text-stone-200 font-medium">
                Aucun exercice ne correspond à tes critères de filtrage.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="mt-3 font-sans text-xs font-medium text-stone-600 dark:text-stone-400 hover:underline"
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
