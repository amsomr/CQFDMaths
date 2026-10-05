import { Level, Lesson, Exercise } from './types';

export const CURRICULUM_LEVELS: Level[] = [
  {
    id: '2eme-bac',
    name: '2ème Année Baccalauréat',
    nameAr: 'الثانية باكالوريا',
    badge: 'Année du Bac National',
    cycle: 'Lycée',
    description: 'Préparation intensive à l\'Examen National. Cours approfondis d\'analyse, d\'algèbre et de géométrie pour toutes les filières.',
    branches: [
      {
        id: 'sciences-maths',
        name: 'Sciences Mathématiques (A & B)',
        nameAr: 'شعبة العلوم الرياضية (أ و ب)',
        shortName: '2 Bac SM',
        description: 'Programme approfondi pour les futurs préparationnaires et ingénieurs. Rigueur logique, théorèmes d\'analyse et arithmétique.',
        levelId: '2eme-bac',
        chapters: [
          {
            slug: 'limites-et-continuite',
            title: 'Limites et Continuité',
            titleAr: 'النهايات والاتصال',
            description: 'Continuité ponctuelle, continuité sur un intervalle, Théorème des Valeurs Intermédiaires (TVI), méthode de dichotomie et limites trigonométriques.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 1,
            iconName: 'Activity',
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
            slug: 'nombres-complexes',
            title: 'Nombres Complexes',
            titleAr: 'الأعداد العقدية',
            description: 'Forme algébrique, trigonométrique, formule de Moivre, d\'Euler, équations dans $\\mathbb{C}$, et interprétations géométriques (rotations, homothéties).',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 2,
            iconName: 'Compass',
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
          {
            slug: 'calcul-integral',
            title: 'Calcul Intégral et Primitives',
            titleAr: 'الحساب التكاملي والدوال الأصلية',
            description: 'Intégration par parties, primitives usuelles, calcul d\'aires et de volumes, valeurs moyennes et encadrements d\'intégrales.',
            levelId: '2eme-bac',
            branchId: 'sciences-maths',
            order: 3,
            iconName: 'Sigma',
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
          }
        ]
      },
      {
        id: 'sciences-physiques',
        name: 'Sciences Physiques (PC)',
        nameAr: 'شعبة العلوم الفيزيائية',
        shortName: '2 Bac PC',
        description: 'Programme axé sur l\'analyse des fonctions (Ln, Exp), les suites et les équations différentielles appliquées aux sciences.',
        levelId: '2eme-bac',
        chapters: [
          {
            slug: 'fonction-exponentielle-et-ln',
            title: 'Fonctions Logarithme et Exponentielle',
            titleAr: 'الدوال اللوغاريتمية والأسية',
            description: 'Étude complète de $\\ln(x)$ et $e^x$, croissances comparées, dérivées, limites et branches infinies.',
            levelId: '2eme-bac',
            branchId: 'sciences-physiques',
            order: 1,
            iconName: 'TrendingUp',
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
          }
        ]
      }
    ]
  },
  {
    id: '1ere-bac',
    name: '1ère Année Baccalauréat',
    nameAr: 'الأولى باكالوريا',
    badge: 'Année du Régional',
    cycle: 'Lycée',
    description: 'Transition fondamentale vers les mathématiques abstraites. Logique formelle, barycentre, dérivation et trigonométrie analytique.',
    branches: [
      {
        id: 'sciences-exp',
        name: 'Sciences Expérimentales',
        nameAr: 'شعبة العلوم التجريبية',
        shortName: '1 Bac Sc.Exp',
        description: 'Programme riche axé sur le calcul de dérivées, la trigonométrie et l\'analyse fonctionnelle.',
        levelId: '1ere-bac',
        chapters: [
          {
            slug: 'notions-de-logique',
            title: 'Notions de Logique Mathématique',
            titleAr: 'مبادئ في المنطق الرياضي',
            description: 'Quantificateurs $\\forall, \\exists$, propositions, raisonnement par récurrence, par l\'absurde, par contraposée et disjonction des cas.',
            levelId: '1ere-bac',
            branchId: 'sciences-exp',
            order: 1,
            iconName: 'HelpCircle',
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
          }
        ]
      }
    ]
  },
  {
    id: 'tronc-commun',
    name: 'Tronc Commun',
    nameAr: 'الجذع المشترك',
    badge: 'Début du Lycée',
    cycle: 'Lycée',
    description: 'Socle fondamental du secondaire. Arithmétique dans N, calcul vectoriel, projection et étude élémentaire des fonctions.',
    branches: [
      {
        id: 'tc-sciences',
        name: 'Tronc Commun Scientifique (BIOF)',
        nameAr: 'جذع مشترك علمي (خيار فرنسية)',
        shortName: 'TCS BIOF',
        description: 'Programme fondamental pour s\'orienter vers les filières scientifiques 1ère Bac.',
        levelId: 'tronc-commun',
        chapters: [
          {
            slug: 'arithmetique-dans-n',
            title: 'Arithmétique dans l\'Ensemble $\\mathbb{N}$',
            titleAr: 'مبادئ الحسابيات في مجموعة الأعداد الصحيحة الطبيعية',
            description: 'Nombres pairs et impairs, divisibilité, nombres premiers, décomposition en facteurs premiers, PGCD et PPCM.',
            levelId: 'tronc-commun',
            branchId: 'tc-sciences',
            order: 1,
            iconName: 'Calculator',
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
          }
        ]
      }
    ]
  },
  {
    id: 'college',
    name: 'Cycle Collège (1AC, 2AC, 3AC)',
    nameAr: 'السلك الثانوي الإعدادي',
    badge: 'Fondations & Brevet',
    cycle: 'Collège',
    description: 'Consolidation des bases mathématiques indispensables : calcul littéral, théorèmes de Thalès et Pythagore, équations et trigonométrie.',
    branches: [
      {
        id: '3ac',
        name: '3ème Année Collège (3AC)',
        nameAr: 'الثالثة إعدادي (الامتحان الجهوي)',
        shortName: '3AC Brevet',
        description: 'Préparation à l\'Examen Normalisé Régional de fin de collège (Muwahhad).',
        levelId: 'college',
        chapters: [
          {
            slug: 'theoremes-geometriques-3ac',
            title: 'Théorème de Thalès et Théorème de Pythagore',
            titleAr: 'مبرهنة طاليس ومبرهنة فيتاغورس',
            description: 'Théorèmes directs et réciproques, calcul de longueurs, preuve d\'orthogonalité et de parallélisme.',
            levelId: 'college',
            branchId: '3ac',
            order: 1,
            iconName: 'Shapes',
            lessons: [
              {
                slug: 'theoreme-de-thales-direct-reciproque',
                title: 'Théorème de Thalès : Calcul de Longueurs et Démonstration du Parallélisme',
                titleAr: 'مبرهنة طاليس المباشرة والعكسية : حساب الأطوال والبرهان على التوازي',
                levelId: 'college',
                branchId: '3ac',
                chapterSlug: 'theoremes-geometriques-3ac',
                chapterTitle: 'Théorème de Thalès',
                estimatedMinutes: 30,
                youtubeVideoId: 'fJ9rUzIMcZQ',
                summary: 'Le théorème de Thalès direct permet de calculer des distances dans un triangle ou une configuration papillon. La réciproque permet de démontrer le parallélisme de deux droites.',
                objectives: [
                  'Énoncer et vérifier les conditions d\'application de Thalès (alignement, parallélisme)',
                  'Écrire correctement les rapports de longueurs',
                  'Utiliser la réciproque de Thalès pour prouver que deux droites sont parallèles'
                ],
                keyFormulas: [
                  {
                    name: 'Rapports de Thalès',
                    latex: '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}',
                    description: 'Valable si les droites (MN) et (BC) sont strictement parallèles.'
                  }
                ],
                definitions: [],
                workedExamples: [],
                commonMistakes: [
                  {
                    title: 'Oublier l\'ordre des points dans la réciproque de Thalès',
                    mistake: 'Vérifier seulement l\'égalité des rapports sans mentionner que les points sont alignés dans le même ordre.',
                    correction: 'Il faut impérativement écrire : « Les points A, M, B d\'une part et A, N, C d\'autre part sont alignés dans le même ordre, et AM/AB = AN/AC ».',
                    why: 'Sans le même ordre, les droites peuvent ne pas être parallèles.'
                  }
                ],
                proTipDarija: 'فالموحد الجهوي ديال التالتة إعدادي (3AC)، ضروري تكتب الجملة : « بما أن النقط مستقيمية وفي نفس الترتيب » قبل ما تطبق مبرهنة طاليس العكسية !',
                exercises: [],
                seoKeywords: ['thales 3ac maroc', 'exercices thales corriges', 'examen regional 3ac maths']
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper functions for easy querying
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
