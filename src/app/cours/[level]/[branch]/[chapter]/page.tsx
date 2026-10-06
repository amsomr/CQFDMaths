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
    title: `${chapter.title} — Cours, Vidéos et Exercices Corrigés (${branch?.shortName}) | Maths Maroc`,
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
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb
          items={[
            { name: 'Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
          ]}
        />

        <div className="mt-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#0056d2]" />
            <span>Chapitre Officiel BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {chapter.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {chapter.description} Retrouvez les leçons séquencées, les définitions clés et les exercices d&apos;entraînement associés.
          </p>
        </div>

        {/* Lessons List in sequential order (Coursera Module Syllabus) */}
        <div className="space-y-4 max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
            Programme du chapitre dans l&apos;ordre pédagogique :
          </div>

          {chapter.lessons.map((lesson, idx) => (
            <div
              key={lesson.slug}
              className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#0056d2] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded bg-[#ebf3ff] text-[#0056d2] flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-blue-200">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {lesson.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 mt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{lesson.estimatedMinutes} min</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#cc0000] font-medium">
                      <Play className="w-3.5 h-3.5 fill-[#cc0000]" />
                      <span>Cours Vidéo</span>
                    </span>
                    {lesson.exercises.length > 0 && (
                      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lesson.exercises.length} exercices corrigés</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#0056d2] hover:bg-[#00419e] transition-colors shrink-0 shadow-xs"
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
