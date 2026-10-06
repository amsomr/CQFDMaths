import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/site-config';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  GraduationCap, 
  Award, 
  Heart,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Compass,
  Sparkles
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';

export const metadata = {
  title: `À Propos de ${SITE_CONFIG.professor.name} — Profil Enseignant & Pédagogie | Maths Maroc`,
  description: `${SITE_CONFIG.professor.bio} Découvrez l'enseignant et pourquoi tous les cours restent 100% gratuits pour les élèves marocains.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      {/* Subtle coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'À Propos', url: '/a-propos' }]} />

        {/* Professor Editorial Profile Header */}
        <div className="rounded-[20px] bg-white border border-[#0F172A]/10 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Instructor Portrait with Mathematical Framing */}
            <div className="md:col-span-5 relative">
              
              {/* Subtle background mathematical sketch frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#1D4ED8]/10 to-[#B45309]/10 rounded-[20px] -rotate-1 pointer-events-none" />

              <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] bg-[#0A192F] border-2 border-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SITE_CONFIG.professor.portraitUrl}
                  alt={SITE_CONFIG.professor.name}
                  className="w-full h-full object-cover"
                />

                {/* Mathematical annotation badge on photo */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[8px] bg-[#0A192F]/90 backdrop-blur-md text-white border border-white/15 text-xs">
                  <div className="font-mono text-[11px] text-[#93C5FD]">lim (x→+∞) f(x) = L</div>
                  <div className="font-bold text-white text-xs mt-0.5">Prof. Omar Alami</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 py-1.5 px-3 rounded-[6px] border border-[#16A34A]/20">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Enseignant Titulaire • Ministère de l&apos;Éducation</span>
              </div>
            </div>

            {/* Bio & Academic Mission */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-[#1D4ED8]/10 text-[#1D4ED8]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.professor.title}</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                {SITE_CONFIG.professor.name}
              </h1>
              
              <p className="text-xs font-semibold text-[#64748B] tracking-wide uppercase">
                {SITE_CONFIG.professor.location} • Éducation Nationale du Maroc
              </p>
              
              <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                {SITE_CONFIG.professor.bio} Spécialiste de la préparation aux concours d&apos;entrée aux filières d&apos;excellence marocaines (CPGE, ENSA, ENSAM, ENCG, Facultés de Médecine et Pharmacie).
              </p>

              {/* Professor Philosophy Quote */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border-l-4 border-l-[#1D4ED8] border-y border-r border-[#0F172A]/10 text-sm sm:text-base text-[#1E293B] italic leading-relaxed font-serif">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Authentic Experience Metrics */}
              <div className="pt-2 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-2xl font-black text-[#1D4ED8] font-mono">
                    {SITE_CONFIG.professor.experienceYears} ans
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold mt-0.5">d&apos;expérience</div>
                </div>
                <div className="p-4 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-2xl font-black text-[#1D4ED8] font-mono">
                    {SITE_CONFIG.youtube.subscribersCount}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold mt-0.5">abonnés YouTube</div>
                </div>
                <div className="p-4 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-2xl font-black text-[#1D4ED8] font-mono">
                    100%
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold mt-0.5">gratuit et libre</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. WHY 100% FREE MANIFESTO */}
        <section id="manifeste" className="rounded-[20px] bg-white border border-[#0F172A]/10 p-8 sm:p-12 space-y-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>Mission & Égalité Réelle des Chances</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          
          <div className="text-base sm:text-lg text-[#334155] space-y-4 leading-relaxed">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux grandes écoles d&apos;ingénieurs et de médecine. Pourtant, de trop nombreux élèves motivés se heurtent à des barrières économiques ou géographiques majeures face au coût prohibitif des cours de soutien privés.
            </p>
            <p>
              Mon engagement citoyen est absolu : offrir à un lycéen situé à Zagora, Oujda, Tanger, Casablanca ou dans un village rural du Haut Atlas la même qualité d&apos;enseignement de haut niveau qu&apos;aux élèves des grands lycées d&apos;élite, sans aucune contrepartie financière.
            </p>
            <p className="font-bold text-[#0F172A] p-4 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
              Pas d&apos;abonnement caché, pas de cours payants déguisés : la réussite académique de chaque élève marocain est notre unique raison d&apos;être.
            </p>
          </div>
        </section>

        {/* 2. TEACHING METHODOLOGY IN 3 STEPS */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-8 sm:p-12 space-y-8 shadow-2xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <Compass className="w-4 h-4" />
              <span>Approche Didactique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              La Méthode Pédagogique en 3 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <span className="w-9 h-9 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-mono font-bold text-sm shadow-2xs">
                01
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A]">
                L&apos;Intuition Géométrique
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Avant de mémoriser une formule abstraite, nous visualisons son comportement concret sur un graphique, une courbe ou une construction géométrique.
              </p>
            </div>

            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <span className="w-9 h-9 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-mono font-bold text-sm shadow-2xs">
                02
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A]">
                La Rigueur Rédactionnelle
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Apprendre à justifier chaque étape d&apos;un raisonnement selon le barème officiel du Ministère de l&apos;Éducation Nationale pour sécuriser tous les points.
              </p>
            </div>

            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <span className="w-9 h-9 rounded-[8px] bg-[#1D4ED8] text-white flex items-center justify-center font-mono font-bold text-sm shadow-2xs">
                03
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A]">
                Les Pièges de Concours
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Repérer et déjouer les erreurs fréquentes et subtilités qui font la différence entre une mention Assez Bien et une mention Très Bien.
              </p>
            </div>
          </div>
        </section>

        {/* 3. OFFICIAL CHANNELS & COMMUNITY */}
        <section className="rounded-[20px] bg-[#0A192F] text-white p-8 sm:p-12 space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 math-grid-bg opacity-10 pointer-events-none" />
          
          <div className="relative space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Canaux Officiels & Communauté d&apos;Échange
            </h2>
            <p className="text-sm text-slate-300">
              Rejoignez les canaux officiels pour recevoir les annonces de lives de révision, les fiches PDF et les exercices corrigés.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[12px] bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-[#CC0000] flex items-center justify-center shrink-0 shadow-sm">
                <Youtube className="w-6 h-6 fill-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:underline flex items-center justify-between">
                  <span>Chaîne YouTube Officielle</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200 mt-0.5">{SITE_CONFIG.youtube.subscribersCount} abonnés • Cours vidéo</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[12px] bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-sky-600 flex items-center justify-center shrink-0 shadow-sm">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:underline flex items-center justify-between">
                  <span>Canal Telegram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200 mt-0.5">Fiches PDF & Résumés officiels</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[12px] bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:underline flex items-center justify-between">
                  <span>Groupe WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200 mt-0.5">Entraide & Questions d&apos;élèves</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="p-5 rounded-[12px] bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white group-hover:underline flex items-center justify-between">
                  <span>Contact Professionnel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200 mt-0.5">{SITE_CONFIG.socials.email}</div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
