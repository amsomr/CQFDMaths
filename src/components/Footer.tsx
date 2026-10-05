'use client';

import React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-md bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-serif font-bold text-sm tracking-tighter">
                M²
              </span>
              <span className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100 tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              {isRtl ? SITE_CONFIG.professor.bioAr : SITE_CONFIG.professor.bio}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-red-600 hover:border-red-400 flex items-center justify-center transition-colors"
                aria-label="Chaîne YouTube Officielle"
              >
                <Youtube className="w-4 h-4 fill-red-600" />
              </a>
              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors"
                aria-label="Canal Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-emerald-600 hover:border-emerald-400 flex items-center justify-center transition-colors"
                aria-label="Groupe WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links : Niveaux */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 font-semibold mb-4">
              Niveaux Scolaires
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/cours/2eme-bac" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  2ème Bac (Sciences Maths, PC, SVT)
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  1ère Bac (Sc. Expérimentales & Maths)
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/college" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Cycle Collège (3AC, 2AC, 1AC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubs Pédagogiques */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 font-semibold mb-4">
              Ressources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/bac" className="hover:text-stone-950 dark:hover:text-stone-100 flex items-center gap-1 transition-colors">
                  <span>Espace Révision Bac</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-400" />
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Banque d&apos;Exercices Corrigés
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Vidéothèque YouTube
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Index & Recherche Thématique
                </Link>
              </li>
            </ul>
          </div>

          {/* Enseignant & Plateforme */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 font-semibold mb-4">
              Institution
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/a-propos" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  L&apos;Enseignant & la Méthode
                </Link>
              </li>
              <li>
                <Link href="/a-propos#manifeste" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">
                  Manifeste pour l&apos;Égalité des Chances
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.socials.email}`}
                  className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
                >
                  Contact & Suggestions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. {t.common.allRightsReserved}
          </p>
          <p className="font-mono text-[11px] text-stone-400 dark:text-stone-500">
            Éducation mathématique ouverte & gratuite pour tous les lycéens marocains.
          </p>
        </div>
      </div>
    </footer>
  );
}
