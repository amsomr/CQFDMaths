'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Star, Clock, FileText, CheckCircle } from 'lucide-react';
import { Chapter, LevelId, BranchId } from '@/data/types';
import { useLanguage } from './LanguageProvider';
import { SITE_CONFIG } from '@/data/site-config';

interface CourseCardProps {
  chapter: Chapter;
  levelId: LevelId;
  branchId: BranchId;
  branchName?: string;
}

export function CourseCard({ chapter, levelId, branchId, branchName }: CourseCardProps) {
  const { t, isRtl } = useLanguage();
  const totalLessons = chapter.lessons.length;
  const totalExercises = chapter.lessons.reduce((acc, l) => acc + l.exercises.length, 0);
  const totalMinutes = chapter.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);
  const firstLesson = chapter.lessons[0];

  const firstLessonUrl = firstLesson
    ? `/cours/${levelId}/${branchId}/${chapter.slug}/${firstLesson.slug}`
    : `/cours/${levelId}/${branchId}/${chapter.slug}`;

  const isMaths = branchId === 'sciences-maths';

  return (
    <div className="coursera-card overflow-hidden flex flex-col justify-between bg-white dark:bg-[#1a2332] group border border-gray-200 dark:border-gray-700/80 hover:border-[#0056d2] dark:hover:border-blue-500 rounded-lg transition-all shadow-xs hover:shadow-md">
      
      {/* 1. Coursera Card Header Visual / Banner */}
      <Link href={firstLessonUrl} className="block relative aspect-[16/9] bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 overflow-hidden select-none">
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Chapter monogram in center */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-200/90 block mb-1">
              Chapitre Officiel
            </span>
            <span className="font-sans text-lg sm:text-xl font-bold text-white line-clamp-1 px-2">
              {isRtl ? chapter.titleAr : chapter.title}
            </span>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
            isMaths
              ? 'bg-[#0056d2] text-white'
              : 'bg-emerald-700 text-white'
          }`}>
            {branchName || 'Mathématiques'}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5">
          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-300" />
            <span>~{totalMinutes} min</span>
          </span>
        </div>

        {/* Bottom Banner Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 flex items-center justify-between text-[11px] text-gray-300">
          <span className="truncate">{SITE_CONFIG.name} • {SITE_CONFIG.professor.name}</span>
          <span className="text-emerald-400 font-semibold shrink-0">100% Gratuit</span>
        </div>
      </Link>

      {/* 2. Course Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Institution label */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            <span>Programme Officiel BIOF</span>
          </div>

          {/* Title */}
          <Link href={firstLessonUrl} className="block group-hover:text-[#0056d2] dark:group-hover:text-blue-400 transition-colors">
            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
              {isRtl ? chapter.titleAr : chapter.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {chapter.description}
          </p>

          {/* Skills / Topics */}
          <div className="mt-3 flex flex-wrap gap-1">
            {chapter.lessons.slice(0, 3).map((lesson) => (
              <span
                key={lesson.slug}
                className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-medium"
              >
                {lesson.title.split('—')[0].trim()}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Rating & Metadata */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#b4690e] dark:text-amber-400">4.9</span>
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                ({(1200 + totalLessons * 150).toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              <span>{totalLessons} leçons</span>
              <span>•</span>
              <span>{totalExercises} exercices</span>
            </div>
          </div>

          <Link
            href={firstLessonUrl}
            className="mt-3 flex items-center justify-center w-full py-2 px-3 rounded text-xs font-semibold text-[#0056d2] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-[#0056d2] hover:text-white dark:hover:bg-[#0056d2] transition-colors border border-blue-200 dark:border-blue-900/60"
          >
            <span>Accéder au cours complet</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
