import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  CURRICULUM_LEVELS, 
  getLevelById, 
  getAllLessons, 
  getLessonBySlug 
} from '@/data/curriculum';
import { Breadcrumb } from '@/components/Breadcrumb';
import { MathView, TextWithMath } from '@/components/MathView';
import { YouTubeFacade } from '@/components/YouTubeFacade';
import { ExerciseCard } from '@/components/ExerciseCard';
import { LessonJsonLd } from '@/components/JsonLd';
import { SITE_CONFIG } from '@/data/site-config';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  FileText,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';

interface LessonPageProps {
  params: Promise<{
    level: string;
    branch: string;
    chapter: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((l) => ({
    level: l.levelId,
    branch: l.branchId,
    chapter: l.chapterSlug,
    lesson: l.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { lesson: lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) return { title: 'Leçon Introuvable' };

  return {
    title: `${lesson.title} — Cours, Résumé et Exercices Corrigés | Maths Maroc`,
    description: `${lesson.summary.slice(0, 160)}... Cours 100% gratuit de mathématiques avec vidéo YouTube et fiches d'exercices.`,
    keywords: lesson.seoKeywords.join(', '),
    openGraph: {
      title: `${lesson.title} — Maths Maroc`,
      description: lesson.summary,
      type: 'article',
      images: [
        {
          url: `https://img.youtube.com/vi/${lesson.youtubeVideoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: lesson.title,
        },
      ],
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { level: levelId, branch: branchId, chapter: chapterSlug, lesson: lessonSlug } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  const chapter = branch?.chapters.find((c) => c.slug === chapterSlug);
  const lesson = chapter?.lessons.find((l) => l.slug === lessonSlug);

  if (!level || !branch || !chapter || !lesson) notFound();

  // Find previous and next lessons
  const prevLesson = lesson.previousLessonSlug ? getLessonBySlug(lesson.previousLessonSlug) : null;
  const nextLesson = lesson.nextLessonSlug ? getLessonBySlug(lesson.nextLessonSlug) : null;

  return (
    <article className="min-h-screen py-6 sm:py-10 transition-colors">
      <LessonJsonLd lesson={lesson} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { name: 'Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
            { name: lesson.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}/${lesson.slug}` },
          ]}
        />

        {/* 1. LESSON HEADER & METADATA */}
        <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
              {branch.shortName}
            </span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              {chapter.title}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-stone-500 dark:text-stone-400 ml-auto">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>~{lesson.estimatedMinutes} min</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
            {lesson.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
            {lesson.summary}
          </p>

          {/* Download & Standards Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            {lesson.downloadableResource && (
              <a
                href={lesson.downloadableResource.fileUrl}
                download
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                <span>{lesson.downloadableResource.title}</span>
              </a>
            )}

            <div className="flex items-center gap-2 ml-auto font-mono text-xs text-stone-500 dark:text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Cadre de référence officiel marocain</span>
            </div>
          </div>
        </header>

        {/* 2. LEARNING OBJECTIVES */}
        {lesson.objectives.length > 0 && (
          <section className="p-5 sm:p-6 rounded-xl bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-stone-500" />
              <span>Objectifs Pédagogiques Clés</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. EMBEDDED YOUTUBE LESSON PLAYER (FACADE) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Youtube className="w-4 h-4 fill-red-600" />
              <span>Cours Vidéo Magistral</span>
            </h2>
            {lesson.youtubePlaylistId && (
              <a
                href={`https://youtube.com/playlist?list=${lesson.youtubePlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline underline-offset-2 flex items-center gap-1 font-medium"
              >
                <span>Voir la playlist du chapitre</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <YouTubeFacade
            videoId={lesson.youtubeVideoId}
            title={lesson.title}
            showSubscribeBadge={true}
          />
        </section>

        {/* 4. ESSENTIAL FORMULAS (KATEX) */}
        {lesson.keyFormulas.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="font-serif text-stone-500">∑</span>
              <span>Propriétés & Formules Fondamentales</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyFormulas.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-2"
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 font-semibold">
                    {item.name}
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-lg border border-stone-200/80 dark:border-stone-800 text-center overflow-x-auto">
                    <MathView math={item.latex} inline={false} />
                  </div>
                  {item.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. DEFINITIONS AND THEOREMS */}
        {lesson.definitions.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100">
              Définitions et Théorèmes Réglementaires
            </h2>
            <div className="space-y-3">
              {lesson.definitions.map((def, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-white dark:bg-stone-900 border-l-2 border-stone-900 dark:border-stone-100 border-y border-r border-stone-200 dark:border-stone-800 space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                    {def.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    <TextWithMath text={def.content} />
                  </div>
                  {def.latex && (
                    <div className="mt-2 bg-stone-50 dark:bg-stone-950 p-2.5 rounded-md text-center overflow-x-auto border border-stone-200/60 dark:border-stone-800">
                      <MathView math={def.latex} inline={false} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. WORKED EXAMPLES */}
        {lesson.workedExamples.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-500" />
              <span>Exemples d&apos;Application Rédigés (Modèles de Rédaction)</span>
            </h2>

            <div className="space-y-4">
              {lesson.workedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  {/* Statement */}
                  <div className="p-4 sm:p-5 bg-stone-50/70 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800">
                    <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 mb-1.5">
                      {ex.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                      <TextWithMath text={ex.statement} />
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-500" />
                      <span>Rédaction pas à pas conforme au barème :</span>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line font-sans">
                      <TextWithMath text={ex.solution} />
                    </div>
                    {ex.methodologyTip && (
                      <div className="mt-3 p-3 rounded-lg bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300">
                        <span className="font-mono font-semibold uppercase tracking-wider text-[11px] block mb-0.5">Conseil de rédaction :</span>
                        {ex.methodologyTip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. COMMON MISTAKES TO AVOID (NO EMOJIS) */}
        {lesson.commonMistakes.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-stone-500" />
              <span>Points de Vigilance & Pièges Fréquents le Jour du Bac</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.commonMistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                    </span>
                    <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                      {m.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 font-sans">
                    <div>
                      <span className="font-semibold text-stone-900 dark:text-stone-200">Erreur classique : </span>
                      <TextWithMath text={m.mistake} />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-900 dark:text-stone-200">Rédaction correcte : </span>
                      <TextWithMath text={m.correction} />
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 italic pt-1 border-t border-stone-100 dark:border-stone-800">
                      Justification : {m.why}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. PROFESSOR PRO-TIP IN DARIJA / ARABIC */}
        {lesson.proTipDarija && (
          <section className="p-5 sm:p-6 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex items-start gap-4">
            <div className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                نصيحة الأستاذ عمر العلمي (Conseil d&apos;Examen)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-sans" dir="rtl">
                {lesson.proTipDarija}
              </p>
            </div>
          </section>
        )}

        {/* 9. PRACTICE EXERCISES WITH INTERACTIVE HINTS & SOLUTIONS */}
        {lesson.exercises.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Entraînement Progressif
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">
                Exercices d&apos;Application et d&apos;Approfondissement
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-sans">
                Résous le problème par écrit avant de consulter l&apos;indice ou le corrigé officiel.
              </p>
            </div>

            <div className="space-y-4">
              {lesson.exercises.map((exo) => (
                <ExerciseCard key={exo.id} exercise={exo} showLessonLink={false} />
              ))}
            </div>
          </section>
        )}

        {/* 10. PREVIOUS / NEXT LESSON NAVIGATION */}
        <nav aria-label="Navigation entre leçons" className="pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/cours/${prevLesson.levelId}/${prevLesson.branchId}/${prevLesson.chapterSlug}/${prevLesson.slug}`}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-600 transition-colors group flex items-center gap-3 text-left"
            >
              <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:-translate-x-1 transition-transform shrink-0" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block">
                  Leçon précédente
                </span>
                <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                  {prevLesson.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/cours/${nextLesson.levelId}/${nextLesson.branchId}/${nextLesson.chapterSlug}/${nextLesson.slug}`}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-600 transition-colors group flex items-center justify-between text-right"
            >
              <div className="ml-auto">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block">
                  Leçon suivante
                </span>
                <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                  {nextLesson.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 11. SUBSCRIBE TO YOUTUBE CTA */}
        <div className="rounded-xl border border-stone-800 bg-[#1c1917] text-stone-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
              Tu as apprécié cette leçon ?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg font-sans">
              Rejoins la communauté YouTube pour ne rater aucun corrigé d&apos;examen ni les séances de révision en direct.
            </p>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-white text-stone-950 hover:bg-stone-100 transition-colors shrink-0"
          >
            <Youtube className="w-4 h-4 fill-red-600" />
            <span>S&apos;abonner sur YouTube</span>
          </a>
        </div>

      </div>
    </article>
  );
}
