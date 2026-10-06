'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, CheckCircle, GraduationCap, Video, ArrowRight } from 'lucide-react';
import { searchAll, SearchResultItem } from '@/lib/search-index';
import { useLanguage } from './LanguageProvider';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isRtl } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      setResults(searchAll(val));
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  // Group results by type: lessons, exercises, bac, videos
  const lessons = results.filter((r) => r.type === 'lesson');
  const exercises = results.filter((r) => r.type === 'exercise');
  const bacExams = results.filter((r) => r.type === 'bac');
  const videos = results.filter((r) => r.type === 'video');

  const popularSearches = [
    'Théorème TVI',
    'Limites et continuité',
    'Nombres complexes',
    'Calcul intégral',
    'Exponentielle',
    'Examen National 2025',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large Editorial Search Input */}
        <div className="flex items-center px-5 sm:px-6 py-4 border-b border-[rgba(15,23,42,0.08)] gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#1D4ED8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Que veux-tu réviser ? (ex: TVI, Limites, Complexes...)"
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base sm:text-lg font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="font-mono text-xs px-2 py-1 rounded bg-slate-200/80 text-slate-600 hover:bg-slate-300 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips when search is empty */}
        {query.trim().length < 2 && (
          <div className="p-6 text-sm">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Recherches fréquentes
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQueryChange(term)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[rgba(15,23,42,0.08)] hover:border-[#1D4ED8] hover:text-[#1D4ED8] text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Astuce : utilise les flèches du clavier ou clique directement</span>
              <span className="font-mono">MathsMaroc • 2026</span>
            </div>
          </div>
        )}

        {/* Grouped Results Display */}
        {query.trim().length >= 2 && (
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            {results.length === 0 ? (
              <div className="py-12 text-center space-y-1">
                <p className="font-bold text-slate-900 text-base">
                  Aucun résultat pour « {query} »
                </p>
                <p className="text-xs text-slate-500">
                  Essaie des termes plus généraux comme « limites », « dérivation » ou « complexe ».
                </p>
              </div>
            ) : (
              <>
                {/* 1. Cours & Leçons */}
                {lessons.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Cours Théoriques ({lessons.length})</span>
                    </div>
                    <div className="space-y-1">
                      {lessons.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF9F5] border border-transparent hover:border-[rgba(15,23,42,0.08)] transition-all group"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#1D4ED8] mr-2">
                              {item.badge}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors">
                              {item.title}
                            </span>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1D4ED8] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Annales du Bac */}
                {bacExams.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Examens Nationaux du Bac ({bacExams.length})</span>
                    </div>
                    <div className="space-y-1">
                      {bacExams.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF9F5] border border-transparent hover:border-[rgba(15,23,42,0.08)] transition-all group"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 mr-2">
                              {item.badge}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                              {item.title}
                            </span>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Exercices Corrigés */}
                {exercises.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Exercices Corrigés ({exercises.length})</span>
                    </div>
                    <div className="space-y-1">
                      {exercises.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF9F5] border border-transparent hover:border-[rgba(15,23,42,0.08)] transition-all group"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 mr-2">
                              {item.badge}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                              {item.title}
                            </span>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Vidéos YouTube */}
                {videos.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#CC0000] flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>Vidéos Pédagogiques ({videos.length})</span>
                    </div>
                    <div className="space-y-1">
                      {videos.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAF9F5] border border-transparent hover:border-[rgba(15,23,42,0.08)] transition-all group"
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-red-50 text-[#CC0000] mr-2">
                              {item.badge}
                            </span>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-[#CC0000] transition-colors">
                              {item.title}
                            </span>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.subtitle}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#CC0000] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
