'use client';

import React from 'react';
import Link from 'next/link';
import { Send, MessageCircle, ArrowUpRight, Mail, BookOpen, GraduationCap, Compass } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';
import { useLanguage } from './LanguageProvider';

export function Footer() {
  const { isRtl } = useLanguage();

  return (
    <footer className="border-t border-[#0F172A]/10 bg-[#FAF9F5] text-[#0F172A] transition-colors relative overflow-hidden">
      {/* Subtle coordinate grid accent in footer */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      {/* Upper Main Footer Grid — 4 Clean Editorial Groups */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Group 1: CQFDMaths Identity & Socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="w-9 h-9 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
                √
              </span>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-[#0F172A] font-sans">
                  CQFD<span className="text-[#1D4ED8]">Maths</span>
                </span>
                <span className="text-[11px] font-semibold text-[#64748B] tracking-tight">
                  {SITE_CONFIG.slogan}
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-[#475569] leading-relaxed max-w-xs font-medium">
              Plateforme du {SITE_CONFIG.professor.name} &mdash; Des mathématiques claires, rigoureuses et accessibles à tous les élèves du Maroc.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={SITE_CONFIG.youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-bold text-white bg-[#CC0000] hover:bg-[#b00000] transition-colors shadow-2xs"
                aria-label="Chaîne YouTube"
              >
                <Youtube className="w-3.5 h-3.5 fill-white" />
                <span>YouTube</span>
              </a>

              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-sky-600 hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Canal Telegram"
                title="Canal Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>

              <a
                href={SITE_CONFIG.socials.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-emerald-600 hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Communauté WhatsApp"
                title="Communauté WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${SITE_CONFIG.socials.email}`}
                className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-[#F1F5F9] transition-colors shadow-2xs"
                aria-label="Contact Email"
                title="Contact Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Group 2: Cours (Moroccan Levels) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Cours
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/cours/2eme-bac" className="hover:text-[#1D4ED8] transition-colors">
                  2ème Bac (Sciences Maths &amp; Physiques)
                </Link>
              </li>
              <li>
                <Link href="/cours/1ere-bac" className="hover:text-[#1D4ED8] transition-colors">
                  1ère Bac (Sciences Expérimentales)
                </Link>
              </li>
              <li>
                <Link href="/cours/tronc-commun" className="hover:text-[#1D4ED8] transition-colors">
                  Tronc Commun Scientifique (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours/2eme-bac/sciences-maths" className="hover:text-[#1D4ED8] transition-colors">
                  Sciences Mathématiques A &amp; B (BIOF)
                </Link>
              </li>
              <li>
                <Link href="/cours" className="font-bold text-[#1D4ED8] hover:underline">
                  Voir tous les cours →
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Bac & Ressources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
              Bac &amp; Ressources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/bac" className="hover:text-[#1D4ED8] flex items-center gap-1 transition-colors font-semibold text-[#0F172A]">
                  <span>Espace Révision Bac</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B45309]" />
                </Link>
              </li>
              <li>
                <Link href="/bac" className="hover:text-[#1D4ED8] transition-colors">
                  Annales Nationales Corrigées
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-[#1D4ED8] transition-colors">
                  Banque d&apos;Exercices Résolus
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[#1D4ED8] transition-colors">
                  Vidéothèque Pédagogique
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 4: Le Professeur & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Professeur
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/a-propos" className="hover:text-[#1D4ED8] transition-colors">
                  À Propos de l&apos;Enseignant
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
                <a href={`mailto:${SITE_CONFIG.socials.email}`} className="hover:text-[#1D4ED8] transition-colors">
                  Contact Enseignant
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Legal Bar */}
      <div className="relative border-t border-[#0F172A]/10 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p className="font-medium text-[#475569]">
            © {SITE_CONFIG.currentExamYear} {SITE_CONFIG.name} • {SITE_CONFIG.professor.name} — Enseignement libre et gratuit des mathématiques au Maroc.
          </p>

          <div className="flex items-center gap-6 shrink-0 font-medium">
            <Link href="/cours" className="hover:text-[#1D4ED8] transition-colors">
              Cours
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
