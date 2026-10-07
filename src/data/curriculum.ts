import { Level, Chapter, Lesson, Exercise, ChapterResource, LevelId, BranchId } from './types';
import chapterResourcesData from './chapter-resources.json';

export const CURRICULUM_LEVELS: Level[] = [
  // ==========================================
  // 1. DEUXIÈME ANNÉE DU BACCALAURÉAT (2 BAC)
  // ==========================================
  {
    id: '2eme-bac',
    name: '2ème Année Baccalauréat',
    nameAr: 'الثانية باكالوريا',
    badge: 'Année du Bac National',
    cycle: 'Lycée',
    description: 'Préparation intensive à l\'Examen National. Cours approfondis d\'analyse, d\'algèbre et de géométrie pour toutes les filières scientifiques BIOF.',
    branches: [
      // 1.1 Sciences Mathématiques A & B
      {
        id: 'sciences-maths',
        name: 'Sciences Mathématiques (A & B)',
        nameAr: 'شعبة العلوم الرياضية (أ و ب)',
        shortName: '2 Bac SM',
        description: 'Programme d\'excellence pour les futurs préparationnaires (CPGE) et grandes écoles. Rigueur logique, théorèmes d\'analyse, arithmétique dans Z et structures algébriques.',
        levelId: '2eme-bac',
        chapters: [
          // Semestre 1
          {
            slug: 'limites-et-continuite',
            title: 'Limites et Continuité',
            titleAr: 'النهايات والاتصال',
            description: 'Continuité en un point et sur un intervalle, TVI, bijection continue, fonction réciproque, racines n-ièmes et limites usuelles.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 1,
            iconName: 'TrendingUp',
            semester: 1,
            resources: [
              {
                id: 'res-lim-cours-01',
                title: 'Limites et Continuité — Fiche de Cours Officielle',
                category: 'cours',
                fileUrl: '/test/cqfdmaths_cours_clean.pdf',
                pagesCount: 17,
                source: 'Prof. Jamaa Aknari',
              },
              {
                id: 'res-lim-resume-01',
                title: 'Formulaire & Résumé Synthèse (TVI & Limites Usuelles)',
                category: 'resume',
                fileUrl: '/test/cqfdmaths_cours_clean.pdf',
                pagesCount: 3,
                source: 'Fiche Mémoire CQFDMaths',
              },
              {
                id: 'res-lim-serie-01',
                title: 'Série d\'Exercices N°1 : Continuité, TVI et Branches Infinies',
                category: 'serie',
                fileUrl: '/test/cqfdmaths_serie_clean.pdf',
                solutionUrl: '/test/cqfdmaths_serie_clean.pdf',
                difficulty: 'moyen',
                source: 'CQFDMaths — Prof. Jamaa Aknari',
              },
              {
                id: 'res-lim-serie-02',
                title: 'Série d\'Exercices N°2 : Fonction Réciproque et Racine n-ième',
                category: 'serie',
                fileUrl: '/test/cqfdmaths_serie_clean.pdf',
                solutionUrl: '/test/cqfdmaths_serie_clean.pdf',
                difficulty: 'difficile',
                source: 'Annales & Séries Préparatoires',
              },
              {
                id: 'res-lim-devoir-01',
                title: 'Contrôle Surveillé N°1 (Semestre 1) — Modèle d\'Évaluation Type',
                category: 'devoir',
                fileUrl: '/test/cqfdmaths_serie_clean.pdf',
                solutionUrl: '/test/cqfdmaths_serie_clean.pdf',
                semester: 1,
                source: 'Devoir Surveillé Lycée',
              }
            ],
            lessons: [
              {
                slug: 'continuite-et-tvi',
                title: 'Continuité sur un Intervalle et Théorème des Valeurs Intermédiaires (TVI)',
                titleAr: 'الاتصال على مجال ومبرهنة القيم الوسيطية',
                levelId: '2eme-bac',
                branchId: 'sciences-maths',
                chapterSlug: 'limites-et-continuite',
                chapterTitle: 'Limites et Continuité',
                estimatedMinutes: 45,
                youtubeVideoId: 'mRk4_s9U2pE',
                youtubePlaylistId: 'PLmaths_2bac_sm_analyse',
                summary: 'La continuité est le socle de toute l\'analyse en 2ème Bac. Le Théorème des Valeurs Intermédiaires (TVI) et son corollaire pour les fonctions strictement monotones sont au cœur de quasiment tous les sujets de l\'Examen National marocain pour prouver l\'existence et l\'unicité d\'une solution f(x) = 0.',
                summaryAr: 'يعد مفهوم الاتصال حجر الزاوية في تحليل السنة الثانية باكالوريا. تعتبر مبرهنة القيم الوسيطية ونتيجتها المباشرة للدوال الرتيبة قطباً أساسياً في امتحانات الباكالوريا لإثبات وجود وحدانية الحل للمعادلة f(x) = 0.',
                objectives: [
                  'Maîtriser la continuité en un point et sur un intervalle (ouvert, fermé)',
                  'Déterminer l\'image d\'un intervalle par une fonction continue (et strictement monotone)',
                  'Appliquer rigoureusement le Théorème des Valeurs Intermédiaires (TVI)',
                  'Démontrer l\'existence et l\'unicité d\'une racine via la bijection continue',
                  'Encadrer une solution par la méthode de dichotomie'
                ],
                keyFormulas: [
                  {
                    name: 'Définition de la continuité en un point',
                    latex: '\\lim_{x \\to x_0} f(x) = f(x_0)',
                    description: 'Une fonction f est continue en x_0 si et seulement si sa limite en ce point existe et coïncide avec sa valeur.'
                  },
                  {
                    name: 'Théorème des Valeurs Intermédiaires (TVI)',
                    latex: 'f \\in \\mathcal{C}([a, b]) \\text{ et } f(a) \\cdot f(b) < 0 \\implies \\exists c \\in ]a, b[, \\; f(c) = 0',
                    description: 'Si f est continue sur [a,b] et change de signe aux bornes, l\'équation f(x)=0 admet au moins une solution sur ]a,b[.'
                  },
                  {
                    name: 'Corollaire de la bijection stricte',
                    latex: 'f \\in \\mathcal{C}([a, b]) \\text{ et strictement monotone} \\implies f : [a, b] \\xrightarrow{\\sim} f([a, b])',
                    description: 'Pour tout y_0 dans l\'intervalle image, il existe un UNIQUE c tel que f(c) = y_0.'
                  },
                  {
                    name: 'Image d\'un intervalle fermé borné',
                    latex: 'f([a, b]) = [m, M] \\quad \\text{où } m = \\min_{[a,b]} f, \\; M = \\max_{[a,b]} f',
                    description: 'L\'image d\'un segment par une fonction continue est un segment.'
                  }
                ],
                definitions: [
                  {
                    title: 'Continuité à droite et à gauche',
                    content: 'f est continue en x_0 si et seulement si f est continue à droite et à gauche en x_0 :',
                    latex: '\\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = f(x_0)'
                  },
                  {
                    title: 'Théorème de la fonction réciproque',
                    content: 'Si f est continue et strictement monotone sur un intervalle I, alors f réalise une bijection de I sur l\'intervalle J = f(I), et sa réciproque f^{-1} est continue et a le même sens de variation.',
                    latex: 'f^{-1} : f(I) \\to I, \\quad f^{-1}(y) = x \\iff f(x) = y'
                  }
                ],
                workedExamples: [
                  {
                    title: 'Exemple 1 : Application directe du TVI (Examen National classique)',
                    statement: 'Montrer que l\'équation $x^3 + 3x - 1 = 0$ admet une unique solution réelle $\\alpha$ sur l\'intervalle $]0, 1[$.',
                    solution: 'Soit la fonction $f$ définie sur $[0, 1]$ par $f(x) = x^3 + 3x - 1$.\n1. **Continuité :** $f$ est une fonction polynôme, donc elle est continue sur $\\mathbb{R}$, en particulier sur le segment $[0, 1]$.\n2. **Monotonie :** Pour tout $x \\in ]0, 1[$, $f\'(x) = 3x^2 + 3 = 3(x^2 + 1) > 0$. Donc $f$ est strictement croissante sur $[0, 1]$.\n3. **Calcul des bornes :** $f(0) = -1$ et $f(1) = 1 + 3 - 1 = 3$. Ainsi $f(0) \\cdot f(1) = -3 < 0$, donc $0 \\in f([0, 1]) = [-1, 3]$.\n4. **Conclusion :** D\'après le corollaire du TVI, l\'équation $f(x) = 0$ admet une unique solution $\\alpha \\in ]0, 1[$.',
                    methodologyTip: 'Ne jamais oublier d\'énoncer explicitement : la continuité, la stricte monotonie, et le produit f(a)·f(b) < 0.'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Oublier la stricte monotonie pour l\'unicité',
                    mistake: 'Dire que l\'équation admet une "unique" solution simplement parce que $f(a) \\cdot f(b) < 0$.',
                    correction: '$f(a) \\cdot f(b) < 0$ garantit seulement l\'EXISTENCE d\'au moins une solution. Pour prouver l\'UNICITÉ, il est indispensable de démontrer que $f$ est strictement monotone.',
                    why: 'Une fonction oscillante peut couper l\'axe des abscisses plusieurs fois tout en vérifiant $f(a) \\cdot f(b) < 0$.'
                  },
                  {
                    title: 'Intervalles ouverts vs fermés dans le calcul d\'images',
                    mistake: 'Écrire $f(]0, +\\infty[) = [f(0), f(+\\infty)[$ pour une fonction croissante.',
                    correction: 'Pour un intervalle ouvert $]a, b[$, l\'image est $]\\lim_{x \\to a^+} f(x), \\lim_{x \\to b^-} f(x)[$. Les crochets doivent rester ouverts.',
                    why: 'Les valeurs aux bornes ouvertes sont des limites, pas des images réelles.'
                  }
                ],
                proTipDarija: 'فالامتحان الوطني، سؤال TVI كيكون ديما عليه بين 0.75 و 1 نقطة. متزربش : كتب 3 عوارض واضحة : 1. الاتصال على المجال، 2. الرتابة قطعا (إشارة المشتقة)، 3. جداء الصورتين سالب. المصحح كيعطي النقطة كاملة على هاد المنهجية!',
                exercises: [
                  {
                    id: 'exo-sm-tvi-01',
                    title: 'Exercice 1 : Existence et encadrement d\'une racine (Type National)',
                    levelId: '2eme-bac',
                    branchId: 'sciences-maths',
                    chapterSlug: 'limites-et-continuite',
                    lessonSlug: 'continuite-et-tvi',
                    difficulty: 'moyen',
                    durationMinutes: 20,
                    points: 2.5,
                    question: 'Soit la fonction $f$ définie sur $[1, 2]$ par $f(x) = x^4 - 2x^2 - 2$.\n1. Démontrer que l\'équation $f(x) = 0$ admet une unique racine réelle $\\alpha$ sur $[1, 2]$.\n2. Donner un encadrement de $\\alpha$ d\'amplitude $0.25$ par la méthode de dichotomie.',
                    hint: 'Calcule d\'abord la dérivée $f\'(x)$ sur $[1, 2]$ pour étudier son signe. Pour la dichotomie, calcule le milieu de l\'intervalle $m_1 = 1.5$.',
                    solution: '1. $f$ est polynomiale donc continue sur $[1, 2]$. Pour $x \\in ]1, 2[$, $f\'(x) = 4x^3 - 4x = 4x(x^2 - 1)$. Comme $x > 1$, $x^2 - 1 > 0$, donc $f\'(x) > 0$. $f$ est strictement croissante.\nDe plus, $f(1) = 1 - 2 - 2 = -3 < 0$ et $f(2) = 16 - 8 - 2 = 6 > 0$. Comme $f(1) \\cdot f(2) < 0$, il existe un unique $\\alpha \\in ]1, 2[$ tel que $f(\\alpha) = 0$.\n\n2. **Dichotomie :**\n- Milieu $m_1 = 1.5$ : $f(1.5) = (1.5)^4 - 2(1.5)^2 - 2 = 5.0625 - 4.5 - 2 = -1.4375 < 0$.\nComme $f(1.5) < 0$ et $f(2) > 0$, on a $\\alpha \\in ]1.5, 2[$.\n- Milieu suivant $m_2 = 1.75$ : $f(1.75) \\approx 9.3789 - 6.125 - 2 = 1.2539 > 0$.\nComme $f(1.5) < 0$ et $f(1.75) > 0$, on obtient l\'encadrement souhaité : $1.5 < \\alpha < 1.75$, d\'amplitude $1.75 - 1.5 = 0.25$.',
                    videoSolutionId: 'mRk4_s9U2pE',
                    videoTimestamp: '14:20',
                    proTipDarija: 'فالديكوطومي (Dichotomie) متضيعش الوقت فالحساب الطويل باليد، استعمل الآلة الحاسبة العلمية كازيو باش تخرج الصور بسرعة وبلا أخطاء حسابية.'
                  },
                  {
                    id: 'exo-sm-tvi-02',
                    title: 'Exercice 2 : Bijection et fonction réciproque $\\arctan$ et racine $n$-ième',
                    levelId: '2eme-bac',
                    branchId: 'sciences-maths',
                    chapterSlug: 'limites-et-continuite',
                    lessonSlug: 'continuite-et-tvi',
                    difficulty: 'difficile',
                    durationMinutes: 30,
                    points: 3,
                    question: 'Soit $g(x) = \\frac{x}{\\sqrt{1 + x^2}}$ définie sur $\\mathbb{R}$.\n1. Montrer que $g$ est une bijection de $\\mathbb{R}$ vers un intervalle $J$ à déterminer.\n2. Expliciter la formule de $g^{-1}(x)$ pour tout $x \\in J$.',
                    hint: 'Montre que $g$ est strictement croissante en calculant $g\'(x)$. Calcule les limites en $\\pm\\infty$ pour déterminer l\'intervalle image $J$. Résous ensuite l\'équation $y = g(x)$ avec l\'inconnue $x$.',
                    solution: '1. $g$ est dérivable sur $\\mathbb{R}$ comme quotient de fonctions dérivables avec un dénominateur strictement positif.\n$g\'(x) = \\frac{\\sqrt{1+x^2} - x \\cdot \\frac{2x}{2\\sqrt{1+x^2}}}{1 + x^2} = \\frac{1+x^2 - x^2}{(1+x^2)^{3/2}} = \\frac{1}{(1+x^2)^{3/2}} > 0$.\n$g$ est continue et strictement croissante sur $\\mathbb{R}$.\nLimites : $\\lim_{x \\to +\\infty} g(x) = 1$ et $\\lim_{x \\to -\\infty} g(x) = -1$.\nDonc $g$ réalise une bijection de $\\mathbb{R}$ vers $J = ]-1, 1[$.\n\n2. Soit $y \\in ]-1, 1[$ et $x \\in \\mathbb{R}$.\n$y = \\frac{x}{\\sqrt{1+x^2}} \\implies y^2 = \\frac{x^2}{1+x^2} \\implies y^2(1+x^2) = x^2 \\implies x^2(1 - y^2) = y^2$.\nComme $y \\in ]-1, 1[$, $1 - y^2 > 0$, d\'où $x^2 = \\frac{y^2}{1 - y^2}$.\nPuisque $x$ et $y$ ont le même signe ($g(x)$ et $x$ ont le même signe), on en déduit :\n$x = \\frac{y}{\\sqrt{1 - y^2}}$.\nAinsi, pour tout $x \\in ]-1, 1[$, $g^{-1}(x) = \\frac{x}{\\sqrt{1 - x^2}}$.',
                    videoSolutionId: 'mRk4_s9U2pE',
                    videoTimestamp: '28:45'
                  }
                ],
                downloadableResource: {
                  title: 'Fiche Synthèse TVI & Continuité (PDF)',
                  fileUrl: '/docs/fiche-tvi-continuite-2bac.pdf',
                  type: 'formulaire'
                },
                nextLessonSlug: 'formes-indeterminees-et-limites',
                seoKeywords: ['cours continuite 2 bac', 'theoreme valeurs intermediaires maroc', 'tvi sciences maths', 'exercices tvi corriges 2 bac']
              
              },
              {
                slug: 'formes-indeterminees-et-limites',
                title: 'Techniques Avancées de Calcul de Limites et Formes Indéterminées',
                titleAr: 'تقنيات متقدمة لحساب النهايات والأشكال غير المحددة',
                levelId: '2eme-bac',
                branchId: 'sciences-maths',
                chapterSlug: 'limites-et-continuite',
                chapterTitle: 'Limites et Continuité',
                estimatedMinutes: 50,
                youtubeVideoId: 'k7gW3QZp914',
                summary: 'Guide exhaustif des 4 formes indéterminées classiques (0/0, ∞/∞, 0×∞, +∞-∞) et des méthodes expertes : expression conjuguée, factorisation par le terme prépondérant, taux d\'accroissement et limites trigonométriques usuelles.',
                objectives: [
                  'Identifier immédiatement le type de forme indéterminée',
                  'Maîtriser la méthode du conjugué pour les racines carrées et cubiques',
                  'Utiliser le taux d\'accroissement pour les indéterminées en 0/0',
                  'Appliquer les limites trigonométriques fondamentales'
                ],
                keyFormulas: [
                  {
                    name: 'Limite trigonométrique fondamentale',
                    latex: '\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}, \\quad \\lim_{x \\to 0} \\frac{\\tan(x)}{x} = 1',
                    description: 'À utiliser impérativement après changement de variable ou factorisation.'
                  },
                  {
                    name: 'Identité conjuguée d\'ordre 3',
                    latex: 'a - b = \\frac{a^3 - b^3}{a^2 + ab + b^2}',
                    description: 'Pour lever l\'indétermination avec les racines cubiques $\\sqrt[3]{u(x)}$.'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'Calcul de limite avec expression conjuguée d\'ordre 3',
                    statement: 'Calculer $\\lim_{x \\to 1} \\frac{\\sqrt[3]{x} - 1}{x - 1}$.',
                    solution: 'On pose $a = \\sqrt[3]{x}$ et $b = 1$. L\'identité remarquable donne :\n$\\sqrt[3]{x} - 1 = \\frac{(\\sqrt[3]{x})^3 - 1^3}{(\\sqrt[3]{x})^2 + \\sqrt[3]{x} + 1} = \\frac{x - 1}{\\sqrt[3]{x^2} + \\sqrt[3]{x} + 1}$.\nEn simplifiant par $(x - 1)$ pour $x \\neq 1$ :\n$\\lim_{x \\to 1} \\frac{\\sqrt[3]{x} - 1}{x - 1} = \\lim_{x \\to 1} \\frac{1}{\\sqrt[3]{x^2} + \\sqrt[3]{x} + 1} = \\frac{1}{1 + 1 + 1} = \\frac{1}{3}$.',
                    methodologyTip: 'Cette limite représente aussi le nombre dérivé de la fonction $x \\mapsto \\sqrt[3]{x}$ en $x_0 = 1$.'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Factorisation imprudente par $x$ sous la racine',
                    mistake: 'Écrire $\\sqrt{x^2 - x} = x \\sqrt{1 - 1/x}$ quand $x \\to -\\infty$.',
                    correction: 'Pour $x < 0$, $\\sqrt{x^2} = |x| = -x$. Donc $\\sqrt{x^2 - x} = -x \\sqrt{1 - 1/x}$.',
                    why: 'Oublier le signe négatif fausse le calcul de la limite et conduit à une erreur de signe critique.'
                  }
                ],
                proTipDarija: 'رد البال مزيان ملي كتحسب النهاية فـ -∞ وعندك الجدر مربع ! دائماً $\\sqrt{x^2} = |x| = -x$. هاد الخطأ كيديروه أزيد من 40% ديال التلاميذ فالامتحان.',
                exercises: [],
                previousLessonSlug: 'continuite-et-tvi',
                nextLessonSlug: 'derivation-theoreme-rolle-taf',
                seoKeywords: ['calcul de limites maroc 2 bac', 'limites trigonometriques', 'formes indeterminees cours']
              }
            ]
          },
          {
            slug: 'derivabilite-et-etude-de-fonctions',
            title: 'Dérivabilité et Étude des Fonctions',
            titleAr: 'الاشتقاق ودراسة الدوال ومبرهنة التزايدات المنتهية',
            description: 'Nombre dérivé, dérivée des fonctions composées et réciproques, théorème de Rolle, TAF, branches infinies, concavité et points d\'inflexion.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 2,
            iconName: 'Activity',
            semester: 1,
            lessons: []
          },
          {
            slug: 'suites-numeriques',
            title: 'Les Suites Numériques',
            titleAr: 'المتتاليات العددية',
            description: 'Suites monotones, bornées, récurrentes u_{n+1}=f(u_n), critères de convergence, suites adjacentes et encadrements.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 3,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'fonctions-logarithmes',
            title: 'Les Fonctions Logarithmes',
            titleAr: 'الدوال اللوغاريتمية',
            description: 'Fonction logarithme népérien ln(x), logarithme de base a, croissances comparées, dérivées logarithmiques et étude de fonctions.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 4,
            iconName: 'Bookmark',
            semester: 1,
            lessons: []
          },
          {
            slug: 'nombres-complexes-partie-1',
            title: 'Nombres Complexes — Partie 1 (Forme Algébrique et Trigonométrique)',
            titleAr: 'الأعداد العقدية — الجزء الأول',
            description: 'Forme algébrique, conjugué, module, argument, forme trigonométrique, formule de Moivre et d\'Euler, équations dans C.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 5,
            iconName: 'Compass',
            semester: 1,
            lessons: [
              {
                slug: 'forme-algebrique-et-trigonometrique',
                title: 'Forme Algébrique, Module, Argument et Notation Exponentielle',
                titleAr: 'الشكل الجبري، المعيار، العمدة والكتابة الأسية',
                levelId: '2eme-bac',
                branchId: 'sciences-maths',
                chapterSlug: 'nombres-complexes',
                chapterTitle: 'Nombres Complexes',
                estimatedMinutes: 55,
                youtubeVideoId: 'V9dE7uM2w8Q',
                summary: 'Les nombres complexes constituent un exercice obligatoire et très rentable à l\'examen national (3 à 3.5 points). Maîtrise les passages entre forme cartésienne, trigonométrique et exponentielle.',
                objectives: [
                  'Calculer le module et l\'argument principal d\'un nombre complexe',
                  'Manipuler les formules d\'Euler et de Moivre',
                  'Résoudre les équations du second degré à coefficients réels et complexes',
                  'Interpréter les angles et distances dans le plan complexe'
                ],
                keyFormulas: [
                  {
                    name: 'Forme exponentielle et formule d\'Euler',
                    latex: 'z = r e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta), \\quad \\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}, \\quad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}',
                    description: 'Indispensable pour linéariser les expressions trigonométriques.'
                  },
                  {
                    name: 'Interprétation géométrique du quotient',
                    latex: '\\frac{z_C - z_A}{z_B - z_A} = \\frac{AC}{AB} e^{i(\\vec{AB}, \\vec{AC})}',
                    description: 'Permet de déterminer la nature exacte d\'un triangle ABC.'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'Détermination de la nature d\'un triangle',
                    statement: 'Soient les points $A, B, C$ d\'affixes $a = 1+i$, $b = 3-i$, $c = 2 + 2i$. Déterminer la nature du triangle $ABC$.',
                    solution: 'Calculons le quotient $\\frac{c - a}{b - a}$ :\n$c - a = (2+2i) - (1+i) = 1 + i$.\n$b - a = (3-i) - (1+i) = 2 - 2i = 2(1 - i)$.\nDonc $\\frac{c - a}{b - a} = \\frac{1+i}{2(1-i)} = \\frac{(1+i)^2}{2(1^2 + (-1)^2)} = \\frac{2i}{4} = \\frac{1}{2} i$.\nModule : $\\left|\\frac{c - a}{b - a}\\right| = \\frac{AC}{AB} = \\frac{1}{2} \\implies AB = 2 AC$.\nArgument : $\\arg\\left(\\frac{c - a}{b - a}\\right) = (\\vec{AB}, \\vec{AC}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$.\nLe triangle $ABC$ est donc rectangle en $A$.',
                    methodologyTip: 'Toujours séparer l\'interprétation du module (rapport des longueurs) et de l\'argument (mesure de l\'angle orienté).'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Confondre $e^{i\\theta}$ et $-e^{i\\theta}$',
                    mistake: 'Écrire que l\'argument de $-e^{i\\theta}$ est $\\theta$.',
                    correction: 'Un module est TOUJOURS strictement positif. $-e^{i\\theta} = e^{i\\pi} \\cdot e^{i\\theta} = e^{i(\\theta + \\pi)}$. L\'argument est donc $\\theta + \\pi$.',
                    why: 'Le signe moins devant l\'exponentielle complexe modifie l\'argument d\'un demi-tour ($\\pi$).'
                  }
                ],
                proTipDarija: 'فالأعداد العقدية، تمرين الوطني كيبدا دايما بمعادلة من الدرجة الثانية (Delta)، من بعد حساب نسبة بحال $\\frac{c-a}{b-a}$ لتحديد طبيعة المثلث، وفالأخير الدوران (Rotation) أو التحاكي (Homothétie). راجع هاد الترتيب حيت كيتعاود كل عام بنفس الطريقة!',
                exercises: [
                  {
                    id: 'exo-sm-complex-01',
                    title: 'Exercice 1 : Équation du second degré et transformations géométriques',
                    levelId: '2eme-bac',
                    branchId: 'sciences-maths',
                    chapterSlug: 'nombres-complexes',
                    lessonSlug: 'forme-algebrique-et-trigonometrique',
                    difficulty: 'type-examen',
                    durationMinutes: 25,
                    points: 3.5,
                    question: 'Dans le plan complexe rapporté à un repère orthonormé direct $(O, \\vec{u}, \\vec{v})$ :\n1. Résoudre dans $\\mathbb{C}$ l\'équation : $z^2 - 2\\sqrt{3} z + 4 = 0$.\n2. Écrire les solutions sous forme exponentielle.\n3. Soit $R$ la rotation de centre $O$ et d\'angle $\\frac{\\pi}{3}$. Déterminer l\'affixe du point $B$, image du point $A$ d\'affixe $z_A = \\sqrt{3} + i$ par $R$.',
                    hint: 'Calcule $\\Delta = b^2 - 4ac$. Pour la rotation, utilise l\'écriture complexe $z\' - \\omega = e^{i\\theta}(z - \\omega)$.',
                    solution: '1. $\\Delta = (-2\\sqrt{3})^2 - 4(1)(4) = 12 - 16 = -4 = (2i)^2$.\nLes solutions sont : $z_1 = \\frac{2\\sqrt{3} - 2i}{2} = \\sqrt{3} - i$ et $z_2 = \\overline{z_1} = \\sqrt{3} + i$.\n\n2. Pour $z_2 = \\sqrt{3} + i$ :\n$|z_2| = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{4} = 2$.\n$z_2 = 2\\left(\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i\\right) = 2 e^{i\\frac{\\pi}{6}}$.\nPour $z_1 = \\overline{z_2} = 2 e^{-i\\frac{\\pi}{6}}$.\n\n3. L\'écriture complexe de la rotation $R(O, \\pi/3)$ est : $z\' = e^{i\\frac{\\pi}{3}} z$.\nDonc $z_B = e^{i\\frac{\\pi}{3}} \\cdot z_A = e^{i\\frac{\\pi}{3}} \\cdot 2 e^{i\\frac{\\pi}{6}} = 2 e^{i(\\frac{\\pi}{3} + \\frac{\\pi}{6})} = 2 e^{i\\frac{\\pi}{2}} = 2i$.\nL\'affixe de $B$ est $z_B = 2i$.',
                    videoSolutionId: 'V9dE7uM2w8Q',
                    videoTimestamp: '18:10'
                  }
                ],
                seoKeywords: ['nombres complexes 2 bac maroc', 'exercices nombres complexes corriges', 'rotation plan complexe']
              }
            ]
          },
          // Semestre 2
          {
            slug: 'fonctions-exponentielles',
            title: 'Les Fonctions Exponentielles',
            titleAr: 'الدوال الأسية',
            description: 'Fonction exponentielle e^x, exponentielles de base a, croissances comparées, limites remarquables et résolutions d\'équations.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 6,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'nombres-complexes-partie-2',
            title: 'Nombres Complexes — Partie 2 (Géométrie et Transformations)',
            titleAr: 'الأعداد العقدية — الجزء الثاني (الهندسة والتحويلات)',
            description: 'Écritures complexes des transformations (translations, homothéties, rotations), similitudes directes, racines n-ièmes de l\'unité.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 7,
            iconName: 'Compass',
            semester: 2,
            lessons: []
          },
          {
            slug: 'calcul-integral',
            title: 'Calcul Intégral et Primitives',
            titleAr: 'الحساب التكاملي والدوال الأصلية',
            description: 'Primitives usuelles, intégration par parties, intégration par changement de variable, calcul d\'aires, volumes et sommes de Riemann.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 8,
            iconName: 'Sigma',
            semester: 2,
            lessons: [
              {
                slug: 'integration-par-parties-et-aires',
                title: 'Intégration par Parties, Primitives et Calcul d\'Aires',
                titleAr: 'المكاملة بالأجزاء، الدوال الأصلية وحساب المساحات',
                levelId: '2eme-bac',
                branchId: 'sciences-maths',
                chapterSlug: 'calcul-integral',
                chapterTitle: 'Calcul Intégral',
                estimatedMinutes: 50,
                youtubeVideoId: 'U_5e_Ld48Vw',
                summary: 'L\'intégration par parties (IPP) est l\'outil roi pour calculer les intégrales mêlant polynômes, logarithmes et exponentielles.',
                objectives: [
                  'Choisir judicieusement u(x) et v\'(x) avec la règle ALPES',
                  'Appliquer la formule de l\'intégration par parties sans erreur de signe',
                  'Calculer l\'aire d\'un domaine délimité par une courbe et des droites'
                ],
                keyFormulas: [
                  {
                    name: 'Formule d\'Intégration Par Parties (IPP)',
                    latex: '\\int_a^b u(x) v\'(x) \\, dx = \\Big[ u(x) v(x) \\Big]_a^b - \\int_a^b u\'(x) v(x) \\, dx',
                    description: 'Règle mnémonique ALPES pour le choix de u(x) : Arcsin/Arccos, Logarithme, Polynôme, Exponentielle, Sinus/Cosinus.'
                  },
                  {
                    name: 'Calcul de l\'aire géométrique',
                    latex: '\\mathcal{A} = \\left( \\int_a^b |f(x) - g(x)| \\, dx \\right) \\times \\|\\vec{i}\\| \\times \\|\\vec{j}\\|',
                    description: 'Toujours multiplier par l\'unité d\'aire (u.a. = ||i|| × ||j|| en cm²).'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'IPP classique avec Logarithme Népérien',
                    statement: 'Calculer l\'intégrale $I = \\int_1^e x \\ln(x) \\, dx$.',
                    solution: 'On pose d\'après la règle ALPES :\n$u(x) = \\ln(x) \\implies u\'(x) = \\frac{1}{x}$\n$v\'(x) = x \\implies v(x) = \\frac{x^2}{2}$.\nPar intégration par parties :\n$I = \\left[ \\frac{x^2}{2} \\ln(x) \\right]_1^e - \\int_1^e \\frac{1}{x} \\cdot \\frac{x^2}{2} \\, dx$\n$I = \\left( \\frac{e^2}{2} \\ln(e) - 0 \\right) - \\frac{1}{2} \\int_1^e x \\, dx = \\frac{e^2}{2} - \\frac{1}{2} \\left[ \\frac{x^2}{2} \\right]_1^e$\n$I = \\frac{e^2}{2} - \\frac{1}{4}(e^2 - 1) = \\frac{2e^2 - e^2 + 1}{4} = \\frac{e^2 + 1}{4}$.',
                    methodologyTip: 'Ne pas oublier les parenthèses lors de la soustraction du terme à la borne inférieure.'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Oublier l\'unité d\'aire (cm²)',
                    mistake: 'Donner l\'aire sous la forme $\\mathcal{A} = 3.5$ sans unité.',
                    correction: 'Si l\'énoncé précise que le repère est orthonormé d\'unité $2\\text{ cm}$, alors $1\\text{ u.a.} = 2 \\times 2 = 4\\text{ cm}^2$. Il faut multiplier le résultat de l\'intégrale par $4\\text{ cm}^2$.',
                    why: 'Le barème ministériel retire 0.25 pt si l\'unité d\'aire n\'est pas précisée.'
                  }
                ],
                proTipDarija: 'حفظ قاعدة ALPES باش تعرف شكون ديرها u(x) : ديما Logarithme كتسبق Polynôme، و Polynôme كتسبق Exponentielle !',
                exercises: [],
                seoKeywords: ['calcul integral 2 bac maroc', 'integration par parties exercices', 'calcul aire courbe']
              }
            ]
          },
          {
            slug: 'equations-differentielles',
            title: 'Équations Différentielles',
            titleAr: 'المعادلات التفاضلية',
            description: "Équations différentielles linéaires du 1er ordre y'+ay=0 et du 2nd ordre y''+ay'+by=0, résolution générale et conditions initiales.",
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 9,
            iconName: 'GitCommit',
            semester: 2,
            lessons: []
          },
          {
            slug: 'arithmetique-dans-z',
            title: 'Arithmétique dans l\'Ensemble Z',
            titleAr: 'الحسابيات في مجموعة الأعداد الصحيحة النسبية',
            description: 'Divisibilité dans Z, division euclidienne, congruences modulo n, PGCD, PPCM, théorème de Bézout, théorème de Gauss et petit théorème de Fermat.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 10,
            iconName: 'Binary',
            semester: 2,
            lessons: []
          },
          {
            slug: 'structures-algebriques',
            title: 'Structures Algébriques (Groupes, Anneaux, Corps)',
            titleAr: 'البنيات الجبرية (الزمر، الحلقات، الأجسام)',
            description: 'Lois de composition interne, associativité, commutativité, élément neutre, symétrique, groupes, sous-groupes, anneaux et corps.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 11,
            iconName: 'Shield',
            semester: 2,
            lessons: []
          },
          {
            slug: 'calcul-des-probabilites',
            title: 'Calcul des Probabilités',
            titleAr: 'حساب الاحتمالات',
            description: 'Probabilité conditionnelle, indépendance, formule des probabilités totales, variables aléatoires, loi binomiale, espérance et variance.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 12,
            iconName: 'PieChart',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-l-espace',
            title: 'Géométrie dans l\'Espace (Produit Scalaire et Vectoriel)',
            titleAr: 'الهندسة الفضائية (الجداء السلمي والمتجهي)',
            description: 'Produit scalaire dans l\'espace, produit vectoriel, équations de plans et sphères, distance d\'un point à un plan, positions relatives.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 13,
            iconName: 'Box',
            semester: 2,
            lessons: []
          }
        ]
      },

      // 1.2 Sciences Physiques (2 Bac PC)
      {
        id: 'sciences-physiques',
        name: 'Sciences Physiques (PC BIOF)',
        nameAr: 'شعبة العلوم الفيزيائية',
        shortName: '2 Bac PC',
        description: 'Programme axé sur l\'analyse des fonctions (Ln, Exp), les suites numériques, les nombres complexes, les intégrales et les équations différentielles appliquées.',
        levelId: '2eme-bac',
        chapters: [
          // Semestre 1
          {
            slug: 'limites-et-continuite',
            title: 'Limites et Continuité',
            titleAr: 'النهايات والاتصال',
            description: 'Continuité en un point, sur un intervalle, TVI, fonction réciproque et calcul de limites avec formes indéterminées.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 1,
            iconName: 'TrendingUp',
            semester: 1,
            lessons: []
          },
          {
            slug: 'derivation-et-etude-de-fonctions',
            title: 'Dérivation et Étude des Fonctions',
            titleAr: 'الاشتقاق وتطبيقاته ودراسة الدوال',
            description: 'Calcul de dérivées, sens de variation, extremums, branches infinies, concavité et tracé de courbes représentatives (Cf).',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 2,
            iconName: 'Activity',
            semester: 1,
            lessons: []
          },
          {
            slug: 'suites-numeriques',
            title: 'Les Suites Numériques',
            titleAr: 'المتتاليات العددية',
            description: 'Suites arithmétiques, géométriques, récurrentes u_{n+1}=f(u_n), convergence et théorèmes de comparaison.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 3,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'fonctions-logarithmes',
            title: 'Fonctions Logarithmes (ln)',
            titleAr: 'الدوال اللوغاريتمية',
            description: 'Propriétés algébriques de ln, limites fondamentales, dérivée de ln(u(x)) et étude approfondie de fonctions logarithmiques.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 4,
            iconName: 'Bookmark',
            semester: 1,
            lessons: []
          },
          {
            slug: 'nombres-complexes',
            title: 'Nombres Complexes',
            titleAr: 'الأعداد العقدية',
            description: 'Forme algébrique, trigonométrique, exponentielle, équations du 2nd degré dans C, et interprétations géométriques (distances, angles).',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 5,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'fonction-exponentielle-et-ln',
            title: 'Fonctions Exponentielles',
            titleAr: 'الدوال الأسية',
            description: 'Étude complète de la fonction exponentielle e^x, croissances comparées, dérivées, limites et branches infinies.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 6,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: [
              {
                slug: 'fonction-exponentielle',
                title: 'La Fonction Exponentielle : Propriétés, Limites et Étude Complète',
                titleAr: 'الدالة الأسية : الخاصيات، النهايات ودراسة الدوال',
                levelId: '2eme-bac',
                branchId: 'sciences-physiques',
                chapterSlug: 'fonction-exponentielle-et-ln',
                chapterTitle: 'Fonctions Logarithme et Exponentielle',
                estimatedMinutes: 50,
                youtubeVideoId: 'fJ9rUzIMcZQ',
                summary: 'La fonction exponentielle est au centre du problème d\'analyse du Baccalauréat National (souvent noté sur 10 à 11 points). Sa maîtrise est la clé de voûte de la note finale.',
                objectives: [
                  'Connaître par cœur les limites usuelles et croissances comparées',
                  'Calculer la dérivée des fonctions composées $e^{u(x)}$',
                  'Dresser le tableau de variation complet',
                  'Construire la courbe représentative $(\\mathcal{C}_f)$ avec ses asymptotes et tangentes'
                ],
                keyFormulas: [
                  {
                    name: 'Croissances comparées fondamentales',
                    latex: '\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty, \\quad \\lim_{x \\to -\\infty} x^n e^x = 0 \\quad (n \\in \\mathbb{N}^*)',
                    description: 'L\'exponentielle l\'emporte toujours sur toute puissance de x au voisinage de l\'infini.'
                  },
                  {
                    name: 'Dérivée de l\'exponentielle composée',
                    latex: '(e^{u(x)})\' = u\'(x) \\cdot e^{u(x)}',
                    description: 'Toujours dériver l\'argument u(x) avant de multiplier.'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'Calcul de limite avec croissance comparée',
                    statement: 'Calculer $\\lim_{x \\to -\\infty} (x^2 - 3x + 1) e^x$.',
                    solution: 'On développe l\'expression :\n$(x^2 - 3x + 1) e^x = x^2 e^x - 3x e^x + e^x$.\nPar croissances comparées au voisinage de $-\\infty$ :\n$\\lim_{x \\to -\\infty} x^2 e^x = 0$, $\\lim_{x \\to -\\infty} x e^x = 0$, et $\\lim_{x \\to -\\infty} e^x = 0$.\nPar somme des limites :\n$\\lim_{x \\to -\\infty} (x^2 - 3x + 1) e^x = 0$.\nInterprétation graphique : La droite d\'équation $y = 0$ (l\'axe des abscisses) est une asymptote horizontale à $(\\mathcal{C}_f)$ au voisinage de $-\\infty$.',
                    methodologyTip: 'Toujours citer l\'interprétation géométrique si demandée dans la question.'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Confondre le signe de $e^x$ et le signe de $x$',
                    mistake: 'Penser que $e^x < 0$ lorsque $x < 0$.',
                    correction: 'Pour tout réel $x \\in \\mathbb{R}$, $e^x > 0$ STRICTEMENT. C\'est l\'image qui est toujours positive, même si $x = -1000$.',
                    why: 'La fonction exponentielle ne prend que des valeurs strictement positives.'
                  }
                ],
                proTipDarija: 'فمسألة التحليل ديال الوطني، ملي يطلب منك ترسم المنحنى (Cf)، متزربش وترسمو عشوائياً. حط أولاً : المعلم، المقاربات (Asymptotes)، نقط الانعطاف والمماسات، عاد رسم المنحنى يتبعهم بسلاسة.',
                exercises: [
                  {
                    id: 'exo-pc-exp-01',
                    title: 'Exercice Type Bac : Étude de fonction avec exponentielle et branches infinies',
                    levelId: '2eme-bac',
                    branchId: 'sciences-physiques',
                    chapterSlug: 'fonction-exponentielle-et-ln',
                    lessonSlug: 'fonction-exponentielle',
                    difficulty: 'type-examen',
                    durationMinutes: 35,
                    points: 5,
                    question: 'Soit la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = (x - 2) e^x + x$.\n1. Déterminer $\\lim_{x \\to -\\infty} f(x)$ et montrer que la droite $(\\Delta) : y = x$ est une asymptote oblique à $(\\mathcal{C}_f)$ au voisinage de $-\\infty$.\n2. Étudier la position relative de $(\\mathcal{C}_f)$ par rapport à $(\\Delta)$ sur $\\mathbb{R}$.\n3. Calculer $f\'(x)$ et montrer que $f\'(x) = (x - 1) e^x + 1$.\n4. En déduire le sens de variation de $f$.',
                    hint: 'Pour l\'asymptote oblique, calcule $\\lim_{x \\to -\\infty} [f(x) - x]$. Pour la position relative, étudie le signe de la différence $f(x) - x = (x-2)e^x$.',
                    solution: '1. $\\lim_{x \\to -\\infty} f(x) : f(x) = x e^x - 2e^x + x$.\nComme $\\lim_{x \\to -\\infty} x e^x = 0$ et $\\lim_{x \\to -\\infty} e^x = 0$, et $\\lim_{x \\to -\\infty} x = -\\infty$, on a $\\lim_{x \\to -\\infty} f(x) = -\\infty$.\nPour l\'asymptote : $f(x) - x = (x - 2) e^x$.\n$\\lim_{x \\to -\\infty} (f(x) - x) = \\lim_{x \\to -\\infty} (x e^x - 2e^x) = 0 - 0 = 0$.\nDonc la droite $(\\Delta) : y = x$ est bien une asymptote oblique à $(\\mathcal{C}_f)$ au voisinage de $-\\infty$.\n\n2. Position relative : signe de $f(x) - x = (x - 2) e^x$.\nComme $e^x > 0$ pour tout $x \\in \\mathbb{R}$, le signe de la différence est exactement celui de $(x - 2)$ :\n- Pour $x < 2$ : $f(x) - x < 0 \\implies (\\mathcal{C}_f)$ est au-dessous de $(\\Delta)$.\n- Pour $x > 2$ : $f(x) - x > 0 \\implies (\\mathcal{C}_f)$ est au-dessus de $(\\Delta)$.\n- Pour $x = 2$ : $(\\mathcal{C}_f)$ et $(\\Delta)$ se coupent au point de coordonnées $(2, 2)$.\n\n3. Dérivée : $f(x) = (x - 2) e^x + x$.\n$f\'(x) = (x - 2)\' e^x + (x - 2)(e^x)\' + 1 = 1 \\cdot e^x + (x - 2) e^x + 1 = (1 + x - 2) e^x + 1 = (x - 1) e^x + 1$.\n\n4. Variations : On sait que $(x - 1) e^x \\ge -1$ (minimum atteint en 0 car $((x-1)e^x)\' = x e^x$), donc $f\'(x) \\ge 0$ pour tout $x$. $f$ est strictement croissante sur $\\mathbb{R}$.',
                    videoSolutionId: 'fJ9rUzIMcZQ',
                    videoTimestamp: '21:15'
                  }
                ],
                seoKeywords: ['cours fonction exponentielle 2 bac pc', 'exercice type bac exponentielle', 'asymptote oblique exponentielle']
              }
            ]
          },
          {
            slug: 'calcul-integral',
            title: 'Calcul Intégral et Primitives',
            titleAr: 'الحساب التكاملي والدوال الأصلية',
            description: 'Primitives usuelles, intégration par parties, calcul d\'aires géométriques et valeurs moyennes.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 7,
            iconName: 'Sigma',
            semester: 2,
            lessons: []
          },
          {
            slug: 'equations-differentielles',
            title: 'Équations Différentielles',
            titleAr: 'المعادلات التفاضلية',
            description: "Équations différentielles y'+ay=0 et y''+ay'+by=0, applications aux phénomènes physiques et amortissements.",
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 8,
            iconName: 'GitCommit',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-l-espace',
            title: 'Géométrie dans l\'Espace (Produit Scalaire et Vectoriel)',
            titleAr: 'الهندسة الفضائية',
            description: 'Repère orthonormé, produit scalaire, produit vectoriel, équations cartésiennes de plans et de sphères.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 9,
            iconName: 'Box',
            semester: 2,
            lessons: []
          },
          {
            slug: 'calcul-des-probabilites',
            title: 'Calcul des Probabilités',
            titleAr: 'حساب الاحتمالات',
            description: 'Dénombrement, tirages simultanés, successifs, probabilité conditionnelle, variables aléatoires et loi binomiale.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 10,
            iconName: 'PieChart',
            semester: 2,
            lessons: []
          }
        ]
      },

      // 1.3 Sciences de la Vie et de la Terre (2 Bac SVT)
      {
        id: 'svt',
        name: 'Sciences de la Vie et de la Terre (SVT BIOF)',
        nameAr: 'شعبة علوم الحياة والأرض',
        shortName: '2 Bac SVT',
        description: 'Programme de mathématiques adapté à la filière SVT : fonctions Ln et Exp, suites, intégrales et modèles probabilistes.',
        levelId: '2eme-bac',
        chapters: [
          // Semestre 1
          {
            slug: 'limites-et-continuite',
            title: 'Limites et Continuité',
            titleAr: 'النهايات والاتصال',
            description: 'Continuité en un point et sur un intervalle, TVI, calcul de limites et étude des branches infinies.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 1,
            iconName: 'TrendingUp',
            semester: 1,
            lessons: []
          },
          {
            slug: 'derivation-et-etude-de-fonctions',
            title: 'Dérivation et Étude des Fonctions',
            titleAr: 'الاشتقاق وتطبيقاته ودراسة الدوال',
            description: 'Calcul des dérivées, variations, extrema locaux et représentations graphiques.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 2,
            iconName: 'Activity',
            semester: 1,
            lessons: []
          },
          {
            slug: 'suites-numeriques',
            title: 'Les Suites Numériques',
            titleAr: 'المتتاليات العددية',
            description: 'Suites arithmétiques, géométriques, récurrentes et convergence.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 3,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'fonctions-logarithmes',
            title: 'Fonctions Logarithmes (ln)',
            titleAr: 'الدوال اللوغاريتمية',
            description: 'Propriétés de ln, dérivées logarithmiques, limites usuelles et études de fonctions.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 4,
            iconName: 'Bookmark',
            semester: 1,
            lessons: []
          },
          {
            slug: 'nombres-complexes',
            title: 'Nombres Complexes',
            titleAr: 'الأعداد العقدية',
            description: 'Forme algébrique, trigonométrique, résolution d\'équations et configurations géométriques simples.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 5,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'fonctions-exponentielles',
            title: 'Fonctions Exponentielles',
            titleAr: 'الدوال الأسية',
            description: 'Fonction exponentielle e^x, limites fondamentales, dérivées et problèmes d\'analyse.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 6,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'calcul-integral',
            title: 'Calcul Intégral et Primitives',
            titleAr: 'الحساب التكاملي والدوال الأصلية',
            description: 'Primitives, intégration par parties et calcul d\'aires de domaines plans.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 7,
            iconName: 'Sigma',
            semester: 2,
            lessons: []
          },
          {
            slug: 'equations-differentielles',
            title: 'Équations Différentielles',
            titleAr: 'المعادلات التفاضلية',
            description: 'Résolution des équations différentielles du 1er et 2nd ordre à coefficients constants.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 8,
            iconName: 'GitCommit',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-l-espace',
            title: 'Géométrie dans l\'Espace',
            titleAr: 'الهندسة الفضائية',
            description: 'Produit scalaire et produit vectoriel dans l\'espace, plans et sphères.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 9,
            iconName: 'Box',
            semester: 2,
            lessons: []
          },
          {
            slug: 'calcul-des-probabilites',
            title: 'Calcul des Probabilités',
            titleAr: 'حساب الاحتمالات',
            description: 'Dénombrement, modèles de probabilités, variables aléatoires discrètes et loi binomiale.',
            levelId: '2eme-bac',
            branchId: 'svt',
            order: 10,
            iconName: 'PieChart',
            semester: 2,
            lessons: []
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. PREMIÈRE ANNÉE DU BACCALAURÉAT (1 BAC)
  // ==========================================
  {
    id: '1ere-bac',
    name: '1ère Année Baccalauréat',
    nameAr: 'الأولى باكالوريا',
    badge: 'Année du Régional',
    cycle: 'Lycée',
    description: 'Transition fondamentale vers les mathématiques abstraites. Logique formelle, théorie des ensembles, dérivation et géométrie vectorielle.',
    branches: [
      // 2.1 1ère Bac Sciences Mathématiques
      {
        id: '1ere-sciences-maths',
        name: 'Sciences Mathématiques (BIOF)',
        nameAr: 'شعبة العلوم الرياضية',
        shortName: '1 Bac SM',
        description: 'Formation mathématique de haut niveau. Logique formelle, théorie des ensembles, dérivation, barycentre et géométrie analytique de l\'espace.',
        levelId: '1ere-bac',
        chapters: [
          // Semestre 1
          {
            slug: 'notions-de-logique',
            title: 'Notions de Logique Mathématique',
            titleAr: 'مبادئ في المنطق الرياضي',
            description: 'Quantificateurs, propositions, négation, implication, équivalence, raisonnement par récurrence, absurde et contraposée.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 1,
            iconName: 'HelpCircle',
            semester: 1,
            lessons: []
          },
          {
            slug: 'ensembles-et-applications',
            title: 'Théorie des Ensembles et Applications',
            titleAr: 'المجموعات والتطبيقات',
            description: 'Ensembles, sous-ensembles, inclusion, union, intersection, produit cartésien, applications injectives, surjectives et bijectives.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 2,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'generalites-sur-les-fonctions',
            title: 'Généralités sur les Fonctions Numériques',
            titleAr: 'عموميات حول الدوال العددية',
            description: 'Majorant, minorant, extremums, composition de fonctions, restriction, prolongement et monotonie.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 3,
            iconName: 'TrendingUp',
            semester: 1,
            lessons: []
          },
          {
            slug: 'barycentre-dans-le-plan',
            title: 'Le Barycentre dans le Plan',
            titleAr: 'المرجح في المستوى',
            description: 'Barycentre de 2, 3 et 4 points pondérés, associativité du barycentre, coordonnées et lignes de niveau.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 4,
            iconName: 'Crosshair',
            semester: 1,
            lessons: []
          },
          {
            slug: 'produit-scalaire-dans-le-plan',
            title: 'Le Produit Scalaire dans le Plan et Applications',
            titleAr: 'الجداء السلمي في المستوى وتطبيقاته',
            description: 'Formes bilinéaires, orthogonalité, théorème de la médiane, théorème d\'Al-Kashi, équations de cercles et droites.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 5,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          {
            slug: 'calcul-trigonometrique',
            title: 'Calcul Trigonométrique Approfondi',
            titleAr: 'الحساب المثلثي',
            description: 'Formules d\'addition, de duplication, de Carnot, transformation de produits en sommes et sommes en produits, équations trigonométriques.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 6,
            iconName: 'PieChart',
            semester: 1,
            lessons: []
          },
          {
            slug: 'rotation-dans-le-plan',
            title: 'La Rotation dans le Plan',
            titleAr: 'الدوران في المستوى',
            description: 'Définition géométrique, propriétés caractéristiques, conservation du produit scalaire, des angles orientés et images de figures.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 7,
            iconName: 'Shuffle',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'denombrement',
            title: 'Dénombrement et Combinatoire',
            titleAr: 'التعداد',
            description: 'Principe fondamental, arrangements avec et sans répétition, permutations, combinaisons, triangle de Pascal et binôme de Newton.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 8,
            iconName: 'Binary',
            semester: 2,
            lessons: []
          },
          {
            slug: 'limites-d-une-fonction',
            title: 'Limites d\'une Fonction Numérique',
            titleAr: 'نهاية دالة عددية',
            description: 'Définition avec epsilons, opérations sur les limites, limites de fonctions polynômes, rationnelles, trigonométriques et formes indéterminées.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 9,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'derivabilite',
            title: 'Dérivabilité et Étude des Fonctions',
            titleAr: 'الاشتقاق وتطبيقاته ودراسة الدوال',
            description: 'Nombre dérivé, fonction dérivée, opérations, dérivabilité à droite et à gauche, interprétation géométrique et tableau de variation.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 10,
            iconName: 'Activity',
            semester: 2,
            lessons: []
          },
          {
            slug: 'suites-numeriques',
            title: 'Les Suites Numériques',
            titleAr: 'المتتاليات العددية',
            description: 'Généralités, suites arithmétiques, suites géométriques, monotonie, majoration, minoration et calcul de sommes.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 11,
            iconName: 'Layers',
            semester: 2,
            lessons: []
          },
          {
            slug: 'vecteurs-de-l-espace',
            title: 'Vecteurs de l\'Espace et Produit Scalaire',
            titleAr: 'المتجهات في الفضاء والجداء السلمي في الفضاء',
            description: 'Caractérisation vectorielle de droites et plans de l\'espace, colinéarité, coplanarité et produit scalaire dans l\'espace.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 12,
            iconName: 'Box',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-analytique-de-l-espace',
            title: 'Géométrie Analytique dans l\'Espace',
            titleAr: 'الهندسة التحليلية في الفضاء',
            description: 'Repère de l\'espace, coordonnées de vecteurs, équations cartésiennes de plans et représentations paramétriques de droites.',
            levelId: '1ere-bac',
            branchId: '1ere-sciences-maths',
            order: 13,
            iconName: 'Compass',
            semester: 2,
            lessons: []
          }
        ]
      },

      // 2.2 1ère Bac Sciences Expérimentales
      {
        id: 'sciences-exp',
        name: 'Sciences Expérimentales (BIOF)',
        nameAr: 'شعبة العلوم التجريبية',
        shortName: '1 Bac Sc.Exp',
        description: 'Programme riche axé sur le calcul de dérivées, la trigonométrie, le barycentre, les suites numériques et l\'analyse fonctionnelle.',
        levelId: '1ere-bac',
        chapters: [
          // Semestre 1
          {
            slug: 'notions-de-logique',
            title: 'Notions de Logique Mathématique',
            titleAr: 'مبادئ في المنطق الرياضي',
            description: 'Quantificateurs $\\forall, \\exists$, propositions, raisonnement par récurrence, par l\'absurde, par contraposée et disjonction des cas.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 1,
            iconName: 'HelpCircle',
            semester: 1,
            lessons: [
              {
                slug: 'modes-de-raisonnement',
                title: 'Les 5 Modes de Raisonnement Indispensables',
                titleAr: 'أنماط الاستدلال الرياضي الخمسة الأساسية',
                levelId: '1ere-bac',
                branchId: 'sciences-exp',
                chapterSlug: 'notions-de-logique',
                chapterTitle: 'Notions de Logique',
                estimatedMinutes: 40,
                youtubeVideoId: 'k7gW3QZp914',
                summary: 'La logique mathématique est le langage de démonstration universel. Apprends à rédiger un raisonnement par récurrence, par l\'absurde ou par disjonction de cas avec une rigueur irréprochable.',
                objectives: [
                  'Utiliser avec précision les quantificateurs $\\forall$ et $\\exists$',
                  'Démontrer une propriété par récurrence (initialisation, hérédité, conclusion)',
                  'Construire une démonstration par l\'absurde',
                  'Appliquer le raisonnement par contraposée'
                ],
                keyFormulas: [
                  {
                    name: 'Principe de contraposition',
                    latex: '(P \\implies Q) \\iff (\\overline{Q} \\implies \\overline{P})',
                    description: 'Pour prouver que P implique Q, il suffit de prouver que non(Q) implique non(P).'
                  },
                  {
                    name: 'Négation d\'une proposition quantifiée',
                    latex: '\\overline{\\forall x \\in E, \\; P(x)} \\iff \\exists x \\in E, \\; \\overline{P(x)}',
                    description: 'Pour nier un « quel que soit », il suffit de trouver UN contre-exemple.'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'Démonstration classique par récurrence',
                    statement: 'Montrer par récurrence que pour tout $n \\in \\mathbb{N}^*$ : $1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}$.',
                    solution: 'Soit la proposition $P(n) : \\sum_{k=1}^n k = \\frac{n(n+1)}{2}$ pour $n \\ge 1$.\n1. **Initialisation (pour n = 1) :**\nMembre de gauche : $1$.\nMembre de droite : $\\frac{1(1+1)}{2} = \\frac{2}{2} = 1$.\nDonc $P(1)$ est vraie.\n\n2. **Hérédité :**\nSoit $n \\ge 1$. Supposons que $P(n)$ est vraie, c\'est-à-dire $\\sum_{k=1}^n k = \\frac{n(n+1)}{2}$.\nMontrons que $P(n+1)$ est vraie, c\'est-à-dire $\\sum_{k=1}^{n+1} k = \\frac{(n+1)(n+2)}{2}$.\nEn effet :\n$\\sum_{k=1}^{n+1} k = \\left( \\sum_{k=1}^n k \\right) + (n+1) = \\frac{n(n+1)}{2} + (n+1) = (n+1) \\left( \\frac{n}{2} + 1 \\right) = (n+1) \\left( \\frac{n+2}{2} \\right) = \\frac{(n+1)(n+2)}{2}$.\nDonc $P(n+1)$ est vraie.\n\n3. **Conclusion :** Par le principe de récurrence, pour tout $n \\in \\mathbb{N}^*$, la formule est vérifiée.',
                    methodologyTip: 'Ne jamais écrire « supposons que pour tout n, P(n) est vraie » pendant l\'hérédité, mais « fixons un entier n et supposons P(n) ».'
                  }
                ],
                commonMistakes: [
                  {
                    title: 'Confusion dans la négation de « et » et « ou »',
                    mistake: 'Écrire que la négation de $(x > 0 \\text{ et } y > 0)$ est $(x \\le 0 \\text{ et } y \\le 0)$.',
                    correction: 'Lois de De Morgan : la négation est $(x \\le 0 \\text{ OU } y \\le 0)$.',
                    why: 'Il suffit que l\'un des deux réels soit négatif pour que la conjonction devienne fausse.'
                  }
                ],
                proTipDarija: 'فالبرهان بالترجع (Récurrence)، متبداش بـ « Supposons que pour tout n ». هادي كتعتبر خطأ منطقي فادح ! كتب : « Soit n fixé dans N, supposons P(n) et montrons P(n+1) ».',
                exercises: [],
                seoKeywords: ['logique mathematique 1 bac maroc', 'raisonnement par recurrence exercices', 'contraposee 1 bac']
              }
            ]
          },
          {
            slug: 'generalites-sur-les-fonctions',
            title: 'Généralités sur les Fonctions Numériques',
            titleAr: 'عموميات حول الدوال العددية',
            description: 'Domaine de définition, parité, périodicité, monotonie, taux de variation, extremums et comparaison de fonctions.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 2,
            iconName: 'TrendingUp',
            semester: 1,
            lessons: []
          },
          {
            slug: 'barycentre-dans-le-plan',
            title: 'Le Barycentre dans le Plan',
            titleAr: 'المرجح في المستوى',
            description: 'Barycentre de deux et trois points pondérés, coordonnées et propriétés d\'associativité.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 3,
            iconName: 'Crosshair',
            semester: 1,
            lessons: []
          },
          {
            slug: 'produit-scalaire-dans-le-plan',
            title: 'Le Produit Scalaire dans le Plan',
            titleAr: 'الجداء السلمي في المستوى',
            description: 'Définition géométrique et analytique, orthogonalité, théorème d\'Al-Kashi et équation cartésienne de cercles.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 4,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          {
            slug: 'calcul-trigonometrique',
            title: 'Calcul Trigonométrique',
            titleAr: 'الحساب المثلثي',
            description: 'Formules d\'addition cos(a+b), sin(a+b), formules de duplication et équations trigonométriques.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 5,
            iconName: 'PieChart',
            semester: 1,
            lessons: []
          },
          {
            slug: 'suites-numeriques',
            title: 'Les Suites Numériques',
            titleAr: 'المتتاليات العددية',
            description: 'Généralités, suites arithmétiques et géométriques, terme général et somme de termes consécutifs.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 6,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'rotation-dans-le-plan',
            title: 'La Rotation dans le Plan',
            titleAr: 'الدوران في المستوى',
            description: 'Définition géométrique, centre, angle, propriétés caractéristiques et conservation des longueurs.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 7,
            iconName: 'Shuffle',
            semester: 2,
            lessons: []
          },
          {
            slug: 'limites-d-une-fonction',
            title: 'Limites d\'une Fonction Numérique',
            titleAr: 'نهايات الدوال العددية',
            description: 'Limites finies et infinies, opérations, formes indéterminées et limites des fonctions usuelles.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 8,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'derivation-et-etude-de-fonctions',
            title: 'Dérivation et Étude des Fonctions',
            titleAr: 'الاشتقاق وتطبيقاته ودراسة الدوال',
            description: 'Nombre dérivé, tangentes, fonction dérivée, sens de variation, extremums et tracé de courbes.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 9,
            iconName: 'Activity',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-l-espace',
            title: 'Géométrie dans l\'Espace',
            titleAr: 'الهندسة الفضائية',
            description: 'Positions relatives de droites et plans, orthogonalité dans l\'espace et sections planes.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 10,
            iconName: 'Box',
            semester: 2,
            lessons: []
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. TRONC COMMUN (TC)
  // ==========================================
  {
    id: 'tronc-commun',
    name: 'Tronc Commun',
    nameAr: 'الجذع المشترك',
    badge: 'Début du Lycée',
    cycle: 'Lycée',
    description: 'Socle fondamental du secondaire scientifique. Arithmétique dans N, calcul vectoriel, trigonométrie et étude élémentaire des fonctions.',
    branches: [
      // 3.1 Tronc Commun Scientifique (TCS BIOF)
      {
        id: 'tc-sciences',
        name: 'Tronc Commun Scientifique (BIOF)',
        nameAr: 'جذع مشترك علمي (خيار فرنسية)',
        shortName: 'TCS BIOF',
        description: 'Programme fondamental pour s\'orienter vers les filières scientifiques 1ère Bac. Arithmétique, calcul vectoriel, ordre dans R, trigonométrie et fonctions.',
        levelId: 'tronc-commun',
        chapters: [
          // Semestre 1
          {
            slug: 'arithmetique-dans-n',
            title: 'Arithmétique dans l\'Ensemble N',
            titleAr: 'مبادئ الحسابيات في مجموعة الأعداد الصحيحة الطبيعية',
            description: 'Nombres pairs et impairs, divisibilité, nombres premiers, décomposition en facteurs premiers, PGCD et PPCM.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 1,
            iconName: 'Calculator',
            semester: 1,
            lessons: [
              {
                slug: 'divisibilite-et-nombres-premiers',
                title: 'Divisibilité, Décomposition en Facteurs Premiers, PGCD et PPCM',
                titleAr: 'القاسم المشترك الأكبر، المضاعف المشترك الأصغر وتفكيك الأعداد',
                levelId: 'tronc-commun',
                branchId: 'tc-sciences',
                chapterSlug: 'arithmetique-dans-n',
                chapterTitle: 'Arithmétique dans N',
                estimatedMinutes: 35,
                youtubeVideoId: 'mRk4_s9U2pE',
                summary: 'L\'arithmétique dans N introduit la rigueur de la preuve par les nombres entiers : parité, diviseurs, multiples et décomposition en facteurs premiers.',
                objectives: [
                  'Maîtriser les propriétés de parité (pairs et impairs)',
                  'Décomposer un entier naturel en produit de facteurs premiers',
                  'Calculer le PGCD et le PPCM de deux entiers',
                  'Résoudre des problèmes concrets avec le PGCD et PPCM'
                ],
                keyFormulas: [
                  {
                    name: 'Relation fondamentale PGCD et PPCM',
                    latex: 'a \\times b = \\text{PGCD}(a, b) \\times \\text{PPCM}(a, b)',
                    description: 'Valable pour tous entiers naturels non nuls a et b.'
                  }
                ],
                definitions: [],
                workedExamples: [
                  {
                    title: 'Calcul du PGCD et PPCM par décomposition',
                    statement: 'Décomposer en facteurs premiers $a = 360$ et $b = 84$, puis en déduire $\\text{PGCD}(a,b)$ et $\\text{PPCM}(a,b)$.',
                    solution: '$360 = 2^3 \\times 3^2 \\times 5$.\n$84 = 2^2 \\times 3 \\times 7$.\n- $\\text{PGCD}(a, b) = 2^2 \\times 3^1 = 4 \\times 3 = 12$ (facteurs communs munis du plus petit exposant).\n- $\\text{PPCM}(a, b) = 2^3 \\times 3^2 \\times 5^1 \\times 7^1 = 8 \\times 9 \\times 5 \\times 7 = 2520$ (tous les facteurs munis du plus grand exposant).\nVérification : $360 \\times 84 = 30240$, et $12 \\times 2520 = 30240$.',
                    methodologyTip: 'Toujours faire la vérification du produit PGCD × PPCM.'
                  }
                ],
                commonMistakes: [],
                proTipDarija: 'فالـ TCS، رد البال من المتطابقات الهامة ملي كيكون عندك برهان على عدد زوجي أو فردي ($2k$ أو $2k+1$).',
                exercises: [],
                seoKeywords: ['arithmetique tronc commun maroc', 'pgcd ppcm exercices corriges', 'developpement tronc commun']
              }
            ]
          },
          {
            slug: 'calcul-vectoriel-dans-le-plan',
            title: 'Le Calcul Vectoriel dans le Plan',
            titleAr: 'الحساب المتجهي في المستوى',
            description: 'Vecteurs du plan, égalité de vecteurs, relation de Chasles, colinéarité, milieu d\'un segment et combinaison linéaire.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 2,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          {
            slug: 'la-projection-dans-le-plan',
            title: 'La Projection dans le Plan',
            titleAr: 'الإسقاط في المستوى',
            description: 'Projection d\'un point sur une droite parallèlement à une autre, théorème de Thalès direct et réciproque, conservation du milieu.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 3,
            iconName: 'Maximize2',
            semester: 1,
            lessons: []
          },
          {
            slug: 'ensembles-des-nombres-et-ordre-dans-r',
            title: 'L\'Ensemble des Nombres et l\'Ordre dans R',
            titleAr: 'مجموعات الأعداد والترتيب في مجموعة الأعداد الحقيقية',
            description: 'Ensembles N, Z, D, Q, R, opérations, encadrements, valeur absolue, intervalles et approximations décimales.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 4,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'la-droite-dans-le-plan',
            title: 'La Droite dans le Plan',
            titleAr: 'المستقيم في المستوى',
            description: 'Repère cartésien, équation cartésienne, équation réduite, vecteur directeur, pente et positions relatives de deux droites.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 5,
            iconName: 'GitCommit',
            semester: 1,
            lessons: []
          },
          {
            slug: 'polynomes',
            title: 'Les Polynômes',
            titleAr: 'الحدوديات',
            description: 'Définition, degré, égalité de polynômes, opérations, division euclidienne et factorisation par (x - a).',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 6,
            iconName: 'Binary',
            semester: 1,
            lessons: []
          },
          {
            slug: 'equations-inequations-et-systemes',
            title: 'Équations, Inéquations et Systèmes',
            titleAr: 'المعادلات والمتراجحات والنظمات',
            description: 'Équations et inéquations du 1er et 2nd degré, discriminant delta, signe du trinôme et systèmes de deux équations linéaires.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 7,
            iconName: 'Sigma',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'calcul-trigonometrique',
            title: 'Trigonométrie — Calcul Trigonométrique',
            titleAr: 'الحساب المثلثي',
            description: 'Cercle trigonométrique, abscisse curviligne principale, sinus, cosinus, tangente, relations fondamentales et équations simples.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 8,
            iconName: 'PieChart',
            semester: 2,
            lessons: []
          },
          {
            slug: 'generalites-sur-les-fonctions',
            title: 'Généralités sur les Fonctions Numériques',
            titleAr: 'عموميات حول الدوال العددية',
            description: 'Ensemble de définition, parité (paire, impaire), tableau de variations, extremums et fonctions de référence (ax+b, x^2, ax^3, 1/x).',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 9,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'transformations-du-plan',
            title: 'Transformations du Plan',
            titleAr: 'التحويلات الاعتيادية في المستوى',
            description: 'Symétrie axiale, symétrie centrale, translation, homothétie et conservation des distances, angles et alignements.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 10,
            iconName: 'Shuffle',
            semester: 2,
            lessons: []
          },
          {
            slug: 'produit-scalaire-dans-le-plan',
            title: 'Le Produit Scalaire dans le Plan',
            titleAr: 'الجداء السلمي في المستوى',
            description: 'Définition géométrique du produit scalaire, projection orthogonale, propriétés de bilinéarité et relations métriques.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 11,
            iconName: 'Crosshair',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-lespace',
            title: 'Géométrie dans l\'Espace',
            titleAr: 'الهندسة الفضائية',
            description: 'Axiomes d\'incidence, positions relatives de droites et de plans dans l\'espace, parallélisme et orthogonalité.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 12,
            iconName: 'Box',
            semester: 2,
            lessons: []
          },
          {
            slug: 'statistiques',
            title: 'Statistiques',
            titleAr: 'الإحصاء',
            description: 'Effectifs, fréquences, moyenne arithmétique, médiane, mode, variance, écart-type et représentations graphiques.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 13,
            iconName: 'BarChart3',
            semester: 2,
            lessons: []
          }
        ]
      },

      // 3.2 Tronc Commun Technologique (TCT BIOF)
      {
        id: 'tc-technologique',
        name: 'Tronc Commun Technologique (BIOF)',
        nameAr: 'جذع مشترك تكنولوجي (خيار فرنسية)',
        shortName: 'TCT BIOF',
        description: 'Programme de mathématiques axé sur les applications techniques et l\'ingénierie, conforme au cursus officiel.',
        levelId: 'tronc-commun',
        chapters: [
          // Semestre 1
          {
            slug: 'arithmetique-dans-n',
            title: 'Arithmétique dans l\'Ensemble N',
            titleAr: 'مبادئ الحسابيات في مجموعة الأعداد الصحيحة الطبيعية',
            description: 'Nombres pairs et impairs, divisibilité, nombres premiers, décomposition en facteurs premiers, PGCD et PPCM.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 1,
            iconName: 'Calculator',
            semester: 1,
            lessons: []
          },
          {
            slug: 'calcul-vectoriel-dans-le-plan',
            title: 'Le Calcul Vectoriel dans le Plan',
            titleAr: 'الحساب المتجهي في المستوى',
            description: 'Vecteurs du plan, égalité de vecteurs, relation de Chasles, colinéarité et combinaisons linéaires.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 2,
            iconName: 'Compass',
            semester: 1,
            lessons: []
          },
          {
            slug: 'la-projection-dans-le-plan',
            title: 'La Projection dans le Plan',
            titleAr: 'الإسقاط في المستوى',
            description: 'Projection sur une droite, théorème de Thalès et applications aux mesures géométriques.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 3,
            iconName: 'Maximize2',
            semester: 1,
            lessons: []
          },
          {
            slug: 'ensembles-des-nombres-et-ordre-dans-r',
            title: 'L\'Ensemble des Nombres et l\'Ordre dans R',
            titleAr: 'مجموعات الأعداد والترتيب في مجموعة الأعداد الحقيقية',
            description: 'Ensembles N, Z, D, Q, R, encadrements, valeur absolue, intervalles et approximations décimales.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 4,
            iconName: 'Layers',
            semester: 1,
            lessons: []
          },
          {
            slug: 'la-droite-dans-le-plan',
            title: 'La Droite dans le Plan',
            titleAr: 'المستقيم في المستوى',
            description: 'Repère cartésien, équation cartésienne et réduite, pente et positions relatives.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 5,
            iconName: 'GitCommit',
            semester: 1,
            lessons: []
          },
          {
            slug: 'polynomes',
            title: 'Les Polynômes',
            titleAr: 'الحدوديات',
            description: 'Définition, degré, opérations, division euclidienne et factorisation.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 6,
            iconName: 'Binary',
            semester: 1,
            lessons: []
          },
          {
            slug: 'equations-inequations-et-systemes',
            title: 'Équations, Inéquations et Systèmes',
            titleAr: 'المعادلات والمتراجحات والنظمات',
            description: 'Équations et inéquations du premier et second degré, discriminant et systèmes d\'équations.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 7,
            iconName: 'Sigma',
            semester: 1,
            lessons: []
          },
          // Semestre 2
          {
            slug: 'calcul-trigonometrique',
            title: 'Trigonométrie — Calcul Trigonométrique',
            titleAr: 'الحساب المثلثي',
            description: 'Cercle trigonométrique, formules cosinus, sinus, tangente et équations de base.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 8,
            iconName: 'PieChart',
            semester: 2,
            lessons: []
          },
          {
            slug: 'generalites-sur-les-fonctions',
            title: 'Généralités sur les Fonctions Numériques',
            titleAr: 'عموميات حول الدوال العددية',
            description: 'Domaine de définition, parité, sens de variation et fonctions usuelles de référence.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 9,
            iconName: 'TrendingUp',
            semester: 2,
            lessons: []
          },
          {
            slug: 'transformations-du-plan',
            title: 'Transformations du Plan',
            titleAr: 'التحويلات الاعتيادية في المستوى',
            description: 'Translations, homothéties et symétries appliquées aux schémas techniques.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 10,
            iconName: 'Shuffle',
            semester: 2,
            lessons: []
          },
          {
            slug: 'produit-scalaire-dans-le-plan',
            title: 'Le Produit Scalaire dans le Plan',
            titleAr: 'الجداء السلمي في المستوى',
            description: 'Définition géométrique et analytique du produit scalaire, orthogonalité et calcul de travail.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 11,
            iconName: 'Crosshair',
            semester: 2,
            lessons: []
          },
          {
            slug: 'geometrie-dans-lespace',
            title: 'Géométrie dans l\'Espace',
            titleAr: 'الهندسة الفضائية',
            description: 'Droites et plans de l\'espace, parallélisme, orthogonalité et projections spatiales.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 12,
            iconName: 'Box',
            semester: 2,
            lessons: []
          },
          {
            slug: 'statistiques',
            title: 'Statistiques',
            titleAr: 'الإحصاء',
            description: 'Analyse de données expérimentales, paramètres de position et de dispersion.',
            levelId: 'tronc-commun',
            branchId: 'tc-technologique',
            order: 13,
            iconName: 'BarChart3',
            semester: 2,
            lessons: []
          }
        ]
      }
    ]
  }
];

// Helper functions for easy querying
export function getAllChapters(): Chapter[] {
  const chapters: Chapter[] = [];
  for (const level of CURRICULUM_LEVELS) {
    for (const branch of level.branches) {
      chapters.push(...branch.chapters);
    }
  }
  return chapters;
}

export function getAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  for (const level of CURRICULUM_LEVELS) {
    for (const branch of level.branches) {
      for (const chapter of branch.chapters) {
        lessons.push(...chapter.lessons);
      }
    }
  }
  return lessons;
}

export function getAllExercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const lessons = getAllLessons();
  for (const lesson of lessons) {
    if (lesson.exercises && lesson.exercises.length > 0) {
      exercises.push(...lesson.exercises);
    }
  }
  return exercises;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return getAllLessons().find((l) => l.slug === slug);
}

export function getLevelById(id: string): Level | undefined {
  return CURRICULUM_LEVELS.find((l) => l.id === id);
}

// Hydrate all chapters with real resources from the database
const resourcesMap = chapterResourcesData as Record<string, ChapterResource[]>;

for (const lvl of CURRICULUM_LEVELS) {
  for (const br of lvl.branches) {
    for (const ch of br.chapters) {
      const key = `${lvl.id}/${br.id}/${ch.slug}`;
      const mapped = resourcesMap[key];
      if (mapped && mapped.length > 0) {
        if (!ch.resources || ch.resources.length === 0) {
          ch.resources = mapped;
        } else {
          const existingIds = new Set(ch.resources.map((r) => r.id));
          for (const item of mapped) {
            if (!existingIds.has(item.id)) {
              ch.resources.push(item);
            }
          }
        }
      }
    }
  }
}

export interface EnrichedResource extends ChapterResource {
  levelId: LevelId;
  levelName: string;
  branchId: BranchId;
  branchName: string;
  chapterSlug: string;
  chapterTitle: string;
}

export function getAllChapterResources(): EnrichedResource[] {
  const list: EnrichedResource[] = [];
  for (const lvl of CURRICULUM_LEVELS) {
    for (const br of lvl.branches) {
      for (const ch of br.chapters) {
        if (ch.resources && ch.resources.length > 0) {
          for (const r of ch.resources) {
            list.push({
              ...r,
              levelId: lvl.id,
              levelName: lvl.name,
              branchId: br.id,
              branchName: br.shortName,
              chapterSlug: ch.slug,
              chapterTitle: ch.title,
            });
          }
        }
      }
    }
  }
  return list;
}

export function getAllSeriesResources(): EnrichedResource[] {
  return getAllChapterResources().filter((r) => r.category === 'serie');
}

export function getAllCourseResources(): EnrichedResource[] {
  return getAllChapterResources().filter((r) => r.category === 'cours' || r.category === 'resume');
}

