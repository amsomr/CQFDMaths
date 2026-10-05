'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  FileText, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  Compass,
  Calculator,
  Award
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from '@/components/LanguageProvider';
import { LevelSelector } from '@/components/LevelSelector';
import { CourseCard } from '@/components/CourseCard';
import { VideoCard } from '@/components/VideoCard';
import { ExerciseCard } from '@/components/ExerciseCard';
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
      a: 'Oui ! La section "Espace Bac" regroupe les annales officielles des examens nationaux (2022 à 2025) pour les filières Sciences Maths, PC et SVT, avec sujets originaux en PDF et corrections vidéo détaillées respectant le barème ministériel.',
      aAr: 'نعم ! يضم قسم «فضاء الباك» نماذج الامتحانات الوطنية للسنوات الماضية مع نصوص المواضيع بصيغة PDF والتصحيح المفصل بالفيديو وسلم التنقيط الرسمي.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        
        {/* Subtle Mathematical Background Motifs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.035] dark:opacity-[0.05] text-slate-900 dark:text-white">
          <div className="absolute -top-10 left-10 text-9xl font-serif">∫</div>
          <div className="absolute top-20 right-20 text-8xl font-serif">lim</div>
          <div className="absolute top-1/2 left-1/4 text-9xl font-serif">∑</div>
          <div className="absolute bottom-10 right-1/3 text-8xl font-serif">√x</div>
          <div className="absolute -bottom-10 left-1/2 text-9xl font-serif">π</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {t.hero.title1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-300">
                  {t.hero.titleHighlight}
                </span>{' '}
                <span className="block mt-1 sm:mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300">
                  {t.hero.title2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/cours"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 group"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>

                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
                >
                  <Youtube className="w-5 h-5 text-red-600 fill-red-600" />
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>

              {/* Metrics Pill Grid */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {SITE_CONFIG.youtube.totalVideosCount}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.hero.statsVideos}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.hero.statsStudents}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.hero.statsFree}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Video / Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000" />
                
                <div className="relative rounded-3xl bg-white dark:bg-slate-900 p-3 sm:p-4 shadow-2xl border border-slate-200/80 dark:border-slate-800">
                  {/* Video Thumbnail Facade */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 select-none group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${SITE_CONFIG.youtube.defaultVideoId}/maxresdefault.jpg`}
                      alt="Explication Mathématique Gratuite"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />

                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-white text-xs bg-slate-950/70 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <span className="font-semibold block text-sm">Continuité & TVI — 2ème Bac</span>
                      <span className="text-slate-300">Vidéo recommandée pour réviser le Bac</span>
                    </div>
                  </div>

                  {/* Professor quote card under video */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-serif font-black text-lg">
                      ∑
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}
                      </div>
                    </div>
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
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60 mb-2">
                <Compass className="w-4 h-4" />
                <span>Programme Officiel 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.courses.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                {t.courses.subtitle}
              </p>
            </div>

            <Link
              href="/cours"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 group"
            >
              <span>{t.courses.allCourses}</span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          {/* Cards Grid */}
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

      {/* 4. BAC REVISION HUB SPOTLIGHT */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                {t.bac.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.bac.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.bac.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Annales 2022 à 2025</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sujets officiels avec correction pas à pas et barème ministériel.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Formulaire Mathématique</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Toutes les formules de limites, dérivées, intégrales et complexes.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/bac"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-lg"
                >
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span>Accéder à l&apos;Espace Bac 2026</span>
                </Link>

                <Link
                  href="/bac#formulaire"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                >
                  <span>Voir le formulaire essentiel</span>
                </Link>
              </div>
            </div>

            {/* Right Card : Quick Cheat Sheet Card Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur-md shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Formules Clefs Examen National
                  </span>
                  <span className="text-xs text-slate-400">2ème Bac</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 mb-1 font-sans">Croissances comparées Exp :</div>
                    <div className="text-amber-300 text-center font-bold">lim (x → +∞) e^x / x^n = +∞</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 mb-1 font-sans">Formule IPP :</div>
                    <div className="text-emerald-300 text-center font-bold">∫ u v&apos; = [u v] - ∫ u&apos; v</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 mb-1 font-sans">Théorème de Moivre :</div>
                    <div className="text-sky-300 text-center font-bold">(cos θ + i sin θ)^n = cos(nθ) + i sin(nθ)</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST YOUTUBE LESSONS */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200/60 dark:border-red-800/60 mb-2">
                <Youtube className="w-4 h-4 fill-red-600" />
                <span>Chaîne YouTube Officielle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.videos.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                {t.videos.subtitle}
              </p>
            </div>

            <Link
              href="/videos"
              className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 group"
            >
              <span>{t.videos.allVideos}</span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {YOUTUBE_VIDEOS.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. SAMPLE INTERACTIVE EXERCISE SPOTLIGHT */}
      {sampleExercise && (
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <Calculator className="w-4 h-4" />
                <span>Pédagogie Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.exercises.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {t.exercises.subtitle}
              </p>
            </div>

            {/* Exercise Preview Card */}
            <ExerciseCard exercise={sampleExercise} />

            <div className="mt-8 text-center">
              <Link
                href="/exercices"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
              >
                <span>Accéder à tous les exercices corrigés</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. HOW IT WORKS (THE 4-STEP LEARNING LOOP) */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Une Méthode Éprouvée pour Réussir
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Comment progresser de façon autonome et efficace avec MathsMaroc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Choisis ton niveau',
                desc: 'Trouve instantanément le chapitre correspondant exactement à ton cours en classe.',
                icon: GraduationCap,
              },
              {
                step: '02',
                title: 'Regarde l\'explication',
                desc: 'Une vidéo YouTube claire qui démontre les propriétés et explique les pièges classiques.',
                icon: Play,
              },
              {
                step: '03',
                title: 'Fiche de synthèse',
                desc: 'Télécharge ou lis le formulaire avec toutes les formules indispensables à retenir.',
                icon: FileText,
              },
              {
                step: '04',
                title: 'Entraîne-toi',
                desc: 'Résous les exercices progressifs avec indices méthodologiques et corrections détaillées.',
                icon: Award,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="text-3xl font-extrabold text-indigo-600/30 dark:text-indigo-400/20 font-mono mb-3">
                  {item.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
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

      {/* 8. PROFESSOR MISSION & MANIFESTO */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[4/5] bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SITE_CONFIG.professor.portraitUrl}
                  alt={SITE_CONFIG.professor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 inset-x-6 text-white">
                  <span className="text-xs uppercase font-semibold tracking-wider text-indigo-300">
                    Enseignant Engagé
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">
                    {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                <ShieldCheck className="w-4 h-4" />
                <span>Pédagogie & Éthique</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.about.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-indigo-600 pl-4 py-1">
                « {isRtl ? SITE_CONFIG.professor.quoteAr : SITE_CONFIG.professor.quote} »
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.about.missionText}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  <span>En savoir plus sur l&apos;enseignant</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Youtube className="w-4 h-4 fill-red-600" />
                  <span>Rejoindre la communauté YouTube</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERTING YOUTUBE COMMUNITY CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
            <Youtube className="w-8 h-8 fill-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Abonne-toi à la chaîne pour ne rater aucune nouvelle vidéo
          </h2>
          <p className="text-red-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Plus de {SITE_CONFIG.youtube.subscribersCount} élèves et bacheliers suivent déjà les explications, les lives de révision et les corrections d&apos;examens.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-white text-red-600 hover:bg-slate-100 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Youtube className="w-5 h-5 fill-red-600" />
              <span>S&apos;abonner gratuitement sur YouTube</span>
              <ExternalLink className="w-4 h-4 text-red-500" />
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Foire Aux Questions (FAQ)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Tout ce que tu dois savoir pour tirer le meilleur parti de la plateforme.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{isRtl ? faq.qAr : faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
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
