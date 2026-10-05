'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Minus,
  Sparkles,
  GraduationCap,
  Award,
  Video,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from '@/components/LanguageProvider';
import { LevelSelector } from '@/components/LevelSelector';
import { CourseCard } from '@/components/CourseCard';
import { VideoCard } from '@/components/VideoCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { MathView } from '@/components/MathView';
import { CURRICULUM_LEVELS, getAllLessons } from '@/data/curriculum';
import { YOUTUBE_VIDEOS } from '@/data/videos';

export default function HomePage() {
  const { t, isRtl } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Pick top chapters for showcase
  const smLevel = CURRICULUM_LEVELS.find((l) => l.id === '2eme-bac');
  const smBranch = smLevel?.branches.find((b) => b.id === 'sciences-maths');
  const pcBranch = smLevel?.branches.find((b) => b.id === 'sciences-physiques');
  
  const popularChapters = [
    ...(smBranch?.chapters.slice(0, 2) || []),
    ...(pcBranch?.chapters.slice(0, 1) || []),
  ];

  // Pick featured exercise
  const allLessons = getAllLessons();
  const sampleLesson = allLessons.find((l) => l.slug === 'continuite-et-tvi');
  const sampleExercise = sampleLesson?.exercises[0];

  const faqs = [
    {
      q: 'La plateforme et les vidéos sont-elles vraiment 100% gratuites ?',
      qAr: 'هل المنصة والفيديوهات مجانية حقاً بنسبة 100% ؟',
      a: 'Oui, l\'accès à l\'ensemble des cours écrits, résumés PDF, vidéos d\'explications YouTube et exercices corrigés est totalement gratuit et illimité. Aucun abonnement payant, aucun mur d\'inscription requis.',
      aAr: 'نعم، الولوج إلى كافة الدروس المكتوبة، ملخصات PDF، شروحات اليوتيوب والتمارين بحلولها مجاني ومتاح للجميع بدون أي تسجيل مسبق أو اشتراك مدفوع.'
    },
    {
      q: 'Le programme respecte-t-il les directives officielles du Maroc (BIOF & Général) ?',
      qAr: 'هل يطابق المحتوى التوجيهات الرسمية لوزارة التربية الوطنية بالمغرب ؟',
      a: 'Absolument. Tout le contenu est minutieusement conçu selon les orientations pédagogiques officielles du Ministère de l\'Éducation Nationale marocain pour le collège et le lycée (Option Français BIOF et Arabe).',
      aAr: 'نعم بكل تأكيد. تم إعداد جميع الدروس والتمارين وفق المنهاج والتوجيهات التربوية الرسمية لوزارة التربية الوطنية المغربية (خيار فرنسية BIOF والعام).'
    },
    {
      q: 'Comment réviser efficacement avec la chaîne YouTube ?',
      qAr: 'كيف أستفيد بأفضل شكل من شروحات اليوتيوب والمنصة معاً ؟',
      a: 'La méthode recommandée : 1. Regardez la vidéo du cours pour assimiler les concepts intuitifs. 2. Lisez la fiche de synthèse écrite pour retenir les définitions et formules. 3. Tentez de résoudre les exercices par vous-même avant d\'afficher l\'indice puis la correction pas à pas.',
      aAr: 'المنهجية الفعالة : 1. شاهد فيديو الدرس لاستيعاب المفاهيم. 2. راجع الملخص المكتوب لضبط القواعد والبراهين. 3. حاول إنجاز التمارين بنفسك قبل الكشف عن الإشارة التوجيهية وعناصر الإجابة.'
    },
    {
      q: 'Y a-t-il des sujets d\'Examens Nationaux et Régionaux avec corrigés ?',
      qAr: 'هل تتوفر نماذج للامتحانات الوطنية والجهوية مع عناصر الإجابة ؟',
      a: 'Oui. La section « Espace Bac » regroupe les annales officielles des examens nationaux (2022 à 2025) pour les filières Sciences Maths, PC et SVT, avec sujets originaux en PDF et corrections vidéo détaillées respectant le barème ministériel.',
      aAr: 'نعم. يضم قسم «فضاء الباك» نماذج الامتحانات الوطنية للسنوات الماضية مع نصوص المواضيع بصيغة PDF والتصحيح المفصل بالفيديو وسلم التنقيط الرسمي.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#090d16]">
      
      {/* 1. HERO SECTION : LUMINOUS, BRIGHT, INSPIRING */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 math-grid-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Institutional pill with live pulse */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Enseignement 100% Gratuit • Collège & Lycée Marocain</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                {t.hero.title1}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent italic font-serif">
                  {t.hero.titleHighlight}
                </span>{' '}
                <span className="block mt-2 text-2xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-200">
                  {t.hero.title2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/cours"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all hover:scale-102 group"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.hero.primaryCta}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center -mr-1">
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                  </div>
                </Link>

                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all hover:scale-102"
                >
                  <Youtube className="w-4 h-4 fill-red-600" />
                  <span>{t.hero.secondaryCta}</span>
                  <span className="ml-1 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {SITE_CONFIG.youtube.subscribersCount}
                  </span>
                </a>
              </div>

              {/* Metrics strip with soft visual depth */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-6 max-w-md">
                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {SITE_CONFIG.youtube.totalVideosCount}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.hero.statsVideos}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.hero.statsStudents}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {t.hero.statsFree}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card : Interactive & Luminous Educational Facade */}
            <div className="lg:col-span-5">
              <div className="p-2 rounded-3xl bg-gradient-to-b from-blue-100/60 via-slate-100/40 to-slate-200/40 dark:from-blue-950/40 dark:to-slate-900/60 border border-blue-200/50 dark:border-blue-900/40 shadow-xl">
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 border border-slate-100 dark:border-slate-800">
                  
                  {/* Professor Header Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-blue-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={SITE_CONFIG.professor.portraitUrl}
                          alt={SITE_CONFIG.professor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                            {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
                          </span>
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60">
                      BIOF 2026
                    </span>
                  </div>

                  {/* Video Facade */}
                  <div
                    onClick={() => window.open(`https://youtube.com/watch?v=${SITE_CONFIG.youtube.defaultVideoId}`, '_blank')}
                    className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 select-none group cursor-pointer shadow-sm border border-slate-200/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${SITE_CONFIG.youtube.defaultVideoId}/maxresdefault.jpg`}
                      alt="Explication Mathématique"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-lg bg-slate-950/80 backdrop-blur-xs text-white text-[11px] flex items-center justify-between">
                      <span className="font-medium truncate">Continuité & TVI — Démonstration Complète</span>
                      <span className="font-mono text-slate-300 text-[10px]">48:15</span>
                    </div>
                  </div>

                  {/* Math Formula Callout */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs">
                    <div className="text-[11px] font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Théorème Fondamental au Bac :</span>
                    </div>
                    <div className="overflow-x-auto text-center font-serif py-1 text-slate-900 dark:text-slate-100 font-bold">
                      <MathView math="f(a) \cdot f(b) < 0 \implies \exists c \in ]a, b[, \; f(c) = 0" inline={true} />
                    </div>
                  </div>

                  {/* Quick features footer */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Fiche PDF disponible</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>2 Exercices corrigés</span>
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK LEVEL SELECTOR */}
      <LevelSelector />

      {/* 3. POPULAR COURSES & CHAPTERS */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                Curriculum Structuré
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t.courses.title}
              </h2>
            </div>

            <Link
              href="/cours"
              className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline inline-flex items-center gap-1.5"
            >
              <span>{t.courses.allCourses}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularChapters.map((chapter) => (
              <CourseCard
                key={chapter.slug}
                chapter={chapter}
                levelId={chapter.levelId}
                branchId={chapter.branchId}
                branchName={chapter.branchId === 'sciences-maths' ? '2 Bac Sciences Maths' : '2 Bac PC & SVT'}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. BAC REVISION HUB : LUMINOUS SAPPHIRE SPOTLIGHT */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Award className="w-3.5 h-3.5" />
                <span>{t.bac.badge}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                {t.bac.title}
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xl">
                {t.bac.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-semibold text-sm mb-1 flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Annales 2022 à 2025</span>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Sujets originaux du Ministère avec correction pas à pas et barème officiel.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="font-semibold text-sm mb-1 flex items-center gap-2 text-white">
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>Formulaire Mathématique</span>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Synthèse de toutes les formules de limites, dérivées, primitives et complexes.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/bac"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-blue-50 transition-colors shadow-md"
                >
                  Accéder à l&apos;Espace Bac 2026
                </Link>
                <Link
                  href="/bac#formulaire"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  Consulter le formulaire officiel
                </Link>
              </div>
            </div>

            {/* Right formula box with frosted glass */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 space-y-3 font-mono text-xs shadow-2xl">
                <div className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold border-b border-white/15 pb-2 flex items-center justify-between">
                  <span>Formules Clés au Baccalauréat</span>
                  <span className="text-amber-300 font-bold">100% Retenir</span>
                </div>
                <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                  <span className="text-blue-200 text-[10px] block mb-1">Croissances comparées Exp :</span>
                  <div className="text-center text-white font-bold py-1">
                    <MathView math="\lim_{x \to +\infty} \frac{e^x}{x^n} = +\infty" inline={true} />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                  <span className="text-blue-200 text-[10px] block mb-1">Formule Intégration par parties :</span>
                  <div className="text-center text-white font-bold py-1">
                    <MathView math="\int_a^b u v' = [u v]_a^b - \int_a^b u' v" inline={true} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST YOUTUBE LESSONS */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
                Vidéothèque YouTube
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t.videos.title}
              </h2>
            </div>

            <Link
              href="/videos"
              className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline inline-flex items-center gap-1.5"
            >
              <span>{t.videos.allVideos}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {YOUTUBE_VIDEOS.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. SAMPLE INTERACTIVE EXERCISE */}
      {sampleExercise && (
        <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 block mb-1">
                Pédagogie Active & Démarche de Recherche
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t.exercises.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.exercises.subtitle}
              </p>
            </div>

            <ExerciseCard exercise={sampleExercise} />

            <div className="text-center pt-2">
              <Link
                href="/exercices"
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Accéder à l&apos;ensemble de la banque d&apos;exercices</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. METHODOLOGY (4 STEPS) */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              Méthodologie
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              La Démarche d&apos;Apprentissage Autonome
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Choisis ton niveau',
                desc: 'Accède au chapitre précis qui correspond à ton cours en classe.',
                badge: 'Ciblé',
              },
              {
                step: '02',
                title: 'Assimile la notion',
                desc: 'Une vidéo claire qui démontre les propriétés et décortique les pièges.',
                badge: 'Vidéo HD',
              },
              {
                step: '03',
                title: 'Retiens l\'essentiel',
                desc: 'La fiche de synthèse avec les définitions et théorèmes officiels.',
                badge: 'Fiche PDF',
              },
              {
                step: '04',
                title: 'Entraîne-toi pas à pas',
                desc: 'Résous les exercices progressifs avec indices et corrigés détaillés.',
                badge: 'Barème Officiel',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROFESSOR MANIFESTO */}
      <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              Engagement pour l&apos;Éducation Publique
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.about.title}
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <blockquote className="font-serif italic text-base sm:text-xl text-slate-800 dark:text-slate-200 leading-relaxed">
              « {isRtl ? SITE_CONFIG.professor.quoteAr : SITE_CONFIG.professor.quote} »
            </blockquote>
            <div className="mt-5 pt-4 border-t border-blue-200/60 dark:border-blue-900/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
              </span>
              <span>{isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.missionText}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/a-propos"
              className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>En savoir plus sur la démarche pédagogique</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION (MINIMAL ACCORDION) */}
      <section className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Questions Fréquentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Foire Aux Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{isRtl ? faq.qAr : faq.q}</span>
                    <span className="p-1 rounded text-slate-400 ml-4 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-2.5 pr-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-fadeIn">
                      {isRtl ? faq.aAr : faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
