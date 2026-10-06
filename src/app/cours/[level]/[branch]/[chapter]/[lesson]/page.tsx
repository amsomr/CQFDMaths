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
  ExternalLink,
  Award
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
    title: `${lesson.title} — Cours Officiel & Exercices Corrigés | Maths Maroc`,
    description: `${lesson.summary.slice(0, 160)}... Cours 100% gratuit de mathématiques conforme au cadre de référence officiel avec vidéo YouTube et fiches d'exercices.`,
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
    <article className="min-h-screen py-6 sm:py-10 bg-white dark:bg-slate-950 font-sans">
      <LessonJsonLd lesson={lesson} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
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

        {/* 1. LESSON HEADER & METADATA (Coursera Lecture Header) */}
        <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[#0056d2] dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {branch.shortName}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {chapter.title}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-slate-500 dark:text-slate-400 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>~{lesson.estimatedMinutes} min de cours</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {lesson.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.summary}
          </p>

          {/* Download & Standards Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            {lesson.downloadableResource && (
              <a
                href={lesson.downloadableResource.fileUrl}
                download
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-[#ebf3ff] hover:bg-[#dbeafe] text-[#0056d2] border border-blue-200 dark:border-blue-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{lesson.downloadableResource.title}</span>
              </a>
            )}

            <div className="flex items-center gap-2 ml-auto text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Conforme au Cadre de Référence Officiel</span>
            </div>
          </div>
        </header>

        {/* 2. LEARNING OBJECTIVES */}
        {lesson.objectives.length > 0 && (
          <section className="p-5 rounded-md bg-[#f8fafc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0056d2]" />
              <span>Objectifs Pédagogiques Clés</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
              <Youtube className="w-5 h-5 fill-[#cc0000]" />
              <span>Cours Vidéo Magistral (YouTube)</span>
            </h2>
            {lesson.youtubePlaylistId && (
              <a
                href={`https://youtube.com/playlist?list=${lesson.youtubePlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0056d2] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Voir la playlist du chapitre</span>
                <ExternalLink className="w-3.5 h-3.5" />
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
              <Award className="w-5 h-5 text-[#0056d2]" />
              <span>Propriétés & Formules Fondamentales</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyFormulas.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-2"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0056d2]">
                    {item.name}
                  </div>
                  <div className="bg-[#f8fafc] dark:bg-slate-950 p-3.5 rounded border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
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
            <div className="space-y-3.5">
              {lesson.definitions.map((def, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-md bg-[#f8fafc] dark:bg-slate-900 border-l-4 border-[#0056d2] border-y border-r border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {def.title}
                  </h3>
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <TextWithMath text={def.content} />
                  </div>
                  {def.latex && (
                    <div className="mt-2 bg-white dark:bg-slate-950 p-3 rounded text-center overflow-x-auto border border-slate-200 dark:border-slate-800">
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
              <FileText className="w-5 h-5 text-[#0056d2]" />
              <span>Exemples d&apos;Application Rédigés (Modèles de Rédaction)</span>
            </h2>

            <div className="space-y-4">
              {lesson.workedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                >
                  {/* Statement */}
                  <div className="p-4 sm:p-5 bg-[#f8fafc] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                      {ex.title}
                    </h3>
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <TextWithMath text={ex.statement} />
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="p-5 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Rédaction pas à pas conforme au barème :</span>
                    </div>
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                      <TextWithMath text={ex.solution} />
                    </div>
                    {ex.methodologyTip && (
                      <div className="mt-3 p-3.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
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

        {/* 7. COMMON MISTAKES TO AVOID (NO EMOJIS) */}
        {lesson.commonMistakes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Points de Vigilance & Pièges Fréquents le Jour du Bac</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.commonMistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-5 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                      {m.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-semibold text-rose-700 dark:text-rose-300">Erreur classique : </span>
                      <TextWithMath text={m.mistake} />
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">Rédaction correcte : </span>
                      <TextWithMath text={m.correction} />
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 italic pt-1 border-t border-rose-200/50 dark:border-rose-900/30">
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
          <section className="p-5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-900/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                نصيحة الأستاذ عمر العلمي (Conseil d&apos;Examen)
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
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0056d2] mb-1">
                Entraînement Pratique
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Exercices d&apos;Application et d&apos;Approfondissement
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Résolvez le problème par écrit avant de consulter l&apos;indice ou le corrigé officiel.
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
        <nav aria-label="Navigation entre leçons" className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/cours/${prevLesson.levelId}/${prevLesson.branchId}/${prevLesson.chapterSlug}/${prevLesson.slug}`}
              className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#0056d2] transition-colors group flex items-center gap-3 text-left shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#0056d2] group-hover:-translate-x-1 transition-transform shrink-0" />
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
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
              className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#0056d2] transition-colors group flex items-center justify-between text-right shadow-xs"
            >
              <div className="ml-auto">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Leçon suivante
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {nextLesson.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0056d2] group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 11. SUBSCRIBE TO YOUTUBE CTA (Coursera Specialization Banner) */}
        <div className="rounded-md bg-[#002661] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Vous progressez avec cette leçon ?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-lg">
              Abonnez-vous à la chaîne officielle pour être notifié des prochains corrigés d&apos;examens et des séances de révision en direct.
            </p>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold bg-[#cc0000] text-white hover:bg-[#b00000] transition-colors shrink-0 shadow-sm"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>S&apos;abonner sur YouTube</span>
          </a>
        </div>

      </div>
    </article>
  );
}
