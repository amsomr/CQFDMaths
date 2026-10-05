'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Chapter, LevelId, BranchId } from '@/data/types';
import { useLanguage } from './LanguageProvider';

interface CourseCardProps {
  chapter: Chapter;
  levelId: LevelId;
  branchId: BranchId;
  branchName?: string;
}

export function CourseCard({ chapter, levelId, branchId, branchName }: CourseCardProps) {
  const { t, isRtl } = useLanguage();
  const totalLessons = chapter.lessons.length;
  const totalMinutes = chapter.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);
  const firstLesson = chapter.lessons[0];

  const firstLessonUrl = firstLesson
    ? `/cours/${levelId}/${branchId}/${chapter.slug}/${firstLesson.slug}`
    : `/cours/${levelId}/${branchId}/${chapter.slug}`;

  const isMaths = branchId === 'sciences-maths';

  return (
    <div className="group rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Branch / Tag Badge & Duration */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
            isMaths
              ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
          }`}>
            {branchName || 'Mathématiques'}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{totalMinutes} min</span>
          </span>
        </div>

        {/* Chapter Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {isRtl ? chapter.titleAr : chapter.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {chapter.description}
        </p>

        {/* Lessons Preview list */}
        {chapter.lessons.length > 0 && (
          <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {totalLessons} {t.courses.lessonsCount} au programme :
            </div>
            {chapter.lessons.slice(0, 2).map((lesson) => (
              <div key={lesson.slug} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{lesson.title}</span>
              </div>
            ))}
            {chapter.lessons.length > 2 && (
              <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 pl-5">
                +{chapter.lessons.length - 2} autres leçons et exercices
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer Button */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={firstLessonUrl}
          className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all group/btn"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{t.courses.startLearning}</span>
          </span>
          <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
        </Link>
      </div>
    </div>
  );
}
