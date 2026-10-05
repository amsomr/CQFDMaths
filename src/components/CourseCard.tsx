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
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Branch / Tag Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
            {branchName || 'Mathématiques'}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{totalMinutes} min</span>
          </span>
        </div>

        {/* Chapter Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {isRtl ? chapter.titleAr : chapter.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {chapter.description}
        </p>

        {/* Lessons Preview list */}
        {chapter.lessons.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {totalLessons} {t.courses.lessonsCount} au programme :
            </div>
            {chapter.lessons.slice(0, 2).map((lesson) => (
              <div key={lesson.slug} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{lesson.title}</span>
              </div>
            ))}
            {chapter.lessons.length > 2 && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-5">
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
          className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 transition-colors group/btn"
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
