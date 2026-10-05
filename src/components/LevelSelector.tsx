'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LevelId } from '@/data/types';

interface LevelOption {
  id: LevelId;
  code: string;
  name: string;
  nameAr: string;
  badge: string;
  badgeAr: string;
  desc: string;
  descAr: string;
  href: string;
  popular?: boolean;
}

export function LevelSelector() {
  const [selectedLevel, setSelectedLevel] = useState<LevelId | null>(null);
  const { t, isRtl } = useLanguage();

  const levels: LevelOption[] = [
    {
      id: '2eme-bac',
      code: '2BAC',
      name: '2ème Année Bac',
      nameAr: 'الثانية باكالوريا',
      badge: 'Examen National',
      badgeAr: 'امتحان وطني',
      desc: 'Sciences Maths (A & B), PC, SVT & Éco. Limites, complexes, exponentielle et annales.',
      descAr: 'علوم رياضية، فيزيائية، علوم الحياة والأرض واقتصاد. النهايات، العقدية والامتحان الوطني.',
      href: '/cours/2eme-bac',
      popular: true,
    },
    {
      id: '1ere-bac',
      code: '1BAC',
      name: '1ère Année Bac',
      nameAr: 'الأولى باكالوريا',
      badge: 'Examen Régional',
      badgeAr: 'امتحان جهوي',
      desc: 'Sciences Expérimentales & Maths. Logique formelle, trigonométrie, dérivation et suites.',
      descAr: 'علوم تجريبية ورياضية. المنطق، الحساب المثلثي، المرجح والاشتقاق.',
      href: '/cours/1ere-bac',
    },
    {
      id: 'tronc-commun',
      code: 'TC',
      name: 'Tronc Commun',
      nameAr: 'الجذع المشترك',
      badge: 'Entrée Lycée',
      badgeAr: 'بداية التأهيلي',
      desc: 'Sciences & Lettres BIOF. Arithmétique dans N, calcul vectoriel et étude de fonctions.',
      descAr: 'علمي وأدبي خيار فرنسية. الحسابيات في N، الحساب المتجهي ودراسة الدوال.',
      href: '/cours/tronc-commun',
    },
    {
      id: 'college',
      code: 'COL',
      name: 'Cycle Collège',
      nameAr: 'السلك الإعدادي',
      badge: '1AC • 2AC • 3AC',
      badgeAr: 'الأولى، الثانية والثالثة',
      desc: 'Théorèmes de Thalès et Pythagore, calcul littéral, équations et préparation au brevet.',
      descAr: 'مبرهنة طاليس، فيتاغورس، الحساب الحرفي والمعادلات والتحضير للموحد الجهوي.',
      href: '/cours/college',
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
    <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Orientation Académique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {t.levels.question}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            {t.levels.subtitle}
          </p>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;
            return (
              <div
                key={level.id}
                onClick={() => handleSelect(level.id)}
                className={`relative rounded-xl p-5 transition-all duration-200 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-stone-900 dark:border-stone-100 shadow-xs'
                    : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                <div>
                  {/* Top Bar: Code and Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-stone-400 dark:text-stone-500">
                      {level.code}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {isRtl ? level.badgeAr : level.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    {isRtl ? level.nameAr : level.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {isRtl ? level.descAr : level.desc}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={level.href}
                    className="text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{isRtl ? 'استعراض الدروس' : 'Consulter les cours'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Actif</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
