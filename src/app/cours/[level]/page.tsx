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
    title: `${level.name} — Programme Officiel & Cours de Maths | Maths Maroc`,
    description: `Programme complet de mathématiques pour ${level.name} au Maroc. Cours officiels, vidéos d'explications et exercices corrigés.`,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { level: levelId } = await params;
  const level = getLevelById(levelId);

  if (!level) notFound();

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb
          items={[
            { name: 'Tous les Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
          ]}
        />

        {/* Level Header - Editorial Layout */}
        <div className="space-y-4 max-w-3xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Programme Officiel BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
            {level.name}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {level.description} Tous les cours sont conformes aux directives ministérielles et organisés par chapitres avec vidéos explicatives et exercices résolus pas à pas.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="space-y-12">
          {level.branches.map((branch) => (
            <div key={branch.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0F172A]/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    {branch.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                    {branch.description}
                  </p>
                </div>
                <Link
                  href={`/cours/${level.id}/${branch.id}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D4ED8] hover:underline"
                >
                  <span>Explorer toute la filière</span>
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
