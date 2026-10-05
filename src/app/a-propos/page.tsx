import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/site-config';
import { 
  ShieldCheck, 
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'À Propos', url: '/a-propos' }]} />

        {/* Professor Presentation Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait */}
            <div className="md:col-span-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                <GraduationCap className="w-4 h-4" />
                <span>{SITE_CONFIG.professor.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {SITE_CONFIG.professor.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {SITE_CONFIG.professor.location}
              </p>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.professor.bio}
              </p>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border-l-4 border-indigo-600 text-sm text-indigo-950 dark:text-indigo-200 italic leading-relaxed">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Quick stats badges */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    {SITE_CONFIG.professor.experienceYears} ans
                  </div>
                  <div className="text-[11px] text-slate-500">d&apos;expérience</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[11px] text-slate-500">élèves formés</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    {SITE_CONFIG.professor.freeHoursVideos}
                  </div>
                  <div className="text-[11px] text-slate-500">heures gratuites</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. WHY 100% FREE MANIFESTO */}
        <section id="manifeste" className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Manifeste Éducatif</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles supérieures (classes préparatoires CPGE, ENSA, ENSAM, Médecine, ENCG, universités). Pourtant, des milliers d&apos;élèves talentueux se heurtent à des barrières économiques ou géographiques.
            </p>
            <p>
              Mon engagement est simple : offrir à un élève situé à Oujda, Zagora, Tanger, Casablanca ou dans un village reculé la même qualité d&apos;enseignement d&apos;excellence qu&apos;aux élèves des grands centres urbains, sans aucune contrepartie financière.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              Pas de cours privés payants cachés, pas de murs d&apos;inscription obligatoires : la réussite de l&apos;élève est la seule boussole.
            </p>
          </div>
        </section>

        {/* 2. THE TEACHING METHODOLOGY */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
            <Award className="w-4 h-4" />
            <span>Pédagogie Positive & Rigueur</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            La Méthode Pédagogique en 3 Étapes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                L&apos;Intuition Géométrique
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Avant de réciter une formule formelle, on comprend ce qu&apos;elle signifie concrètement sur une courbe ou une figure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                La Rigueur de Rédaction
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apprendre à rédiger chaque étape selon les exigences exactes du barème ministériel marocain.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Les Pièges de Concours
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Anticiper les subtilités et les erreurs fréquentes qui coûtent des points précieux le jour du Bac.
              </p>
            </div>
          </div>
        </section>

        {/* 3. OFFICIAL CHANNELS & COMMUNITY */}
        <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Canaux Officiels & Communauté d&apos;Échange
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Rejoins nos canaux pour recevoir les annonces de lives, les nouveaux exercices et les fiches PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                <Youtube className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                  Chaîne YouTube Officielle
                </div>
                <div className="text-xs text-slate-300">{SITE_CONFIG.youtube.subscribersCount} abonnés</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                  Canal Telegram Officiel
                </div>
                <div className="text-xs text-slate-300">Fiches PDF & Rappels</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Groupe WhatsApp
                </div>
                <div className="text-xs text-slate-300">Entraide & Questions</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  Contact Direct
                </div>
                <div className="text-xs text-slate-300">{SITE_CONFIG.socials.email}</div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
