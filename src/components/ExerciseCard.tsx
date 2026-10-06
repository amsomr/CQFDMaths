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
    facile: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    moyen: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
    difficile: 'bg-amber-50 text-amber-800 border-amber-200',
    'type-examen': 'bg-purple-50 text-purple-800 border-purple-200 font-bold',
  };

  const difficultyDots = {
    facile: 'bg-emerald-600',
    moyen: 'bg-[#1D4ED8]',
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
    <div className="rounded-[14px] border border-[#0F172A]/10 bg-white shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden font-sans">
      {/* Exercise Header */}
      <div className="px-6 py-4 border-b border-[#0F172A]/10 bg-[#FAF9F5] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-semibold border ${difficultyStyles[exercise.difficulty]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${difficultyDots[exercise.difficulty]}`} />
            <span>{difficultyLabel}</span>
          </span>
          {exercise.points && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F172A]">
              <Award className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{exercise.points} pts</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#64748B]">
          <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span>~{exercise.durationMinutes} min de recherche</span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-7 space-y-5">
        <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
          <TextWithMath text={exercise.title} />
        </h4>
        <div className="text-[#334155] text-sm sm:text-base leading-relaxed whitespace-pre-line">
          <TextWithMath text={exercise.question} />
        </div>

        {/* Pro Tip in Darija/Arabic if available */}
        {exercise.proTipDarija && (
          <div className="p-4 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-[6px] bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE68A]">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#92400E] block mb-0.5">
                {t.lesson.proTipDarija} :
              </span>
              <p className="leading-relaxed font-arabic" dir="rtl">{exercise.proTipDarija}</p>
            </div>
          </div>
        )}

        {/* Action Buttons: Hint & Solution */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#0F172A]/10">
          {/* Hint Button */}
          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs sm:text-sm font-semibold border border-[#0F172A]/15 text-[#475569] hover:bg-[#FAF9F5] transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-[#B45309]" />
              <span>{showHint ? t.exercises.hideHint : t.exercises.showHint}</span>
              {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Solution Button */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-xs sm:text-sm font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-[#CC0000] hover:underline ml-auto"
            >
              <Youtube className="w-4 h-4 fill-[#CC0000]" />
              <span>{t.exercises.videoCorrection}</span>
            </a>
          )}
        </div>

        {/* Revealed Hint Box */}
        {showHint && exercise.hint && (
          <div className="p-5 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#92400E]">
              <Lightbulb className="w-4 h-4 text-[#B45309]" />
              <span>Indice Méthodologique de Résolution :</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line text-[#78350F]">
              <TextWithMath text={exercise.hint} />
            </div>
          </div>
        )}

        {/* Revealed Solution Box */}
        {showSolution && (
          <div className="p-6 rounded-[12px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#0F172A] text-sm space-y-4">
            <div className="flex items-center gap-2 font-extrabold text-[#166534] pb-3 border-b border-[#BBF7D0] text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              <span>Correction Rédactionnelle Conforme au Barème Officiel</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line text-[#1E293B] bg-white p-5 rounded-[8px] border border-[#BBF7D0]/60">
              <TextWithMath text={exercise.solution} />
            </div>

            {/* Related lesson anchor if available */}
            {showLessonLink && exercise.lessonSlug && (
              <div className="pt-2 flex justify-end">
                <Link
                  href={`/cours/${exercise.levelId}/${exercise.branchId}/${exercise.chapterSlug}/${exercise.lessonSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D4ED8] hover:underline"
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
