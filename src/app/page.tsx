'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Award,
  GraduationCap
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { LevelSelector } from '@/components/LevelSelector';
import { CourseCard } from '@/components/CourseCard';
import { getAllChapters } from '@/data/curriculum';
import { YOUTUBE_VIDEOS } from '@/data/videos';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from '@/components/LanguageProvider';

export default function HomePage() {
  const [courseFilter, setCourseFilter] = useState('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const { isRtl } = useLanguage();

  const allChapters = getAllChapters();

  // Filtered chapters for featured shelf
  const filteredChapters = allChapters.filter((ch) => {
    if (courseFilter === 'all') return true;
    if (courseFilter === 'sciences-maths') return ch.branchId === 'sciences-maths';
    if (courseFilter === 'sciences-physiques') return ch.branchId === 'sciences-physiques';
    if (courseFilter === '1ere-bac') return ch.levelId === '1ere-bac';
    if (courseFilter === 'tronc-commun') return ch.levelId === 'tronc-commun';
    return true;
  });

  const featuredVideo = YOUTUBE_VIDEOS[0];
  const sideVideos = YOUTUBE_VIDEOS.slice(1, 4);

  const faqs = [
    {
      q: 'La plateforme est-elle réellement 100% gratuite ?',
      a: 'Oui, l\'accès à l\'ensemble des cours, vidéos YouTube, fiches d\'exercices et corrigés d\'examens nationaux est totalement gratuit pour tous les élèves marocains. Aucun abonnement ni moyen de paiement n\'est requis.',
    },
    {
      q: 'Les cours sont-ils conformes au programme officiel marocain (BIOF) ?',
      a: 'Absolument. Tous les contenus suivent rigoureusement le Cadre de Référence Officiel publié par le Ministère de l\'Éducation Nationale du Maroc, avec le découpage officiel des chapitres et les barèmes des examens nationaux.',
    },
    {
      q: 'Quels niveaux sont couverts sur MathsMaroc ?',
      a: 'La plateforme couvre le Lycée (Tronc Commun Scientifique, 1ère Bac Sciences Expérimentales et Mathématiques, 2ème Bac Sciences Maths A & B, Sciences Physiques et SVT) ainsi que le cycle Collège (3AC, 2AC, 1AC).',
    },
    {
      q: 'Comment utiliser la plateforme pour préparer le Baccalauréat ?',
      a: 'Nous recommandons de suivre chaque chapitre dans l\'ordre : lire le résumé de cours, visionner l\'explication vidéo au tableau, résoudre les exercices progressifs, puis traiter les sujets réels d\'annales du Baccalauréat disponibles dans l\'Espace Bac.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F172A] font-sans selection:bg-[#DBEAFE] selection:text-[#1D4ED8]">
      
      {/* ─────────────────────────────────────────────────────────────────────────
          1. HERO SECTION (EDITORIAL ASYMMETRIC COMPOSITION — SCALE 1280PX)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-[#0F172A]/08 math-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (~58%): Bold Typography & Context */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Eyebrow contextual line */}
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                <span>Mathématiques • Collège &amp; Lycée • Maroc</span>
              </div>

              {/* Expressive Editorial Headline (Scale 56-72px) */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.04]">
                Les maths,<br />
                <span className="text-[#1D4ED8] underline decoration-[#1D4ED8]/30 decoration-[5px] underline-offset-8">
                  enfin plus claires.
                </span>
              </h1>

              {/* Supporting Copy (18-20px) */}
              <p className="text-lg sm:text-xl text-[#475569] max-w-xl leading-relaxed">
                Cours structurés, démonstrations en vidéo et préparation méthodique au Baccalauréat — entièrement gratuit, avec le <strong className="font-bold text-[#0F172A]">Prof. Omar Alami</strong>.
              </p>

              {/* Dominant Primary CTA & Secondary Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/cours/2eme-bac"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[12px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
                >
                  <span>Commencer à apprendre</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/cours"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[12px] border border-[#0F172A]/15 hover:border-[#1D4ED8] bg-white hover:bg-[#FAF9F5] text-[#0F172A] font-bold text-base transition-all shadow-2xs text-center"
                >
                  <span>Voir tous les 32 cours</span>
                </Link>
              </div>

              {/* Cycle Badges (Moroccan Education System) */}
              <div className="pt-4 flex flex-wrap items-center gap-2.5 text-xs text-[#64748B] font-semibold">
                <span className="text-[#94A3B8] font-mono text-xs uppercase tracking-wider">Filières :</span>
                <Link href="/cours/2eme-bac/sciences-maths" className="px-3 py-1.5 rounded-[8px] bg-white border border-[#0F172A]/10 hover:border-[#1D4ED8] text-[#334155] hover:text-[#1D4ED8] transition-colors shadow-2xs">
                  2ème Bac Sciences Maths
                </Link>
                <Link href="/cours/2eme-bac/sciences-physiques" className="px-3 py-1.5 rounded-[8px] bg-white border border-[#0F172A]/10 hover:border-[#1D4ED8] text-[#334155] hover:text-[#1D4ED8] transition-colors shadow-2xs">
                  2ème Bac Sciences Physiques &amp; SVT
                </Link>
                <Link href="/cours/1ere-bac" className="px-3 py-1.5 rounded-[8px] bg-white border border-[#0F172A]/10 hover:border-[#1D4ED8] text-[#334155] hover:text-[#1D4ED8] transition-colors shadow-2xs">
                  1ère Bac
                </Link>
                <Link href="/cours/tronc-commun" className="px-3 py-1.5 rounded-[8px] bg-white border border-[#0F172A]/10 hover:border-[#1D4ED8] text-[#334155] hover:text-[#1D4ED8] transition-colors shadow-2xs">
                  Tronc Commun BIOF
                </Link>
              </div>

            </div>

            {/* Right Column (~42%): Composed Professor Scene with Math Annotations */}
            <div className="lg:col-span-5 relative">
              
              {/* Professor Portrait Frame with Authentic Editorial Paper matting */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Background decorative coordinate lines */}
                <div className="absolute -top-10 -right-10 w-48 h-48 border border-dashed border-[#1D4ED8]/25 rounded-full pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-56 h-56 border border-dashed border-[#0F172A]/10 rounded-full pointer-events-none" />

                {/* Main Portrait Sheet */}
                <div className="relative rounded-[22px] overflow-hidden bg-white p-3 shadow-xl border border-[#0F172A]/10">
                  <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SITE_CONFIG.professor.portraitUrl}
                      alt={SITE_CONFIG.professor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    {/* Professor name plate */}
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
                        Enseignant &bull; Agrégé de Mathématiques
                      </div>
                      <div className="text-2xl font-black mt-0.5">{SITE_CONFIG.professor.name}</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Lycée d&apos;Excellence &bull; 12+ ans d&apos;expérience &bull; Casablanca
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Authentic Educational Sticky Note */}
                <div className="absolute top-24 -left-4 sm:-left-8 bg-white p-4 sm:p-5 rounded-[16px] shadow-xl border border-[#0F172A]/10 max-w-[260px] select-none">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
                      2ème Bac BIOF
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] leading-snug">
                    Théorème des Valeurs Intermédiaires (TVI)
                  </div>
                  <div className="mt-1.5 font-serif italic text-xs text-[#475569] bg-[#FAF9F5] p-2 rounded-[8px] border border-[#0F172A]/06">
                    f(a) &middot; f(b) &lt; 0 &rArr; &exist; c &isin; ]a, b[, f(c) = 0
                  </div>
                </div>

                {/* Mathematical Formula Fragment in Top-Right */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white px-4 py-2 rounded-[10px] shadow-md border border-[#0F172A]/10 text-xs font-mono font-bold text-[#0F172A] select-none">
                  lim(x&rarr;0) sin(x)/x = 1
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. LEVEL SELECTOR (INTEGRATED INTERACTIVE CURRICULUM DISCOVERY)
          ───────────────────────────────────────────────────────────────────────── */}
      <LevelSelector />

      {/* ─────────────────────────────────────────────────────────────────────────
          3. FEATURED COURSES SHELF (ASYMMETRIC EDITORIAL GRID)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F172A]/08">
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8] mb-2.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                <span>Cursus Structuré BIOF</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A]">
                Les chapitres fondamentaux.
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#475569] leading-relaxed">
                Chaque chapitre comprend le cours théorique rédigé, la démonstration en vidéo et les exercices d&apos;application corrigés pas à pas.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
              {[
                { id: 'all', label: 'Tous les niveaux' },
                { id: 'sciences-maths', label: 'Sciences Maths (2 Bac)' },
                { id: 'sciences-physiques', label: 'Sciences Physiques' },
                { id: '1ere-bac', label: '1ère Bac' },
                { id: 'tronc-commun', label: 'Tronc Commun' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCourseFilter(tab.id)}
                  className={`px-4 py-2 rounded-[10px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    courseFilter === tab.id
                      ? 'bg-[#1D4ED8] text-white shadow-sm'
                      : 'bg-white text-[#334155] border border-[#0F172A]/10 hover:bg-[#FAF9F5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Grid: 1 Flagship 2-Col Card + 1 Companion Card, then Standard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChapters.slice(0, 5).map((chapter, index) => {
              // The first course gets the wide featured showcase layout
              const isFirst = index === 0;

              return (
                <CourseCard
                  key={chapter.slug}
                  chapter={chapter}
                  levelId={chapter.levelId}
                  branchId={chapter.branchId}
                  branchName={
                    chapter.branchId === 'sciences-maths' 
                      ? '2 Bac Sciences Maths' 
                      : chapter.branchId === 'sciences-physiques' 
                      ? '2 Bac Sciences Physiques' 
                      : chapter.levelId === '1ere-bac'
                      ? '1ère Bac BIOF'
                      : 'Tronc Commun'
                  }
                  isFeatured={isFirst}
                />
              );
            })}
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/cours"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-white border border-[#0F172A]/15 hover:border-[#1D4ED8] text-[#1D4ED8] font-bold text-sm sm:text-base hover:bg-[#FAF9F5] transition-all shadow-2xs"
            >
              <span>Consulter l&apos;intégralité du cursus ({allChapters.length} chapitres)</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          4. FEATURED VIDEO SECTION (REAL YOUTUBE LEARNING ENGINE)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#0F172A]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#CC0000] mb-2.5 flex items-center gap-2">
              <Youtube className="w-4 h-4 fill-[#CC0000]" />
              <span>Le Cours en Vidéo • Tableau Noir Virtuel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A]">
              La clarté du tableau, chez toi.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#475569] leading-relaxed">
              Toutes les démonstrations théoriques et méthodes de résolution sont expliquées pas à pas au tableau virtuel par le Prof. Omar Alami.
            </p>
          </div>

          {/* Asymmetric Media Layout: 65% Featured + 35% Recent List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left (~65%): Large Featured Video Presentation */}
            <div className="lg:col-span-8 bg-[#FAF9F5] rounded-[20px] overflow-hidden border border-[#0F172A]/10 shadow-sm flex flex-col justify-between">
              <div
                onClick={() => setActiveVideoModal(featuredVideo.youtubeId)}
                className="relative aspect-video w-full bg-slate-950 cursor-pointer group overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/35 transition-colors" />

                {/* Recognizable Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#CC0000] text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-[6px] bg-slate-900/90 text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                  <span>{featuredVideo.duration}</span>
                </div>
              </div>

              <div className="p-7 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[6px] bg-red-100 text-[#CC0000]">
                    Cours Magistral
                  </span>
                  <span className="text-xs text-[#64748B] font-semibold">
                    2ème Bac • Sciences Mathématiques &amp; Physiques
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">
                  {featuredVideo.title}
                </h3>

                <p className="text-base text-[#475569] leading-relaxed">
                  Explication rigoureuse de la continuité ponctuelle, continuité sur intervalle, et application approfondie du Théorème des Valeurs Intermédiaires (TVI) avec résolutions d&apos;exercices types.
                </p>

                <div className="pt-3 border-t border-[#0F172A]/08 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(featuredVideo.youtubeId)}
                    className="inline-flex items-center gap-2 text-base font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                  >
                    <span>Lancer la leçon vidéo</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>

                  <a
                    href={`https://youtube.com/watch?v=${featuredVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5"
                  >
                    <span>Ouvrir sur YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right (~35%): Vertical Editorial List of Recent Lessons */}
            <div className="lg:col-span-4 space-y-5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                Autres leçons et résolutions récentes :
              </div>

              <div className="space-y-3.5">
                {sideVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoModal(vid.youtubeId)}
                    className="p-3.5 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/08 hover:border-[#1D4ED8] transition-all flex items-start gap-4 cursor-pointer group hover:bg-white shadow-2xs"
                  >
                    {/* Thumbnail snippet */}
                    <div className="relative w-28 aspect-video rounded-[8px] overflow-hidden bg-slate-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono mb-1">
                        <span className="text-[#1D4ED8] font-bold">{vid.topic}</span>
                        <span>•</span>
                        <span>{vid.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors line-clamp-2 leading-snug">
                        {vid.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* YouTube Channel Banner */}
              <div className="p-6 rounded-[16px] bg-red-50 border border-red-200/80 space-y-3">
                <div className="text-base font-bold text-[#0F172A] flex items-center gap-2.5">
                  <Youtube className="w-5 h-5 fill-[#CC0000]" />
                  <span>Chaîne YouTube Officielle</span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Plus de 300 vidéos gratuites, corrigés d&apos;examens nationaux et résolutions en direct au tableau virtuel.
                </p>
                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#CC0000] hover:underline pt-1"
                >
                  <span>Rejoindre la communauté ({SITE_CONFIG.youtube.subscribersCount})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          5. BAC REVISION SECTION (MAJOR EDITORIAL CAMPAIGN — SCALED EXAM PAPER)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0A192F] text-white relative overflow-hidden">
        {/* Subtle coordinate grid on dark */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none math-grid-bg" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (~55%): Campaign Manifesto */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Baccalauréat National 2026 • Maroc</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Prépare ton Bac<br />
                avec une méthode claire.
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                La réussite au Baccalauréat ne dépend pas du bachotage aléatoire, mais de la maîtrise rigoureuse des types d&apos;exercices imposés par le cadre de référence ministériel marocain.
              </p>

              {/* 4 Pillars of Bac Preparation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm sm:text-base text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Annales nationales (2020 à 2025)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Corrigés rédigés selon le barème officiel</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Formulaire mathématique de synthèse (PDF)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pièges fréquents et points de vigilance</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/bac"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-amber-500/20"
                >
                  <span>Accéder à l&apos;Espace Bac 2026</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/bac#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[12px] border border-slate-700 hover:border-slate-500 bg-slate-900/60 text-slate-200 hover:text-white font-medium text-base transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Télécharger le Formulaire (PDF)</span>
                </Link>
              </div>
            </div>

            {/* Right Column (~45%): Composed Moroccan National Exam Paper Artwork */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white text-slate-900 rounded-[20px] p-7 sm:p-8 shadow-2xl border border-slate-200/60 space-y-5 select-none rotate-0.5 hover:rotate-0 transition-transform">
                
                {/* Official Exam Header */}
                <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1.5">
                  <div className="text-[11px] font-mono tracking-widest uppercase font-bold text-slate-600">
                    Royaume du Maroc • Ministère de l&apos;Éducation Nationale
                  </div>
                  <div className="text-base font-black uppercase tracking-tight text-slate-950">
                    Examen National du Baccalauréat
                  </div>
                  <div className="text-xs font-bold text-[#1D4ED8]">
                    Session Normale • Série Sciences Mathématiques (A &amp; B)
                  </div>
                </div>

                {/* Question Sample 1 */}
                <div className="space-y-2 text-sm text-slate-800">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Exercice 1 : Étude de fonction &amp; TVI</span>
                    <span className="font-mono text-[#B45309] font-bold">[3.5 pts]</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-serif italic">
                    Soit la fonction f définie sur [1, 2] par f(x) = x⁴ - 2x² - 2.
                  </p>
                  <div className="pl-3.5 border-l-2 border-slate-200 space-y-1.5 text-xs text-slate-700">
                    <div>1. Démontrer que f(x) = 0 admet une unique solution &alpha; sur ]1, 2[.</div>
                    <div>2. Donner un encadrement de &alpha; d&apos;amplitude 0.25 par dichotomie.</div>
                  </div>
                </div>

                {/* Question Sample 2 */}
                <div className="space-y-2 text-sm text-slate-800 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Exercice 2 : Nombres Complexes</span>
                    <span className="font-mono text-[#B45309] font-bold">[3.0 pts]</span>
                  </div>
                  <div className="pl-3.5 border-l-2 border-slate-200 space-y-1 text-xs text-slate-700">
                    <div>Résoudre dans &Copf; l&apos;équation : z² - 2(&radic;3 + i)z + 4 = 0.</div>
                  </div>
                </div>

                {/* Seal of Authenticity */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Barème officiel inclus
                  </span>
                  <span>Coeff. 9 • Durée : 4h</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          6. PROFESSOR SPOTLIGHT (MAJOR SECTION — HUMAN ESSENCE & TRUST)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#0F172A]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left (~42%): Large Portrait with authentic annotation */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[22px] overflow-hidden bg-[#FAF9F5] p-3.5 border border-[#0F172A]/10 shadow-lg">
                <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SITE_CONFIG.professor.portraitUrl}
                    alt={SITE_CONFIG.professor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="font-extrabold text-[#0F172A] text-base">{SITE_CONFIG.professor.name}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{SITE_CONFIG.professor.title}</div>
                </div>
              </div>
            </div>

            {/* Right (~58%): Editorial Story & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8]">
                TON PROF DE MATHS
              </div>

              {/* Large Display Quote */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
                « Mon objectif n&apos;est pas de te faire mémoriser les maths. C&apos;est de te les faire comprendre. »
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-[#475569] leading-relaxed">
                <p>
                  Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles supérieures d&apos;ingénieurs et de médecine. Pourtant, des milliers d&apos;élèves motivés se heurtent à des barrières économiques ou géographiques.
                </p>
                <p>
                  En tant qu&apos;enseignant agrégé avec plus de 12 ans d&apos;expérience dans les lycées et classes préparatoires, j&apos;ai créé cette plateforme pour offrir la même qualité d&apos;explication rigoureuse à un élève à Oujda, Zagora, Tanger ou Casablanca — sans contrepartie financière.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#1D4ED8] hover:underline"
                >
                  <span>Découvrir la méthode pédagogique et le manifeste</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#CC0000] hover:underline"
                >
                  <Youtube className="w-4 h-4 fill-[#CC0000]" />
                  <span>Voir la chaîne YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          7. MINIMAL TYPOGRAPHIC FAQ
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1D4ED8]">
              Questions Fréquentes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A]">
              Tout ce que tu dois savoir.
            </h2>
          </div>

          <div className="divide-y divide-[#0F172A]/08 border-y border-[#0F172A]/08">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#1D4ED8] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#94A3B8] shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-base text-[#475569] leading-relaxed pr-8">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          8. CONTEXTUAL FINAL CTA (LEARNING JOURNEY CONTINUATION)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF9F5] border-t border-[#0F172A]/08">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[22px] bg-white border border-[#0F172A]/10 p-8 sm:p-12 shadow-sm space-y-6">
            
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
              <span>Ton prochain cours t&apos;attend</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A]">
                2ème Bac • Sciences Mathématiques &amp; Expérimentales
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                Continuer avec le chapitre fondamental : <strong className="text-[#0F172A]">Limites, Continuité &amp; Théorème des Valeurs Intermédiaires (TVI)</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/cours/2eme-bac/sciences-maths/limites-et-continuite"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[12px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
              >
                <span>Commencer ce cours maintenant</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>

              <Link
                href="/cours"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[12px] border border-[#0F172A]/15 hover:border-[#1D4ED8] bg-white hover:bg-[#FAF9F5] text-[#0F172A] font-bold text-base transition-all shadow-2xs text-center"
              >
                <span>Choisis ton niveau et commence gratuitement</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal Player (Privacy Enhanced) */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-[18px] overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-slate-100">
              <span className="font-bold text-sm">Cours Vidéo — Prof. Omar Alami</span>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal}?autoplay=1&rel=0`}
                title="Cours Vidéo YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
