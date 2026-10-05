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

  const difficultyColors = {
    Normale: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Exigeante: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Très difficile': 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-semibold',
  };

  return (
    <div id={exam.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200">
              National {exam.year}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {exam.session === 'Normale' ? t.bac.normalSession : t.bac.remedialSession}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs border ${difficultyColors[exam.difficulty]}`}>
            {exam.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
          {exam.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Durée : {exam.durationHours}h</span>
          </span>
          <span>•</span>
          <span>Coefficient : {exam.coefficient}</span>
          <span>•</span>
          <span>{exam.totalExercises} Exercices</span>
        </div>

        {/* Key Topics List */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Thèmes abordés dans ce sujet :
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exam.keyTopics.map((topic, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
        {/* Subject PDF */}
        <a
          href={exam.subjectPdfUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>{t.bac.downloadSubject}</span>
        </a>

        {/* Correction PDF */}
        <a
          href={exam.correctionPdfUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t.bac.downloadCorrection}</span>
        </a>

        {/* Video Correction */}
        {exam.youtubeVideoId && (
          <a
            href={`https://youtube.com/watch?v=${exam.youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors mt-1"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>{t.bac.watchCorrection}</span>
          </a>
        )}
      </div>
    </div>
  );
}
