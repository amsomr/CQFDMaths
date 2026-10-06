'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LevelId } from '@/data/types';
import { CURRICULUM_LEVELS } from '@/data/curriculum';

export function LevelSelector() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId>('2eme-bac');
  const { isRtl } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('maths_maroc_user_level') as LevelId | null;
    if (saved && ['2eme-bac', '1ere-bac', 'tronc-commun', 'college'].includes(saved)) {
      setSelectedLevelId(saved);
    }
  }, []);

  const handleSelectLevel = (id: LevelId) => {
    setSelectedLevelId(id);
    localStorage.setItem('maths_maroc_user_level', id);
  };

  const levelTabs = [
    {
      id: '2eme-bac' as LevelId,
      label: '2ème Bac',
      sublabel: 'Examen National',
      tag: 'Terminale',
    },
    {
      id: '1ere-bac' as LevelId,
      label: '1ère Bac',
      sublabel: 'Examen Régional',
      tag: '1ère Lycée',
    },
    {
      id: 'tronc-commun' as LevelId,
      label: 'Tronc Commun',
      sublabel: 'Sciences BIOF',
      tag: 'Entrée Lycée',
    },
    {
      id: 'college' as LevelId,
      label: 'Collège',
      sublabel: '3AC • 2AC • 1AC',
      tag: 'Cycle Collégial',
    },
  ];

  const currentLevelData = CURRICULUM_LEVELS.find((l) => l.id === selectedLevelId) || CURRICULUM_LEVELS[0];

  return (
    <section className="py-16 sm:py-24 border-y border-[rgba(15,23,42,0.08)] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1D4ED8] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>Orientation & Cursus Officiel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Choisis ton niveau.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Accède instantanément aux cours structurés, vidéos et exercices corrigés correspondant exactement au programme du Ministère de l&apos;Éducation Nationale du Maroc.
          </p>
        </div>

        {/* 4 Large Segmented Interactive Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 select-none">
          {levelTabs.map((tab) => {
            const isSelected = selectedLevelId === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectLevel(tab.id)}
                className={`text-left p-4 sm:p-5 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-md shadow-blue-900/10 -translate-y-0.5'
                    : 'bg-[#FAF9F5] text-slate-900 border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] hover:bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/70 text-slate-700'
                    }`}
                  >
                    {tab.tag}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>

                <div className={`text-lg sm:text-xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {tab.label}
                </div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {tab.sublabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Tray revealing branches and curriculum for selected level */}
        <div className="mt-6 p-6 sm:p-8 rounded-xl bg-[#FAF9F5] border border-[rgba(15,23,42,0.08)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[rgba(15,23,42,0.08)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-[#1D4ED8]" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentLevelData.name}
                </h3>
              </div>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {currentLevelData.description}
              </p>
            </div>

            <Link
              href={`/cours/${currentLevelData.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm transition-all shadow-xs shrink-0"
            >
              <span>Accéder à tous les cours de {currentLevelData.name.split(' ')[0]}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Branches & Syllabus Highlights */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentLevelData.branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-[#FFFFFF] p-5 rounded-lg border border-[rgba(15,23,42,0.06)] hover:border-[#1D4ED8] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#1D4ED8]">
                      {branch.shortName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {branch.chapters.length} chapitres
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1.5">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {branch.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Programme complet</span>
                  <Link
                    href={`/cours/${currentLevelData.id}/${branch.id}`}
                    className="font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1"
                  >
                    <span>Explorer la filière</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
