import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CURRICULUM_LEVELS, getLevelById } from '@/data/curriculum';
import { SITE_CONFIG } from '@/data/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BreadcrumbJsonLd, ChapterCourseJsonLd } from '@/components/JsonLd';
import { ChapterContentHub } from '@/components/ChapterContentHub';
import { BookOpen, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface ChapterPageProps {
  params: Promise<{ level: string; branch: string; chapter: string }>;
}

export async function generateStaticParams() {
  const paths: { level: string; branch: string; chapter: string }[] = [];
  for (const lvl of CURRICULUM_LEVELS) {
    for (const br of lvl.branches) {
      for (const ch of br.chapters) {
        paths.push({ level: lvl.id, branch: br.id, chapter: ch.slug });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { level: levelId, branch: branchId, chapter: chapterSlug } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  const chapter = branch?.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return { title: 'Chapitre Introuvable' };

  return {
    title: `${chapter.title} — Cours, Vidéos et Exercices Corrigés (${branch?.shortName}) | ${SITE_CONFIG.name}`,
    description: `Chapitre complet de mathématiques : ${chapter.title} pour ${branch?.name}. Résumés, théorèmes et exercices corrigés.`,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { level: levelId, branch: branchId, chapter: chapterSlug } = await params;
  const level = getLevelById(levelId);
  const branch = level?.branches.find((b) => b.id === branchId);
  const chapter = branch?.chapters.find((c) => c.slug === chapterSlug);

  if (!level || !branch || !chapter) notFound();

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <BreadcrumbJsonLd
          items={[
            { name: 'Tous les Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
          ]}
        />
        <ChapterCourseJsonLd
          title={chapter.title}
          description={chapter.description}
          levelName={level.name}
          branchName={branch.name}
          url={`/cours/${level.id}/${branch.id}/${chapter.slug}`}
          lessons={chapter.lessons.map((l) => ({ title: l.title, slug: l.slug }))}
        />

        <Breadcrumb
          items={[
            { name: 'Tous les Cours', url: '/cours' },
            { name: level.name, url: `/cours/${level.id}` },
            { name: branch.shortName, url: `/cours/${level.id}/${branch.id}` },
            { name: chapter.title, url: `/cours/${level.id}/${branch.id}/${chapter.slug}` },
          ]}
        />

        <div className="space-y-4 max-w-3xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Chapitre Officiel BIOF</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-sans leading-tight">
            {chapter.title}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {chapter.description} Retrouvez les leçons séquencées, les définitions clés et les exercices d&apos;entraînement associés.
          </p>
        </div>

        {/* AI Citability & Objective Target Block */}
        <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>Objectifs Pédagogiques Officiels • {branch.shortName}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Quels sont les prérequis et compétences exigibles pour le chapitre {chapter.title} ?
          </h2>
          <p className="text-base text-[#334155] leading-relaxed">
            Le chapitre {chapter.title} constitue un axe majeur du programme de mathématiques en {branch.name} ({level.name}). Conçu en stricte conformité avec le cadre ministériel marocain, il regroupe les définitions théoriques rigoureuses, les théorèmes fondamentaux et les méthodes de démonstration requises aux contrôles continus et aux examens du Baccalauréat. L&apos;apprentissage s&apos;articule autour de {chapter.lessons.length} leçons séquencées accompagnées de cours vidéo au tableau virtuel animés par le Professeur Jamaa Aknari, de fiches de synthèse téléchargeables et de séries d&apos;exercices avec solutions détaillées. La maîtrise de ces notions assure aux élèves l&apos;acquisition d&apos;automatismes solides indispensables pour aborder sereinement les épreuves certificatives et les concours d&apos;accès aux études supérieures.
          </p>
        </div>

        {/* Interactive Structured Tabs Hub (Leçons, Fiches PDF, Séries & Corrigés, Devoirs) */}
        <ChapterContentHub chapter={chapter} level={level} branch={branch} />

      </div>
    </div>
  );
}
