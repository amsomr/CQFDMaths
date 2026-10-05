import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Math Visual */}
        <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-3xl font-serif border border-blue-200/80 dark:border-blue-800/60 shadow-md">
          ∅
        </div>

        <div className="space-y-2">
          <div className="font-sans text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Erreur 404 • Ensemble vide
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white tracking-tight">
            Page introuvable
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-sm mx-auto">
            La ressource que vous recherchez a peut-être été renommée ou son adresse est incorrecte.
          </p>
        </div>

        {/* Helper Navigation Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/cours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Tous les cours</span>
          </Link>

          <Link
            href="/recherche"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Rechercher</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
