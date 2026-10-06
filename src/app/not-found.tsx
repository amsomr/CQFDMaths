import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Math Visual */}
        <div className="w-16 h-16 rounded-md bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-400 flex items-center justify-center mx-auto text-2xl font-bold border border-blue-200 dark:border-blue-800 shadow-sm font-mono">
          ∅
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0056d2]">
            Erreur 404 • Ensemble vide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Page introuvable
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            La ressource que vous recherchez a peut-être été déplacée ou son lien est incorrect.
          </p>
        </div>

        {/* Helper Navigation Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#0056d2] hover:bg-[#00419e] transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/cours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-[#0056d2] hover:text-[#0056d2] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#0056d2]" />
            <span>Tous les cours</span>
          </Link>

          <Link
            href="/recherche"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-[#0056d2] hover:text-[#0056d2] transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Rechercher</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
