'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, GraduationCap, Award, Compass, Calculator } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LevelId } from '@/data/types';

interface LevelOption {
  id: LevelId;
  name: string;
  nameAr: string;
  badge: string;
  badgeAr: string;
  branches: string;
  desc: string;
  descAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: string[];
}

export function LevelSelector() {
  const [selectedLevel, setSelectedLevel] = useState<LevelId | null>(null);
  const { isRtl } = useLanguage();

  const levels: LevelOption[] = [
    {
      id: '2eme-bac',
      name: '2ème Année Baccalauréat',
      nameAr: 'الثانية باكالوريا',
      badge: 'Examen National',
      badgeAr: 'امتحان وطني',
      branches: 'Sciences Maths (A & B) • Sciences Physiques • SVT',
      desc: 'Préparation intensive à l\'Examen National avec l\'ensemble des chapitres d\'analyse, algèbre et probabilités.',
      descAr: 'التحضير المكثف للامتحان الوطني مع كافة فصول التحليل، الجبر والاحتمالات.',
      href: '/cours/2eme-bac',
      icon: GraduationCap,
      topics: ['Limites & TVI', 'Nombres Complexes', 'Calcul Intégral', 'Suites', 'Annales 2020-2025'],
    },
    {
      id: '1ere-bac',
      name: '1ère Année Baccalauréat',
      nameAr: 'الأولى باكالوريا',
      badge: 'Lycée',
      badgeAr: 'الجهوي',
      branches: 'Sciences Expérimentales • Sciences Mathématiques',
      desc: 'Acquisition des outils fondamentaux : logique rigoureuse, trigonométrie avancée et dérivation.',
      descAr: 'اكتساب الأدوات الأساسية : المنطق الرياضي، الحساب المثلثي والاشتقاق.',
      href: '/cours/1ere-bac',
      icon: Award,
      topics: ['Logique', 'Trigonométrie', 'Dérivation', 'Suites Numériques', 'Barycentre'],
    },
    {
      id: 'tronc-commun',
      name: 'Tronc Commun Scientifique',
      nameAr: 'الجذع المشترك العلمي',
      badge: 'Entrée Lycée',
      badgeAr: 'التأهيلي',
      branches: 'Option Français (BIOF) & Arabe',
      desc: 'Transition clé collège-lycée : arithmétique rigoureuse dans N, calcul vectoriel et étude graphique de fonctions.',
      descAr: 'المرحلة الانتقالية الهامة : الحسابيات في N، الحساب المتجهي ودراسة الدوال.',
      href: '/cours/tronc-commun',
      icon: Compass,
      topics: ['Arithmétique dans N', 'Calcul Vectoriel', 'Ordre dans R', 'Étude de Fonctions'],
    },
    {
      id: 'college',
      name: 'Cycle Collégial (1AC, 2AC, 3AC)',
      nameAr: 'السلك الإعدادي',
      badge: 'Collège',
      badgeAr: 'الإعدادي',
      branches: '1ère, 2ème et 3ème Année Collège',
      desc: 'Maîtrise des théorèmes classiques de géométrie, du calcul littéral et préparation au Brevet normalisé.',
      descAr: 'ضبط المبرهنات الأساسية في الهندسة، الحساب الحرفي والامتحان الموحد.',
      href: '/cours/college',
      icon: Calculator,
      topics: ['Thalès & Pythagore', 'Calcul Littéral', 'Équations & Inéquations', 'Normalisé 3AC'],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('maths_maroc_user_level') as LevelId | null;
    if (saved) {
      setSelectedLevel(saved);
    }
  }, []);

  const handleSelect = (id: LevelId) => {
    setSelectedLevel(id);
    localStorage.setItem('maths_maroc_user_level', id);
  };

  return (
    <section className="py-14 sm:py-18 bg-[#f5f7fa] dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Coursera Style */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 block mb-1">
            Programmes d&apos;Études Officiels
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Quel est votre niveau d&apos;études ?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Sélectionnez votre classe pour accéder immédiatement au cursus complet, aux cours vidéo et aux exercices d&apos;entraînement conformes aux directives du Ministère.
          </p>
        </div>

        {/* 4 Cards Grid Coursera Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            const Icon = lvl.icon;

            return (
              <div
                key={lvl.id}
                onClick={() => handleSelect(lvl.id)}
                className={`bg-white dark:bg-[#1a2332] rounded-lg border transition-all p-5 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#0056d2] ring-2 ring-[#0056d2]/20 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700/80 hover:border-[#0056d2] dark:hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar with Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {isRtl ? lvl.badgeAr : lvl.badge}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#0056d2] dark:text-blue-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Sélectionné</span>
                      </span>
                    )}
                  </div>

                  {/* Level Title */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {isRtl ? lvl.nameAr : lvl.name}
                    </h3>
                  </div>

                  {/* Branches */}
                  <p className="text-[11px] font-semibold text-[#0056d2] dark:text-blue-400 mb-2">
                    {lvl.branches}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {isRtl ? lvl.descAr : lvl.desc}
                  </p>

                  {/* Syllabus Key Topics */}
                  <div className="space-y-1 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Chapitres clés :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lvl.topics.map((t) => (
                        <span key={t} className="text-[10px] bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded border border-gray-200/60 dark:border-gray-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Link CTA */}
                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Link
                    href={lvl.href}
                    className="inline-flex items-center justify-between w-full py-2 px-3 rounded text-xs font-semibold text-[#0056d2] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-[#0056d2] hover:text-white dark:hover:bg-[#0056d2] transition-colors"
                  >
                    <span>Explorer le programme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
