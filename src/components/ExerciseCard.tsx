'use client';

import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, ChevronDown, ChevronUp, Award, Clock, ArrowRight } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { Exercise } from '@/data/types';
import { TextWithMath } from './MathView';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';

interface ExerciseCardProps {
  exercise: Exercise;
  showLessonLink?: boolean;
}

export function ExerciseCard({ exercise, showLessonLink = true }: ExerciseCardProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const { t, isRtl } = useLanguage();

  const difficultyStyles = {
    facile: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    moyen: 'bg-blue-50 text-[#0056d2] border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    difficile: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'type-examen': 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 font-semibold',
  };

  const difficultyDots = {
    facile: 'bg-emerald-600',
    moyen: 'bg-[#0056d2]',
    difficile: 'bg-amber-600',
    'type-examen': 'bg-purple-600',
  };

  const difficultyLabel = {
    facile: t.exercises.easy,
    moyen: t.exercises.medium,
    difficile: t.exercises.hard,
    'type-examen': t.exercises.examType,
  }[exercise.difficulty];

  return (
    <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden font-sans">
      {/* Exercise Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold border ${difficultyStyles[exercise.difficulty]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${difficultyDots[exercise.difficulty]}`} />
            <span>{difficultyLabel}</span>
          </span>
          {exercise.points && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{exercise.points} pts</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>~{exercise.durationMinutes} min</span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6 space-y-4">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          {exercise.title}
        </h4>
        <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          <TextWithMath text={exercise.question} />
        </div>

        {/* Pro Tip in Darija/Arabic if available (Strictly NO emojis) */}
        {exercise.proTipDarija && (
          <div className="p-4 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/70 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-300 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                {t.lesson.proTipDarija} :
              </span>
              <p className="leading-relaxed" dir="rtl">{exercise.proTipDarija}</p>
            </div>
          </div>
        )}

        {/* Action Buttons: Hint & Solution */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Hint Button */}
          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{showHint ? t.exercises.hideHint : t.exercises.showHint}</span>
              {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Solution Button */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-[#0056d2] text-white hover:bg-[#00419e] transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{showSolution ? t.exercises.hideSolution : t.exercises.showSolution}</span>
            {showSolution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Video Solution Link */}
          {exercise.videoSolutionId && (
            <a
              href={`https://youtube.com/watch?v=${exercise.videoSolutionId}${exercise.videoTimestamp ? `&t=${exercise.videoTimestamp}` : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#cc0000] hover:underline ml-auto"
            >
              <Youtube className="w-4 h-4 fill-[#cc0000]" />
              <span>{t.exercises.videoCorrection}</span>
            </a>
          )}
        </div>

        {/* Revealed Hint Box */}
        {showHint && exercise.hint && (
          <div className="p-4 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Indice Méthodologique :</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line">
              <TextWithMath text={exercise.hint} />
            </div>
          </div>
        )}

        {/* Revealed Solution Box */}
        {showSolution && (
          <div className="p-5 sm:p-6 rounded-md bg-[#f0fdf4] dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100 text-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 pb-2 border-b border-emerald-200 dark:border-emerald-800 text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Correction Rédactionnelle Conforme au Barème Officiel</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 text-sm sm:text-base">
              <TextWithMath text={exercise.solution} />
            </div>

            {/* Related lesson anchor if available */}
            {showLessonLink && exercise.lessonSlug && (
              <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 flex justify-end">
                <Link
                  href={`/cours/${exercise.levelId}/${exercise.branchId}/${exercise.chapterSlug}/${exercise.lessonSlug}`}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0056d2] hover:underline"
                >
                  <span>Revoir le cours complet théorique</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
