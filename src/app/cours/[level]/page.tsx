import React from 'react';
import { notFound } from 'next/navigation';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CourseCard } from '@/components/CourseCard';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LevelPageProps {
  params: Promise<{ level: string }>;
}

export async function generateStaticParams() {
  return CURRICULUM_LEVELS.map((lvl) => ({
    level: lvl.id,
  }));
}

export async function generateMetadata({ params }: LevelPageProps) {
  const { level: levelId } = await params;
  const level = getLevelById(levelId);
  if (!level) return { title: 'Niveau Introuvable' };

  return {
    title: `${level.name} — Cours, Exercices et Vidéos de Maths Maroc`,
    description: `Programme complet de mathématiques pour ${level.name} au Maroc. Cours officiels, vidéos d'explications et exercices corrigés.`,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { level: levelId } = await params;
  const level = getLevelById(levelId);

  if (!level) notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb
          items={[
            { name: 'Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
          ]}
        />

        {/* Level Header */}
        <div className="mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>{level.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {level.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {level.description}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="space-y-12">
          {level.branches.map((branch) => (
            <div key={branch.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {branch.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {branch.description}
                  </p>
                </div>
                <Link
                  href={`/cours/${level.id}/${branch.id}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <span>Voir la filière complète</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branch.chapters.map((chapter) => (
                  <CourseCard
                    key={chapter.slug}
                    chapter={chapter}
                    levelId={level.id}
                    branchId={branch.id}
                    branchName={branch.shortName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
