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
        else {
          // open handled by parent
        }
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
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'exercise':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'bac':
        return <GraduationCap className="w-4 h-4 text-purple-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
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
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-mono"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {query.trim().length < 2 && (
          <div className="p-6 text-sm text-slate-500 dark:text-slate-400">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Recherches fréquentes
            </p>
            <div className="flex flex-wrap gap-2">
              {['Limites et continuité', 'Théorème TVI', 'Nombres Complexes', 'Fonction Exponentielle', 'Intégration par parties', 'Examen National 2025'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => handleQueryChange(term)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 transition-colors"
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
          <div className="overflow-y-auto p-4 sm:p-6 space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
            {results.length > 0 ? (
              results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getTypeIcon(res.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {res.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-1">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{res.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all ${
                      isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </Link>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
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
