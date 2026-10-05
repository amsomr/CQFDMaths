'use client';

import React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { t, isRtl } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center text-white font-serif font-black text-lg">
                ∑
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {isRtl ? SITE_CONFIG.professor.bioAr : SITE_CONFIG.professor.bio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/50 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 fill-red-600" />
              </a>
              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 flex items-center justify-center transition-colors"
                aria-label="Groupe WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links : Niveaux */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Niveaux Scolaires
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/cours/2eme-bac" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  2ème Bac (Sciences Maths, PC, SVT)
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  1ère Bac (Sc. Expérimentales & Maths)
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/college" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Cycle Collège (3AC, 2AC, 1AC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubs Pédagogiques */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Ressources Gratuites
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/bac" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                  <span>Espace Révision Bac 2026</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Banque d&apos;Exercices Corrigés
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Vidéothèque YouTube
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Moteur de Recherche Intégré
                </Link>
              </li>
            </ul>
          </div>

          {/* Enseignant & Plateforme */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              À Propos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/a-propos" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Professeur & Méthode
                </Link>
              </li>
              <li>
                <Link href="/a-propos#manifeste" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Pourquoi 100% Gratuit ?
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.socials.email}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Contact & Suggestions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.name}.</span>
            <span>{t.common.allRightsReserved}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span>Fait avec passion pour l&apos;école marocaine</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
