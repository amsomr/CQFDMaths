'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { searchAll, SearchResultItem } from '@/lib/search-index';
import { useLanguage } from '@/components/LanguageProvider';
import { Search, BookOpen, CheckCircle, GraduationCap, Video, ArrowRight, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (initialQuery) {
      setResults(searchAll(initialQuery));
    }
  }, [initialQuery]);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      setResults(searchAll(val));
    } else {
      setResults([]);
    }
  };

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'exercise':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'bac':
        return <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Recherche', url: '/recherche' }]} />

        {/* Page Title & Search Bar */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs">
            <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Moteur de Recherche Dédié</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
            Index & Moteur de Recherche
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans">
            Accède instantanément à une notion, un théorème, un exercice corrigé ou un sujet d&apos;examen national.
          </p>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-sm sm:text-base font-sans shadow-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Search Suggestions */}
        <div className="flex flex-wrap items-center gap-2 font-sans text-xs">
          <span className="text-slate-400 mr-1 text-xs font-semibold uppercase tracking-wider">Recherches fréquentes :</span>
          {['TVI', 'Limites', 'Exponentielle', 'Complexes', 'Intégrales', 'Logique', 'National 2025'].map((term) => (
            <button
              key={term}
              onClick={() => handleSearchChange(term)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 transition-all shadow-2xs"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="space-y-4">
          {query.trim().length >= 2 ? (
            results.length > 0 ? (
              <div className="space-y-3">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                  {results.length} résultats correspondants à « {query} »
                </div>

                {results.map((res) => (
                  <Link
                    key={res.id}
                    href={res.url}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 shrink-0 border border-slate-200/80 dark:border-slate-700">
                        {getTypeIcon(res.type)}
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full font-sans text-[11px] font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 mb-1 border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
                          {res.badge}
                        </span>
                        <h3 className="font-serif text-base font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                          {res.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <p className="font-serif text-slate-900 dark:text-white text-base">
                  {t.search.noResults} « {query} »
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                  {t.search.noResultsSub}
                </p>
              </div>
            )
          ) : (
            <div className="p-10 text-center font-sans text-xs text-slate-400 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              Saisis au moins 2 lettres pour lancer la recherche en temps réel.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 text-center font-sans text-xs text-slate-500">Chargement de la recherche...</div>}>
      <SearchContent />
    </Suspense>
  );
}
