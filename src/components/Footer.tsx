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
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                M²
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {isRtl ? SITE_CONFIG.professor.bioAr : SITE_CONFIG.professor.bio}
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                aria-label="Chaîne YouTube Officielle"
              >
                <Youtube className="w-4 h-4 fill-red-600" />
              </a>
              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors"
                aria-label="Canal Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Groupe WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links : Niveaux */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Niveaux Scolaires
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/cours/2eme-bac" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  2ème Bac (Sciences Maths, PC, SVT)
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  1ère Bac (Sc. Expérimentales & Maths)
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/college" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cycle Collège (3AC, 2AC, 1AC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubs Pédagogiques */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Ressources Gratuites
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/bac" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors">
                  <span>Espace Révision Bac</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Banque d&apos;Exercices Corrigés
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Vidéothèque YouTube
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Index & Recherche Thématique
                </Link>
              </li>
            </ul>
          </div>

          {/* Enseignant & Plateforme */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Institution
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/a-propos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  L&apos;Enseignant & la Méthode
                </Link>
              </li>
              <li>
                <Link href="/a-propos#manifeste" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Manifeste pour la Gratuité
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.socials.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact & Suggestions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. {t.common.allRightsReserved}
          </p>
          <p className="text-[11px] text-slate-500">
            Plateforme d&apos;enseignement mathématique ouverte & gratuite pour tous les élèves du Maroc.
          </p>
        </div>
      </div>
    </footer>
  );
}
