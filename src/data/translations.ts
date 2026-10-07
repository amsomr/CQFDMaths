export type Language = 'fr' | 'ar';

export interface Translations {
  nav: {
    home: string;
    courses: string;
    exercises: string;
    videos: string;
    bac: string;
    about: string;
    search: string;
    subscribeYouTube: string;
    levelSelect: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    statsVideos: string;
    statsStudents: string;
    statsFree: string;
  };
  levels: {
    question: string;
    subtitle: string;
    chooseLevel: string;
    college: string;
    collegeDesc: string;
    troncCommun: string;
    troncCommunDesc: string;
    premiereBac: string;
    premiereBacDesc: string;
    deuxiemeBac: string;
    deuxiemeBacDesc: string;
    savedPreference: string;
    changeLevel: string;
  };
  courses: {
    title: string;
    subtitle: string;
    allCourses: string;
    filterByLevel: string;
    filterByBranch: string;
    lessonsCount: string;
    duration: string;
    startLearning: string;
    resumeCourse: string;
    viewCourse: string;
    curriculumStructure: string;
  };
  lesson: {
    objectives: string;
    videoLesson: string;
    summary: string;
    keyFormulas: string;
    workedExamples: string;
    commonMistakes: string;
    exercises: string;
    downloadSummary: string;
    previousLesson: string;
    nextLesson: string;
    proTipDarija: string;
    subscribeToWatchMore: string;
    playlistLink: string;
  };
  exercises: {
    title: string;
    subtitle: string;
    filterDifficulty: string;
    allDifficulties: string;
    easy: string;
    medium: string;
    hard: string;
    examType: string;
    showHint: string;
    hideHint: string;
    showSolution: string;
    hideSolution: string;
    solutionPoints: string;
    videoCorrection: string;
    practiceMore: string;
  };
  bac: {
    badge: string;
    title: string;
    subtitle: string;
    nationalExams: string;
    regionalExams: string;
    essentialFormulas: string;
    downloadFormulaSheet: string;
    allYears: string;
    normalSession: string;
    remedialSession: string;
    downloadSubject: string;
    downloadCorrection: string;
    watchCorrection: string;
    studyPlan30Days: string;
  };
  videos: {
    title: string;
    subtitle: string;
    watchOnYoutube: string;
    durationMinutes: string;
    filterType: string;
    allVideos: string;
    courseVideos: string;
    exerciseVideos: string;
    examVideos: string;
    tipsVideos: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    noResultsSub: string;
    quickResults: string;
    shortcut: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionText: string;
    methodologyTitle: string;
    freeManifestoTitle: string;
    freeManifestoText: string;
    experienceBadge: string;
    studentsBadge: string;
  };
  common: {
    freeBadge: string;
    moroccanCurriculum: string;
    mathOfficial: string;
    close: string;
    back: string;
    continue: string;
    share: string;
    allRightsReserved: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      courses: 'Cours',
      exercises: 'Exercices',
      videos: 'Vidéos',
      bac: 'Espace Bac',
      about: 'À propos',
      search: 'Rechercher...',
      subscribeYouTube: "S'abonner sur YouTube",
      levelSelect: 'Mon niveau',
    },
    hero: {
      badge: 'Enseignement 100% Gratuit pour tous les élèves du Maroc',
      title1: 'Les mathématiques deviennent',
      titleHighlight: 'plus simples et claires.',
      title2: 'Du Tronc Commun au Baccalauréat.',
      subtitle: 'Cours complets, démonstrations rigoureuses, exercices corrigés pas à pas et préparation intensive aux examens nationaux et régionaux.',
      primaryCta: 'Commencer à apprendre',
      secondaryCta: 'Voir les vidéos YouTube',
      statsVideos: 'Vidéos gratuites',
      statsStudents: 'Élèves accompagnés',
      statsFree: 'Gratuit à vie',
    },
    levels: {
      question: 'Quel est ton niveau scolaire ?',
      subtitle: 'Sélectionne ta classe pour accéder directement aux chapitres et exercices de ton programme officiel marocain.',
      chooseLevel: 'Sélectionner mon niveau',
      college: 'Collège',
      collegeDesc: '1AC, 2AC & 3AC — Bases fondamentales, géométrie, théorèmes et équations.',
      troncCommun: 'Tronc Commun',
      troncCommunDesc: 'Sciences & Lettres — Transition vers le lycée, calcul algébrique, fonctions.',
      premiereBac: '1ère Année Bac',
      premiereBacDesc: 'Sciences Expérimentales & Sciences Maths — Logique, trigonométrie et dérivabilité.',
      deuxiemeBac: '2ème Année Bac',
      deuxiemeBacDesc: 'Sciences Maths, PC, SVT & Éco — Limites, complexes, exponentielle, intégrales et Examen National.',
      savedPreference: 'Niveau sélectionné',
      changeLevel: 'Changer de niveau',
    },
    courses: {
      title: 'Programme et Cours Structurés',
      subtitle: 'Une arborescence claire suivant fidèlement le programme officiel du Ministère de l\'Éducation Nationale marocain.',
      allCourses: 'Tous les cours',
      filterByLevel: 'Filtrer par niveau',
      filterByBranch: 'Filtrer par filière',
      lessonsCount: 'leçons',
      duration: 'min',
      startLearning: 'Suivre le cours',
      resumeCourse: 'Continuer',
      viewCourse: 'Voir le chapitre',
      curriculumStructure: 'Arborescence du programme',
    },
    lesson: {
      objectives: 'Objectifs pédagogiques de la leçon',
      videoLesson: 'Explication vidéo détaillée (YouTube)',
      summary: 'Résumé et synthèse du cours',
      keyFormulas: 'Formules et propriétés essentielles',
      workedExamples: 'Exemples d\'application types',
      commonMistakes: 'Les erreurs classiques à éviter le jour de l\'examen',
      exercises: 'Exercices d\'entraînement progressifs',
      downloadSummary: 'Télécharger la fiche de révision (PDF)',
      previousLesson: 'Leçon précédente',
      nextLesson: 'Leçon suivante',
      proTipDarija: 'Conseil de l\'enseignant (نصيحة الأستاذ)',
      subscribeToWatchMore: 'Abonne-toi à la chaîne YouTube pour ne manquer aucune nouvelle leçon',
      playlistLink: 'Voir la playlist complète sur YouTube',
    },
    exercises: {
      title: 'Banque d\'Exercices Corrigés',
      subtitle: 'Entraîne-toi avec une progression méthodique. Tente de résoudre l\'exercice avant de dévoiler l\'indice et la solution.',
      filterDifficulty: 'Difficulté',
      allDifficulties: 'Toutes les difficultés',
      easy: 'Facile — Application directe',
      medium: 'Moyen — Approfondissement',
      hard: 'Difficile — Raisonnement avancé',
      examType: 'Type Examen National / Régional',
      showHint: 'Voir un indice de résolution',
      hideHint: 'Masquer l\'indice',
      showSolution: 'Voir la correction détaillée',
      hideSolution: 'Masquer la correction',
      solutionPoints: 'Barème indicatif',
      videoCorrection: 'Correction vidéo complète sur YouTube',
      practiceMore: 'Plus d\'exercices sur ce chapitre',
    },
    bac: {
      badge: 'Hub Spécial Révision Baccalauréat 2026',
      title: 'Espace Révision Baccalauréat Maroc',
      subtitle: 'Examens nationaux corrigés, barème officiel du Ministère, formulaires indispensables et stratégie pour décrocher la mention Très Bien.',
      nationalExams: 'Examens Nationaux (2ème Bac)',
      regionalExams: 'Examens Régionaux (1ère Bac & 3AC)',
      essentialFormulas: 'Le Formulaire Mathématique Ultime',
      downloadFormulaSheet: 'Télécharger le formulaire officiel (PDF)',
      allYears: 'Toutes les années',
      normalSession: 'Session Normale (Juin)',
      remedialSession: 'Session Rattrapage (Juillet)',
      downloadSubject: 'Sujet officiel (PDF)',
      downloadCorrection: 'Correction détaillée (PDF)',
      watchCorrection: 'Correction en vidéo',
      studyPlan30Days: 'Programme de révision méthodique (J-30)',
    },
    videos: {
      title: 'Vidéothèque Pédagogique YouTube',
      subtitle: 'Plus de 300 vidéos gratuites organisées par chapitre et niveau pour réviser à ton propre rythme.',
      watchOnYoutube: 'Regarder sur YouTube',
      durationMinutes: 'min',
      filterType: 'Type de vidéo',
      allVideos: 'Toutes les vidéos',
      courseVideos: 'Cours magistraux',
      exerciseVideos: 'Exercices corrigés',
      examVideos: 'Annales d\'examens',
      tipsVideos: 'Méthodologie & Astuces',
    },
    search: {
      placeholder: 'Rechercher un cours, chapitre, formule, exercice (ex: limites, dérivées, TVI, complexes)...',
      noResults: 'Aucun contenu trouvé pour',
      noResultsSub: 'Essaie avec un mot-clé plus général comme « limites », « fonctions », « suites » ou « bac ».',
      quickResults: 'Résultats trouvés',
      shortcut: 'Appuyez sur Échap pour fermer',
    },
    about: {
      badge: 'Engagement pour l\'éducation au Maroc',
      title: 'Transmettre la passion des mathématiques à chaque élève marocain',
      subtitle: 'L\'excellence mathématique ne doit pas être réservée à une élite. Elle appartient à chaque élève curieux et travailleur.',
      missionTitle: 'Notre Mission Pédagogique',
      missionText: 'Le système éducatif marocain exige une grande rigueur dans le raisonnement mathématique. Nombreux sont les élèves qui se sentent bloqués par manque d\'explications claires ou de moyens financiers pour des cours particuliers. Cette plateforme et la chaîne YouTube sont créées pour combler ce fossé : offrir gratuitement le plus haut niveau d\'enseignement à tous.',
      methodologyTitle: 'La Méthode en 3 Étapes',
      freeManifestoTitle: 'Pourquoi 100% Gratuit ?',
      freeManifestoText: 'La connaissance est un bien commun. Tout le contenu restera toujours libre d\'accès pour tous les élèves du Maroc.',
      experienceBadge: 'Cours & Démonstrations',
      studentsBadge: 'Plateforme Libre & Gratuite',
    },
    common: {
      freeBadge: '100% Gratuit & Libre d\'accès',
      moroccanCurriculum: 'Programme officiel marocain (BIOF & Général)',
      mathOfficial: 'Mathématiques — Lycée (BIOF)',
      close: 'Fermer',
      back: 'Retour',
      continue: 'Continuer',
      share: 'Partager',
      allRightsReserved: 'Tous droits réservés. Dédié à la réussite des élèves marocains.',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      courses: 'الدروس',
      exercises: 'التمارين',
      videos: 'الفيديوهات',
      bac: 'فضاء الباك',
      about: 'عن الأستاذ',
      search: 'بحث في المنصة...',
      subscribeYouTube: 'اشترك في يوتيوب',
      levelSelect: 'مستواي الدراسي',
    },
    hero: {
      badge: 'تعليم مجاني 100% لجميع تلميذات وتلاميذ المغرب',
      title1: 'الرياضيات أصبحت',
      titleHighlight: 'أسهل وأكثر وضوحاً.',
      title2: 'من الجذع المشترك إلى الباكالوريا.',
      subtitle: 'شروحات مفصلة، براهين مبسطة، تمارين تطبيقية بحلول خطوة بخطوة، واستعداد منهجي للامتحانات الوطنية والجهوية.',
      primaryCta: 'ابدأ التعلم الآن',
      secondaryCta: 'شاهد دروس اليوتيوب',
      statsVideos: 'فيديو تعليمي مجاني',
      statsStudents: 'تلميذ مستفيد',
      statsFree: 'مجاني دائماً',
    },
    levels: {
      question: 'ما هو مستواك الدراسي ؟',
      subtitle: 'اختر سنتك الدراسية للوصول مباشرة إلى الدروس والتمارين الخاصة بالمقرر الوزاري المغربي.',
      chooseLevel: 'تحديد مستواي',
      college: 'التعليم الإعدادي',
      collegeDesc: 'الأولى، الثانية والثالثة إعدادي — الأساسيات، الهندسة، المبرهنات والمعادلات.',
      troncCommun: 'الجذع المشترك',
      troncCommunDesc: 'علمي وأدبي — الانتقال إلى التأهيلي، الحساب الجبري ودراسة الدوال.',
      premiereBac: 'الأولى باكالوريا',
      premiereBacDesc: 'علوم تجريبية وعلوم رياضية — المنطق، الحساب المثلثي والاشتقاق.',
      deuxiemeBac: 'الثانية باكالوريا',
      deuxiemeBacDesc: 'علوم رياضية، فيزيائية، علوم الحياة والأرض واقتصاد — النهايات، الأعداد العقدية، التكامل والامتحان الوطني.',
      savedPreference: 'المستوى المختار',
      changeLevel: 'تغيير المستوى',
    },
    courses: {
      title: 'المقرر والدروس المنظمة',
      subtitle: 'هيكلة واضحة وشاملة مطابقة للمقرر الرسمي لوزارة التربية الوطنية المغربية.',
      allCourses: 'جميع الدروس',
      filterByLevel: 'تصفية حسب المستوى',
      filterByBranch: 'تصفية حسب الشعبة',
      lessonsCount: 'دروس',
      duration: 'دقيقة',
      startLearning: 'متابعة الدرس',
      resumeCourse: 'متابعة',
      viewCourse: 'عرض الفصل',
      curriculumStructure: 'هيكلة المقرر الدراسي',
    },
    lesson: {
      objectives: 'أهداف الدرس والكفايات المستهدفة',
      videoLesson: 'الشرح المرئي المفصل (يوتيوب)',
      summary: 'ملخص وخلاصة الدرس',
      keyFormulas: 'القواعد والخاصيات الأساسية',
      workedExamples: 'أمثلة تطبيقية ونماذج للحل',
      commonMistakes: 'أخطاء شائعة يجب تجنبها يوم الامتحان',
      exercises: 'تمارين تطبيقية وتدريبية متدرجة',
      downloadSummary: 'تحميل بطاقة المراجعة (PDF)',
      previousLesson: 'الدرس السابق',
      nextLesson: 'الدرس الموالي',
      proTipDarija: 'نصيحة الأستاذ (نصيحة الامتحان)',
      subscribeToWatchMore: 'اشترك في قناة يوتيوب للتوصل بكل الدروس والتمارين الجديدة',
      playlistLink: 'مشاهدة قائمة التشغيل الكاملة على يوتيوب',
    },
    exercises: {
      title: 'بنك التمارين والحلول المفصلة',
      subtitle: 'تدرب بطريقة منهجية متدرجة. حاول حل التمرين بنفسك أولاً قبل الاطلاع على الإشارة التوجيهية والحل الكامل.',
      filterDifficulty: 'درجة الصعوبة',
      allDifficulties: 'جميع المستويات',
      easy: 'سهل — تطبيق مباشر للخاصيات',
      medium: 'متوسط — تعميق وتوليف',
      hard: 'صعب — استدلال رياضي متقدم',
      examType: 'نموذج امتحان وطني / جهوي',
      showHint: 'عرض إشارة توجيهية للحل',
      hideHint: 'إخفاء الإشارة',
      showSolution: 'عرض الحل الكامل والمفصل',
      hideSolution: 'إخفاء الحل',
      solutionPoints: 'سلم التنقيط التقديري',
      videoCorrection: 'تصحيح بالفيديو على قناة اليوتيوب',
      practiceMore: 'المزيد من التمارين في هذا الفصل',
    },
    bac: {
      badge: 'فضاء خاص بالتحضير لامتحانات الباكالوريا 2026',
      title: 'فضاء الباكالوريا المغربية',
      subtitle: 'امتحانات وطنية مصححة، عناصر الإجابة الرسمية للوزارة، ملخصات القواعد الشاملة وخطة التحضير للتميز.',
      nationalExams: 'الامتحانات الوطنية (الثانية باك)',
      regionalExams: 'الامتحانات الجهوية (الأولى باك والثالثة إعدادي)',
      essentialFormulas: 'ملخص القواعد الرياضية الشاملة',
      downloadFormulaSheet: 'تحميل ملخص القواعد الشامل (PDF)',
      allYears: 'جميع الدورات والسنوات',
      normalSession: 'الدورة العادية (يونيو)',
      remedialSession: 'الدورة الاستدراكية (يوليوز)',
      downloadSubject: 'نص الموضوع الرسمي (PDF)',
      downloadCorrection: 'عناصر الإجابة والتصحيح (PDF)',
      watchCorrection: 'مشاهدة التصحيح بالفيديو',
      studyPlan30Days: 'برنامج المراجعة المركزة (خطة 30 يوماً)',
    },
    videos: {
      title: 'مكتبة الفيديوهات التعليمية على يوتيوب',
      subtitle: 'أكثر من 300 فيديو مجاني مصنف حسب الدروس والمستويات للمراجعة وفق وتيرتك الخاصة.',
      watchOnYoutube: 'مشاهدة على منصة يوتيوب',
      durationMinutes: 'دقيقة',
      filterType: 'نوع الفيديو',
      allVideos: 'جميع الفيديوهات',
      courseVideos: 'شروحات الدروس',
      exerciseVideos: 'تمارين مصححة',
      examVideos: 'تصحيح الامتحانات',
      tipsVideos: 'منهجية ونصائح',
    },
    search: {
      placeholder: 'ابحث عن درس، قاعدة، تمرين، أو امتحان (مثال: النهايات، الاشتقاق، الأعداد العقدية، المتتاليات)...',
      noResults: 'لم يتم العثور على نتائج لـ',
      noResultsSub: 'جرب كلمات أكثر شمولاً مثل «نهايات»، «دوال»، «متتاليات»، أو «وطني».',
      quickResults: 'النتائج المتوفرة',
      shortcut: 'اضغط على Échap للإغلاق',
    },
    about: {
      badge: 'التزام دائم من أجل التعليم بالمغرب',
      title: 'تقريب الرياضيات وجمالها من كل تلميذة وتلميذ مغربي',
      subtitle: 'التميز الرياضي ليس حكراً على فئة معينة، بل هو حق لكل تلميذ مجتهد وشغوف بالمعرفة.',
      missionTitle: 'رسالتنا البيداغوجية',
      missionText: 'يتطلب منهاج الرياضيات بالمغرب دقة ومنهجية عالية في البرهان. يعاني الكثير من التلاميذ من صعوبة استيعاب المفاهيم أو عدم قدرتهم على تحمل تكاليف الساعات الإضافية. تم إطلاق هذه المنصة وقناة اليوتيوب بهدف سد هذه الفجوة: تقديم تعليم عالي المستوى وبالمجان للجميع.',
      methodologyTitle: 'المنهجية في 3 خطوات',
      freeManifestoTitle: 'لماذا المنصة مجانية 100% ؟',
      freeManifestoText: 'العلم حق للجميع. لا اشتراكات مدفوعة، لا حواجز تسجيل معقدة، ولا إعلانات مزعجة. سيبقى كل المحتوى متاحاً بالمجان لخدمة تفوق أبناء وبنات وطننا.',
      experienceBadge: 'دروس وبراهين مفصلة',
      studentsBadge: 'منصة حرة ومجانية',
    },
    common: {
      freeBadge: '100% مجاني ومتاح للجميع',
      moroccanCurriculum: 'المقرر الرسمي لوزارة التربية الوطنية المغربية (خيار فرنسية وعام)',
      mathOfficial: 'مادة الرياضيات — الثانوي التأهيلي (خيار فرنسية)',
      close: 'إغلاق',
      back: 'رجوع',
      continue: 'متابعة',
      share: 'مشاركة',
      allRightsReserved: 'جميع الحقوق محفوظة. مخصص لنجاح وتفوق التلميذ المغربي.',
    }
  }
};
