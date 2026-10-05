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

  return (
    <div className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Branch / Tag Badge & Duration */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            {branchName || 'Mathématiques'}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-stone-500 dark:text-stone-400">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{totalMinutes} min</span>
          </span>
        </div>

        {/* Chapter Title */}
        <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors line-clamp-1">
          {isRtl ? chapter.titleAr : chapter.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2 font-sans">
          {chapter.description}
        </p>

        {/* Lessons Preview list */}
        {chapter.lessons.length > 0 && (
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {totalLessons} {t.courses.lessonsCount} au programme :
            </div>
            {chapter.lessons.slice(0, 2).map((lesson) => (
              <div key={lesson.slug} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                <span className="truncate">{lesson.title}</span>
              </div>
            ))}
            {chapter.lessons.length > 2 && (
              <div className="font-mono text-[11px] text-stone-400 dark:text-stone-500 pl-5">
                +{chapter.lessons.length - 2} autres leçons et fiches
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer Button */}
      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800">
        <Link
          href={firstLessonUrl}
          className="inline-flex items-center justify-between w-full py-2 px-3 rounded-lg text-xs sm:text-sm font-medium bg-stone-50 hover:bg-stone-900 hover:text-white dark:bg-stone-800 dark:hover:bg-stone-100 dark:hover:text-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-all group/btn"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.courses.startLearning}</span>
          </span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
        </Link>
      </div>
    </div>
  );
}
