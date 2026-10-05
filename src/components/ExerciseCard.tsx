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
    facile: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
    moyen: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-600',
    difficile: 'bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-100 border-stone-400 dark:border-stone-500',
    'type-examen': 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold',
  };

  const difficultyLabel = {
    facile: t.exercises.easy,
    moyen: t.exercises.medium,
    difficile: t.exercises.hard,
    'type-examen': t.exercises.examType,
  }[exercise.difficulty];

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Exercise Header */}
      <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase tracking-wider border ${difficultyStyles[exercise.difficulty]}`}>
            {difficultyLabel}
          </span>
          {exercise.points && (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-stone-500 dark:text-stone-400">
              <Award className="w-3.5 h-3.5 text-stone-400" />
              {exercise.points} pts
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-stone-400">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>~{exercise.durationMinutes} min</span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6 space-y-4">
        <h4 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100">
          {exercise.title}
        </h4>
        <div className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
          <TextWithMath text={exercise.question} />
        </div>

        {/* Pro Tip in Darija/Arabic if available (Strictly NO emojis) */}
        {exercise.proTipDarija && (
          <div className="p-3.5 rounded-lg bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm flex items-start gap-3">
            <div className="w-6 h-6 rounded-sm bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0 text-stone-700 dark:text-stone-300 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1">
                {t.lesson.proTipDarija} :
              </span>
              <p className="leading-relaxed font-sans">{exercise.proTipDarija}</p>
            </div>
          </div>
        )}

        {/* Action Buttons: Hint & Solution */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-stone-100 dark:border-stone-800">
          {/* Hint Button */}
          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-stone-500" />
              <span>{showHint ? t.exercises.hideHint : t.exercises.showHint}</span>
              {showHint ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
            </button>
          )}

          {/* Solution Button */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{showSolution ? t.exercises.hideSolution : t.exercises.showSolution}</span>
            {showSolution ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Video Solution Link */}
          {exercise.videoSolutionId && (
            <a
              href={`https://youtube.com/watch?v=${exercise.videoSolutionId}${exercise.videoTimestamp ? `&t=${exercise.videoTimestamp}` : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 hover:underline ml-auto"
            >
              <Youtube className="w-3.5 h-3.5 fill-red-600" />
              <span>{t.exercises.videoCorrection}</span>
            </a>
          )}
        </div>

        {/* Revealed Hint Box */}
        {showHint && exercise.hint && (
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm animate-fadeIn">
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Indice Méthodologique :</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line font-sans">
              <TextWithMath text={exercise.hint} />
            </div>
          </div>
        )}

        {/* Revealed Solution Box */}
        {showSolution && (
          <div className="p-5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm animate-fadeIn space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 pb-2 border-b border-stone-200 dark:border-stone-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Correction Rédactionnelle Conforme au Barème Officiel</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line font-sans text-stone-800 dark:text-stone-200 text-sm sm:text-base">
              <TextWithMath text={exercise.solution} />
            </div>

            {/* Related lesson anchor if available */}
            {showLessonLink && exercise.lessonSlug && (
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <Link
                  href={`/cours/${exercise.levelId}/${exercise.branchId}/${exercise.chapterSlug}/${exercise.lessonSlug}`}
                  className="inline-flex items-center gap-1 font-sans text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 underline underline-offset-2"
                >
                  <span>Revoir le cours complet théorique</span>
                  <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
