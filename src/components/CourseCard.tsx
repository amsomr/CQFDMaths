'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Chapter } from '@/data/types';
import { MathGraphic } from './MathGraphic';
import { TextWithMath } from './MathView';
import { useLanguage } from './LanguageProvider';

interface CourseCardProps {
  chapter: Chapter;
  levelId: string;
  branchId: string;
  branchName: string;
}

export function CourseCard({
  chapter,
  levelId,
  branchId,
  branchName,
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

  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-xl overflow-hidden border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg select-none"
    >
      {/* 1. Large Mathematical Visual Canvas */}
      <div className="relative border-b border-[rgba(15,23,42,0.06)] overflow-hidden">
        <MathGraphic topic={chapter.slug} />

        {/* Level badge in top-left */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FFFFFF]/95 backdrop-blur-xs border border-[rgba(15,23,42,0.08)] text-[11px] font-bold text-slate-800 shadow-2xs">
          {branchName}
        </div>

        {/* Duration pill in bottom-right */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/85 text-[11px] font-mono font-medium text-white flex items-center gap-1 shadow-2xs">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>~{hoursEstimate}h</span>
        </div>
      </div>

      {/* 2. Educational Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Domain tag */}
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] mb-1.5">
            {getDomainLabel(chapter.slug)}
          </div>

          {/* Chapter Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors leading-snug">
            {isRtl ? chapter.titleAr : chapter.title}
          </h3>

          {/* Concise Educational Description */}
          <div className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            <TextWithMath text={chapter.description} />
          </div>
        </div>

        {/* 3. Footer: Structured Content Counts & Discrete CTA */}
        <div className="pt-3 border-t border-[rgba(15,23,42,0.06)] flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{lessonCount} {lessonCount > 1 ? 'leçons' : 'leçon'}</span>
            </span>
            {exerciseCount > 0 && (
              <>
                <span className="text-slate-300">•</span>
                <span>{exerciseCount} exercices</span>
              </>
            )}
          </div>

          <span className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] group-hover:translate-x-1 transition-transform">
            <span>Étudier</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>
    </Link>
  );
}
