import React from 'react';
import { notFound } from 'next/navigation';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CourseCard } from '@/components/CourseCard';
import { BookOpen } from 'lucide-react';

interface BranchPageProps {
  params: Promise<{ level: string; branch: string }>;
}

export async function generateStaticParams() {
  const paths: { level: string; branch: string }[] = [];
  for (const lvl of CURRICULUM_LEVELS) {
    for (const br of lvl.branches) {
      paths.push({ level: lvl.id, branch: br.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: BranchPageProps) {
  const { level: levelId, branch: branchId } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  if (!level || !branch) return { title: 'Filière Introuvable' };

  return {
    title: `${branch.name} (${level.name}) — Programme Complet de Maths | Maths Maroc`,
    description: `Tous les cours et chapitres de mathématiques pour ${branch.name} au Maroc. Vidéos et fiches téléchargeables.`,
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { level: levelId, branch: branchId } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);

  if (!level || !branch) notFound();

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb
          items={[
            { name: 'Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
          ]}
        />

        <div className="mt-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#0056d2]" />
            <span>Filière Officielle BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {branch.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {branch.description} Retrouvez l&apos;ensemble des chapitres du programme avec les démonstrations théoriques et les exercices corrigés pas à pas.
          </p>
        </div>

        {/* Chapters Grid */}
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
    </div>
  );
}
