'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, CheckCircle2, Clock, Award, Eye, BookOpen } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { BacExam } from '@/data/types';
import { useLanguage } from './LanguageProvider';

interface BacExamCardProps {
  exam: BacExam;
  onViewExam?: (exam: BacExam, mode: 'sujet' | 'corrige') => void;
}

export function BacExamCard({ exam, onViewExam }: BacExamCardProps) {
  const { t } = useLanguage();

  const difficultyColors = {
    Normale: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Exigeante: 'bg-amber-50 text-amber-800 border-amber-200',
    'Très difficile': 'bg-rose-50 text-rose-800 border-rose-200 font-semibold',
  };

  return (
    <div id={exam.id} className="rounded-[16px] bg-white border border-[#0F172A]/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#1D4ED8] transition-all shadow-2xs hover:shadow-md relative overflow-hidden group">
      
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D4ED8] via-[#B45309] to-[#1D4ED8]" />

      <div>
        {/* Header - Ministry exam paper styling */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-[6px] text-xs font-black bg-[#1D4ED8] text-white shadow-2xs">
              National {exam.year}
            </span>
            <span className="px-2.5 py-1 rounded-[6px] text-xs font-semibold bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10">
              {exam.session === 'Normale' ? t.bac.normalSession : t.bac.remedialSession}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-[6px] text-xs border ${difficultyColors[exam.difficulty]}`}>
            {exam.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1.5 group-hover:text-[#1D4ED8] transition-colors">
          {exam.title}
        </h3>
        <p className="text-xs font-semibold text-[#1D4ED8] mb-3">
          {exam.branchName}
        </p>

        {/* Exam specifications */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mb-5 font-mono">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Durée : {exam.durationHours}h</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-[#0F172A]">
            <Award className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Coefficient {exam.coefficient}</span>
          </span>
          {exam.totalExercises && (
            <>
              <span>•</span>
              <span>{exam.totalExercises} Exercices au barème</span>
            </>
          )}
        </div>

        {/* Key Topics List with cross-links */}
        <div className="space-y-2 pt-4 border-t border-[#0F172A]/10">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center justify-between">
            <span>Thèmes au barème ministériel :</span>
            <span className="text-[10px] text-[#1D4ED8] lowercase font-normal">cliquez pour réviser le cours</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exam.keyTopics.map((topic, idx) => {
              const matchedSlug = exam.chapterSlugs?.[idx];
              if (matchedSlug) {
                return (
                  <Link
                    key={idx}
                    href={`/cours/2eme-bac/${exam.branchId}/${matchedSlug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-xs bg-[#FAF9F5] hover:bg-blue-50 text-[#334155] hover:text-[#1D4ED8] border border-[#0F172A]/10 hover:border-[#1D4ED8]/30 font-medium transition-colors"
                  >
                    <BookOpen className="w-3 h-3 text-[#1D4ED8] shrink-0" />
                    <span>{topic}</span>
                  </Link>
                );
              }
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-xs bg-[#FAF9F5] text-[#334155] border border-[#0F172A]/10 font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#1D4ED8] shrink-0" />
                  <span>{topic}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-5 border-t border-[#0F172A]/10 space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Subject PDF: View in Modal or Open */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onViewExam ? onViewExam(exam, 'sujet') : window.open(exam.subjectPdfUrl, '_blank')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[8px] text-xs font-bold bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors shadow-2xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sujet (Aperçu)</span>
            </button>
            <a
              href={exam.subjectPdfUrl}
              download
              className="p-2.5 rounded-[8px] bg-[#FAF9F5] hover:bg-slate-100 text-slate-700 border border-[#0F172A]/10 transition-colors"
              title="Télécharger le Sujet PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Correction PDF: View in Modal or Open */}
          <div className="flex items-center gap-1">
            {exam.correctionPdfUrl ? (
              <>
                <button
                  type="button"
                  onClick={() => onViewExam ? onViewExam(exam, 'corrige') : window.open(exam.correctionPdfUrl, '_blank')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[8px] text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Corrigé</span>
                </button>
                <a
                  href={exam.correctionPdfUrl}
                  download
                  className="p-2.5 rounded-[8px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                  title="Télécharger le Corrigé PDF"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                </a>
              </>
            ) : (
              <span className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-[8px] text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200">
                Corrigé en rédaction
              </span>
            )}
          </div>
        </div>

        {/* Video Correction */}
        {exam.youtubeVideoId && (
          <a
            href={`https://youtube.com/watch?v=${exam.youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[8px] text-xs font-bold text-white bg-[#CC0000] hover:bg-[#b00000] transition-colors shadow-xs"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>{t.bac.watchCorrection}</span>
          </a>
        )}
      </div>
    </div>
  );
}

