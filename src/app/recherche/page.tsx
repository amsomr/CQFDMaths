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
    <div className="space-y-8 font-sans">
      {/* Page Title & Search Bar (Coursera Search Header) */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <Search className="w-3.5 h-3.5 text-[#0056d2]" />
          <span>Recherche Globale BIOF</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Catalogue & Moteur de Recherche
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Accédez directement à une leçon théorique, un théorème réglementaire, un exercice corrigé ou un sujet d&apos;examen national.
        </p>

        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full pl-10 pr-10 py-3 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm shadow-xs focus:outline-none focus:border-[#0056d2] focus:ring-1 focus:ring-[#0056d2] text-slate-900 dark:text-slate-100 placeholder-slate-400"
            autoFocus
          />
          {query && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Search Suggestions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">Recherches fréquentes :</span>
        {['TVI', 'Limites', 'Exponentielle', 'Complexes', 'Intégrales', 'Logique', 'National 2025'].map((term) => (
          <button
            key={term}
            onClick={() => handleSearchChange(term)}
            className="px-2.5 py-1 rounded-md bg-[#f8fafc] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#0056d2] hover:border-blue-200 transition-colors font-medium"
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
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {results.length} résultats correspondants à « {query} »
              </div>

              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#0056d2] transition-all group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded bg-[#f8fafc] dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      {getTypeIcon(res.type)}
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 mb-1 border border-blue-200/60 dark:border-blue-800/60">
                        {res.badge}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0056d2] transition-colors leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-400 group-hover:text-[#0056d2] group-hover:translate-x-1 transition-all shrink-0 ml-3 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-md bg-[#f8fafc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <p className="text-slate-900 dark:text-white font-bold text-base">
                {t.search.noResults} « {query} »
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.search.noResultsSub} Essayez des termes comme « limites », « dérivabilité » ou « exponentielle ».
              </p>
            </div>
          )
        ) : (
          <div className="p-10 text-center text-xs text-slate-500 bg-[#f8fafc] dark:bg-slate-900/40 rounded-md border border-slate-200 dark:border-slate-800">
            Saisissez au moins 2 lettres pour lancer la recherche en temps réel.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ name: 'Recherche', url: '/recherche' }]} />
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Chargement du moteur de recherche...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
