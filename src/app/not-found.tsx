import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Math Visual */}
        <div className="w-16 h-16 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 flex items-center justify-center mx-auto text-2xl font-serif border border-stone-200 dark:border-stone-800">
          ∅
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider text-stone-400">
            Erreur 404 • Ensemble vide
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
            Page introuvable
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
            La ressource que vous recherchez a peut-être été renommée ou son adresse est incorrecte.
          </p>
        </div>

        {/* Helper Navigation Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            href="/cours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Tous les cours</span>
          </Link>

          <Link
            href="/recherche"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <span>Rechercher</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
