import { BacExam, DevoirSurveille, SimiliExam, BranchId, LevelId } from './types';
import scrapedData from './scraped-exams.json';

const VIDEO_SOLUTIONS_MAP: Record<string, string> = {
  'bac-sciences-maths-2025-normale': 'mRk4_s9U2pE',
  'bac-sciences-physiques-2025-normale': 'fJ9rUzIMcZQ',
  'bac-sciences-maths-2024-normale': 'k7gW3QZp914',
  'bac-sciences-physiques-2024-normale': 'V9dE7uM2w8Q',
  'bac-sciences-physiques-2024-rattrapage': 'U_5e_Ld48Vw',
  'bac-sciences-maths-2023-normale': 'mRk4_s9U2pE',
};

export const BAC_EXAMS: BacExam[] = (scrapedData.exams as BacExam[]).map((exam) => ({
  ...exam,
  youtubeVideoId: VIDEO_SOLUTIONS_MAP[exam.id] || exam.youtubeVideoId,
  totalExercises: exam.totalExercises || (exam.branchId === 'sciences-maths' ? 5 : 4),
}));

export const BAC_SIMILI_EXAMS: SimiliExam[] = scrapedData.examensBlancs as SimiliExam[];

export const DEVOIRS_SURVEILLES: DevoirSurveille[] = scrapedData.devoirs as DevoirSurveille[];

export function getExamsByBranch(branchId: BranchId): BacExam[] {
  return BAC_EXAMS.filter((exam) => exam.branchId === branchId);
}

export function getExamsByYear(year: number): BacExam[] {
  return BAC_EXAMS.filter((exam) => exam.year === year);
}

export function getDevoirsByLevel(levelId: LevelId): DevoirSurveille[] {
  return DEVOIRS_SURVEILLES.filter((d) => d.levelId === levelId);
}

export function getDevoirsByBranch(branchId: BranchId, semester?: 1 | 2): DevoirSurveille[] {
  return DEVOIRS_SURVEILLES.filter((d) => d.branchId === branchId && (semester ? d.semester === semester : true));
}

export const BAC_ESSENTIAL_FORMULAS = [
  {
    category: 'Limites Fondamentales (À retenir par cœur)',
    categoryAr: 'نهايات اعتيادية أساسية (للحفظ عن ظهر قلب)',
    formulas: [
      { name: 'Limite trigonométrique', latex: '\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1' },
      { name: 'Limite cosinus', latex: '\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}' },
      { name: 'Croissance comparée Exp', latex: '\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad (n \\in \\mathbb{N}^*)' },
      { name: 'Limite Exp en -infini', latex: '\\lim_{x \\to -\\infty} x^n e^x = 0 \\quad (n \\in \\mathbb{N}^*)' },
      { name: 'Limite Ln en +infini', latex: '\\lim_{x \\to +\\infty} \\frac{\\ln(x)}{x^n} = 0 \\quad (n > 0)' },
      { name: 'Limite Ln en 0+', latex: '\\lim_{x \\to 0^+} x^n \\ln(x) = 0 \\quad (n > 0)' },
      { name: 'Nombre dérivé Ln', latex: '\\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1' },
      { name: 'Nombre dérivé Exp', latex: '\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1' },
    ]
  },
  {
    category: 'Dérivées et Primitives Usuelles',
    categoryAr: 'المشتقات والدوال الأصلية الاعتيادية',
    formulas: [
      { name: 'Dérivée de Ln', latex: '(\\ln|u(x)|)\' = \\frac{u\'(x)}{u(x)}' },
      { name: 'Dérivée d\'Exp', latex: '(e^{u(x)})\' = u\'(x) e^{u(x)}' },
      { name: 'Dérivée de puissance', latex: '(u(x)^r)\' = r \\cdot u\'(x) \\cdot u(x)^{r-1} \\quad (r \\in \\mathbb{Q}^*)' },
      { name: 'Dérivée de racine carrée', latex: '(\\sqrt{u(x)})\' = \\frac{u\'(x)}{2\\sqrt{u(x)}}' },
      { name: 'Dérivée d\'Arctan', latex: '(\\arctan(u(x)))\' = \\frac{u\'(x)}{1 + u(x)^2}' },
      { name: 'Formule IPP', latex: '\\int_a^b u v\' = [u v]_a^b - \\int_a^b u\' v' }
    ]
  },
  {
    category: 'Nombres Complexes & Géométrie',
    categoryAr: 'الأعداد العقدية والهندسة',
    formulas: [
      { name: 'Formule de Moivre', latex: '(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)' },
      { name: 'Formules d\'Euler', latex: '\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}, \\quad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}' },
      { name: 'Écriture complexe Rotation', latex: 'z\' - \\omega = e^{i\\theta}(z - \\omega)' },
      { name: 'Écriture complexe Homothétie', latex: 'z\' - \\omega = k(z - \\omega) \\quad (k \\in \\mathbb{R}^*)' }
    ]
  }
];
