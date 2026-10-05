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
        return <BookOpen className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'exercise':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'bac':
        return <GraduationCap className="w-4 h-4 text-stone-700 dark:text-stone-200" />;
      case 'video':
        return <Video className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm sm:text-base font-sans focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="font-mono text-xs px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {query.trim().length < 2 && (
          <div className="p-6 text-sm text-stone-500 dark:text-stone-400">
            <p className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mb-3">
              Recherches fréquentes
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {['Limites et continuité', 'Théorème TVI', 'Nombres Complexes', 'Fonction Exponentielle', 'Intégration par parties', 'Examen National 2025'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => handleQueryChange(term)}
                    className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 transition-colors"
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
          <div className="overflow-y-auto p-4 sm:p-5 space-y-1.5 divide-y divide-stone-100 dark:divide-stone-800/80">
            {results.length > 0 ? (
              results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-md bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                      {getTypeIcon(res.type)}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        {res.badge}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 mt-1">
                        {res.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-sans">{res.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-1 transition-all ${
                      isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </Link>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="font-serif text-sm font-medium text-stone-800 dark:text-stone-200">
                  {t.search.noResults} « {query} »
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-sans">{t.search.noResultsSub}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
