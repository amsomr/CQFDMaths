'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LevelId } from '@/data/types';

interface LevelOption {
  id: LevelId;
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
      name: '2ème Année Bac',
      nameAr: 'الثانية باكالوريا',
      badge: 'Examen National',
      badgeAr: 'امتحان وطني',
      desc: 'Sciences Maths, PC, SVT & Éco. Limites, complexes, exponentielle et préparation intensive.',
      descAr: 'علوم رياضية، فيزيائية، ع.ح.أ واقتصاد. النهايات، العقدية، الأسية واستعداد مكثف للوطني.',
      href: '/cours/2eme-bac',
      popular: true,
    },
    {
      id: '1ere-bac',
      name: '1ère Année Bac',
      nameAr: 'الأولى باكالوريا',
      badge: 'Examen Régional',
      badgeAr: 'امتحان جهوي',
      desc: 'Sciences Expérimentales & Maths. Logique, trigonométrie, barycentre et dérivation.',
      descAr: 'علوم تجريبية ورياضية. المنطق، الحساب المثلثي، المرجح والاشتقاق.',
      href: '/cours/1ere-bac',
    },
    {
      id: 'tronc-commun',
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
      name: 'Cycle Collège',
      nameAr: 'السلك الإعدادي',
      badge: '1AC, 2AC & 3AC',
      badgeAr: 'الأولى، الثانية والثالثة',
      desc: 'Thalès, Pythagore, calcul littéral, équations et préparation au Brevet Régional.',
      descAr: 'مبرهنة طاليس، فيتاغورس، الحساب الحرفي والمعادلات والتحضير للموحد.',
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
    <section className="relative py-12 sm:py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Orientation Rapide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.levels.question}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.levels.subtitle}
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;
            return (
              <div
                key={level.id}
                onClick={() => handleSelect(level.id)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 shadow-xl ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular or Saved Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        : level.popular
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {level.popular && <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                    <span>{isRtl ? level.badgeAr : level.badge}</span>
                  </span>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isRtl ? 'مستواك المفضل' : 'Ton choix'}</span>
                    </span>
                  )}
                </div>

                {/* Level Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {isRtl ? level.nameAr : level.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isRtl ? level.descAr : level.desc}
                  </p>
                </div>

                {/* Link to Level Curriculum */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    href={level.href}
                    className={`inline-flex items-center justify-between w-full text-xs sm:text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    <span>{isRtl ? 'تصفح المقررات والدروس' : 'Accéder aux cours'}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
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
