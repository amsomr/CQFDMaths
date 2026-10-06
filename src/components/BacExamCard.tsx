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
    Normale: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    Exigeante: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'Très difficile': 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800 font-semibold',
  };

  return (
    <div id={exam.id} className="coursera-card bg-white dark:bg-[#1a2332] p-5 sm:p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700/80 hover:border-[#0056d2] rounded-lg transition-all shadow-xs hover:shadow-md">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#0056d2] text-white">
              National {exam.year}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {exam.session === 'Normale' ? t.bac.normalSession : t.bac.remedialSession}
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs border ${difficultyColors[exam.difficulty]}`}>
            {exam.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
          {exam.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Durée : {exam.durationHours}h</span>
          </span>
          <span>•</span>
          <span>Coefficient {exam.coefficient}</span>
          <span>•</span>
          <span>{exam.totalExercises} Exercices</span>
        </div>

        {/* Key Topics List */}
        <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Thèmes abordés dans le sujet :
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exam.keyTopics.map((topic, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700"
              >
                <CheckCircle2 className="w-3 h-3 text-[#0056d2] shrink-0" />
                <span>{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <div className="flex items-center gap-2">
          {/* Subject PDF */}
          <a
            href={exam.subjectPdfUrl}
            download
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-gray-600" />
            <span>{t.bac.downloadSubject}</span>
          </a>

          {/* Correction PDF */}
          <a
            href={exam.correctionPdfUrl}
            download
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-[#0a8543] dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#0a8543]" />
            <span>{t.bac.downloadCorrection}</span>
          </a>
        </div>

        {/* Video Correction */}
        {exam.youtubeVideoId && (
          <a
            href={`https://youtube.com/watch?v=${exam.youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>{t.bac.watchCorrection}</span>
          </a>
        )}
      </div>
    </div>
  );
}
