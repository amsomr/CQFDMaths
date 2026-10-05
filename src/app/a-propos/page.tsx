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
        <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait */}
            <div className="md:col-span-4">
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
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
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.professor.title}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-950 dark:text-stone-100">
                {SITE_CONFIG.professor.name}
              </h1>
              <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
                {SITE_CONFIG.professor.location}
              </p>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {SITE_CONFIG.professor.bio}
              </p>

              {/* Quote */}
              <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-950 border-l-2 border-stone-900 dark:border-stone-100 text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed font-serif">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Quick stats badges */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-md bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <div className="text-base font-semibold text-stone-900 dark:text-white">
                    {SITE_CONFIG.professor.experienceYears} ans
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500">d&apos;expérience</div>
                </div>
                <div className="p-2.5 rounded-md bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <div className="text-base font-semibold text-stone-900 dark:text-white">
                    {SITE_CONFIG.professor.studentsHelped}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500">élèves formés</div>
                </div>
                <div className="p-2.5 rounded-md bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800">
                  <div className="text-base font-semibold text-stone-900 dark:text-white">
                    {SITE_CONFIG.professor.freeHoursVideos}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500">heures gratuites</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. WHY 100% FREE MANIFESTO */}
        <section id="manifeste" className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            <Heart className="w-3.5 h-3.5 text-stone-500" />
            <span>Manifeste Éducatif</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          <div className="text-sm sm:text-base text-stone-600 dark:text-stone-400 space-y-3 leading-relaxed font-sans">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles supérieures (classes préparatoires CPGE, ENSA, ENSAM, Médecine, ENCG, universités). Pourtant, des milliers d&apos;élèves talentueux se heurtent à des barrières économiques ou géographiques.
            </p>
            <p>
              Mon engagement est simple : offrir à un élève situé à Oujda, Zagora, Tanger, Casablanca ou dans un village reculé la même qualité d&apos;enseignement d&apos;excellence qu&apos;aux élèves des grands centres urbains, sans aucune contrepartie financière.
            </p>
            <p className="font-medium text-stone-900 dark:text-stone-100">
              Pas de cours privés payants cachés, pas de murs d&apos;inscription obligatoires : la réussite de l&apos;élève est la seule boussole.
            </p>
          </div>
        </section>

        {/* 2. THE TEACHING METHODOLOGY */}
        <section className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            <Award className="w-3.5 h-3.5 text-stone-500" />
            <span>Pédagogie & Rigueur Mathématique</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
            La Méthode Pédagogique en 3 Étapes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
            <div className="p-5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="w-7 h-7 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-xs">
                01
              </span>
              <h3 className="font-serif font-medium text-stone-900 dark:text-stone-100 text-base">
                L&apos;Intuition Géométrique
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Avant de réciter une formule formelle, on comprend ce qu&apos;elle signifie concrètement sur une courbe ou une figure.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="w-7 h-7 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-xs">
                02
              </span>
              <h3 className="font-serif font-medium text-stone-900 dark:text-stone-100 text-base">
                La Rigueur de Rédaction
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Apprendre à rédiger chaque étape selon les exigences exactes du barème ministériel marocain.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="w-7 h-7 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-mono font-bold text-xs">
                03
              </span>
              <h3 className="font-serif font-medium text-stone-900 dark:text-stone-100 text-base">
                Les Pièges de Concours
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Anticiper les subtilités et les erreurs fréquentes qui coûtent des points précieux le jour du Bac.
              </p>
            </div>
          </div>
        </section>

        {/* 3. OFFICIAL CHANNELS & COMMUNITY */}
        <section className="rounded-xl bg-[#1c1917] text-stone-100 p-6 sm:p-10 space-y-6 border border-stone-800">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Canaux Officiels & Communauté d&apos;Échange
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
              Rejoins nos canaux pour recevoir les annonces de lives, les nouveaux exercices et les fiches PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-stone-900/90 border border-stone-700/80 hover:border-stone-500 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
                <Youtube className="w-4 h-4 fill-red-500" />
              </div>
              <div>
                <div className="font-serif text-sm text-white group-hover:text-stone-200 transition-colors">
                  Chaîne YouTube Officielle
                </div>
                <div className="font-mono text-xs text-stone-400">{SITE_CONFIG.youtube.subscribersCount} abonnés</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-stone-900/90 border border-stone-700/80 hover:border-stone-500 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
                <Send className="w-4 h-4 text-stone-300" />
              </div>
              <div>
                <div className="font-serif text-sm text-white group-hover:text-stone-200 transition-colors">
                  Canal Telegram Officiel
                </div>
                <div className="font-mono text-xs text-stone-400">Fiches PDF & Rappels</div>
              </div>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-stone-900/90 border border-stone-700/80 hover:border-stone-500 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="font-serif text-sm text-white group-hover:text-stone-200 transition-colors">
                  Groupe WhatsApp
                </div>
                <div className="font-mono text-xs text-stone-400">Entraide & Questions</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="p-4 rounded-lg bg-stone-900/90 border border-stone-700/80 hover:border-stone-500 transition-colors flex items-center gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-md bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
                <Mail className="w-4 h-4 text-stone-300" />
              </div>
              <div>
                <div className="font-serif text-sm text-white group-hover:text-stone-200 transition-colors">
                  Contact Direct
                </div>
                <div className="font-mono text-xs text-stone-400">{SITE_CONFIG.socials.email}</div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
