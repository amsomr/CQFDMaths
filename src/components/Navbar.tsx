'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Globe } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { t, language, toggleLanguage, isRtl } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/cours', label: t.nav.courses },
    { href: '/exercices', label: t.nav.exercises },
    { href: '/videos', label: t.nav.videos },
    { href: '/bac', label: t.nav.bac, badge: '2026' },
    { href: '/a-propos', label: t.nav.about },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fafaf9]/95 dark:bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo / Brand Name */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-serif text-base font-bold select-none">
                M²
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-normal">
                  {isRtl ? SITE_CONFIG.professor.nameAr : SITE_CONFIG.professor.name}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      active
                        ? 'text-stone-950 dark:text-stone-50 bg-stone-200/60 dark:bg-stone-800/60 font-semibold'
                        : 'text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-normal">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Search, Language, YouTube */}
            <div className="flex items-center gap-2">
              {/* Quick Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 bg-stone-100/70 hover:bg-stone-200/60 dark:bg-stone-900 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-800 text-xs transition-colors"
                aria-label="Rechercher"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] font-mono bg-white dark:bg-stone-800 text-stone-500 rounded border border-stone-200 dark:border-stone-700">
                  ⌘K
                </kbd>
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-800 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
              </button>

              {/* YouTube CTA */}
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 fill-red-500 dark:fill-red-600" />
                <span>YouTube</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0a09] px-4 py-3 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium ${
                  isActive(link.href)
                    ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900"
              >
                <Youtube className="w-4 h-4 fill-red-500" />
                <span>Rejoindre la chaîne YouTube</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
