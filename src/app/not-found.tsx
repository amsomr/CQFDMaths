import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Math Visual */}
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-3xl font-serif font-black shadow-inner border border-indigo-100 dark:border-indigo-900/50">
          ∅
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
            Erreur 404 • Solution Impossible
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cette équation n&apos;a pas de solution ici 😄
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            La page que tu recherches a peut-être été déplacée ou l&apos;URL contient une variable indéterminée.
          </p>
        </div>

        {/* Helper Navigation Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/cours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Tous les cours</span>
          </Link>

          <Link
            href="/recherche"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Rechercher</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
