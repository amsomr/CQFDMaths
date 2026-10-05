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
  ExternalLink,
  ShieldCheck,
  Calculator,
  Compass,
  Award
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
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION : EDITORIAL & CALM */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-200 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0a09]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Institutional pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span>Enseignement Public & Gratuit • Collège & Lycée</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 dark:text-stone-50 tracking-tight leading-[1.15]">
                {t.hero.title1}{' '}
                <span className="italic font-normal text-stone-700 dark:text-stone-300">
                  {t.hero.titleHighlight}
                </span>{' '}
                <span className="block mt-1 text-2xl sm:text-4xl font-sans font-semibold text-stone-800 dark:text-stone-200">
                  {t.hero.title2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/cours"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-stone-950 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors"
                >
                  <Youtube className="w-4 h-4 fill-red-600" />
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>

              {/* Minimal metrics row */}
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {SITE_CONFIG.youtube.totalVideosCount}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {t.hero.statsVideos}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {t.hero.statsStudents}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {t.hero.statsFree}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card : Architectural Educational Facade */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs space-y-4">
                
                {/* Header of preview card */}
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-stone-500">PROGRAMME 2026</span>
                  </div>
                  <span className="font-mono text-stone-400 text-[11px]">2ème Bac SM & PC</span>
                </div>

                {/* Video Facade */}
                <div
                  onClick={() => window.open(`https://youtube.com/watch?v=${SITE_CONFIG.youtube.defaultVideoId}`, '_blank')}
                  className="relative aspect-video rounded-lg overflow-hidden bg-stone-900 select-none group cursor-pointer border border-stone-200/50 dark:border-stone-800"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${SITE_CONFIG.youtube.defaultVideoId}/maxresdefault.jpg`}
                    alt="Explication Mathématique"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-stone-950/20 transition-colors" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-stone-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 fill-stone-900 translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded bg-stone-950/80 backdrop-blur-xs text-white text-[11px] flex items-center justify-between">
                    <span className="font-medium truncate">Continuité & TVI — Cours Complet</span>
                    <span className="font-mono text-stone-400 text-[10px]">48:15</span>
                  </div>
                </div>

                {/* Math snippet in preview card */}
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800 text-xs">
                  <div className="text-[10px] font-mono text-stone-400 uppercase mb-1">Théorème Clé au National :</div>
                  <div className="overflow-x-auto text-center font-serif py-0.5">
                    <MathView math="f(a) \cdot f(b) < 0 \implies \exists c \in ]a, b[, \; f(c) = 0" inline={true} />
                  </div>
                </div>

                {/* Teacher attribution footer */}
                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800">
                  <span className="font-medium text-stone-900 dark:text-stone-200">
                    {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
                  </span>
                  <span className="text-[11px]">
                    {isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK LEVEL SELECTOR */}
      <LevelSelector />

      {/* 3. POPULAR COURSES & CHAPTERS */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Curriculum Structuré
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {t.courses.title}
              </h2>
            </div>

            <Link
              href="/cours"
              className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
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

      {/* 4. BAC REVISION HUB EDITORIAL SPOTLIGHT */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wide bg-stone-800 text-stone-300 border border-stone-700">
                {t.bac.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                {t.bac.title}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                {t.bac.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-lg bg-stone-800/80 border border-stone-700">
                  <div className="font-semibold text-sm mb-1 flex items-center gap-2 text-stone-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Annales 2022 à 2025</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Sujets originaux du Ministère avec correction pas à pas et barème officiel.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-800/80 border border-stone-700">
                  <div className="font-semibold text-sm mb-1 flex items-center gap-2 text-stone-100">
                    <FileText className="w-4 h-4 text-stone-300" />
                    <span>Formulaire Mathématique</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Synthèse de toutes les formules de limites, dérivées, primitives et complexes.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/bac"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-white text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  Accéder à l&apos;Espace Bac 2026
                </Link>
                <Link
                  href="/bac#formulaire"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                >
                  Consulter le formulaire officiel
                </Link>
              </div>
            </div>

            {/* Right formula box */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-stone-700 bg-stone-950 p-5 space-y-3 font-mono text-xs">
                <div className="text-[11px] text-stone-400 uppercase border-b border-stone-800 pb-2">
                  Formules Clés au Baccalauréat
                </div>
                <div className="p-3 rounded bg-stone-900 border border-stone-800">
                  <span className="text-stone-400 text-[10px] block mb-1">Croissances comparées Exp :</span>
                  <div className="text-center text-stone-200 font-bold">
                    <MathView math="\lim_{x \to +\infty} \frac{e^x}{x^n} = +\infty" inline={true} />
                  </div>
                </div>
                <div className="p-3 rounded bg-stone-900 border border-stone-800">
                  <span className="text-stone-400 text-[10px] block mb-1">Formule IPP :</span>
                  <div className="text-center text-stone-200 font-bold">
                    <MathView math="\int_a^b u v' = [u v]_a^b - \int_a^b u' v" inline={true} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST YOUTUBE LESSONS */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0a09]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Vidéos d&apos;Appui Pédagogique
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {t.videos.title}
              </h2>
            </div>

            <Link
              href="/videos"
              className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
            >
              <span>{t.videos.allVideos}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {YOUTUBE_VIDEOS.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. SAMPLE INTERACTIVE EXERCISE */}
      {sampleExercise && (
        <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                Pédagogie Active & Démarche de Recherche
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {t.exercises.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                {t.exercises.subtitle}
              </p>
            </div>

            <ExerciseCard exercise={sampleExercise} />

            <div className="text-center pt-2">
              <Link
                href="/exercices"
                className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Accéder à l&apos;ensemble de la banque d&apos;exercices</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. METHODOLOGY (4 STEPS) */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Méthodologie
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              La Démarche d&apos;Apprentissage Autonome
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Choisis ton niveau',
                desc: 'Accède au chapitre précis qui correspond à ton cours en classe.',
              },
              {
                step: '02',
                title: 'Assimile la notion',
                desc: 'Une vidéo claire qui démontre les propriétés et décortique les pièges.',
              },
              {
                step: '03',
                title: 'Retiens l\'essentiel',
                desc: 'La fiche de synthèse avec les définitions et théorèmes officiels.',
              },
              {
                step: '04',
                title: 'Entraîne-toi pas à pas',
                desc: 'Résous les exercices progressifs avec indices et corrigés détaillés.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              >
                <div className="font-mono text-sm font-bold text-stone-400 mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROFESSOR MANIFESTO */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Engagement pour l&apos;Éducation Publique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {t.about.title}
            </h2>
          </div>

          <div className="p-6 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
            <blockquote className="font-serif italic text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed">
              « {isRtl ? SITE_CONFIG.professor.quoteAr : SITE_CONFIG.professor.quote} »
            </blockquote>
            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
              </span>
              <span>{isRtl ? SITE_CONFIG.professor.titleAr : SITE_CONFIG.professor.title}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.about.missionText}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/a-propos"
              className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
            >
              <span>En savoir plus sur la démarche pédagogique</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION (MINIMAL ACCORDION) */}
      <section className="py-16 sm:py-20 bg-[#fafaf9] dark:bg-[#0c0a09]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8 border-b border-stone-200 dark:border-stone-800 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
              Questions Fréquentes
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Foire Aux Questions
            </h2>
          </div>

          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                  >
                    <span>{isRtl ? faq.qAr : faq.q}</span>
                    <span className="p-1 rounded text-stone-400 ml-4 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-2.5 pr-6 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed animate-fadeIn">
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
