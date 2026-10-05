import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
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
    title: `${chapter.title} — Cours, Vidéos et Exercices Corrigés (${branch?.shortName})`,
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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb
          items={[
            { name: 'Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
          ]}
        />

        <div className="mt-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Chapitre Officiel</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
            {chapter.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-sans">
            {chapter.description}
          </p>
        </div>

        {/* Lessons List in sequential order */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Leçons dans l&apos;ordre pédagogique recommandé :
          </div>

          {chapter.lessons.map((lesson, idx) => (
            <div
              key={lesson.slug}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 font-sans">
                    {lesson.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 mt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{lesson.estimatedMinutes} min</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Vidéo YouTube</span>
                    </span>
                    {lesson.exercises.length > 0 && (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lesson.exercises.length} exercices corrigés</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all shrink-0 hover:-translate-y-0.5"
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
