import React from 'react';
import { notFound } from 'next/navigation';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { SITE_CONFIG } from '@/data/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CourseCard } from '@/components/CourseCard';
import { BranchChaptersView } from '@/components/BranchChaptersView';

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

        {/* Structured Branch Chapters View with Semesters S1/S2 & Search */}
        <BranchChaptersView branch={branch} level={level} />

      </div>
    </div>
  );
}
