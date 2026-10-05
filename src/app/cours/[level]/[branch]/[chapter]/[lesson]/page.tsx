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
  Share2,
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
    <article className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-6 sm:py-10 transition-colors">
      <LessonJsonLd lesson={lesson} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
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
        <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              {branch.shortName}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {chapter.title}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium ml-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>~{lesson.estimatedMinutes} min de lecture & vidéo</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.summary}
          </p>

          {/* Download & Share Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            {lesson.downloadableResource && (
              <a
                href={lesson.downloadableResource.fileUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{lesson.downloadableResource.title}</span>
              </a>
            )}

            <div className="flex items-center gap-2 ml-auto text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Conforme aux normes du Ministère</span>
            </div>
          </div>
        </header>

        {/* 2. LEARNING OBJECTIVES */}
        {lesson.objectives.length > 0 && (
          <section className="p-5 sm:p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Objectifs Pédagogiques Clés</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. EMBEDDED YOUTUBE LESSON PLAYER (FACADE) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Cours Vidéo Magistral (YouTube)</span>
            </h2>
            {lesson.youtubePlaylistId && (
              <a
                href={`https://youtube.com/playlist?list=${lesson.youtubePlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Voir la playlist complète</span>
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
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="font-serif font-black text-indigo-600 dark:text-indigo-400">∑</span>
              <span>Formules et Propriétés Fondamentales</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyFormulas.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-2"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.name}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center overflow-x-auto">
                    <MathView math={item.latex} inline={false} />
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Définitions et Théorèmes Réglementaires
            </h2>
            <div className="space-y-4">
              {lesson.definitions.map((def, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border-l-4 border-indigo-600 border-y border-r border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {def.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <TextWithMath text={def.content} />
                  </p>
                  {def.latex && (
                    <div className="mt-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl text-center overflow-x-auto">
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
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Exemples d&apos;Application Rédigés (Modèles d&apos;Examen)</span>
            </h2>

            <div className="space-y-6">
              {lesson.workedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                >
                  {/* Statement */}
                  <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
                      {ex.title}
                    </h3>
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <TextWithMath text={ex.statement} />
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Rédaction pas à pas conforme au barème :</span>
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      <TextWithMath text={ex.solution} />
                    </div>
                    {ex.methodologyTip && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                        <span className="font-bold">Conseil de rédaction : </span>
                        {ex.methodologyTip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. COMMON MISTAKES TO AVOID */}
        {lesson.commonMistakes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Les Pièges Classiques à Éviter le Jour de l&apos;Examen</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.commonMistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-5 space-y-3"
                >
                  <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                    ❌ {m.title}
                  </h3>
                  
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-semibold text-rose-700 dark:text-rose-300">Erreur fréquente : </span>
                      <TextWithMath text={m.mistake} />
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">Bonne rédaction : </span>
                      <TextWithMath text={m.correction} />
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 italic pt-1">
                      Pourquoi : {m.why}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. PROFESSOR PRO-TIP IN DARIJA / ARABIC */}
        {lesson.proTipDarija && (
          <section className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                نصيحة الأستاذ عمر العلمي (Conseil Examen)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" dir="rtl">
                {lesson.proTipDarija}
              </p>
            </div>
          </section>
        )}

        {/* 9. PRACTICE EXERCISES WITH INTERACTIVE HINTS & SOLUTIONS */}
        {lesson.exercises.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Entraînement Progressif</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Exercices d&apos;Application et d&apos;Approfondissement
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Cherche la solution avant de cliquer sur l&apos;indice ou la correction !
              </p>
            </div>

            <div className="space-y-6">
              {lesson.exercises.map((exo) => (
                <ExerciseCard key={exo.id} exercise={exo} showLessonLink={false} />
              ))}
            </div>
          </section>
        )}

        {/* 10. PREVIOUS / NEXT LESSON NAVIGATION */}
        <nav aria-label="Navigation entre leçons" className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/cours/${prevLesson.levelId}/${prevLesson.branchId}/${prevLesson.chapterSlug}/${prevLesson.slug}`}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors group flex items-center gap-3 text-left"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Leçon précédente
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
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
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors group flex items-center justify-between text-right"
            >
              <div className="ml-auto">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Leçon suivante
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {nextLesson.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:translate-x-1 transition-transform ml-3" />
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 11. SUBSCRIBE TO YOUTUBE CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold">
              Tu as apprécié cette leçon ?
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-lg">
              Abonne-toi à la chaîne pour recevoir les notifications lors de la publication des nouvelles leçons et des lives de révision.
            </p>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white text-red-600 hover:bg-slate-100 transition-colors shadow-md shrink-0"
          >
            <Youtube className="w-4 h-4 fill-red-600" />
            <span>S&apos;abonner sur YouTube</span>
          </a>
        </div>

      </div>
    </article>
  );
}
