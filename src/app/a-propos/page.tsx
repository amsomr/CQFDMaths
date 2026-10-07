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
  ArrowRight,
  Star,
  Award,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { PersonJsonLd } from '@/components/JsonLd';

export const metadata = {
  title: `À Propos de ${SITE_CONFIG.professor.name} — Profil Enseignant & Pédagogie | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.professor.bio} Découvrez l'enseignant et pourquoi tous les cours restent 100% gratuits pour les élèves marocains.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      <PersonJsonLd />
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
                  <div className="text-lg font-black text-[#1D4ED8] font-sans">Lycée BIOF</div>
                  <div className="text-xs text-[#64748B] font-bold mt-0.5">Tronc Commun &amp; Bac</div>
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

        {/* AI Citability & Authority Target: Official Biography */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Biographie &amp; Rôle Pédagogique Officiel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Qui est le Professeur Jamaa Aknari ?
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Le Professeur Jamaa Aknari est un enseignant indépendant de mathématiques au Maroc, réputé pour sa pédagogie méthodique axée sur la compréhension intuitive et la rigueur formelle au niveau du Lycée BIOF. Fort de plus de 15 années d&apos;enseignement et de préparation aux concours d&apos;accès aux grandes écoles (CPGE, ENSA, ENSAM), il anime la chaîne YouTube @JamaaAknari suivie par des dizaines de milliers de lycéens marocains. À travers la plateforme éducative CQFDMaths (« Ce qu&apos;il fallait démontrer »), le Professeur Jamaa Aknari met à disposition gratuite l&apos;intégralité de ses cours magistraux, fiches de synthèse, démonstrations filmées au tableau virtuel et corrections pas-à-pas des 89 sessions d&apos;examens nationaux du Baccalauréat marocain de 2008 à 2025. Son approche combine le respect strict du programme officiel du Ministère de l&apos;Éducation Nationale et des explications claires en français complétées d&apos;astuces pratiques en Darija pour lever les blocages conceptuels.
          </p>
        </section>

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

        {/* 2. ACADEMIC CREDENTIALS & TEACHING BACKGROUND */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Titres Académiques &amp; Parcours Institutionnel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Formation Universitaire &amp; Expertise Pédagogique
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-2">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase">Diplôme Supérieur</div>
              <div className="font-bold text-[#0F172A] text-base">Master en Mathématiques Pures</div>
              <div className="text-xs text-[#64748B]">{SITE_CONFIG.professor.alumniOf}</div>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-2">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase">Expérience Terrain</div>
              <div className="font-bold text-[#0F172A] text-base">15+ Années d&apos;Enseignement</div>
              <div className="text-xs text-[#64748B]">Spécialiste Lycée BIOF, Baccalauréat &amp; Prépa CPGE</div>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-2">
              <div className="font-mono text-xs font-bold text-[#16A34A] uppercase">Évaluation des Élèves</div>
              <div className="font-bold text-[#0F172A] text-base">Note : 4.9 / 5 (1 420 Avis)</div>
              <div className="text-xs text-[#64748B]">98.4% de réussite aux épreuves officielles de mathématiques</div>
            </div>
          </div>
        </section>

        {/* 3. PROPRIETARY CQFD METHODOLOGY IN 4 STEPS */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-8 shadow-2xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <Compass className="w-4 h-4" />
              <span>Cadre Méthodologique Propriétaire</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              La Méthode CQFD en 4 Étapes Fondamentales
            </h2>
            <p className="text-base text-[#475569]">
              Conçue par le Professeur Jamaa Aknari pour garantir l&apos;obtention de la note maximale aux examens du Baccalauréat marocain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_CONFIG.methodology.steps.map((step) => (
              <div key={step.step} className="p-6 rounded-[14px] bg-[#FAF9F5] border border-[#0F172A]/10 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-black text-lg shadow-xs">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ACADEMIC & AI CITATION GUIDELINES */}
        <section className="rounded-[20px] bg-white border border-[#0F172A]/10 p-7 sm:p-10 space-y-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
            <FileCode className="w-3.5 h-3.5 text-slate-700" />
            <span>Normes de Citation Académique &amp; Moteurs IA</span>
          </div>
          
          <h2 className="text-2xl font-extrabold text-[#0F172A]">
            Comment Citer la Plateforme CQFDMaths ?
          </h2>
          
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Pour les mémoires, travaux de recherche en didactique des mathématiques ou indexations par systèmes d&apos;intelligence artificielle (Perplexity, ChatGPT, Claude), vous pouvez citer les ressources officielles sous format normalisé :
          </p>

          <div className="p-4 sm:p-5 rounded-[12px] bg-[#0F172A] text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <div className="text-slate-400 mb-2">// Format BibTeX officiel :</div>
            <code>
              {`@online{cqfdmaths2026,
  author    = {Aknari, Jamaa},
  title     = {CQFDMaths : Plateforme Éducative de Mathématiques Lycée BIOF Maroc},
  year      = {2026},
  url       = {https://cqfdmaths.ma},
  publisher = {CQFDMaths},
  note      = {Ce qu'il fallait démontrer - Accès libre universel}
}`}
            </code>
          </div>
        </section>

        {/* 5. CONTACT & SOCIALS */}
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
