'use client';

import React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { isRtl } = useLanguage();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-[#f5f7fa] dark:bg-[#0f141c] text-gray-700 dark:text-gray-300 transition-colors">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Academic Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#0056d2] text-white flex items-center justify-center font-bold text-base shadow-xs select-none">
                M
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#0056d2] dark:text-blue-400 font-sans">
                Maths<span className="text-[#1f1f1f] dark:text-white">Maroc</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {isRtl ? SITE_CONFIG.professor.bioAr : SITE_CONFIG.professor.bio}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#0056d2] dark:text-blue-400" />
              <span>Conforme au Cadre de Référence Officiel marocain</span>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Chaîne YouTube Officielle"
              >
                <Youtube className="w-3.5 h-3.5 fill-white" />
                <span>YouTube {SITE_CONFIG.youtube.subscribersCount}</span>
              </a>

              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sky-600 hover:bg-gray-100 transition-colors"
                aria-label="Canal Telegram"
                title="Canal Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-emerald-600 hover:bg-gray-100 transition-colors"
                aria-label="Groupe WhatsApp"
                title="Groupe WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Cycle Lycée & Baccalauréat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Cycle Lycée
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/cours/2eme-bac/sciences-maths" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  2ème Bac Sciences Maths A & B
                </Link>
              </li>
              <li>
                <Link href="/cours/2eme-bac/sciences-physiques" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  2ème Bac Sciences Physiques & SVT
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  1ère Bac Sciences Expérimentales
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/college" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Cycle Collégial (1AC, 2AC, 3AC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Examens & Révision */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Examens & Annales
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/bac" className="hover:text-[#0056d2] dark:hover:text-blue-400 flex items-center gap-1 transition-colors font-medium">
                  <span>Espace Révision Bac 2026</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link href="/bac" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Annales National 2025 Corrigées
                </Link>
              </li>
              <li>
                <Link href="/bac" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Annales National 2024 & 2023
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Banque de Problèmes & Exercices
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Vidéothèque des Démonstrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: L'Enseignant & Mission */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              À Propos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/a-propos" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Le Professeur Omar Alami
                </Link>
              </li>
              <li>
                <Link href="/a-propos#manifeste" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Pourquoi 100% Gratuit ?
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Méthode Pédagogique
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Moteur de Recherche Thématique
                </Link>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.socials.email}`} className="hover:text-[#0056d2] dark:hover:text-blue-400 transition-colors">
                  Contact Enseignant
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Coursera-style Bottom Legal & Copyright Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            <p>
              © 2026 {SITE_CONFIG.name} — Tous droits réservés. Enseignement libre et gratuit des mathématiques au Maroc.
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
              Contenu élaboré dans le respect du programme pédagogique marocain. Les annales restent la propriété du Ministère de l&apos;Éducation Nationale.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link href="/cours" className="hover:text-[#0056d2] transition-colors">
              Tous les cours
            </Link>
            <Link href="/bac" className="hover:text-[#0056d2] transition-colors">
              Espace Bac
            </Link>
            <Link href="/a-propos" className="hover:text-[#0056d2] transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
