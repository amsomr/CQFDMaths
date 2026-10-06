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
  Award,
  Sparkles,
  ShieldCheck
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
    <article className="min-h-screen py-8 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      <LessonJsonLd lesson={lesson} />

      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-25 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
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

        {/* 1. LESSON HEADER & METADATA (Textbook Title Page) */}
        <header className="space-y-5 border-b border-[#0F172A]/10 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/20">
              {branch.shortName}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-[6px] bg-white text-[#475569] border border-[#0F172A]/10 shadow-2xs">
              {chapter.title}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-[#64748B] ml-auto">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>~{lesson.estimatedMinutes} min de lecture & pratique</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {lesson.summary}
          </p>

          {/* Download & Standards Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            {lesson.downloadableResource && (
              <a
                href={lesson.downloadableResource.fileUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold bg-[#1D4ED8]/10 hover:bg-[#1D4ED8]/15 text-[#1D4ED8] border border-[#1D4ED8]/25 transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>{lesson.downloadableResource.title} (PDF)</span>
              </a>
            )}

            <div className="flex items-center gap-2 ml-auto text-xs font-semibold text-[#1D4ED8] bg-[#1D4ED8]/10 px-3 py-1.5 rounded-[6px] border border-[#1D4ED8]/20">
              <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
              <span>Programme Marocain</span>
            </div>
          </div>
        </header>

        {/* 2. LEARNING OBJECTIVES */}
        {lesson.objectives.length > 0 && (
          <section className="p-6 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
              <span>Objectifs Pédagogiques Clés</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#475569]">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. EMBEDDED YOUTUBE LESSON PLAYER */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2.5">
              <Youtube className="w-6 h-6 fill-[#CC0000]" />
              <span>Explication Vidéo Magistrale</span>
            </h2>
            {lesson.youtubePlaylistId && (
              <a
                href={`https://youtube.com/playlist?list=${lesson.youtubePlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1D4ED8] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Playlist complète du chapitre</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="rounded-[16px] overflow-hidden border border-[#0F172A]/15 shadow-md bg-white">
            <YouTubeFacade
              videoId={lesson.youtubeVideoId}
              title={lesson.title}
              showSubscribeBadge={true}
            />
          </div>
        </section>

        {/* 4. ESSENTIAL FORMULAS (KATEX) */}
        {lesson.keyFormulas.length > 0 && (
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#1D4ED8]" />
              <span>Formules & Résultats Fondamentaux</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lesson.keyFormulas.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] border border-[#0F172A]/10 bg-white p-5 shadow-2xs space-y-3"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                    {item.name}
                  </div>
                  <div className="bg-[#FAF9F5] p-4 rounded-[8px] border border-[#0F172A]/10 text-center overflow-x-auto">
                    <MathView math={item.latex} inline={false} />
                  </div>
                  {item.description && (
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. DEFINITIONS AND THEOREMS (Textbook Box Styling) */}
        {lesson.definitions.length > 0 && (
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              Définitions & Théorèmes Officiels
            </h2>
            <div className="space-y-4">
              {lesson.definitions.map((def, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[12px] bg-white border-l-4 border-l-[#1D4ED8] border-y border-r border-[#0F172A]/10 space-y-3 shadow-2xs"
                >
                  <h3 className="text-base font-bold text-[#0F172A] flex items-center justify-between">
                    <span>{def.title}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1D4ED8]/10 text-[#1D4ED8]">
                      Théorème
                    </span>
                  </h3>
                  <div className="text-sm text-[#334155] leading-relaxed">
                    <TextWithMath text={def.content} />
                  </div>
                  {def.latex && (
                    <div className="mt-2 bg-[#FAF9F5] p-4 rounded-[8px] text-center overflow-x-auto border border-[#0F172A]/10">
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
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1D4ED8]" />
              <span>Modèles de Rédaction Type pour le Bac</span>
            </h2>

            <div className="space-y-5">
              {lesson.workedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] border border-[#0F172A]/10 bg-white overflow-hidden shadow-2xs"
                >
                  {/* Statement */}
                  <div className="p-5 bg-[#F8FAFC] border-b border-[#0F172A]/10 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                      Énoncé d&apos;application
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {ex.title}
                    </h3>
                    <div className="text-sm text-[#334155] leading-relaxed pt-1">
                      <TextWithMath text={ex.statement} />
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="p-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Rédaction pas à pas conforme au barème ministériel :</span>
                    </div>
                    <div className="text-sm text-[#1E293B] leading-relaxed whitespace-pre-line bg-[#FAF9F5] p-4 rounded-[8px] border border-[#0F172A]/10">
                      <TextWithMath text={ex.solution} />
                    </div>
                    {ex.methodologyTip && (
                      <div className="mt-3 p-4 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Conseil de l&apos;examinateur : </span>
                          <span>{ex.methodologyTip}</span>
                        </div>
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
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#B91C1C] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#B91C1C]" />
              <span>Pièges Fréquents & Vigilance le Jour du Bac</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lesson.commonMistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] border border-[#FCA5A5]/60 bg-white p-5 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 pb-2 border-b border-[#FCA5A5]/30">
                    <span className="w-6 h-6 rounded-[6px] bg-[#FEF2F2] text-[#B91C1C] flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-[#991B1B]">
                      {m.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 text-xs text-[#334155]">
                    <div className="p-2.5 rounded-[6px] bg-[#FEF2F2] border border-[#FCA5A5]/40 text-[#991B1B]">
                      <span className="font-bold">Erreur classique : </span>
                      <TextWithMath text={m.mistake} />
                    </div>
                    <div className="p-2.5 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534]">
                      <span className="font-bold">Rédaction correcte : </span>
                      <TextWithMath text={m.correction} />
                    </div>
                    <div className="text-[#64748B] italic pt-1 text-[11px]">
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
          <section className="p-6 rounded-[12px] bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-[8px] bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE68A]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#92400E] flex items-center gap-2">
                <span>نصيحة الأستاذ عمر العلمي</span>
                <span className="text-xs font-normal text-[#B45309]">(Conseil d&apos;Examen)</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#78350F] font-arabic" dir="rtl">
                {lesson.proTipDarija}
              </p>
            </div>
          </section>
        )}

        {/* 9. PRACTICE EXERCISES WITH INTERACTIVE HINTS & SOLUTIONS */}
        {lesson.exercises.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#0F172A]/10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-1">
                Entraînement Pratique
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Exercices d&apos;Application et d&apos;Approfondissement
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Résolvez le problème sur une feuille de brouillon avant d&apos;ouvrir l&apos;indice ou la correction rédigée.
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
        <nav aria-label="Navigation entre leçons" className="pt-8 border-t border-[#0F172A]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/cours/${prevLesson.levelId}/${prevLesson.branchId}/${prevLesson.chapterSlug}/${prevLesson.slug}`}
              className="p-5 rounded-[12px] border border-[#0F172A]/10 bg-white hover:border-[#1D4ED8] transition-all group flex items-center gap-3 text-left shadow-2xs hover:shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#1D4ED8] group-hover:-translate-x-1 transition-transform shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                  Leçon précédente
                </span>
                <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#1D4ED8] line-clamp-1">
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
              className="p-5 rounded-[12px] border border-[#0F172A]/10 bg-white hover:border-[#1D4ED8] transition-all group flex items-center justify-between text-right shadow-2xs hover:shadow-xs"
            >
              <div className="ml-auto">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                  Leçon suivante
                </span>
                <span className="text-sm font-bold text-[#0F172A] group-hover:text-[#1D4ED8] line-clamp-1">
                  {nextLesson.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#1D4ED8] group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 11. SUBSCRIBE TO YOUTUBE CTA */}
        <div className="rounded-[16px] bg-[#0A192F] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 math-grid-bg opacity-10 pointer-events-none" />
          <div className="relative space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Vous préparez vos examens ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              Abonnez-vous à la chaîne officielle de Prof. Omar Alami pour ne manquer aucun direct de révision et recevoir les corrigés des annales nationales.
            </p>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-xs sm:text-sm font-bold bg-[#CC0000] text-white hover:bg-[#b00000] transition-colors shrink-0 shadow-sm"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>S&apos;abonner sur YouTube</span>
          </a>
        </div>

      </div>
    </article>
  );
}
