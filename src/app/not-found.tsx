import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 font-sans bg-[#FAF9F5] text-[#0F172A] relative">
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-md w-full text-center space-y-6">
        
        {/* Math Visual */}
        <div className="w-16 h-16 rounded-[12px] bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center mx-auto text-3xl font-black border border-[#1D4ED8]/20 shadow-xs font-serif">
          ∅
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            Erreur 404 • Ensemble vide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Page introuvable
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed max-w-sm mx-auto">
            La ressource que vous recherchez n&apos;existe pas dans le référentiel ou a été déplacée vers un autre chapitre.
          </p>
        </div>

        {/* Helper Navigation Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] transition-colors shadow-2xs"
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </Link>

          <Link
            href="/cours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-semibold bg-white text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
            <span>Tous les cours</span>
          </Link>

          <Link
            href="/recherche"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-semibold bg-white text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4 text-[#94A3B8]" />
            <span>Rechercher ⌘K</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
