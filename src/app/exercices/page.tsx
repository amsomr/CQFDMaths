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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Banque de Problèmes & Annales</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
            {t.exercises.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans max-w-2xl">
            {t.exercises.subtitle}
          </p>
        </div>

        {/* Multi-Filters: Level, Difficulty, Search */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          
          {/* Top row: search & stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par notion (ex: TVI, logarithme, complexe)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 dark:text-slate-100 shadow-2xs placeholder-slate-400"
              />
            </div>
            <div className="font-mono text-xs text-slate-500 shrink-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredExercises.length}</span> exercices trouvés
            </div>
          </div>

          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              Niveau :
            </span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLevel === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Tous
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedLevel === lvl.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
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
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <p className="font-serif text-slate-800 dark:text-slate-200 font-medium">
                Aucun exercice ne correspond à tes critères de filtrage.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="mt-3 font-sans text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
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
