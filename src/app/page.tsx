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
  GraduationCap,
  Award,
  Video,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Calculator,
  ChevronRight,
  TrendingUp
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
  const [activeCourseTab, setActiveCourseTab] = useState<'all' | 'sm' | 'pc' | '1bac' | 'tc'>('all');

  // Curriculum chapters
  const smLevel = CURRICULUM_LEVELS.find((l) => l.id === '2eme-bac');
  const smBranch = smLevel?.branches.find((b) => b.id === 'sciences-maths');
  const pcBranch = smLevel?.branches.find((b) => b.id === 'sciences-physiques');
  const exp1Bac = CURRICULUM_LEVELS.find((l) => l.id === '1ere-bac')?.branches[0];
  const tcBranch = CURRICULUM_LEVELS.find((l) => l.id === 'tronc-commun')?.branches[0];

  const allShowcaseChapters = [
    ...(smBranch?.chapters.slice(0, 3) || []),
    ...(pcBranch?.chapters.slice(0, 2) || []),
    ...(exp1Bac?.chapters.slice(0, 1) || []),
  ];

  const filteredChapters = allShowcaseChapters.filter((ch) => {
    if (activeCourseTab === 'all') return true;
    if (activeCourseTab === 'sm') return ch.branchId === 'sciences-maths';
    if (activeCourseTab === 'pc') return ch.branchId === 'sciences-physiques';
    if (activeCourseTab === '1bac') return ch.levelId === '1ere-bac';
    if (activeCourseTab === 'tc') return ch.levelId === 'tronc-commun';
    return true;
  });

  // Pick featured exercise
  const allLessons = getAllLessons();
  const sampleLesson = allLessons.find((l) => l.slug === 'continuite-et-tvi');
  const sampleExercise = sampleLesson?.exercises[0];

  const faqs = [
    {
      q: 'L\'accès aux cours, vidéos et exercices est-il véritablement 100% gratuit ?',
      qAr: 'هل الولوج إلى الدروس والفيديوهات والتمارين مجاني 100% حقاً ؟',
      a: 'Oui, l\'intégralité des ressources éducatives de MathsMaroc est 100% gratuite et restera libre d\'accès. Il n\'y a aucun abonnement payant, aucun cours privé caché, et aucune inscription obligatoire.',
      aAr: 'نعم، جميع الموارد التعليمية في MathsMaroc مجانية 100% ومتاحة دائماً. لا يوجد أي اشتراك مؤدى عنه، ولا دروس خصوصية مدفوعة، ولا تسجيل إجباري.'
    },
    {
      q: 'Le contenu est-il conforme au programme officiel du Ministère de l\'Éducation Nationale ?',
      qAr: 'هل يطابق المحتوى المنهاج الرسمي لوزارة التربية الوطنية المغربية ؟',
      a: 'Absolument. Tous les cours, exercices et résumés respectent scrupuleusement le Cadre de Référence officiel du Ministère pour le collège et le lycée (Options Français BIOF et Arabe).',
      aAr: 'نعم بكل تأكيد. تم إعداد جميع الدروس والتمارين وفق الأطر المرجعية والتوجيهات التربوية الرسمية لوزارة التربية الوطنية للتعليمين الإعدادي والتأهيلي.'
    },
    {
      q: 'Comment utiliser la plateforme conjointement avec la chaîne YouTube ?',
      qAr: 'كيف أستفيد من المنصة بالتوازي مع قناة اليوتيوب ؟',
      a: 'La méthode recommandée : 1. Visionnez la vidéo du cours pour acquérir l\'intuition géométrique et conceptuelle. 2. Téléchargez ou lisez la fiche de synthèse écrite pour fixer les théorèmes. 3. Résolvez les exercices d\'entraînement avec les indices progressifs avant de consulter la solution complète.',
      aAr: 'المنهجية الموصى بها : 1. شاهد فيديو الدرس لاكتساب الفهم البديهي. 2. راجع ملخص الدرس لضبط المبرهنات والقواعد. 3. أنجز التمارين بالاعتماد على التوجيهات التدريجية قبل الاطلاع على الحل المفصل.'
    },
    {
      q: 'Comment sont organisées les annales des Examens Nationaux du Baccalauréat ?',
      qAr: 'كيف تم تنظيم مواضيع الامتحانات الوطنية للبكالوريا ؟',
      a: 'L\'Espace Bac rassemble les sujets officiels des sessions normales et de rattrapage de 2020 à 2025 pour les filières Sciences Maths, PC et SVT. Chaque sujet comporte son texte original PDF, sa correction détaillée par question et le barème ministériel officiel.',
      aAr: 'يضم فضاء الباك مواضيع الدورتين العادية والاستدراكية من 2020 إلى 2025 لمسالك العلوم الرياضية، الفيزيائية وعلوم الحياة والأرض، مرفقة بنص الموضوع PDF، والتصحيح المفصل وسلم التنقيط.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f141c]">
      
      {/* 1. COURSERA TOP ANNOUNCEMENT BANNER */}
      <div className="bg-[#ebf3ff] dark:bg-[#1e293b] border-b border-[#0056d2]/20 dark:border-blue-900/50 py-2 px-4 text-xs font-semibold text-[#0056d2] dark:text-blue-300 text-center flex items-center justify-center gap-2">
        <span className="bg-[#0056d2] text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Rentrée 2026</span>
        <span>Le programme complet de révision du Baccalauréat National est disponible gratuitement.</span>
        <Link href="/bac" className="underline font-bold hover:text-[#00419e] inline-flex items-center gap-0.5">
          <span>Accéder aux annales</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. HERO SECTION : COURSERA STYLE ("Learn without limits") */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0f141c] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Institutional Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#0056d2] dark:text-blue-400" />
                <span>Plateforme Éducative Gratuite • Conforme au Programme Marocain</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1f1f1f] dark:text-white tracking-tight leading-[1.15] font-sans">
                Maîtrisez les mathématiques <span className="text-[#0056d2] dark:text-blue-400">sans limites.</span>
                <span className="block mt-2 text-2xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
                  Du collège au Baccalauréat National.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                Rejoignez la communauté d&apos;apprentissage de référence pour les élèves marocains. Cours structurés, démonstrations rigoureuses en vidéo, résumés de cours, exercices progressifs et annales corrigées du Baccalauréat avec barème officiel.
              </p>

              {/* Coursera-style CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/cours"
                  className="btn-coursera-primary px-6 py-3.5 text-sm inline-flex items-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explorer tous les cours gratuits</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/bac"
                  className="btn-coursera-secondary px-5 py-3.5 text-sm inline-flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Préparer le Baccalauréat 2026</span>
                </Link>
              </div>

              {/* Social Proof / Metrics strip */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#1f1f1f] dark:text-white font-sans">
                    {SITE_CONFIG.youtube.subscribersCount}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Abonnés YouTube
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0056d2] dark:text-blue-400 font-sans">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Élèves accompagnés
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#1f1f1f] dark:text-white font-sans">
                    {SITE_CONFIG.youtube.totalVideosCount}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Vidéos magistrales
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0a8543] dark:text-emerald-400 font-sans">
                    100%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Gratuit à vie
                  </div>
                </div>
              </div>

            </div>

            {/* Right Card : Coursera Specialization Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#1a2332] rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                
                {/* Course Header Banner */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${SITE_CONFIG.youtube.defaultVideoId}/maxresdefault.jpg`}
                    alt="Cours de Mathématiques"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Play Trigger */}
                  <div
                    onClick={() => window.open(`https://youtube.com/watch?v=${SITE_CONFIG.youtube.defaultVideoId}`, '_blank')}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Vidéo Démonstration • 48 min
                    </span>
                    <span className="bg-[#0056d2] px-2 py-0.5 rounded font-bold">BIOF 2026</span>
                  </div>
                </div>

                {/* Course Details (Coursera Style) */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400">
                      Parcours Recommandé
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500 font-medium">2ème Année Baccalauréat</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    Mathématiques Spécialité : Analyse, Limites & Théorème des Valeurs Intermédiaires
                  </h3>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <span>4.9</span>
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-gray-500">(2 450 élèves certifiés)</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#0a8543] font-bold">100% Gratuit</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <div className="font-semibold text-gray-900 dark:text-white">Compétences visées :</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0056d2] shrink-0" />
                      <span>Démontrer l&apos;existence d&apos;une racine unique via la bijection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0056d2] shrink-0" />
                      <span>Rédiger rigoureusement selon les exigences du barème ministériel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0056d2] shrink-0" />
                      <span>Résoudre les annales officielles du Bac (2020-2025)</span>
                    </div>
                  </div>

                  <Link
                    href="/cours/2eme-bac/sciences-maths/limites-et-continuite/continuite-et-tvi"
                    className="block text-center w-full py-2.5 px-4 rounded text-xs font-bold text-white bg-[#0056d2] hover:bg-[#00419e] transition-colors"
                  >
                    Commencer ce cours gratuitement →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COURSERA INSTITUTIONAL TRUST STRIP */}
      <section className="py-6 bg-[#f5f7fa] dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shrink-0">
              Conforme au cadre officiel marocain :
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-6 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                Sciences Mathématiques A & B
              </span>
              <span className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                Sciences Expérimentales (PC & SVT)
              </span>
              <span className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                Tronc Commun BIOF
              </span>
              <span className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs">
                Cycle Collégial
              </span>
              <span className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs text-[#0056d2] dark:text-blue-400">
                Prépa Concours CPGE • ENSA • ENSAM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHAT BRINGS YOU TO COURSERA TODAY?" (GOAL DISCOVERY) */}
      <section className="py-14 sm:py-18 bg-white dark:bg-[#0f141c] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 block mb-1">
              Objectifs d&apos;Apprentissage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Que souhaitez-vous accomplir aujourd&apos;hui ?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Choisissez votre parcours selon votre calendrier scolaire et vos priorités d&apos;entraînement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Goal 1: Baccalauréat */}
            <Link
              href="/bac"
              className="p-5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] hover:border-[#0056d2] dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 flex items-center justify-center mb-4 group-hover:bg-[#0056d2] group-hover:text-white transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#0056d2] transition-colors mb-2">
                  Réussir l&apos;Examen National
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Annales officielles de 2020 à 2025 avec barème ministériel, astuces de rédaction et gestion du temps le jour J.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#0056d2]">
                <span>Consulter les annales</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Goal 2: Comprendre un chapitre */}
            <Link
              href="/cours"
              className="p-5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] hover:border-[#0056d2] dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#0a8543] dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-[#0a8543] group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#0056d2] transition-colors mb-2">
                  Assimiler un Cours Théorique
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Démonstrations complètes des théorèmes, fiches de synthèse à imprimer et définitions formelles rigoureuses.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#0056d2]">
                <span>Explorer les cours</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Goal 3: S'entraîner sur des exercices */}
            <Link
              href="/exercices"
              className="p-5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] hover:border-[#0056d2] dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#0056d2] transition-colors mb-2">
                  Résoudre des Exercices Types
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Progression méthodique avec indices de réflexion pour chercher par soi-même avant d&apos;afficher la correction.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#0056d2]">
                <span>Banque d&apos;exercices</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Goal 4: Vidéos YouTube */}
            <Link
              href="/videos"
              className="p-5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] hover:border-[#0056d2] dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#0056d2] transition-colors mb-2">
                  Réviser en Vidéo YouTube
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Vidéothèque complète de 340+ leçons et corrections d&apos;annales, consultable librement depuis smartphone et PC.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#0056d2]">
                <span>Voir les vidéos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 5. LEVEL & PROGRAM SELECTOR */}
      <LevelSelector />

      {/* 6. COURSERA FEATURED COURSES CATALOG */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0f141c] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 block mb-1">
                Catalogue Académique
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Les cours les plus consultés
              </h2>
            </div>

            <Link
              href="/cours"
              className="text-xs sm:text-sm font-bold text-[#0056d2] dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>Voir l&apos;intégralité des chapitres ({allLessons.length} leçons)</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Filter Tabs Coursera Style */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'Tous les cours' },
              { id: 'sm', label: '2ème Bac Sciences Maths' },
              { id: 'pc', label: '2ème Bac Sciences Physiques & SVT' },
              { id: '1bac', label: '1ère Année Bac' },
              { id: 'tc', label: 'Tronc Commun' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCourseTab(tab.id as typeof activeCourseTab)}
                className={`px-4 py-2 rounded text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border ${
                  activeCourseTab === tab.id
                    ? 'bg-[#0056d2] text-white border-[#0056d2]'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((chapter) => (
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

      {/* 7. FLAGSHIP BACCALAURÉAT MASTERTRACK BANNER (Coursera Degree / Certificate style) */}
      <section className="py-14 sm:py-20 bg-[#002661] text-white border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400 text-gray-950 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Spécial Baccalauréat 2026</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Programme Intensif d&apos;Excellence pour l&apos;Examen National
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Accédez à la collection la plus complète d&apos;annales officielles corrigées selon le barème officiel du Ministère de l&apos;Éducation Nationale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded bg-white/10 border border-white/15">
                  <div className="font-bold text-sm mb-1 flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Annales Nationales 2020-2025</span>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Sujets complets en PDF avec barème de notation officiel et rédaction modèle.
                  </p>
                </div>

                <div className="p-4 rounded bg-white/10 border border-white/15">
                  <div className="font-bold text-sm mb-1 flex items-center gap-2 text-white">
                    <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Formulaires & Fiches Réflexes</span>
                  </div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Toutes les formules indispensables pour les limites, primitives et probabilités.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/bac"
                  className="px-6 py-3 rounded text-sm font-bold bg-white text-[#002661] hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Accéder à l&apos;Espace Révision Bac →
                </Link>
                <Link
                  href="/bac#annales"
                  className="px-5 py-3 rounded text-sm font-semibold bg-white/15 hover:bg-white/20 text-white border border-white/25 transition-colors"
                >
                  Télécharger les sujets 2025
                </Link>
              </div>
            </div>

            {/* Right formula review box */}
            <div className="lg:col-span-5">
              <div className="rounded-lg bg-white/10 border border-white/20 p-6 space-y-4">
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider border-b border-white/15 pb-2 flex items-center justify-between">
                  <span>Mémo Formules • Examen National</span>
                  <span className="text-amber-300 font-mono">100% Retenir</span>
                </div>

                <div className="p-3.5 rounded bg-black/25 border border-white/10">
                  <span className="text-blue-200 text-xs font-semibold block mb-1">Croissances Comparées Fondamentales :</span>
                  <div className="text-center text-white py-1">
                    <MathView math="\lim_{x \to +\infty} \frac{e^x}{x^n} = +\infty \quad \text{et} \quad \lim_{x \to 0^+} x \ln(x) = 0" inline={true} />
                  </div>
                </div>

                <div className="p-3.5 rounded bg-black/25 border border-white/10">
                  <span className="text-blue-200 text-xs font-semibold block mb-1">Intégration par Parties :</span>
                  <div className="text-center text-white py-1">
                    <MathView math="\int_a^b u(x) v'(x) \, dx = [u(x) v(x)]_a^b - \int_a^b u'(x) v(x) \, dx" inline={true} />
                  </div>
                </div>

                <div className="p-3 rounded bg-blue-900/60 text-xs text-blue-200 flex items-center justify-between">
                  <span>Fiche complète en PDF (12 pages)</span>
                  <Link href="/bac" className="text-white font-bold underline">
                    Ouvrir
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. LATEST YOUTUBE VIDEO LIBRARY */}
      <section className="py-14 sm:py-20 bg-[#f5f7fa] dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Youtube className="w-4 h-4 fill-red-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Vidéothèque Officielle YouTube
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Dernières leçons magistrales en vidéo
              </h2>
            </div>

            <Link
              href="/videos"
              className="text-xs sm:text-sm font-bold text-[#0056d2] dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>Accéder à toutes les vidéos ({SITE_CONFIG.youtube.totalVideosCount})</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {YOUTUBE_VIDEOS.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

        </div>
      </section>

      {/* 9. SAMPLE INTERACTIVE EXERCISE (HANDS-ON LEARNING) */}
      {sampleExercise && (
        <section className="py-14 sm:py-20 bg-white dark:bg-[#0f141c] border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0a8543] block mb-1">
                Pédagogie Active • Entraînement Autonome
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Exemple d&apos;exercice type examen avec résolution guidée
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Testez vos réflexes sur cet exercice classique du Baccalauréat. Dévoilez l&apos;indice si vous hésitez avant d&apos;afficher le corrigé pas à pas.
              </p>
            </div>

            <ExerciseCard exercise={sampleExercise} />

            <div className="text-center pt-2">
              <Link
                href="/exercices"
                className="text-xs sm:text-sm font-bold text-[#0056d2] dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Accéder à l&apos;ensemble de la banque d&apos;exercices classés par chapitre</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 10. "WHY LEARNERS SUCCEED WITH MATHSMAROC" (OUTCOMES) */}
      <section className="py-14 sm:py-20 bg-[#f5f7fa] dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 block mb-1">
              Rigueur & Efficacité
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pourquoi les élèves marocains progressent sur MathsMaroc
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a2332] p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Rigueur de Rédaction & Barème Officiel
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Au Bac marocain, chaque demi-point compte sur la justification des hypothèses (continuité sur l&apos;intervalle, stricte monotonie, etc.). Nos démonstrations suivent fidèlement la grille de correction ministérielle.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a2332] p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pédagogie Active & Dévoilement Progressif
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Lire une correction sans chercher ne permet pas d&apos;apprendre. Nous fournissons des indices ciblés en français et darija pour débloquer votre raisonnement et développer une vraie autonomie intellectuelle.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a2332] p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Égalité des Chances & 100% Gratuité Réelle
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Que vous soyez dans un grand lycée urbain ou dans une petite commune rurale, vous avez accès exactement au même enseignement d&apos;excellence, sans barrière financière ni cours payants cachés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. REAL STUDENT SUCCESS STORIES (Coursera Learner Stories) */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0f141c] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056d2] dark:text-blue-400 block mb-1">
              Témoignages de Lauréats
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ils ont réussi leur Bac avec MathsMaroc
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                « Les explications du Prof. Alami m&apos;ont permis de comprendre la rigueur de rédaction exigée au National. J&apos;ai obtenu 19.5/20 en maths et j&apos;ai intégré les classes prépa MPSI de Rabat. »
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">Youssef M.</div>
                <div className="text-gray-500">Mention Très Bien • 2ème Bac Sciences Maths (Casablanca)</div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                « J&apos;avais d&apos;énormes difficultés sur les limites et les suites en 1ère Bac. Grâce aux astuces et aux corrigés progressifs, j&apos;ai eu 18/20 au Bac PC et j&apos;ai réussi le concours de l&apos;ENSA. »
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">Salma B.</div>
                <div className="text-gray-500">Admise ENSA • 2ème Bac Sciences Physiques (Tanger)</div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#1a2332] space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                « Le meilleur contenu éducatif au Maroc. Les résumés de cours PDF et les corrections des annales 2024 m&apos;ont fait gagner des heures précieuses dans mes révisions de dernière minute. »
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">Amine T.</div>
                <div className="text-gray-500">Mention Très Bien • 2ème Bac SVT (Fès)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION (COURSERA STYLE) */}
      <section className="py-14 sm:py-20 bg-[#f5f7fa] dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Foire Aux Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Questions Fréquemment Posées
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg bg-white dark:bg-[#1a2332] border border-gray-200 dark:border-gray-700/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-[#0056d2] transition-colors"
                  >
                    <span>{isRtl ? faq.qAr : faq.q}</span>
                    <span className="p-1 rounded text-gray-400 ml-4 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-[#0056d2]" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/60 pt-3">
                      {isRtl ? faq.aAr : faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. FINAL ENROLLMENT CTA (COURSERA STYLE) */}
      <section className="py-14 sm:py-18 bg-white dark:bg-[#0f141c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Prêt à maîtriser les mathématiques ?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Accédez dès maintenant à tous les cours, leçons vidéo et annales corrigées. 100% gratuit, sans inscription, disponible 24h/24.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/cours"
              className="btn-coursera-primary px-8 py-3.5 text-sm inline-flex items-center gap-2"
            >
              <span>Commencer à apprendre gratuitement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>S&apos;abonner sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
