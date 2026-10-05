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
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chapitre Officiel</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
            {chapter.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans">
            {chapter.description}
          </p>
        </div>

        {/* Lessons List in sequential order */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-mono text-xs uppercase tracking-wider text-stone-400 mb-2">
            Leçons dans l&apos;ordre pédagogique recommandé :
          </div>

          {chapter.lessons.map((lesson, idx) => (
            <div
              key={lesson.slug}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-stone-400 dark:hover:border-stone-600 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-mono font-semibold text-xs shrink-0 border border-stone-200 dark:border-stone-700">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 font-sans">
                    {lesson.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-stone-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{lesson.estimatedMinutes} min</span>
                    </span>
                    <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Vidéo YouTube</span>
                    </span>
                    {lesson.exercises.length > 0 && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lesson.exercises.length} exercices corrigés</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors shrink-0 shadow-xs"
              >
                <span>Accéder à la leçon</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
