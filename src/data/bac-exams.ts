import { BacExam } from './types';

export const BAC_EXAMS: BacExam[] = [
  {
    id: 'bac-nat-2025-sm-normale',
    year: 2025,
    session: 'Normale',
    branchId: 'sciences-maths',
    branchName: 'Sciences Mathématiques (A & B)',
    title: 'Examen National 2025 — Session Normale (Sciences Maths)',
    durationHours: 4,
    coefficient: 9,
    subjectPdfUrl: '/docs/examens/National_2025_SM_Normale_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2025_SM_Normale_Correction.pdf',
    youtubeVideoId: 'mRk4_s9U2pE',
    totalExercises: 5,
    keyTopics: ['Structures algébriques (Groupes & Corps)', 'Arithmétique dans Z', 'Nombres complexes & Géométrie', 'Analyse & Intégrales', 'Équations différentielles'],
    difficulty: 'Très difficile'
  },
  {
    id: 'bac-nat-2025-pc-normale',
    year: 2025,
    session: 'Normale',
    branchId: 'sciences-physiques',
    branchName: 'Sciences Physiques (PC & SVT)',
    title: 'Examen National 2025 — Session Normale (Sciences Expérimentales PC)',
    durationHours: 3,
    coefficient: 7,
    subjectPdfUrl: '/docs/examens/National_2025_PC_Normale_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2025_PC_Normale_Correction.pdf',
    youtubeVideoId: 'fJ9rUzIMcZQ',
    totalExercises: 4,
    keyTopics: ['Nombres complexes', 'Suites numériques récurrentes', 'Probabilités & Tirages', 'Problème d\'analyse : Fonction exponentielle et calcul d\'aire'],
    difficulty: 'Normale'
  },
  {
    id: 'bac-nat-2024-sm-normale',
    year: 2024,
    session: 'Normale',
    branchId: 'sciences-maths',
    branchName: 'Sciences Mathématiques (A & B)',
    title: 'Examen National 2024 — Session Normale (Sciences Maths)',
    durationHours: 4,
    coefficient: 9,
    subjectPdfUrl: '/docs/examens/National_2024_SM_Normale_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2024_SM_Normale_Correction.pdf',
    youtubeVideoId: 'k7gW3QZp914',
    totalExercises: 5,
    keyTopics: ['Lois de composition interne', 'Nombres premiers & Petit Théorème de Fermat', 'Nombres complexes', 'Suites d\'intégrales & Limites'],
    difficulty: 'Très difficile'
  },
  {
    id: 'bac-nat-2024-pc-normale',
    year: 2024,
    session: 'Normale',
    branchId: 'sciences-physiques',
    branchName: 'Sciences Physiques (PC)',
    title: 'Examen National 2024 — Session Normale (Sciences Physiques)',
    durationHours: 3,
    coefficient: 7,
    subjectPdfUrl: '/docs/examens/National_2024_PC_Normale_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2024_PC_Normale_Correction.pdf',
    youtubeVideoId: 'V9dE7uM2w8Q',
    totalExercises: 4,
    keyTopics: ['Géométrie dans l\'espace (Sphère & Plan)', 'Nombres complexes', 'Probabilités conditionnelles', 'Étude de fonction avec Logarithme Népérien'],
    difficulty: 'Normale'
  },
  {
    id: 'bac-nat-2024-pc-rattrapage',
    year: 2024,
    session: 'Rattrapage',
    branchId: 'sciences-physiques',
    branchName: 'Sciences Physiques (PC)',
    title: 'Examen National 2024 — Session Rattrapage (Sciences Physiques)',
    durationHours: 3,
    coefficient: 7,
    subjectPdfUrl: '/docs/examens/National_2024_PC_Rattrapage_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2024_PC_Rattrapage_Correction.pdf',
    youtubeVideoId: 'U_5e_Ld48Vw',
    totalExercises: 4,
    keyTopics: ['Produit scalaire & vectoriel', 'Complexes & Équation du 2nd degré', 'Suites arithmético-géométriques', 'Fonction exponentielle et TVI'],
    difficulty: 'Exigeante'
  },
  {
    id: 'bac-nat-2023-sm-normale',
    year: 2023,
    session: 'Normale',
    branchId: 'sciences-maths',
    branchName: 'Sciences Mathématiques (A & B)',
    title: 'Examen National 2023 — Session Normale (Sciences Maths)',
    durationHours: 4,
    coefficient: 9,
    subjectPdfUrl: '/docs/examens/National_2023_SM_Normale_Sujet.pdf',
    correctionPdfUrl: '/docs/examens/National_2023_SM_Normale_Correction.pdf',
    youtubeVideoId: 'mRk4_s9U2pE',
    totalExercises: 5,
    keyTopics: ['Anneaux et corps', 'Arithmétique modulaire', 'Équations complexes & similitudes', 'Théorème de Rolle & TAF'],
    difficulty: 'Très difficile'
  }
];

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
