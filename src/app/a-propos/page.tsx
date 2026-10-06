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
  ExternalLink
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';

export const metadata = {
  title: `À Propos de ${SITE_CONFIG.professor.name} — Profil Enseignant & Pédagogie | Maths Maroc`,
  description: `${SITE_CONFIG.professor.bio} Découvrez l'enseignant et pourquoi tous les cours restent 100% gratuits pour les élèves marocains.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 bg-white dark:bg-slate-950 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb items={[{ name: 'À Propos', url: '/a-propos' }]} />

        {/* Coursera-Style Instructor Profile Header */}
        <div className="rounded-md bg-[#f8fafc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Instructor Portrait */}
            <div className="md:col-span-4">
              <div className="rounded-md overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SITE_CONFIG.professor.portraitUrl}
                  alt={SITE_CONFIG.professor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enseignant Titulaire & Auteur</span>
                </span>
              </div>
            </div>

            {/* Bio & Academic Credentials */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-[#0056d2] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <GraduationCap className="w-3.5 h-3.5 text-[#0056d2]" />
                <span>{SITE_CONFIG.professor.title}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {SITE_CONFIG.professor.name}
              </h1>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {SITE_CONFIG.professor.location} • Éducation Nationale du Maroc
              </p>
              
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.professor.bio} Spécialiste de la préparation aux concours d&apos;entrée aux grandes écoles d&apos;ingénieurs et de commerce (CPGE, ENSA, ENSAM, ENCG, Faculté de Médecine).
              </p>

              {/* Coursera Pedagogical Quote Callout */}
              <div className="p-4 rounded-md bg-white dark:bg-slate-950 border-l-4 border-[#0056d2] border-y border-r border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Institutional Metrics */}
              <div className="pt-2 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold text-[#0056d2] font-mono">
                    {SITE_CONFIG.professor.experienceYears} ans
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">d&apos;expérience</div>
                </div>
                <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold text-[#0056d2] font-mono">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">élèves formés</div>
                </div>
                <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold text-[#0056d2] font-mono">
                    {SITE_CONFIG.professor.freeHoursVideos}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">heures gratuites</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. TEACHING METHODOLOGY (Coursera Course Architecture) */}
        <section className="rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0056d2]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              La Méthode Pédagogique en 3 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-md bg-[#f8fafc] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded bg-[#0056d2] text-white flex items-center justify-center font-mono font-bold text-xs">
                01
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                L&apos;Intuition Géométrique
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Avant de mémoriser une formule abstraite, nous visualisons son comportement concret sur un graphique ou une figure.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#f8fafc] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded bg-[#0056d2] text-white flex items-center justify-center font-mono font-bold text-xs">
                02
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                La Rigueur Rédactionnelle
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apprendre à justifier chaque étape d&apos;un raisonnement selon le barème officiel du Ministère de l&apos;Éducation Nationale.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#f8fafc] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded bg-[#0056d2] text-white flex items-center justify-center font-mono font-bold text-xs">
                03
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Les Pièges de Concours
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Repérer et déjouer les erreurs fréquentes et subtilités qui font la différence entre une mention Assez Bien et une mention Très Bien.
              </p>
            </div>
          </div>
        </section>

        {/* 2. WHY 100% FREE MANIFESTO */}
        <section className="rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>Mission & Égalité des Chances</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux filières d&apos;excellence (CPGE, ENSA, ENSAM, Médecine, ENCG, universités). Pourtant, des milliers d&apos;élèves motivés se heurtent à des barrières économiques ou géographiques.
            </p>
            <p>
              Mon engagement est simple : offrir à un lycéen situé à Oujda, Zagora, Tanger, Casablanca ou dans un village rural la même qualité d&apos;enseignement de haut niveau qu&apos;aux élèves des grands lycées d&apos;excellence, sans aucune contrepartie financière.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              Pas d&apos;abonnement caché, pas de cours privés payants déguisés : la réussite académique de l&apos;élève est notre unique priorité.
            </p>
          </div>
        </section>

        {/* 3. OFFICIAL CHANNELS & COMMUNITY */}
        <section className="rounded-md bg-[#002661] text-white p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Canaux Officiels & Communauté d&apos;Échange
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Rejoignez les canaux officiels pour recevoir les annonces de lives de révision, les fiches PDF et les exercices corrigés.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded bg-[#cc0000] flex items-center justify-center shrink-0">
                <Youtube className="w-5 h-5 fill-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white group-hover:underline flex items-center justify-between">
                  <span>Chaîne YouTube Officielle</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">{SITE_CONFIG.youtube.subscribersCount} abonnés • Cours vidéo</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded bg-sky-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white group-hover:underline flex items-center justify-between">
                  <span>Canal Telegram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Fiches PDF & Résumés officiels</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded bg-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white group-hover:underline flex items-center justify-between">
                  <span>Groupe WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Entraide & Questions d&apos;élèves</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="p-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded bg-[#0056d2] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white group-hover:underline flex items-center justify-between">
                  <span>Contact Professionnel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">{SITE_CONFIG.socials.email}</div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
