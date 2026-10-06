'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
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
      setScrolled(window.scrollY > 15);
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

  const navLinks: { href: string; label: string; badge?: string }[] = [
    { href: '/cours', label: 'Cours' },
    { href: '/exercices', label: 'Exercices' },
    { href: '/bac', label: 'Espace Bac' },
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
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#0F172A]/10 shadow-2xs'
            : 'bg-[#FAF9F5] border-b border-[#0F172A]/06'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[74px]">
            
            {/* 1. Left: Confident Brand Identity */}
            <Link href="/" className="flex items-center gap-3.5 group select-none">
              <div className="w-10 h-10 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs group-hover:bg-[#1E40AF] transition-colors">
                <span>√</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-[#0F172A] leading-tight font-sans">
                  Maths<span className="text-[#1D4ED8]">Maroc</span>
                </span>
                <span className="text-[12px] font-semibold text-[#64748B] tracking-wide uppercase leading-none mt-0.5">
                  {isRtl ? 'الأستاذ عمر العلمي' : 'Prof. Omar Alami'}
                </span>
              </div>
            </Link>

            {/* 2. Center: Confident Editorial Primary Nav */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-[15px] font-bold">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-[8px] transition-all flex items-center gap-2 ${
                      active
                        ? 'text-[#1D4ED8] bg-[#1D4ED8]/10'
                        : 'text-[#334155] hover:text-[#0F172A] hover:bg-[#0F172A]/04'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[4px] bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right: Command Search, Language & YouTube */}
            <div className="flex items-center gap-3 sm:gap-3.5">
              
              {/* Command Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-[8px] border border-[#0F172A]/10 bg-white hover:border-[#1D4ED8] text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                aria-label="Rechercher une notion ou un cours"
              >
                <Search className="w-4 h-4 text-[#94A3B8]" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden lg:inline-block font-mono text-[11px] text-[#64748B] bg-[#FAF9F5] px-1.5 py-0.5 rounded-[4px] border border-[#0F172A]/10">
                  ⌘K
                </kbd>
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-[8px] text-xs font-bold text-[#334155] hover:text-[#0F172A] hover:bg-white border border-[#0F172A]/10 transition-colors cursor-pointer bg-[#FAF9F5]"
                aria-label={language === 'fr' ? 'Passer en arabe' : 'Passer en français'}
              >
                {language === 'fr' ? 'العربية' : 'FR'}
              </button>

              {/* YouTube Channel Button */}
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#CC0000] hover:bg-[#b00000] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>YouTube</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-[8px] text-[#334155] hover:text-[#0F172A] md:hidden hover:bg-[#0F172A]/05 transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#0F172A]/10 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-[8px] text-base font-bold flex items-center justify-between ${
                      active ? 'bg-[#1D4ED8] text-white' : 'text-[#0F172A] hover:bg-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-[4px] bg-[#FEF3C7] text-[#92400E] font-mono font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#0F172A]/10 flex items-center justify-between">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#CC0000] text-white text-xs font-bold"
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
                className="px-3 py-2 rounded-[8px] border border-[#0F172A]/15 text-xs font-bold text-[#0F172A] cursor-pointer bg-white"
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
