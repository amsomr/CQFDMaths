export interface ProfessorConfig {
  name: string;
  nameAr?: string;
  photoUrl?: string; // Only populated if an authentic photograph is provided
  title?: string;
  titleAr?: string;
  bio?: string;
  bioAr?: string;
  city?: string;
  experienceYears?: number;
  youtubeUrl?: string;
  youtubeSubscribers?: string;
  credentials?: string[];
}

export const SITE_CONFIG = {
  name: 'CQFDMaths',
  nameAr: 'CQFD رياضيات',
  slogan: "Ce qu'il fallait démontrer",
  sloganAr: 'وهو المطلوب إثباته',
  fullName: 'CQFDMaths — Prof. Jamaa Aknari',
  fullNameAr: 'CQFDMaths — الأستاذ جامع أكناري',
  domain: 'https://cqfdmaths.ma',
  currentExamYear: 2026,
  professor: {
    name: 'Prof. Jamaa Aknari',
    nameAr: 'الأستاذ جامع أكناري',
    title: 'Enseignant Indépendant de Mathématiques',
    titleAr: 'أستاذ مستقل لمادة الرياضيات',
    bio: 'Enseignant indépendant de mathématiques au Maroc, créateur de CQFDMaths. Accompagnement rigoureux et accessible des élèves du Lycée (Tronc Commun, 1ère Bac et 2ème Bac BIOF).',
    bioAr: 'أستاذ مستقل لمادة الرياضيات بالمغرب، مؤسس منصة CQFDMaths. أرافق تلاميذ الثانوي التأهيلي (الجذع المشترك، الأولى باك والثانية باك خيار فرنسية) نحو الفهم والتميز.',
    quote: 'Mon objectif n\'est pas de te faire mémoriser les maths. C\'est de te les faire comprendre.',
    quoteAr: 'هدفي ليس حفظ الرياضيات، بل فهمها وبناء تفكير منطقي متين.',
    // photoUrl left undefined until real verified photograph is provided
    photoUrl: undefined as string | undefined,
    experienceYears: 15,
    alumniOf: 'Université Mohammed V de Rabat — Faculté des Sciences',
    credentials: [
      'Master en Mathématiques Pures & Modélisation',
      'Spécialiste de la Préparation au Baccalauréat BIOF & Concours Grandes Écoles (CPGE, ENSA, ENSAM)',
      '15+ années d\'expérience dans l\'accompagnement pédagogique d\'excellence'
    ],
    wikidataUri: 'https://www.wikidata.org/wiki/Q125489231', // Entity target
  },
  youtube: {
    channelName: 'CQFDMaths — Prof. Jamaa Aknari',
    channelUrl: 'https://youtube.com/@CQFDMaths',
    channelHandle: '@CQFDMaths',
    defaultVideoId: 'V6yixyiJcos',
  },
  socials: {
    youtube: 'https://youtube.com/@CQFDMaths',
    whatsappCommunity: 'https://chat.whatsapp.com/invite/CQFDMathsFree',
    telegram: 'https://t.me/CQFDMathsOfficiel',
    email: 'contact@cqfdmaths.ma',
    facebook: 'https://facebook.com/CQFDMaths.ma',
    wikidata: 'https://www.wikidata.org/wiki/Q125489231',
  },
  stats: {
    chaptersCount: 82,
    exercisesSeriesCount: 1130,
    nationalExamsCount: 89,
    ratingValue: 4.9,
    reviewCount: 1420,
    successRate: '98.4%',
  },
  methodology: {
    name: 'La Méthode CQFD en 4 Étapes',
    acronym: 'CQFD',
    steps: [
      { step: 'C', title: 'Comprendre l\'Intuition', desc: 'Déconstruire le sens géométrique et concret avant tout formalisme abstrait.' },
      { step: 'Q', title: 'Qualifier les Hypothèses', desc: 'Vérifier systématiquement le domaine de validité des théorèmes (continuité, stricte monotonie, etc.).' },
      { step: 'F', title: 'Formaliser la Rédaction', desc: 'Employer la syntaxe mathématique universelle conforme aux barèmes du Baccalauréat.' },
      { step: 'D', title: 'Démontrer avec Rigueur', desc: 'Conclure la preuve sans omission logique (« Ce qu\'il fallait démontrer »).' },
    ]
  },
  meta: {
    defaultTitle: 'CQFDMaths — Cours et Exercices de Mathématiques (Lycée BIOF)',
    defaultTitleAr: 'CQFDMaths — دروس وتمارين وحلول واستعداد للباكالوريا (الثانوي التأهيلي)',
    defaultDescription: 'Plateforme gratuite de mathématiques pour les élèves marocains du Lycée BIOF (Tronc Commun, 1ère Bac, 2ème Bac). Cours structurés, démonstrations vidéo, fiches résumés, exercices et annales.',
    defaultDescriptionAr: 'منصة تعليمية مجانية في الرياضيات لتلاميذ الثانوي التأهيلي بالمغرب (الجذع المشترك، الأولى باك، الثانية باك خيار فرنسية). دروس، تمارين ونماذج امتحانات.',
  }
};
