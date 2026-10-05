'use client';

import React from 'react';
import { Download, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { BacExam } from '@/data/types';
import { useLanguage } from './LanguageProvider';

interface BacExamCardProps {
  exam: BacExam;
}

export function BacExamCard({ exam }: BacExamCardProps) {
  const { t } = useLanguage();

  return (
    <div id={exam.id} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase px-2 py-0.5 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
              National {exam.year}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              {exam.session === 'Normale' ? t.bac.normalSession : t.bac.remedialSession}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
            {exam.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">
          {exam.title}
        </h3>
        <div className="flex items-center gap-3 font-mono text-xs text-stone-500 dark:text-stone-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{exam.durationHours}h</span>
          </span>
          <span>•</span>
          <span>Coeff. {exam.coefficient}</span>
          <span>•</span>
          <span>{exam.totalExercises} Exercices</span>
        </div>

        {/* Key Topics List */}
        <div className="space-y-1.5 pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="font-mono text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Thèmes abordés dans ce sujet :
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exam.keyTopics.map((topic, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 font-sans"
              >
                <CheckCircle2 className="w-3 h-3 text-stone-400 shrink-0" />
                <span>{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2">
        {/* Subject PDF */}
        <a
          href={exam.subjectPdfUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-stone-500" />
          <span>{t.bac.downloadSubject}</span>
        </a>

        {/* Correction PDF */}
        <a
          href={exam.correctionPdfUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-stone-500" />
          <span>{t.bac.downloadCorrection}</span>
        </a>

        {/* Video Correction */}
        {exam.youtubeVideoId && (
          <a
            href={`https://youtube.com/watch?v=${exam.youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors mt-1"
          >
            <Youtube className="w-3.5 h-3.5 fill-red-600" />
            <span>{t.bac.watchCorrection}</span>
          </a>
        )}
      </div>
    </div>
  );
}
