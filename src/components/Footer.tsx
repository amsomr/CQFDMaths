'use client';

import React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, ArrowUpRight, ShieldCheck, Mail, BookOpen, GraduationCap } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { isRtl } = useLanguage();

  return (
    <footer className="border-t border-[#0F172A]/10 bg-[#FAF9F5] text-[#0F172A] transition-colors relative overflow-hidden">
      {/* Subtle coordinate grid accent in footer */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      {/* Upper Main Footer Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Academic Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-[6px] bg-[#1D4ED8] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                √
              </span>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#0F172A] font-sans">
                  Maths<span className="text-[#1D4ED8]">Maroc</span>
                </span>
                <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase">
                  Prof. Omar Alami
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              {isRtl ? SITE_CONFIG.professor.bioAr : SITE_CONFIG.professor.bio}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#1D4ED8]/5 border border-[#1D4ED8]/15 text-xs font-semibold text-[#1D4ED8]">
              <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
              <span>Conforme aux Cadres de Référence Ministériels</span>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-bold text-white bg-[#CC0000] hover:bg-[#b00000] transition-colors shadow-xs"
                aria-label="Chaîne YouTube Officielle"
              >
                <Youtube className="w-3.5 h-3.5 fill-white" />
                <span>YouTube {SITE_CONFIG.youtube.subscribersCount}</span>
              </a>

              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-sky-600 hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Canal Telegram"
                title="Canal Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-emerald-600 hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Groupe WhatsApp"
                title="Groupe WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${SITE_CONFIG.socials.email}`}
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Contact Email"
                title="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Cycle Lycée & Baccalauréat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Cycle Lycée
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/cours/2eme-bac/sciences-maths" className="hover:text-[#1D4ED8] transition-colors">
                  2ème Bac Sciences Maths A & B
                </Link>
              </li>
              <li>
                <Link href="/cours/2eme-bac/sciences-physiques" className="hover:text-[#1D4ED8] transition-colors">
                  2ème Bac Sciences Physiques & SVT
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="hover:text-[#1D4ED8] transition-colors">
                  1ère Bac Sciences Expérimentales
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="hover:text-[#1D4ED8] transition-colors">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/college" className="hover:text-[#1D4ED8] transition-colors">
                  Cycle Collégial (1AC, 2AC, 3AC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Examens & Révision */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
              Examens & Annales
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/bac" className="hover:text-[#1D4ED8] flex items-center gap-1 transition-colors font-semibold text-[#0F172A]">
                  <span>Espace Révision Bac 2026</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B45309]" />
                </Link>
              </li>
              <li>
                <Link href="/bac" className="hover:text-[#1D4ED8] transition-colors">
                  Annales National 2025 Corrigées
                </Link>
              </li>
              <li>
                <Link href="/bac" className="hover:text-[#1D4ED8] transition-colors">
                  Annales National 2024 & 2023
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-[#1D4ED8] transition-colors">
                  Banque de Problèmes & Exercices
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[#1D4ED8] transition-colors">
                  Vidéothèque des Démonstrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: L'Enseignant & Mission */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4">
              L&apos;Enseignant
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/a-propos" className="hover:text-[#1D4ED8] transition-colors">
                  Le Professeur Omar Alami
                </Link>
              </li>
              <li>
                <Link href="/a-propos#manifeste" className="hover:text-[#1D4ED8] transition-colors">
                  Pourquoi 100% Gratuit ?
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-[#1D4ED8] transition-colors">
                  Méthode Pédagogique
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-[#1D4ED8] transition-colors">
                  Moteur de Recherche ⌘K
                </Link>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.socials.email}`} className="hover:text-[#1D4ED8] transition-colors">
                  Contact Enseignant
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Legal Bar */}
      <div className="relative border-t border-[#0F172A]/10 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            <p className="font-medium text-[#475569]">
              © 2026 MathsMaroc • Prof. Omar Alami — Enseignement libre et gratuit des mathématiques au Maroc.
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              Conçu pour les lycéens et collégiens marocains. Les sujets d&apos;examens nationaux restent la propriété du Ministère de l&apos;Éducation Nationale.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0 font-medium">
            <Link href="/cours" className="hover:text-[#1D4ED8] transition-colors">
              Tous les cours
            </Link>
            <Link href="/bac" className="hover:text-[#1D4ED8] transition-colors">
              Espace Bac
            </Link>
            <Link href="/a-propos" className="hover:text-[#1D4ED8] transition-colors">
              Le Professeur
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
