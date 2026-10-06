import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SITE_CONFIG } from '@/data/site-config';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  GraduationCap, 
  Heart, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';

export const metadata = {
  title: `À Propos de ${SITE_CONFIG.professor.name} — Profil Enseignant & Pédagogie | Maths Maroc`,
  description: `${SITE_CONFIG.professor.bio} Découvrez l'enseignant et pourquoi tous les cours restent 100% gratuits pour les élèves marocains.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      {/* Subtle coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb items={[{ name: 'À Propos', url: '/a-propos' }]} />

        {/* Professor Editorial Profile Header */}
        <div className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Instructor Visual: Real Photo (if provided) or Designed Mathematics Composition */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] bg-[#0A192F] border border-[#0F172A]/10 shadow-md flex items-center justify-center">
                {SITE_CONFIG.professor.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={SITE_CONFIG.professor.photoUrl}
                    alt={SITE_CONFIG.professor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full p-6 flex flex-col justify-between select-none">
                    {/* Subtle mathematical coordinate grid in canvas */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none math-grid-bg" />

                    <div className="flex items-center justify-between text-xs font-mono text-blue-300">
                      <span>MATHS MAROC</span>
                      <span>f : ℝ → ℝ</span>
                    </div>

                    {/* Central Geometric & Typography Identity */}
                    <div className="text-center space-y-3 z-10">
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-serif text-white font-bold shadow-inner">
                        OA
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl font-black text-white">
                          {SITE_CONFIG.professor.name}
                        </div>
                        <div className="text-xs text-blue-200 font-medium">
                          {SITE_CONFIG.professor.title}
                        </div>
                      </div>
                    </div>

                    {/* Mathematical Theorem Annotation */}
                    <div className="p-3 rounded-[8px] bg-white/10 backdrop-blur-xs text-white border border-white/15 text-xs text-center z-10 font-mono">
                      lim (x→0) sin(x)/x = 1
                    </div>
                  </div>
                )}
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
              
              <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                {SITE_CONFIG.professor.bio}
              </p>

              {/* Professor Philosophy Quote */}
              <div className="p-5 rounded-[12px] bg-[#FAF9F5] border-l-4 border-l-[#1D4ED8] border-y border-r border-[#0F172A]/10 text-base text-[#1E293B] italic leading-relaxed font-serif">
                « {SITE_CONFIG.professor.quote} »
              </div>

              {/* Truthful Key Attributes */}
              <div className="pt-2 grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-lg font-black text-[#1D4ED8] font-sans">Collège &amp; Lycée</div>
                  <div className="text-xs text-[#64748B] font-bold mt-0.5">Programme Marocain</div>
                </div>
                <div className="p-3.5 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-lg font-black text-[#CC0000] font-sans">YouTube</div>
                  <div className="text-xs text-[#64748B] font-bold mt-0.5">Tableau Virtuel</div>
                </div>
                <div className="p-3.5 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
                  <div className="text-lg font-black text-[#16A34A] font-sans">100% Gratuit</div>
                  <div className="text-xs text-[#64748B] font-bold mt-0.5">Accès Libre</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1. WHY 100% FREE MANIFESTO */}
        <section id="manifeste" className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>Mission &amp; Égalité Réelle des Chances</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Pourquoi cette plateforme restera toujours 100% gratuite ?
          </h2>
          
          <div className="text-base sm:text-lg text-[#334155] space-y-4 leading-relaxed">
            <p>
              Au Maroc, les mathématiques représentent le filtre majeur d&apos;orientation scolaire et d&apos;accès aux écoles d&apos;ingénieurs et de médecine. Pourtant, de nombreux élèves motivés se heurtent à des barrières économiques ou géographiques face au coût des cours particuliers.
            </p>
            <p>
              Notre engagement est d&apos;offrir à chaque élève — qu&apos;il soit à Oujda, Zagora, Tanger, Casablanca ou dans un village rural — la même qualité d&apos;explication claire et rigoureuse, sans barrière financière.
            </p>
            <p className="font-bold text-[#0F172A] p-4 rounded-[10px] bg-[#FAF9F5] border border-[#0F172A]/10">
              Aucun abonnement, aucun compte payant : la réussite académique de chaque élève marocain est notre unique mission.
            </p>
          </div>
        </section>

        {/* 2. TEACHING METHODOLOGY IN 3 STEPS */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-8 shadow-2xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <Compass className="w-4 h-4" />
              <span>Approche Didactique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              La Méthode Pédagogique en 3 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-base">
                1
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Le Cours Magistral
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Comprendre le sens géométrique et théorique des notions au tableau avant de manipuler les formules.
              </p>
            </div>

            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-base">
                2
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Les Exercices Progressifs
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Des exercices d&apos;application directe jusqu&apos;aux problèmes de synthèse avec corrections détaillées rédigées.
              </p>
            </div>

            <div className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-base">
                3
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Les Annales du Baccalauréat
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                S&apos;entraîner sur les véritables sujets d&apos;examens nationaux des sessions passées selon le barème officiel.
              </p>
            </div>
          </div>
        </section>

        {/* 3. CONTACT & SOCIALS */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-6 shadow-2xs">
          <h2 className="text-2xl font-extrabold text-[#0F172A]">
            Contacter l&apos;Enseignant
          </h2>
          <p className="text-base text-[#475569]">
            Pour poser une question sur un exercice, suggérer un chapitre ou signaler une coquille, contactez-nous directement :
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${SITE_CONFIG.socials.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[#0F172A] text-white text-sm font-bold hover:bg-[#1E293B] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{SITE_CONFIG.socials.email}</span>
            </a>

            <a
              href={SITE_CONFIG.youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[#CC0000] text-white text-sm font-bold hover:bg-[#b00000] transition-colors"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Chaîne YouTube</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
