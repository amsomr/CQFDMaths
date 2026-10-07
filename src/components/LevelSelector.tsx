'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, CheckCircle2, BookOpen, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LevelId } from '@/data/types';
import { CURRICULUM_LEVELS } from '@/data/curriculum';
import { MathGraphic } from './MathGraphic';

export function LevelSelector() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId>('2eme-bac');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sciences-maths');
  const { isRtl } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('maths_maroc_user_level') as LevelId | null;
    if (saved && ['2eme-bac', '1ere-bac', 'tronc-commun'].includes(saved)) {
      setSelectedLevelId(saved);
    }
  }, []);

  const handleSelectLevel = (id: LevelId) => {
    setSelectedLevelId(id);
    localStorage.setItem('maths_maroc_user_level', id);
    const lvl = CURRICULUM_LEVELS.find((l) => l.id === id);
    if (lvl && lvl.branches.length > 0) {
      setSelectedBranchId(lvl.branches[0].id);
    }
  };

  const levelTabs = [
    { id: 'tronc-commun' as LevelId, label: 'Tronc Commun', subtitle: 'Sciences BIOF' },
    { id: '1ere-bac' as LevelId, label: '1ère Bac', subtitle: 'SM • Sciences Exp' },
    { id: '2eme-bac' as LevelId, label: '2ème Bac', subtitle: 'Examen National' },
  ];

  const currentLevelData = CURRICULUM_LEVELS.find((l) => l.id === selectedLevelId) || CURRICULUM_LEVELS[0];
  const currentBranch = currentLevelData.branches.find((b) => b.id === selectedBranchId) || currentLevelData.branches[0];

  // Specific preview topic for the graphic
  const previewTopic = selectedLevelId === '2eme-bac'
    ? 'limites-et-continuite'
    : selectedLevelId === '1ere-bac'
    ? 'complexe'
    : 'fonction';

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Integrated Moroccan Level Selector Box */}
        <div className="rounded-[22px] bg-white border border-[#0F172A]/10 shadow-sm overflow-hidden">
          
          {/* 1. Header: Typography-driven Tab Navigation */}
          <div className="px-6 sm:px-10 pt-8 pb-5 border-b border-[#0F172A]/08 bg-[#FAF9F5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <span>Choisis ton niveau • Cursus Officiel Marocain</span>
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                Option Français (BIOF) & Arabe
              </span>
            </div>

            {/* The Integrated Tabs Line */}
            <div className="flex items-center gap-2 sm:gap-8 overflow-x-auto scrollbar-none pb-1">
              {levelTabs.map((tab) => {
                const isSelected = selectedLevelId === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSelectLevel(tab.id)}
                    className={`relative pb-3 text-left transition-all cursor-pointer whitespace-nowrap group ${
                      isSelected ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <div className="text-lg sm:text-2xl font-black tracking-tight">
                      {tab.label}
                    </div>
                    <div className={`text-xs font-semibold ${isSelected ? 'text-[#1D4ED8]' : 'text-[#94A3B8]'}`}>
                      {tab.subtitle}
                    </div>

                    {/* Active Underline Indicator */}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1D4ED8] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Composed Body: Asymmetric Content + Math Visual Preview */}
          <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>{currentLevelData.name}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
                  {currentLevelData.name === '2ème Année Baccalauréat'
                    ? "Prépare l'examen national avec rigueur et clarté."
                    : currentLevelData.name === '1ère Année Baccalauréat'
                    ? "Maîtrise les fondements de la 1ère Bac et réussis le Régional."
                    : "Réussis ta transition vers le Lycée scientifique."}
                </h3>

                <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
                  {currentLevelData.description}
                </p>
              </div>

              {/* Branch Selector Chips */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  Filières disponibles pour ce niveau :
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentLevelData.branches.map((branch) => {
                    const isBranchActive = branch.id === currentBranch?.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setSelectedBranchId(branch.id)}
                        className={`px-4 py-2.5 rounded-[10px] text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                          isBranchActive
                            ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                            : 'bg-[#FAF9F5] text-[#334155] border-[#0F172A]/10 hover:border-[#1D4ED8] hover:bg-white'
                        }`}
                      >
                        <span>{branch.name}</span>
                        <span className={`ml-2 text-xs font-mono ${isBranchActive ? 'text-blue-300' : 'text-[#64748B]'}`}>
                          ({branch.chapters.length} chapitres)
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Link CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/cours/${currentLevelData.id}/${currentBranch?.id || ''}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
                >
                  <span>Explorer les cours de {currentBranch?.shortName || currentLevelData.name.split(' ')[0]}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href={`/cours/${currentLevelData.id}`}
                  className="text-xs sm:text-sm font-bold text-[#475569] hover:text-[#1D4ED8] transition-colors py-2"
                >
                  Voir toute la promo ({currentLevelData.branches.length} filières) →
                </Link>
              </div>
            </div>

            {/* Right Visual Column (5 cols) - Meaningful Preview Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-[16px] overflow-hidden border border-[#0F172A]/10 bg-[#FAF9F5] shadow-xs">
                
                {/* Mathematical Graphic of key chapter */}
                <div className="relative border-b border-[#0F172A]/08">
                  <MathGraphic topic={previewTopic} variant="card" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[6px] bg-white/95 text-xs font-bold text-[#0F172A] border border-[#0F172A]/10 shadow-2xs">
                    {currentBranch?.shortName} • Chapitre Clé
                  </div>
                </div>

                {/* Chapter breakdown list */}
                <div className="p-5 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Au programme de cette filière :
                  </div>
                  <div className="space-y-2">
                    {currentBranch?.chapters.slice(0, 3).map((ch, idx) => (
                      <Link
                        key={ch.slug}
                        href={`/cours/${currentLevelData.id}/${currentBranch.id}/${ch.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-[8px] hover:bg-white text-xs font-semibold text-[#0F172A] border border-transparent hover:border-[#0F172A]/08 transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-[4px] bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-mono text-[10px]">
                            0{idx + 1}
                          </span>
                          <span className="line-clamp-1">{ch.title}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#1D4ED8] transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
