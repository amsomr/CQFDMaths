'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, GraduationCap, Award, Compass, Calculator } from 'lucide-react';
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
  accentColor: string;
  badgeStyle: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
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
      accentColor: 'border-blue-200 dark:border-blue-900/60 hover:border-blue-500 hover:shadow-blue-500/10',
      badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-950',
      iconColor: 'text-blue-600 dark:text-blue-400',
      icon: GraduationCap,
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
      accentColor: 'border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-500 hover:shadow-emerald-500/10',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      icon: Award,
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
      accentColor: 'border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-500 hover:shadow-indigo-500/10',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
      iconBg: 'bg-indigo-100 dark:bg-indigo-950',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      icon: Compass,
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
      accentColor: 'border-amber-200 dark:border-amber-900/60 hover:border-amber-500 hover:shadow-amber-500/10',
      badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-950',
      iconColor: 'text-amber-600 dark:text-amber-400',
      icon: Calculator,
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
    <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              Orientation Académique
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.levels.question}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {t.levels.subtitle}
          </p>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;
            const Icon = level.icon;
            return (
              <div
                key={level.id}
                onClick={() => handleSelect(level.id)}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  isSelected
                    ? 'ring-2 ring-blue-600 border-blue-500 shadow-md'
                    : level.accentColor
                }`}
              >
                <div>
                  {/* Top Bar: Icon chip and Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${level.iconBg} ${level.iconColor} flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${level.badgeStyle}`}>
                      {isRtl ? level.badgeAr : level.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                    {isRtl ? level.nameAr : level.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isRtl ? level.descAr : level.desc}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={level.href}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1.5 group/link"
                  >
                    <span>{isRtl ? 'استعراض الدروس' : 'Consulter les cours'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 ${isRtl ? 'rotate-180 group-hover/link:-translate-x-1' : ''}`} />
                  </Link>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
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
