'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Globe, ChevronDown, BookOpen, GraduationCap, Award, Compass, Calculator } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const exploreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, toggleLanguage, isRtl } = useLanguage();

  const navLinks = [
    { href: '/cours', label: t.nav.courses },
    { href: '/exercices', label: t.nav.exercises },
    { href: '/bac', label: t.nav.bac, badge: '2026' },
    { href: '/videos', label: t.nav.videos },
    { href: '/a-propos', label: t.nav.about },
  ];

  const exploreCategories = [
    {
      title: '2ème Année Baccalauréat',
      desc: 'Sciences Mathématiques A & B, Sciences Physiques, SVT',
      href: '/cours/2eme-bac',
      icon: GraduationCap,
      badge: 'Examen National',
    },
    {
      title: '1ère Année Baccalauréat',
      desc: 'Sciences Expérimentales, Mathématiques',
      href: '/cours/1ere-bac',
      icon: Award,
      badge: 'Examen Régional',
    },
    {
      title: 'Tronc Commun Scientifique',
      desc: 'Fondations de l\'analyse, géométrie et trigonométrie',
      href: '/cours/tronc-commun',
      icon: Compass,
      badge: 'Lycée',
    },
    {
      title: 'Cycle Collégial (1AC, 2AC, 3AC)',
      desc: 'Arithmétique, calcul littéral, théorèmes fondamentaux',
      href: '/cours/college',
      icon: Calculator,
      badge: 'Collège',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchInputValue.trim())}`);
    } else {
      setSearchOpen(true);
    }
  };

  // Close explore dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            
            {/* 1. Left Section: Coursera-style Wordmark & Explore Dropdown */}
            <div className="flex items-center gap-4 shrink-0">
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-sm bg-[#0056d2] text-white flex items-center justify-center font-bold text-base shadow-xs select-none">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-[#0056d2] dark:text-blue-400 group-hover:text-[#00419e] transition-colors leading-none font-sans">
                    Maths<span className="text-[#1f1f1f] dark:text-white">Maroc</span>
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mt-0.5">
                    {isRtl ? 'تعليم الرياضيات بالمغرب' : 'Éducation Gratuite • Maroc'}
                  </span>
                </div>
              </Link>

              {/* Coursera-style "Explorer" Button */}
              <div className="relative hidden lg:block" ref={exploreRef}>
                <button
                  type="button"
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded text-sm font-semibold transition-colors border ${
                    exploreOpen
                      ? 'bg-[#ebf3ff] text-[#0056d2] border-[#0056d2]'
                      : 'text-[#0056d2] dark:text-blue-400 border-[#0056d2] hover:bg-[#ebf3ff] dark:hover:bg-blue-950/40'
                  }`}
                  aria-expanded={exploreOpen}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explorer</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Explore Dropdown Menu */}
                {exploreOpen && (
                  <div className="absolute left-0 top-full mt-2 w-84 bg-white dark:bg-[#1a2332] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800">
                      Niveaux & Cycles Scolaires
                    </div>
                    {exploreCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/60 text-[#0056d2] dark:text-blue-400 shrink-0 mt-0.5 group-hover:bg-[#0056d2] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0056d2] transition-colors">
                                {cat.title}
                              </span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                {cat.badge}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="p-2 border-t border-gray-100 dark:border-gray-800 mt-1">
                      <Link
                        href="/bac"
                        onClick={() => setExploreOpen(false)}
                        className="flex items-center justify-between p-2 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
                      >
                        <span>Espace Révision Baccalauréat 2026</span>
                        <span className="text-[10px] bg-amber-200 dark:bg-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">ANNALES</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* 2. Middle Section: Coursera-style Integrated Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-2">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  placeholder="Rechercher un cours, notion (TVI, Limites...)"
                  className="w-full pl-3.5 pr-2 py-2 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#0056d2]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#0056d2] hover:bg-[#00419e] text-white rounded-r-md transition-colors flex items-center justify-center shrink-0 border border-[#0056d2]"
                  aria-label="Lancer la recherche"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* 3. Right Section: Navigation Links & Actions */}
            <div className="flex items-center gap-3">
              
              {/* Desktop Nav Links */}
              <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded transition-colors ${
                        active
                          ? 'text-[#0056d2] dark:text-blue-400 font-bold bg-[#ebf3ff] dark:bg-blue-950/50'
                          : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Search Button Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 transition-colors"
                title={language === 'fr' ? 'Changer en arabe' : 'Changer en français'}
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{language === 'fr' ? 'العربية' : 'FR'}</span>
              </button>

              {/* YouTube CTA in Coursera Style */}
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors shrink-0"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>YouTube 85k</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Menu de navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
            
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Rechercher un cours, chapitre..."
                className="w-full px-3 py-2 text-sm border border-r-0 border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 bg-[#0056d2] text-white rounded-r-md flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Levels */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                Cycles d&apos;enseignement
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/cours/2eme-bac"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#0056d2]"
                >
                  2ème Baccalauréat
                </Link>
                <Link
                  href="/cours/1ere-bac"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#0056d2]"
                >
                  1ère Baccalauréat
                </Link>
                <Link
                  href="/cours/tronc-commun"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#0056d2]"
                >
                  Tronc Commun
                </Link>
                <Link
                  href="/cours/college"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#0056d2]"
                >
                  Cycle Collégial
                </Link>
              </div>
            </div>

            {/* Nav Links */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                Navigation
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm font-semibold ${
                    isActive(link.href)
                      ? 'bg-[#ebf3ff] text-[#0056d2]'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile YouTube Channel button */}
            <div className="pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-red-600 text-white font-bold text-xs"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Rejoindre la chaîne YouTube ({SITE_CONFIG.youtube.subscribersCount} abonnés)</span>
              </a>
            </div>

          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
