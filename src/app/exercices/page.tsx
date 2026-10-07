'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ExerciseCard } from '@/components/ExerciseCard';
import { PdfViewerModal } from '@/components/PdfViewerModal';
import { getAllExercises, getAllSeriesResources, CURRICULUM_LEVELS, EnrichedResource } from '@/data/curriculum';
import { Difficulty, LevelId, BranchId, ChapterResource } from '@/data/types';
import { useLanguage } from '@/components/LanguageProvider';
import { 
  Calculator, 
  Filter, 
  Search, 
  Award, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Download, 
  BookOpen, 
  Layers, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ITEMS_PER_PAGE = 24;

export default function ExercisesPage() {
  const [selectedType, setSelectedType] = useState<'all' | 'series' | 'interactif'>('all');
  const [selectedLevel, setSelectedLevel] = useState<LevelId | 'all'>('all');
  const [selectedBranch, setSelectedBranch] = useState<BranchId | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<string | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // PDF Viewer Modal state
  const [selectedResource, setSelectedResource] = useState<ChapterResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useLanguage();

  const allInteractiveExercises = useMemo(() => getAllExercises(), []);
  const allSeriesResources = useMemo(() => getAllSeriesResources(), []);

  // Filter available branches based on selected level
  const availableBranches = useMemo(() => {
    if (selectedLevel === 'all') {
      const branchesMap = new Map<string, { id: BranchId; name: string }>();
      CURRICULUM_LEVELS.forEach((lvl) => {
        lvl.branches.forEach((br) => {
          if (!branchesMap.has(br.id)) {
            branchesMap.set(br.id, { id: br.id, name: `${br.name} (${lvl.name})` });
          }
        });
      });
      return Array.from(branchesMap.values());
    }
    const lvl = CURRICULUM_LEVELS.find((l) => l.id === selectedLevel);
    return lvl ? lvl.branches.map((b) => ({ id: b.id, name: b.name })) : [];
  }, [selectedLevel]);

  // Filter available chapters based on selected level and branch
  const availableChapters = useMemo(() => {
    const chaptersMap = new Map<string, { slug: string; title: string }>();
    CURRICULUM_LEVELS.forEach((lvl) => {
      if (selectedLevel !== 'all' && lvl.id !== selectedLevel) return;
      lvl.branches.forEach((br) => {
        if (selectedBranch !== 'all' && br.id !== selectedBranch) return;
        br.chapters.forEach((ch) => {
          if (!chaptersMap.has(ch.slug)) {
            chaptersMap.set(ch.slug, { slug: ch.slug, title: ch.title });
          }
        });
      });
    });
    return Array.from(chaptersMap.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedLevel, selectedBranch]);

  // Reset chapter and branch if incompatible
  const handleLevelChange = (lvl: LevelId | 'all') => {
    setSelectedLevel(lvl);
    setSelectedBranch('all');
    setSelectedChapter('all');
    setCurrentPage(1);
  };

  const handleBranchChange = (branch: BranchId | 'all') => {
    setSelectedBranch(branch);
    setSelectedChapter('all');
    setCurrentPage(1);
  };

  const handleChapterChange = (chapter: string | 'all') => {
    setSelectedChapter(chapter);
    setCurrentPage(1);
  };

  // Filter series PDFs
  const filteredSeries = useMemo(() => {
    if (selectedType === 'interactif') return [];

    return allSeriesResources.filter((serie) => {
      if (selectedLevel !== 'all' && serie.levelId !== selectedLevel) return false;
      if (selectedBranch !== 'all' && serie.branchId !== selectedBranch) return false;
      if (selectedChapter !== 'all' && serie.chapterSlug !== selectedChapter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          serie.title.toLowerCase().includes(q) ||
          serie.chapterTitle.toLowerCase().includes(q) ||
          serie.branchName.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [allSeriesResources, selectedType, selectedLevel, selectedBranch, selectedChapter, searchQuery]);

  // Filter interactive exercises
  const filteredInteractive = useMemo(() => {
    if (selectedType === 'series') return [];

    return allInteractiveExercises.filter((exo) => {
      if (selectedLevel !== 'all' && exo.levelId !== selectedLevel) return false;
      if (selectedBranch !== 'all' && exo.branchId !== selectedBranch) return false;
      if (selectedChapter !== 'all' && exo.chapterSlug !== selectedChapter) return false;
      if (selectedDifficulty !== 'all' && exo.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          exo.title.toLowerCase().includes(q) ||
          exo.question.toLowerCase().includes(q) ||
          exo.chapterSlug.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [allInteractiveExercises, selectedType, selectedLevel, selectedBranch, selectedChapter, selectedDifficulty, searchQuery]);

  const totalResultsCount = filteredSeries.length + filteredInteractive.length;

  // Paginated series
  const totalPages = Math.ceil(filteredSeries.length / ITEMS_PER_PAGE);
  const paginatedSeries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSeries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSeries, currentPage]);

  const openPdf = (res: ChapterResource, asSolution = false) => {
    if (asSolution && res.solutionUrl) {
      setSelectedResource({
        ...res,
        fileUrl: res.solutionUrl,
        title: `[Corrigé] ${res.title}`,
        category: 'corrige'
      });
    } else {
      setSelectedResource(res);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb items={[{ name: 'Exercices & Séries Corrigées', url: '/exercices' }]} />

        {/* Page Header - Editorial Layout */}
        <div className="space-y-4 max-w-4xl pb-6 border-b border-[#0F172A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-[#1D4ED8]/10 text-[#1D4ED8]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Banque de Séries &amp; Problèmes BIOF Lycée</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            Exercices, Séries d&apos;Entraînement &amp; Corrigés Détaillés
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Accédez à plus de <strong className="text-[#0F172A]">{allSeriesResources.length} séries d&apos;exercices PDF</strong> officielles avec solutions détaillées couvrant l&apos;intégralité du programme marocain de mathématiques (Tronc Commun, 1ère Bac et 2ème Bac), ainsi qu&apos;à nos exercices interactifs guidés pas-à-pas.
          </p>
        </div>

        {/* AI Citability & Practice Methodology Target */}
        <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>Pédagogie de Résolution • Lycée BIOF</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Comment progresser en mathématiques grâce aux séries d&apos;exercices corrigés au Lycée ?
          </h2>
          <p className="text-base text-[#334155] leading-relaxed">
            Pour réussir en mathématiques au Lycée marocain (Tronc Commun, 1ère Bac et 2ème Bac), la résolution active d&apos;exercices gradués est la clé essentielle de l&apos;apprentissage. CQFDMaths met à disposition 1 130 séries d&apos;exercices d&apos;entraînement conformes au programme ministériel BIOF, accompagnées de corrigés officiels rigoureusement rédigés par étape. Chaque série aborde les applications directes du cours, les pièges classiques de raisonnement et les problèmes de synthèse préparant aux contrôles continus et aux épreuves du Baccalauréat. L&apos;élève est guidé pour développer son autonomie de rédaction, identifier les méthodes de démonstration adaptées et consolider les automatismes de calcul indispensables pour intégrer les classes préparatoires aux grandes écoles (CPGE) et les facultés de médecine.
          </p>
        </div>

        {/* Filter Bar Component */}
        <div className="p-6 rounded-[14px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-5">
          
          {/* Search bar & Type Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Rechercher par notion (ex: TVI, logarithme, produit scalaire, dénombrement)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-[#0F172A] placeholder-[#94A3B8]"
              />
            </div>

            {/* Type selector tabs */}
            <div className="flex items-center gap-2 border border-[#0F172A]/10 p-1 rounded-[8px] bg-[#FAF9F5] text-xs font-bold shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedType('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-white text-[#1D4ED8] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Tous ({totalResultsCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType('series');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'series'
                    ? 'bg-white text-[#1D4ED8] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Séries PDF ({filteredSeries.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType('interactif');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-[6px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === 'interactif'
                    ? 'bg-white text-[#1D4ED8] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactifs ({filteredInteractive.length})</span>
              </button>
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#0F172A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Niveau :
            </span>
            <button
              type="button"
              onClick={() => handleLevelChange('all')}
              className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-[#1D4ED8] text-white shadow-2xs'
                  : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
              }`}
            >
              Tous les Niveaux
            </button>
            {CURRICULUM_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => handleLevelChange(lvl.id)}
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-[#1D4ED8] text-white shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Branch and Chapter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#0F172A]/10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Filière :
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => handleBranchChange(e.target.value as BranchId | 'all')}
                className="w-full px-3 py-2 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              >
                <option value="all">Toutes les filières</option>
                {availableBranches.map((br) => (
                  <option key={br.id} value={br.id}>
                    {br.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Chapitre :
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => handleChapterChange(e.target.value)}
                className="w-full px-3 py-2 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              >
                <option value="all">Tous les chapitres ({availableChapters.length})</option>
                {availableChapters.map((ch) => (
                  <option key={ch.slug} value={ch.slug}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* RESULTS SECTION */}
        <div className="space-y-8">
          
          {/* 1. INTERACTIVE EXERCISES SECTION (if any match) */}
          {filteredInteractive.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#0F172A]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#1D4ED8]" />
                  <h2 className="text-xl font-black text-[#0F172A]">
                    Exercices Interactifs Guidés Pas-à-Pas
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-full">
                  {filteredInteractive.length} disponible{filteredInteractive.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {filteredInteractive.map((exo) => (
                  <ExerciseCard key={exo.id} exercise={exo} showLessonLink={true} />
                ))}
              </div>
            </div>
          )}

          {/* 2. PDF SERIES SECTION */}
          {filteredSeries.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#0F172A]/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1D4ED8]" />
                  <h2 className="text-xl font-black text-[#0F172A]">
                    Séries d&apos;Exercices PDF &amp; Corrigés Types
                  </h2>
                </div>
                <div className="text-xs text-[#64748B] font-mono">
                  Affichage de <span className="font-bold text-[#0F172A]">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> à{' '}
                  <span className="font-bold text-[#0F172A]">{Math.min(currentPage * ITEMS_PER_PAGE, filteredSeries.length)}</span> sur{' '}
                  <span className="font-bold text-[#0F172A]">{filteredSeries.length}</span> séries
                </div>
              </div>

              {/* Grid of Series Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedSeries.map((serie) => (
                  <div
                    key={serie.id}
                    className="p-5 rounded-[12px] bg-white border border-[#0F172A]/10 shadow-2xs hover:border-[#1D4ED8] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Level and Branch badges */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold bg-[#1D4ED8]/10 text-[#1D4ED8]">
                          {serie.levelName}
                        </span>
                        <span className="text-[11px] font-semibold text-[#64748B] truncate max-w-[140px]">
                          {serie.branchName}
                        </span>
                      </div>

                      {/* Chapter cross-link */}
                      <Link
                        href={`/cours/${serie.levelId}/${serie.branchId}/${serie.chapterSlug}`}
                        className="inline-flex items-center gap-1 text-xs text-[#1D4ED8] hover:underline font-semibold mb-2 group-hover:text-[#1E40AF]"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span className="truncate max-w-[260px]">{serie.chapterTitle}</span>
                        <ArrowRight className="w-3 h-3 ml-0.5 shrink-0" />
                      </Link>

                      {/* Series title */}
                      <h3 className="text-base font-bold text-[#0F172A] leading-snug group-hover:text-[#1D4ED8] transition-colors mb-3">
                        {serie.title}
                      </h3>

                      {/* Correction indicator */}
                      <div className="text-xs text-emerald-700 flex items-center gap-1 font-medium mb-4">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{serie.solutionUrl ? 'Corrigé officiel inclus' : 'Énoncé officiel avec barème'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#0F172A]/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openPdf(serie, false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors shadow-2xs cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Énoncé</span>
                        </button>

                        {serie.solutionUrl && (
                          <button
                            type="button"
                            onClick={() => openPdf(serie, true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Corrigé</span>
                          </button>
                        )}
                      </div>

                      <a
                        href={serie.fileUrl}
                        download
                        className="p-1.5 rounded-[6px] bg-[#FAF9F5] hover:bg-slate-100 text-slate-600 border border-[#0F172A]/10 transition-colors"
                        title="Télécharger l'énoncé (PDF)"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1 text-xs font-bold font-mono">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 7 && currentPage > 4) {
                        pageNum = currentPage - 3 + i;
                        if (pageNum > totalPages) pageNum = totalPages - (6 - i);
                      }
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-[6px] transition-all cursor-pointer ${
                            currentPage === pageNum
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
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-[8px] border border-[#0F172A]/10 bg-white text-[#475569] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {totalResultsCount === 0 && (
            <div className="text-center py-16 bg-white rounded-[14px] border border-[#0F172A]/10 p-8 space-y-3">
              <Calculator className="w-10 h-10 text-[#94A3B8] mx-auto" />
              <h3 className="text-lg font-bold text-[#0F172A]">Aucun exercice ne correspond à vos filtres</h3>
              <p className="text-sm text-[#64748B]">Essayez de sélectionner un autre niveau ou de réinitialiser vos termes de recherche.</p>
            </div>
          )}

        </div>

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

