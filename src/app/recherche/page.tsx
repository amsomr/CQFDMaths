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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Recherche', url: '/recherche' }]} />

        {/* Page Title & Search Bar */}
        <div className="space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
            Index & Moteur de Recherche
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-sans">
            Accède instantanément à une notion, un théorème, un exercice corrigé ou un sujet d&apos;examen national.
          </p>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full pl-11 pr-11 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm sm:text-base font-sans shadow-[0_1px_3px_rgba(0,0,0,0.02)] focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Search Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-stone-400 mr-1 text-[11px] uppercase tracking-wider">Recherches fréquentes :</span>
          {['TVI', 'Limites', 'Exponentielle', 'Complexes', 'Intégrales', 'Logique', 'National 2025'].map((term) => (
            <button
              key={term}
              onClick={() => handleSearchChange(term)}
              className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
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
                <div className="font-mono text-xs text-stone-500 uppercase tracking-wider">
                  {results.length} résultats correspondants à « {query} »
                </div>

                {results.map((res) => (
                  <Link
                    key={res.id}
                    href={res.url}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-stone-400 dark:hover:border-stone-600 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                        {getTypeIcon(res.type)}
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 mb-1 border border-stone-200 dark:border-stone-700">
                          {res.badge}
                        </span>
                        <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                          {res.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-all shrink-0 ml-3 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <p className="font-serif text-stone-900 dark:text-stone-100 text-base">
                  {t.search.noResults} « {query} »
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-sans">
                  {t.search.noResultsSub}
                </p>
              </div>
            )
          ) : (
            <div className="p-10 text-center font-mono text-xs text-stone-400">
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
    <Suspense fallback={<div className="min-h-screen py-16 text-center font-mono text-xs text-stone-500">Chargement de la recherche...</div>}>
      <SearchContent />
    </Suspense>
  );
}
