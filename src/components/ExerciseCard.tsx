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

  const difficultyColors = {
    facile: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    moyen: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    difficile: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'type-examen': 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800 font-semibold',
  };

  const difficultyLabel = {
    facile: t.exercises.easy,
    moyen: t.exercises.medium,
    difficile: t.exercises.hard,
    'type-examen': t.exercises.examType,
  }[exercise.difficulty];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Exercise Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[exercise.difficulty]}`}>
            {difficultyLabel}
          </span>
          {exercise.points && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {exercise.points} pts
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>~{exercise.durationMinutes} min</span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
          {exercise.title}
        </h4>
        <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          <TextWithMath text={exercise.question} />
        </div>

        {/* Pro Tip in Darija/Arabic if available */}
        {exercise.proTipDarija && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
            <span className="text-base select-none">💡</span>
            <div>
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                {t.lesson.proTipDarija} :
              </span>
              <p className="leading-relaxed">{exercise.proTipDarija}</p>
            </div>
          </div>
        )}

        {/* Action Buttons: Hint & Solution */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Hint Button */}
          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-800/80 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{showHint ? t.exercises.hideHint : t.exercises.showHint}</span>
              {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Solution Button */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-colors"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 hover:underline"
            >
              <Youtube className="w-4 h-4" />
              <span>{t.exercises.videoCorrection}</span>
            </a>
          )}
        </div>

        {/* Revealed Hint Box */}
        {showHint && exercise.hint && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-slate-800 dark:text-slate-200 text-sm animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Indice méthodologique :</span>
            </div>
            <p className="leading-relaxed whitespace-pre-line">
              <TextWithMath text={exercise.hint} />
            </p>
          </div>
        )}

        {/* Revealed Solution Box */}
        {showSolution && (
          <div className="mt-4 p-5 sm:p-6 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200 text-sm sm:text-base animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-3 text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Correction Rédactionnelle & Barème Officiel</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
              <TextWithMath text={exercise.solution} />
            </div>

            {/* Related lesson anchor if available */}
            {showLessonLink && exercise.lessonSlug && (
              <div className="mt-5 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex justify-end">
                <Link
                  href={`/cours/${exercise.levelId}/${exercise.branchId}/${exercise.chapterSlug}/${exercise.lessonSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
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
