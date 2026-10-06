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
  Award
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
  }).slice(0, 6);

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
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans selection:bg-[#DBEAFE] selection:text-[#1D4ED8]">
      
      {/* ─────────────────────────────────────────────────────────────────────────
          1. HERO SECTION (EDITORIAL ASYMMETRIC COMPOSITION)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-[rgba(15,23,42,0.06)] math-grid-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (~58%): Bold Typography & Context */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow contextual line */}
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1D4ED8]">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <span>Mathématiques • Collège & Lycée • Maroc</span>
              </div>

              {/* Expressive Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.07]">
                Les maths,<br />
                <span className="text-[#1D4ED8] underline decoration-[rgba(29,78,216,0.3)] decoration-4 underline-offset-8">
                  enfin plus claires.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Cours structurés, démonstrations en vidéo et préparation méthodique au Baccalauréat — entièrement gratuit, avec le <strong className="font-semibold text-slate-900">Prof. Omar Alami</strong>.
              </p>

              {/* Dominant Primary CTA & Secondary Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/cours/2eme-bac"
                  className="btn-editorial-primary text-center"
                >
                  <span>Commencer à apprendre</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>

                <Link
                  href="/cours"
                  className="btn-editorial-secondary text-center"
                >
                  <span>Voir tous les cours</span>
                </Link>
              </div>

              {/* Cycle Badges (Moroccan Education System) */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Cycles :</span>
                <Link href="/cours/2eme-bac" className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] text-slate-700 hover:text-[#1D4ED8] transition-colors">
                  2ème Bac SM & PC
                </Link>
                <Link href="/cours/1ere-bac" className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] text-slate-700 hover:text-[#1D4ED8] transition-colors">
                  1ère Bac
                </Link>
                <Link href="/cours/tronc-commun" className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] text-slate-700 hover:text-[#1D4ED8] transition-colors">
                  Tronc Commun BIOF
                </Link>
                <Link href="/cours/college" className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] text-slate-700 hover:text-[#1D4ED8] transition-colors">
                  Collège (3AC)
                </Link>
              </div>

            </div>

            {/* Right Column (~42%): Composed Professor Scene with Math Annotations */}
            <div className="lg:col-span-5 relative">
              
              {/* Professor Portrait Frame with Authentic Editorial Paper matting */}
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                
                {/* Background decorative coordinate lines */}
                <div className="absolute -top-6 -right-6 w-36 h-36 border border-dashed border-[#1D4ED8]/25 rounded-full pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-44 h-44 border border-dashed border-slate-300 rounded-full pointer-events-none" />

                {/* Main Portrait Sheet */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FFFFFF] p-2.5 shadow-xl border border-[rgba(15,23,42,0.08)]">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SITE_CONFIG.professor.portraitUrl}
                      alt={SITE_CONFIG.professor.name}
                      className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Professor name plate */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-mono font-medium text-blue-200">Enseignant & Auteur</div>
                      <div className="text-lg font-bold">{SITE_CONFIG.professor.name}</div>
                      <div className="text-xs text-slate-300">Professeur agrégé de Mathématiques • Casablanca</div>
                    </div>
                  </div>
                </div>

                {/* Floating Authentic Educational Sticky Note */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#FFFFFF] p-4 rounded-xl shadow-lg border border-[rgba(15,23,42,0.1)] max-w-[240px] select-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
                      2ème Bac BIOF
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    Théorème des Valeurs Intermédiaires (TVI)
                  </div>
                  <div className="mt-1 font-serif italic text-[11px] text-slate-500">
                    f(a) · f(b) &lt; 0 ⟹ ∃ c ∈ ]a, b[, f(c) = 0
                  </div>
                </div>

                {/* Mathematical Formula Fragment in Top-Right */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#FFFFFF] px-3.5 py-2 rounded-lg shadow-md border border-[rgba(15,23,42,0.08)] text-[12px] font-mono font-bold text-slate-800 select-none">
                  lim (sin x / x) = 1
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. LEVEL SELECTOR (DYNAMIC INTERACTIVE CURRICULUM DISCOVERY)
          ───────────────────────────────────────────────────────────────────────── */}
      <LevelSelector />

      {/* ─────────────────────────────────────────────────────────────────────────
          3. FEATURED COURSES SHELF (CARDS AS EDUCATIONAL CONTENT WITH SVG MATH)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[rgba(15,23,42,0.08)]">
            <div className="max-w-xl">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1D4ED8] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <span>Cursus Structuré BIOF</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Les chapitres fondamentaux.
              </h2>
              <p className="mt-2 text-base text-slate-600 leading-relaxed">
                Chaque chapitre comprend le cours théorique rédigé, la démonstration en vidéo et les exercices d&apos;application corrigés pas à pas.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
              {[
                { id: 'all', label: 'Tous' },
                { id: 'sciences-maths', label: 'Sciences Maths (2 Bac)' },
                { id: 'sciences-physiques', label: 'Sciences Physiques' },
                { id: '1ere-bac', label: '1ère Bac' },
                { id: 'tronc-commun', label: 'Tronc Commun' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCourseFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    courseFilter === tab.id
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-[#FFFFFF] text-slate-700 border border-[rgba(15,23,42,0.08)] hover:bg-[#F4F3ED]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((chapter) => (
              <CourseCard
                key={chapter.slug}
                chapter={chapter}
                levelId={chapter.levelId}
                branchId={chapter.branchId}
                branchName={chapter.branchId === 'sciences-maths' ? '2 Bac SM' : chapter.branchId === 'sciences-physiques' ? '2 Bac PC' : chapter.levelId}
              />
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/cours"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:underline"
            >
              <span>Consulter l&apos;intégralité du catalogue des cours ({allChapters.length} chapitres)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          4. FEATURED VIDEO SECTION (REAL YOUTUBE LEARNING ENGINE)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-y border-[rgba(15,23,42,0.08)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#CC0000] mb-2 flex items-center gap-2">
              <Youtube className="w-4 h-4 fill-[#CC0000]" />
              <span>Le Cours en Vidéo • Tableau Noir Virtuel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              La clarté du tableau, chez toi.
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              Toutes les démonstrations théoriques et méthodes de résolution sont expliquées pas à pas au tableau virtuel par le Prof. Omar Alami.
            </p>
          </div>

          {/* Asymmetric Media Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left (~62%): Large Featured Video Card */}
            <div className="lg:col-span-7 bg-[#FAF9F5] rounded-xl overflow-hidden border border-[rgba(15,23,42,0.08)] flex flex-col justify-between">
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#CC0000] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/85 text-xs font-mono font-medium text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                  <span>{featuredVideo.duration}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-[#CC0000]">
                    Cours Magistral
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    2ème Bac • Sciences Mathématiques
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {featuredVideo.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Explication rigoureuse de la continuité ponctuelle, sur intervalle, et application approfondie du Théorème des Valeurs Intermédiaires (TVI).
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(featuredVideo.youtubeId)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                  >
                    <span>Lancer la leçon vidéo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://youtube.com/watch?v=${featuredVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>Sur YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right (~38%): Vertical Editorial List of Recent Lessons */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Autres leçons et corrigés récents :
              </div>

              <div className="space-y-3">
                {sideVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoModal(vid.youtubeId)}
                    className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[rgba(15,23,42,0.06)] hover:border-[#1D4ED8] transition-all flex items-start gap-3.5 cursor-pointer group"
                  >
                    {/* Thumbnail snippet */}
                    <div className="relative w-24 aspect-video rounded overflow-hidden bg-slate-900 shrink-0">
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
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mb-0.5">
                        <span className="text-[#1D4ED8] font-bold">{vid.topic}</span>
                        <span>•</span>
                        <span>{vid.duration}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors line-clamp-2 leading-snug">
                        {vid.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* YouTube Channel Banner */}
              <div className="p-5 rounded-lg bg-red-50 border border-red-200/80 space-y-2">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Youtube className="w-5 h-5 fill-[#CC0000]" />
                  <span>Chaîne YouTube Officielle</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Plus de 300 vidéos gratuites, corrigés d&apos;examens nationaux et résolutions en direct.
                </p>
                <a
                  href={SITE_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CC0000] hover:underline pt-1"
                >
                  <span>Rejoindre la communauté sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          5. BAC REVISION SECTION (MAJOR EDITORIAL CAMPAIGN)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Subtle coordinate grid on dark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none math-grid-bg" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (~55%): Campaign Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Baccalauréat National 2026</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Prépare ton Bac<br />
                avec une méthode claire.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                La réussite au Baccalauréat ne dépend pas du bachotage aléatoire, mais de la maîtrise rigoureuse des types d&apos;exercices imposés par le cadre de référence ministériel marocain.
              </p>

              {/* 4 Pillars of Bac Preparation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Annales nationales (2020 à 2025)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Corrigés rédigés selon le barème officiel</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Formulaire mathématique de synthèse (PDF)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pièges fréquents et points de vigilance</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/bac"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20"
                >
                  <span>Accéder à l&apos;Espace Bac 2026</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/bac#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium text-sm transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Télécharger le Formulaire (PDF)</span>
                </Link>
              </div>
            </div>

            {/* Right Column (~45%): Composed Moroccan National Exam Paper Artwork */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FFFFFF] text-slate-900 rounded-xl p-6 sm:p-7 shadow-2xl border border-slate-200/50 space-y-4 select-none">
                
                {/* Official Exam Header */}
                <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                  <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-600">
                    Royaume du Maroc • Ministère de l&apos;Éducation Nationale
                  </div>
                  <div className="text-sm font-extrabold uppercase tracking-tight text-slate-950">
                    Examen National du Baccalauréat
                  </div>
                  <div className="text-xs font-semibold text-[#1D4ED8]">
                    Session Normale • Série Sciences Mathématiques (A & B)
                  </div>
                </div>

                {/* Question Sample 1 */}
                <div className="space-y-1.5 text-xs text-slate-800">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Exercice 1 : Étude de fonction & TVI</span>
                    <span className="font-mono text-[#B45309]">[3.5 pts]</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-serif italic">
                    Soit la fonction f définie sur [1, 2] par f(x) = x⁴ - 2x² - 2.
                  </p>
                  <div className="pl-3 border-l-2 border-slate-200 space-y-1 text-[11px]">
                    <div>1. Démontrer que f(x) = 0 admet une unique solution α sur ]1, 2[.</div>
                    <div>2. Donner un encadrement de α d&apos;amplitude 0.25 par dichotomie.</div>
                  </div>
                </div>

                {/* Question Sample 2 */}
                <div className="space-y-1.5 text-xs text-slate-800 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Exercice 2 : Nombres Complexes</span>
                    <span className="font-mono text-[#B45309]">[3.0 pts]</span>
                  </div>
                  <div className="pl-3 border-l-2 border-slate-200 space-y-1 text-[11px]">
                    <div>Résoudre dans ℂ l&apos;équation : z² - 2(√3 + i)z + 4 = 0.</div>
                  </div>
                </div>

                {/* Seal of Authenticity */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
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
          6. PROFESSOR STORYTELLING SECTION (HUMAN ESSENCE & TRUST)
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[rgba(15,23,42,0.08)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Professor Portrait */}
            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF9F5] p-3 border border-[rgba(15,23,42,0.08)] shadow-md">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SITE_CONFIG.professor.portraitUrl}
                    alt={SITE_CONFIG.professor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <div className="font-bold text-slate-900 text-sm">{SITE_CONFIG.professor.name}</div>
                  <div className="text-xs text-slate-500">{SITE_CONFIG.professor.title}</div>
                </div>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="md:col-span-7 space-y-5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1D4ED8]">
                L&apos;Enseignant & La Mission
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
                « Je veux que chaque élève marocain puisse comprendre les maths. »
              </h2>

              <div className="space-y-3 text-base text-slate-600 leading-relaxed">
                <p>
                  Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles supérieures d&apos;ingénieurs et de médecine. Pourtant, des milliers d&apos;élèves motivés se heurtent à des barrières économiques ou géographiques.
                </p>
                <p>
                  En tant qu&apos;enseignant agrégé avec plus de 12 ans d&apos;expérience dans les lycées et classes préparatoires, j&apos;ai créé cette plateforme pour offrir la même qualité d&apos;explication rigoureuse à un élève à Oujda, Zagora, Tanger ou Casablanca — sans contrepartie financière.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D4ED8] hover:underline"
                >
                  <span>Découvrir la méthode pédagogique et le manifeste</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          7. MINIMAL TYPOGRAPHIC FAQ
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1D4ED8]">
              Questions Fréquentes
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Tout ce que tu dois savoir.
            </h2>
          </div>

          <div className="divide-y divide-[rgba(15,23,42,0.08)] border-y border-[rgba(15,23,42,0.08)]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-slate-900 hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1D4ED8] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed pr-8 animate-fadeIn">
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
          8. FINAL SIMPLE STATEMENT CTA
          ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAF9F5] border-t border-[rgba(15,23,42,0.08)] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Prêt à progresser en maths ?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Choisis ton niveau et commence dès aujourd&apos;hui. C&apos;est 100% gratuit, sans inscription requise.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/cours/2eme-bac"
              className="btn-editorial-primary w-full sm:w-auto"
            >
              <span>Accéder aux cours de 2ème Bac</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cours"
              className="btn-editorial-secondary w-full sm:w-auto"
            >
              <span>Explorer tous les niveaux</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Player (Privacy Enhanced) */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
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
