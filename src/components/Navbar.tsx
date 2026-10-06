'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { useLanguage } from './LanguageProvider';
import { SearchModal } from './SearchModal';
import { SITE_CONFIG } from '@/data/site-config';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut: cmd+k or ctrl+k opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/cours', label: 'Cours' },
    { href: '/exercices', label: 'Exercices' },
    { href: '/bac', label: 'Bac 2026', badge: 'Annales' },
    { href: '/videos', label: 'Vidéos' },
    { href: '/a-propos', label: "L'Enseignant" },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[rgba(15,23,42,0.08)] shadow-2xs'
            : 'bg-[#FAF9F5] border-b border-[rgba(15,23,42,0.05)]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* 1. Left: Brand with Mathematical Identity */}
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-lg shadow-2xs group-hover:bg-[#1D4ED8] transition-colors">
                <span>√</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-[#1D4ED8] transition-colors leading-none">
                  Maths<span className="text-[#1D4ED8]">Maroc</span>
                </span>
                <span className="text-[11px] text-slate-500 font-sans tracking-tight mt-0.5">
                  {isRtl ? 'الأستاذ عمر العلمي' : 'Prof. Omar Alami'}
                </span>
              </div>
            </Link>

            {/* 2. Center: Calm Editorial Primary Nav */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                      active
                        ? 'text-[#1D4ED8] bg-[#EFF6FF]'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-[rgba(15,23,42,0.04)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right: Command Search, Language & YouTube */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Command Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.12)] bg-[#FFFFFF] hover:border-[#1D4ED8] text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                aria-label="Rechercher une notion ou un cours"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden lg:inline-block font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-[rgba(15,23,42,0.04)] border border-[rgba(15,23,42,0.1)] transition-colors cursor-pointer"
                aria-label={language === 'fr' ? 'Passer en arabe' : 'Passer en français'}
              >
                {language === 'fr' ? 'العربية' : 'FR'}
              </button>

              {/* YouTube Channel Button */}
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#CC0000] hover:bg-[#B00000] text-white text-xs font-bold transition-colors shadow-2xs"
              >
                <Youtube className="w-3.5 h-3.5 fill-white" />
                <span>YouTube</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 md:hidden hover:bg-[rgba(15,23,42,0.04)] transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(15,23,42,0.08)] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-base font-semibold flex items-center justify-between ${
                      active ? 'bg-[#1D4ED8] text-white' : 'text-slate-800 hover:bg-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[rgba(15,23,42,0.08)] flex items-center justify-between">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CC0000] text-white text-xs font-bold"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Chaîne YouTube officielle</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-[rgba(15,23,42,0.15)] text-xs font-bold text-slate-800 cursor-pointer"
              >
                {language === 'fr' ? 'العربية' : 'Français'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Search Overlay */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
