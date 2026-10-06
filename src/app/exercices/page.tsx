'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ExerciseCard } from '@/components/ExerciseCard';
import { getAllExercises, CURRICULUM_LEVELS } from '@/data/curriculum';
import { Difficulty, LevelId } from '@/data/types';
import { useLanguage } from '@/components/LanguageProvider';
import { Calculator, Filter, Search, Award, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb items={[{ name: 'Exercices Corrigés', url: '/exercices' }]} />

        {/* Page Header - Editorial Layout */}
        <div className="space-y-4 max-w-3xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-[#1D4ED8]/10 text-[#1D4ED8]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Banque de Problèmes & Annales BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            {t.exercises.title}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.exercises.subtitle} Entraînez-vous avec des indications méthodologiques progressives et des corrigés types rédigés selon les exigences ministérielles.
          </p>
        </div>

        {/* Multi-Filters: Level, Difficulty, Search */}
        <div className="p-6 rounded-[14px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-5">
          
          {/* Top row: search & stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par notion (ex: TVI, logarithme, complexe)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-[#0F172A] placeholder-[#94A3B8]"
              />
            </div>
            <div className="text-xs text-[#64748B] shrink-0 font-medium">
              <span className="font-bold text-[#0F172A]">{filteredExercises.length}</span> exercices trouvés
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#0F172A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Niveau :
            </span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
                selectedLevel === 'all'
                  ? 'bg-[#1D4ED8] text-white shadow-2xs'
                  : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
              }`}
            >
              Tous
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
                  selectedLevel === lvl.id
                    ? 'bg-[#1D4ED8] text-white shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#0F172A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] mr-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B45309]" />
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
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-[#1D4ED8] text-white shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

        </div>

        {/* Exercises Stream */}
        <div className="space-y-5">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exo) => (
              <ExerciseCard key={exo.id} exercise={exo} showLessonLink={true} />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-[14px] border border-[#0F172A]/10 p-8 space-y-3">
              <Calculator className="w-10 h-10 text-[#94A3B8] mx-auto" />
              <h3 className="text-lg font-bold text-[#0F172A]">Aucun exercice ne correspond à vos filtres</h3>
              <p className="text-sm text-[#64748B]">Essayez de sélectionner un autre niveau ou de réinitialiser la recherche.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
