import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { SITE_CONFIG } from '@/data/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BookOpen, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface ChapterPageProps {
  params: Promise<{ level: string; branch: string; chapter: string }>;
}

export async function generateStaticParams() {
  const paths: { level: string; branch: string; chapter: string }[] = [];
  for (const lvl of CURRICULUM_LEVELS) {
    for (const br of lvl.branches) {
      for (const ch of br.chapters) {
        paths.push({ level: lvl.id, branch: br.id, chapter: ch.slug });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { level: levelId, branch: branchId, chapter: chapterSlug } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  const chapter = branch?.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return { title: 'Chapitre Introuvable' };

  return {
    title: `${chapter.title} — Cours, Vidéos et Exercices Corrigés (${branch?.shortName}) | ${SITE_CONFIG.name}`,
    description: `Chapitre complet de mathématiques : ${chapter.title} pour ${branch?.name}. Résumés, théorèmes et exercices corrigés.`,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { level: levelId, branch: branchId, chapter: chapterSlug } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  const chapter = branch?.chapters.find((c) => c.slug === chapterSlug);

  if (!level || !branch || !chapter) notFound();

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb
          items={[
            { name: 'Tous les Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
          ]}
        />

        <div className="space-y-4 max-w-3xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Chapitre Officiel BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
            {chapter.title}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {chapter.description} Retrouvez les leçons séquencées, les définitions clés et les exercices d&apos;entraînement associés.
          </p>
        </div>

        {/* Lessons List in sequential order */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
            Syllabus officiel du chapitre :
          </div>

          {chapter.lessons.map((lesson, idx) => (
            <div
              key={lesson.slug}
              className="rounded-[12px] border border-[#0F172A]/10 bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#1D4ED8] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[8px] bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-[#1D4ED8]/20">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mt-1 line-clamp-2">
                    {lesson.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#64748B] mt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span>~{lesson.estimatedMinutes} min</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#CC0000] font-semibold">
                      <Play className="w-3.5 h-3.5 fill-[#CC0000]" />
                      <span>Cours Vidéo</span>
                    </span>
                    {lesson.exercises.length > 0 && (
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lesson.exercises.length} exercices corrigés</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] transition-colors shrink-0 shadow-xs"
              >
                <span>Accéder à la leçon</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
