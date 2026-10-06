import React from 'react';
import { notFound } from 'next/navigation';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { SITE_CONFIG } from '@/data/site-config';
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
    title: `${branch.name} (${level.name}) — Programme Complet de Maths | ${SITE_CONFIG.name}`,
    description: `Tous les cours et chapitres de mathématiques pour ${branch.name} au Maroc. Vidéos et fiches téléchargeables.`,
  };
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { level: levelId, branch: branchId } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);

  if (!level || !branch) notFound();

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb
          items={[
            { name: 'Tous les Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
          ]}
        />

        <div className="space-y-4 max-w-3xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Filière Officielle BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
            {branch.name}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
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
