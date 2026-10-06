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
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      const res = searchAll(val);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4 text-[#0056d2]" />;
      case 'exercise':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'bac':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-[#cc0000]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-xs font-sans">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-[#0056d2] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {query.trim().length < 2 && (
          <div className="p-6 text-sm text-slate-500 dark:text-slate-400">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Recherches fréquentes
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Limites et continuité', 'Théorème TVI', 'Nombres Complexes', 'Fonction Exponentielle', 'Intégration par parties', 'Examen National 2025'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => handleQueryChange(term)}
                    className="px-2.5 py-1 rounded-md bg-[#f8fafc] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 hover:text-[#0056d2] hover:border-blue-200 transition-colors font-medium"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim().length >= 2 && (
          <div className="overflow-y-auto p-4 sm:p-5 space-y-1 divide-y divide-slate-100 dark:divide-slate-800">
            {results.length > 0 ? (
              results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-[#ebf3ff]/60 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded bg-[#f8fafc] dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      {getTypeIcon(res.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                        {res.badge}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0056d2] mt-0.5 transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{res.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-slate-400 group-hover:text-[#0056d2] group-hover:translate-x-1 transition-all ${
                      isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </Link>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {t.search.noResults} « {query} »
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.search.noResultsSub}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
