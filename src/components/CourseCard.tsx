'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { Chapter } from '@/data/types';
import { MathGraphic } from './MathGraphic';
import { TextWithMath } from './MathView';
import { useLanguage } from './LanguageProvider';

interface CourseCardProps {
  chapter: Chapter;
  levelId: string;
  branchId: string;
  branchName: string;
  isFeatured?: boolean;
}

export function CourseCard({
  chapter,
  levelId,
  branchId,
  branchName,
  isFeatured = false,
}: CourseCardProps) {
  const { isRtl } = useLanguage();
  const href = `/cours/${levelId}/${branchId}/${chapter.slug}`;

  // Count lessons and exercises in this chapter
  const lessonCount = chapter.lessons.length;
  const exerciseCount = chapter.lessons.reduce((acc, l) => acc + (l.exercises?.length || 0), 0);
  const totalMinutes = chapter.lessons.reduce((acc, l) => acc + (l.estimatedMinutes || 45), 0);
  const hoursEstimate = Math.max(1, Math.round(totalMinutes / 60));

  // Extract a clean topic domain label (e.g., ANALYSE, ALGÈBRE, GÉOMÉTRIE)
  const getDomainLabel = (slug: string) => {
    if (slug.includes('limite') || slug.includes('integr') || slug.includes('derivat')) return 'ANALYSE';
    if (slug.includes('complexe') || slug.includes('polynom')) return 'ALGÈBRE';
    if (slug.includes('trigo') || slug.includes('barycentre')) return 'GÉOMÉTRIE';
    if (slug.includes('logique') || slug.includes('ensembles')) return 'FONDEMENTS';
    return 'MATHÉMATIQUES';
  };

  if (isFeatured) {
    return (
      <Link
        href={href}
        className="group relative flex flex-col md:flex-row bg-white rounded-[18px] overflow-hidden border border-[#0F172A]/10 hover:border-[#1D4ED8] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl select-none md:col-span-2 lg:col-span-2"
      >
        {/* Large Visual on left/top */}
        <div className="relative md:w-1/2 border-b md:border-b-0 md:border-r border-[#0F172A]/08 overflow-hidden bg-[#F8F9FA] flex items-center justify-center">
          <MathGraphic topic={chapter.slug} variant="featured" className="h-full" />

          {/* Level badge in top-left */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-[6px] bg-white/95 backdrop-blur-xs border border-[#0F172A]/10 text-xs font-bold text-[#0F172A] shadow-2xs">
            {branchName}
          </div>

          <div className="absolute top-4 right-4 px-3 py-1 rounded-[6px] bg-[#1D4ED8] text-white text-xs font-black shadow-xs">
            Module Clé Bac
          </div>

          {/* Duration pill in bottom-right */}
          <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-[6px] bg-[#0A192F]/90 text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>~{hoursEstimate}h de cours</span>
          </div>
        </div>

        {/* Content on right */}
        <div className="p-7 md:w-1/2 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8]">
              <span>{getDomainLabel(chapter.slug)}</span>
              <span>•</span>
              <span className="text-[#64748B]">{lessonCount} leçons complètes</span>
            </div>

            <h3 className="text-2xl font-black text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
              {isRtl ? chapter.titleAr : chapter.title}
            </h3>

            <div className="text-sm sm:text-base text-[#475569] leading-relaxed">
              <TextWithMath text={chapter.description} />
            </div>

            {/* Quick highlights */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#334155]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FAF9F5] border border-[#0F172A]/08">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Cours magistral vidéo</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FAF9F5] border border-[#0F172A]/08">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{exerciseCount} exercices résolus</span>
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#0F172A]/08 flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B]">
              Conforme au Cadre de Référence Officiel
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-sm text-[#1D4ED8] group-hover:translate-x-1 transition-transform">
              <span>Étudier ce module</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Standard Standard Card (enlarged)
  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#0F172A]/10 hover:border-[#1D4ED8] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg select-none"
    >
      {/* 1. Large Mathematical Visual Canvas */}
      <div className="relative border-b border-[#0F172A]/08 overflow-hidden bg-[#F8F9FA]">
        <MathGraphic topic={chapter.slug} />

        {/* Level badge in top-left */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-[6px] bg-white/95 backdrop-blur-xs border border-[#0F172A]/10 text-xs font-bold text-[#0F172A] shadow-2xs">
          {branchName}
        </div>

        {/* Duration pill in bottom-right */}
        <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-[6px] bg-[#0A192F]/90 text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-slate-300" />
          <span>~{hoursEstimate}h</span>
        </div>
      </div>

      {/* 2. Educational Content & Metadata */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Domain tag */}
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D4ED8] mb-1.5">
            {getDomainLabel(chapter.slug)}
          </div>

          {/* Chapter Title */}
          <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors leading-snug">
            {isRtl ? chapter.titleAr : chapter.title}
          </h3>

          {/* Concise Educational Description */}
          <div className="mt-2 text-sm text-[#475569] line-clamp-2 leading-relaxed">
            <TextWithMath text={chapter.description} />
          </div>
        </div>

        {/* 3. Footer: Structured Content Counts & Discrete CTA */}
        <div className="pt-4 border-t border-[#0F172A]/08 flex items-center justify-between text-xs text-[#64748B] font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#94A3B8]" />
              <span>{lessonCount} {lessonCount > 1 ? 'leçons' : 'leçon'}</span>
            </span>
            {exerciseCount > 0 && (
              <>
                <span className="text-[#CBD5E1]">•</span>
                <span>{exerciseCount} exercices</span>
              </>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 font-bold text-[#1D4ED8] group-hover:translate-x-1 transition-transform">
            <span>Explorer</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>
    </Link>
  );
}
