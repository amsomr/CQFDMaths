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
        return <BookOpen className="w-4 h-4 text-[#1D4ED8]" />;
      case 'exercise':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'bac':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-[#CC0000]" />;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Title & Search Bar */}
      <div className="space-y-4 pb-6 border-b border-[#0F172A]/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-[#1D4ED8]/10 text-[#1D4ED8]">
          <Search className="w-3.5 h-3.5" />
          <span>Index Général du Cursus</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Catalogue & Moteur de Recherche
        </h1>
        <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
          Accédez directement à une leçon théorique, un théorème réglementaire, un exercice corrigé ou un sujet d&apos;examen national.
        </p>

        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full pl-11 pr-11 py-3.5 rounded-[10px] bg-white border border-[#0F172A]/15 text-sm shadow-xs focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-[#0F172A] placeholder-[#94A3B8]"
            autoFocus
          />
          {query && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-[6px] text-[#94A3B8] hover:text-[#0F172A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Search Suggestions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#64748B] font-bold uppercase tracking-wider text-[11px]">Recherches fréquentes :</span>
        {['TVI', 'Limites', 'Exponentielle', 'Complexes', 'Intégrales', 'Logique', 'National 2025'].map((term) => (
          <button
            key={term}
            onClick={() => handleSearchChange(term)}
            className="px-3 py-1.5 rounded-[6px] bg-white border border-[#0F172A]/10 text-[#475569] hover:bg-[#1D4ED8]/10 hover:text-[#1D4ED8] hover:border-[#1D4ED8]/30 transition-all font-semibold shadow-2xs"
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
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                {results.length} résultats correspondants à « {query} »
              </div>

              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  className="flex items-center justify-between p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:shadow-md hover:border-[#1D4ED8] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-[8px] bg-[#FAF9F5] shrink-0 border border-[#0F172A]/10">
                      {getTypeIcon(res.type)}
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider bg-[#1D4ED8]/10 text-[#1D4ED8] mb-1.5 border border-[#1D4ED8]/20">
                        {res.badge}
                      </span>
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-[#94A3B8] group-hover:text-[#1D4ED8] group-hover:translate-x-1 transition-all shrink-0 ml-3 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-14 text-center rounded-[14px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-2">
              <p className="text-[#0F172A] font-extrabold text-base">
                {t.search.noResults} « {query} »
              </p>
              <p className="text-xs text-[#64748B]">
                {t.search.noResultsSub} Essayez des termes comme « limites », « dérivabilité » ou « exponentielle ».
              </p>
            </div>
          )
        ) : (
          <div className="p-10 text-center text-xs text-[#64748B] bg-white rounded-[12px] border border-[#0F172A]/10">
            Saisissez au moins 2 lettres pour lancer la recherche en temps réel.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ name: 'Recherche', url: '/recherche' }]} />
        <Suspense fallback={<div className="p-8 text-center text-sm text-[#64748B]">Chargement du moteur de recherche...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
