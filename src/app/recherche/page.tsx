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
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'exercise':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'bac':
        return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Recherche', url: '/recherche' }]} />

        {/* Page Title & Search Bar */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Moteur de Recherche Mathématique
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Trouve instantanément un cours, un théorème, un exercice corrigé ou un sujet d&apos;examen national.
          </p>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Search Suggestions */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Recherches rapides :</span>
          {['TVI', 'Limites', 'Exponentielle', 'Complexes', 'Intégrales', 'Logique', 'National 2025'].map((term) => (
            <button
              key={term}
              onClick={() => handleSearchChange(term)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 transition-colors"
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
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {results.length} résultats correspondants à « {query} »
                </div>

                {results.map((res) => (
                  <Link
                    key={res.id}
                    href={res.url}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-indigo-600 dark:hover:border-indigo-500 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                        {getTypeIcon(res.type)}
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1">
                          {res.badge}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          {res.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 ml-3 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">
                  {t.search.noResults} « {query} »
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t.search.noResultsSub}
                </p>
              </div>
            )
          ) : (
            <div className="p-10 text-center text-xs sm:text-sm text-slate-400">
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
    <Suspense fallback={<div className="min-h-screen py-16 text-center text-slate-500">Chargement de la recherche...</div>}>
      <SearchContent />
    </Suspense>
  );
}
