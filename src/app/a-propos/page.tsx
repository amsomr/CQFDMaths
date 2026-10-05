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
  CheckCircle2
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';

export const metadata = {
  title: `À Propos de ${SITE_CONFIG.professor.name} — Mission & Pédagogie | Maths Maroc`,
  description: `${SITE_CONFIG.professor.bio} Découvrez l'enseignant et pourquoi tous les cours restent 100% gratuits pour les élèves marocains.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'À Propos', url: '/a-propos' }]} />

        {/* Professor Presentation Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait */}
            <div className="md:col-span-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md ring-4 ring-blue-500/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SITE_CONFIG.professor.portraitUrl}
                  alt={SITE_CONFIG.professor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio & Details */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{SITE_CONFIG.professor.title}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white">
                {SITE_CONFIG.professor.name}
              </h1>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                {SITE_CONFIG.professor.location}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {SITE_CONFIG.professor.bio}
              </p>

              {/* Quote */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/40 dark:from-blue-950/40 dark:to-indigo-950/20 border-l-4 border-blue-600 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed font-serif shadow-2xs">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Quick stats badges */}
              <div className="pt-2 grid grid-cols-3 gap-2.5 text-center font-sans">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {SITE_CONFIG.professor.experienceYears} ans
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">d&apos;expérience</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">élèves formés</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {SITE_CONFIG.professor.freeHoursVideos}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">heures gratuites</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. WHY 100% FREE MANIFESTO */}
        <section id="manifeste" className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Manifeste Éducatif</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed font-sans">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles supérieures (classes préparatoires CPGE, ENSA, ENSAM, Médecine, ENCG, universités). Pourtant, des milliers d&apos;élèves talentueux se heurtent à des barrières économiques ou géographiques.
            </p>
            <p>
              Mon engagement est simple : offrir à un élève situé à Oujda, Zagora, Tanger, Casablanca ou dans un village reculé la même qualité d&apos;enseignement d&apos;excellence qu&apos;aux élèves des grands centres urbains, sans aucune contrepartie financière.
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              Pas de cours privés payants cachés, pas de murs d&apos;inscription obligatoires : la réussite de l&apos;élève est la seule boussole.
            </p>
          </div>
        </section>

        {/* 2. THE TEACHING METHODOLOGY */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Pédagogie & Rigueur Mathématique</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            La Méthode Pédagogique en 3 Étapes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-2xs hover:shadow-md transition-all">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                01
              </span>
              <h3 className="font-serif font-medium text-slate-900 dark:text-white text-base">
                L&apos;Intuition Géométrique
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Avant de réciter une formule formelle, on comprend ce qu&apos;elle signifie concrètement sur une courbe ou une figure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-2xs hover:shadow-md transition-all">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                02
              </span>
              <h3 className="font-serif font-medium text-slate-900 dark:text-white text-base">
                La Rigueur de Rédaction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Apprendre à rédiger chaque étape selon les exigences exactes du barème ministériel marocain.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-2xs hover:shadow-md transition-all">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                03
              </span>
              <h3 className="font-serif font-medium text-slate-900 dark:text-white text-base">
                Les Pièges de Concours
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Anticiper les subtilités et les erreurs fréquentes qui coûtent des points précieux le jour du Bac.
              </p>
            </div>
          </div>
        </section>

        {/* 3. OFFICIAL CHANNELS & COMMUNITY */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white p-6 sm:p-10 lg:p-12 space-y-6 border border-blue-800/50 shadow-xl shadow-blue-950/20">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Canaux Officiels & Communauté d&apos;Échange
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 mt-1 font-sans">
              Rejoins nos canaux pour recevoir les annonces de lives, les nouveaux exercices et les fiches PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <Youtube className="w-5 h-5 fill-red-400" />
              </div>
              <div>
                <div className="font-serif text-sm font-medium text-white group-hover:text-blue-100 transition-colors">
                  Chaîne YouTube Officielle
                </div>
                <div className="font-mono text-xs text-blue-200/70">{SITE_CONFIG.youtube.subscribersCount} abonnés</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <div className="font-serif text-sm font-medium text-white group-hover:text-blue-100 transition-colors">
                  Canal Telegram Officiel
                </div>
                <div className="font-mono text-xs text-blue-200/70">Fiches PDF & Rappels</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="font-serif text-sm font-medium text-white group-hover:text-blue-100 transition-colors">
                  Groupe WhatsApp
                </div>
                <div className="font-mono text-xs text-blue-200/70">Entraide & Questions</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="p-4 sm:p-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <div className="font-serif text-sm font-medium text-white group-hover:text-blue-100 transition-colors">
                  Contact Direct
                </div>
                <div className="font-mono text-xs text-blue-200/70">{SITE_CONFIG.socials.email}</div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
