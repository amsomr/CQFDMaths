'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BacExamCard } from '@/components/BacExamCard';
import { MathView } from '@/components/MathView';
import { PdfViewerModal } from '@/components/PdfViewerModal';
import { 
  BAC_EXAMS, 
  BAC_SIMILI_EXAMS, 
  DEVOIRS_SURVEILLES, 
  BAC_ESSENTIAL_FORMULAS 
} from '@/data/bac-exams';
import { BacExam, ChapterResource, LevelId, BranchId } from '@/data/types';
import { 
  GraduationCap, 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Search, 
  Filter, 
  BookOpen, 
  FolderCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const EXAMS_PER_PAGE = 12;

export default function BacRevisionPage() {
  const [activeSection, setActiveSection] = useState<'nationaux' | 'blancs' | 'devoirs' | 'formulaire'>('nationaux');
  
  // National Exams filters
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSession, setSelectedSession] = useState<'all' | 'Normale' | 'Rattrapage'>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [searchExamQuery, setSearchExamQuery] = useState('');
  const [examPage, setExamPage] = useState(1);

  // Devoirs filters
  const [devoirLevel, setDevoirLevel] = useState<LevelId | 'all'>('all');
  const [devoirSemester, setDevoirSemester] = useState<1 | 2 | 'all'>('all');
  const [searchDevoirQuery, setSearchDevoirQuery] = useState('');

  // Simili filters
  const [similiBranch, setSimiliBranch] = useState<string>('all');

  // PDF Viewer Modal state
  const [selectedResource, setSelectedResource] = useState<ChapterResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useLanguage();

  // Extract distinct years sorted descending
  const availableYears = useMemo(() => {
    const set = new Set<number>();
    BAC_EXAMS.forEach((e) => set.add(e.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Filter National Exams
  const filteredExams = useMemo(() => {
    return BAC_EXAMS.filter((exam) => {
      if (selectedYear !== 'all' && exam.year !== selectedYear) return false;
      if (selectedSession !== 'all' && exam.session !== selectedSession) return false;
      if (selectedBranch !== 'all' && exam.branchId !== selectedBranch) return false;
      if (searchExamQuery.trim()) {
        const q = searchExamQuery.toLowerCase();
        const matches =
          exam.title.toLowerCase().includes(q) ||
          exam.branchName.toLowerCase().includes(q) ||
          exam.keyTopics.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedYear, selectedSession, selectedBranch, searchExamQuery]);

  const totalExamPages = Math.ceil(filteredExams.length / EXAMS_PER_PAGE);
  const paginatedExams = useMemo(() => {
    const start = (examPage - 1) * EXAMS_PER_PAGE;
    return filteredExams.slice(start, start + EXAMS_PER_PAGE);
  }, [filteredExams, examPage]);

  // Filter Devoirs Surveillés
  const filteredDevoirs = useMemo(() => {
    return DEVOIRS_SURVEILLES.filter((d) => {
      if (devoirLevel !== 'all' && d.levelId !== devoirLevel) return false;
      if (devoirSemester !== 'all' && d.semester !== devoirSemester) return false;
      if (searchDevoirQuery.trim()) {
        const q = searchDevoirQuery.toLowerCase();
        if (!d.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [devoirLevel, devoirSemester, searchDevoirQuery]);

  // Filter Simili / Blancs
  const filteredSimili = useMemo(() => {
    return BAC_SIMILI_EXAMS.filter((s) => {
      if (similiBranch !== 'all' && s.branchId !== similiBranch) return false;
      return true;
    });
  }, [similiBranch]);

  const handleViewExam = (exam: BacExam, mode: 'sujet' | 'corrige') => {
    const isCorrige = mode === 'corrige';
    const targetUrl = isCorrige && exam.correctionPdfUrl ? exam.correctionPdfUrl : exam.subjectPdfUrl;
    setSelectedResource({
      id: `${exam.id}-${mode}`,
      title: isCorrige ? `[Corrigé Officiel] ${exam.title}` : exam.title,
      category: isCorrige ? 'corrige' : 'examen',
      fileUrl: targetUrl,
      solutionUrl: exam.correctionPdfUrl,
      source: 'CQFDMaths — Prof. Jamaa Aknari (Annales Nationales)'
    });
    setIsModalOpen(true);
  };

  const handleViewGeneric = (title: string, fileUrl: string, category: 'devoir' | 'examen') => {
    setSelectedResource({
      id: `doc-${Date.now()}`,
      title,
      category,
      fileUrl,
      source: 'CQFDMaths — Prof. Jamaa Aknari'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumb items={[{ name: 'Espace Annales & Bac', url: '/bac' }]} />

        {/* Campaign Banner - Deep Royal Academic Aesthetic */}
        <div className="rounded-[20px] bg-[#0A192F] text-white p-8 sm:p-14 border border-[#1E293B] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 math-grid-bg opacity-10 pointer-events-none" />
          
          <div className="relative max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>{t.bac.badge} • 2008 – 2025</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans">
              {t.bac.title} — Annales &amp; Contrôles Continus
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Préparez sereinement vos examens avec l&apos;intégralité des <strong className="text-white">{BAC_EXAMS.length} sessions nationales</strong> (2008–2025) corrigées selon les exigences ministérielles, ainsi que notre banque de <strong className="text-white">{DEVOIRS_SURVEILLES.length} devoirs surveillés</strong> des lycées marocains.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={() => setActiveSection('nationaux')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSection === 'nationaux'
                    ? 'bg-[#1D4ED8] text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Examens Nationaux ({BAC_EXAMS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('blancs')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSection === 'blancs'
                    ? 'bg-[#1D4ED8] text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Examens Blancs &amp; Simili ({BAC_SIMILI_EXAMS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('devoirs')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSection === 'devoirs'
                    ? 'bg-[#1D4ED8] text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <FolderCheck className="w-4 h-4" />
                <span>Devoirs Surveillés ({DEVOIRS_SURVEILLES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('formulaire')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeSection === 'formulaire'
                    ? 'bg-[#1D4ED8] text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Formulaire Essentiel</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Citability & Method Target: National Exam Prep Guide */}
        <section className="rounded-[18px] bg-white border border-[#0F172A]/10 p-6 sm:p-8 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>Méthodologie &amp; Épreuve Nationale</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Comment réviser les examens nationaux du Baccalauréat de Mathématiques au Maroc ?
          </h2>
          <p className="text-base text-[#334155] leading-relaxed">
            La préparation de l&apos;épreuve de mathématiques du Baccalauréat marocain (coefficient 9 en Sciences Mathématiques et coefficient 7 en Sciences Expérimentales PC/SVT) exige une maîtrise des annales officielles combinée à une rigueur de rédaction impeccable. Sur CQFDMaths, les élèves disposent des 89 sujets officiels des examens nationaux de 2008 à 2025 (sessions normales et sessions de rattrapage), tous assortis de corrigés détaillés étape par étape et de vidéos explicatives animées par le Professeur Jamaa Aknari. Les sessions couvrent l&apos;analyse approfondie (continuité, dérivation, calcul intégral, équations différentielles), les nombres complexes, les structures algébriques, les probabilités et la géométrie dans l&apos;espace. S&apos;entraîner sur ces archives en conditions réelles permet de développer les automatismes requis et de maximiser la note finale pour l&apos;accès aux classes préparatoires (CPGE) et aux facultés de médecine.
          </p>
        </section>

        {/* 1. EXAM FILTER & REPOSITORY */}
        {activeSection === 'nationaux' && (
          <section id="examens" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Annales Officielles du Ministère de l&apos;Éducation Nationale (BIOF)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  Examens Nationaux Corrigés (2008 – 2025)
                </h2>
              </div>
              <div className="text-xs text-[#64748B] font-medium font-mono">
                <span className="font-bold text-[#0F172A]">{filteredExams.length}</span> sessions disponibles avec sujet &amp; corrigé
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-4">
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchExamQuery}
                  onChange={(e) => {
                    setSearchExamQuery(e.target.value);
                    setExamPage(1);
                  }}
                  placeholder="Rechercher par notion (ex: arithmétique, TVI, nombres complexes, intégrales)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] text-[#0F172A]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#0F172A]/10 text-xs">
                
                {/* Year Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#475569] mr-1">Année :</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10));
                      setExamPage(1);
                    }}
                    className="px-3 py-1.5 rounded-[6px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="all">Toutes les années (2008–2025)</option>
                    {availableYears.map((y) => (
                      <option key={y} value={y}>
                        Session {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Session Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#475569] mr-1">Session :</span>
                  {(['all', 'Normale', 'Rattrapage'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSession(s);
                        setExamPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all border cursor-pointer ${
                        selectedSession === s
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                          : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                      }`}
                    >
                      {s === 'all' ? 'Toutes' : s}
                    </button>
                  ))}
                </div>

                {/* Branch Selector */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-bold text-[#475569]">Filière :</span>
                  <select
                    value={selectedBranch}
                    onChange={(e) => {
                      setSelectedBranch(e.target.value);
                      setExamPage(1);
                    }}
                    className="px-3 py-1.5 rounded-[6px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="all">Toutes les filières</option>
                    <option value="sciences-maths">Sciences Mathématiques (SM)</option>
                    <option value="sciences-physiques">Sciences Physiques (PC)</option>
                    <option value="svt">Sciences de la Vie et de la Terre (SVT)</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Exam Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedExams.map((exam) => (
                <BacExamCard key={exam.id} exam={exam} onViewExam={handleViewExam} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalExamPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setExamPage((p) => Math.max(p - 1, 1))}
                  disabled={examPage === 1}
                  className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-xs font-bold font-mono">
                  {Array.from({ length: Math.min(totalExamPages, 7) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalExamPages > 7 && examPage > 4) {
                      pageNum = examPage - 3 + i;
                      if (pageNum > totalExamPages) pageNum = totalExamPages - (6 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setExamPage(pageNum)}
                        className={`w-8 h-8 rounded-[6px] transition-all cursor-pointer ${
                          examPage === pageNum
                            ? 'bg-[#1D4ED8] text-white shadow-2xs'
                            : 'bg-white text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setExamPage((p) => Math.min(p + 1, totalExamPages))}
                  disabled={examPage === totalExamPages}
                  className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {filteredExams.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[14px] border border-[#0F172A]/10 p-8 space-y-3">
                <GraduationCap className="w-10 h-10 text-[#94A3B8] mx-auto" />
                <h3 className="text-lg font-bold text-[#0F172A]">Aucun examen ne correspond aux critères</h3>
                <p className="text-sm text-[#64748B]">Essayez de sélectionner une autre année ou filière.</p>
              </div>
            )}

          </section>
        )}

        {/* 2. EXAMENS BLANCS & SIMILI */}
        {activeSection === 'blancs' && (
          <section id="blancs" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <span>Sujets de Préparation &amp; Concours Blancs</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  Examens Simili &amp; Épreuves Blanches
                </h2>
              </div>
              <div className="text-xs text-[#64748B] font-mono font-medium">
                <span className="font-bold text-[#0F172A]">{filteredSimili.length}</span> épreuves de simulation
              </div>
            </div>

            {/* Filière filter */}
            <div className="p-4 rounded-[12px] bg-white border border-[#0F172A]/10 flex items-center gap-3 text-xs">
              <span className="font-bold text-[#475569]">Filière :</span>
              {['all', 'sciences-maths', 'sciences-physiques'].map((br) => (
                <button
                  key={br}
                  type="button"
                  onClick={() => setSimiliBranch(br)}
                  className={`px-3 py-1.5 rounded-[6px] font-bold transition-all border cursor-pointer ${
                    similiBranch === br
                      ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                      : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                  }`}
                >
                  {br === 'all' ? 'Toutes' : br === 'sciences-maths' ? 'Sciences Maths' : 'Sciences Physiques & SVT'}
                </button>
              ))}
            </div>

            {/* Simili Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSimili.map((simili) => (
                <div
                  key={simili.id}
                  className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold bg-[#B45309]/10 text-[#B45309] border border-[#B45309]/20 inline-block mb-2.5">
                      Examen Blanc / Simili
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors mb-2">
                      {simili.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {simili.source || 'CQFDMaths — Prof. Jamaa Aknari'}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#0F172A]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewGeneric(simili.title, simili.fileUrl, 'examen')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Consulter</span>
                    </button>
                    <a
                      href={simili.fileUrl}
                      download
                      className="p-1.5 rounded-[6px] bg-[#FAF9F5] hover:bg-slate-100 text-slate-700 border border-[#0F172A]/10 transition-colors"
                      title="Télécharger l'épreuve (PDF)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. DEVOIRS SURVEILLÉS */}
        {activeSection === 'devoirs' && (
          <section id="devoirs" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1.5">
                  <FolderCheck className="w-4 h-4 text-emerald-600" />
                  <span>Contrôles Continus des Lycées Marocains</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  Devoirs Surveillés avec Corrigés (Semestre 1 &amp; 2)
                </h2>
              </div>
              <div className="text-xs text-[#64748B] font-mono font-medium">
                <span className="font-bold text-[#0F172A]">{filteredDevoirs.length}</span> devoirs surveillés indexés
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDevoirQuery}
                  onChange={(e) => setSearchDevoirQuery(e.target.value)}
                  placeholder="Rechercher par numéro de devoir ou modèle (ex: Devoir 1, Modèle 3)..."
                  className="w-full pl-10 pr-4 py-2 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] text-[#0F172A]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#0F172A]/10 text-xs">
                {/* Level selector */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#475569] mr-1">Niveau :</span>
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: '2eme-bac', label: '2ème Bac' },
                    { id: '1ere-bac', label: '1ère Bac' },
                    { id: 'tronc-commun', label: 'Tronc Commun' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setDevoirLevel(lvl.id as LevelId | 'all')}
                      className={`px-3 py-1.5 rounded-[6px] font-bold transition-all border cursor-pointer ${
                        devoirLevel === lvl.id
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                          : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>

                {/* Semester selector */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="font-bold text-[#475569] mr-1">Semestre :</span>
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: 1, label: 'Semestre 1' },
                    { id: 2, label: 'Semestre 2' },
                  ].map((sem) => (
                    <button
                      key={sem.id}
                      type="button"
                      onClick={() => setDevoirSemester(sem.id as 1 | 2 | 'all')}
                      className={`px-3 py-1.5 rounded-[6px] font-bold transition-all border cursor-pointer ${
                        devoirSemester === sem.id
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs'
                          : 'bg-[#FAF9F5] text-[#475569] border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                      }`}
                    >
                      {sem.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Devoirs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDevoirs.slice(0, 30).map((devoir) => (
                <div
                  key={devoir.id}
                  className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <span className="px-2 py-0.5 rounded-[5px] text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Semestre {devoir.semester}
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {devoir.levelId}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors mb-2">
                      {devoir.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {devoir.source || 'Contrôle continu Lycée BIOF'}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#0F172A]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewGeneric(devoir.title, devoir.fileUrl, 'devoir')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Consulter le Devoir</span>
                    </button>
                    <a
                      href={devoir.fileUrl}
                      download
                      className="p-1.5 rounded-[6px] bg-[#FAF9F5] hover:bg-slate-100 text-slate-700 border border-[#0F172A]/10 transition-colors"
                      title="Télécharger l'épreuve (PDF)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredDevoirs.length > 30 && (
              <p className="text-center text-xs text-[#64748B] font-mono pt-2">
                Affichage des 30 premiers devoirs sur un total de {filteredDevoirs.length}. Utilisez les filtres de niveau et de semestre pour affiner.
              </p>
            )}
          </section>
        )}

        {/* 4. OFFICIAL SUMMARY FORMULAS SECTION */}
        {activeSection === 'formulaire' && (
          <section id="formulaire" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0F172A]/10 pb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1">
                  Formulaire Officiel Résumé
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  Les Formules Essentielles à Maîtriser au Bac
                </h2>
              </div>
              <div className="text-xs text-[#64748B]">
                Conforme au cadre d&apos;évaluation de l&apos;examen national
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BAC_ESSENTIAL_FORMULAS.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[14px] border border-[#0F172A]/10 space-y-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-[#0F172A]/10 pb-3">
                    <h3 className="font-extrabold text-base text-[#0F172A]">
                      {group.category}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] bg-[#FAF9F5] border border-[#0F172A]/10 px-2 py-0.5 rounded-[4px]">
                      2ème Bac
                    </span>
                  </div>

                  <div className="space-y-3">
                    {group.formulas.map((item, fIdx) => (
                      <div key={fIdx} className="p-3.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10">
                        <span className="text-xs font-bold text-[#1D4ED8] block mb-1">
                          {item.name} :
                        </span>
                        <div className="overflow-x-auto text-xs py-1">
                          <MathView math={item.latex} inline={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* PDF Modal Viewer */}
      <PdfViewerModal
        resource={selectedResource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

