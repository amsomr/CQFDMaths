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
  name: 'MathsMaroc',
  nameAr: 'رياضيات المغرب',
  fullName: 'MathsMaroc — Prof. Omar Alami',
  fullNameAr: 'رياضيات المغرب — الأستاذ عمر العلمي',
  domain: 'https://mathsmaroc.ma',
  currentExamYear: 2026,
  professor: {
    name: 'Prof. Omar Alami',
    nameAr: 'الأستاذ عمر العلمي',
    title: 'Enseignant de Mathématiques',
    titleAr: 'أستاذ مادة الرياضيات',
    bio: 'Enseignant de mathématiques au Maroc, passionné par la transmission pédagogique claire, rigoureuse et accessible aux lycéens et collégiens.',
    bioAr: 'أستاذ مادة الرياضيات بالمغرب، أهدف إلى جعل الرياضيات مادة مفهومة ومتاحة مجاناً لجميع تلاميذ الإعدادي والثانوي التأهيلي.',
    quote: 'Mon objectif n\'est pas de te faire mémoriser les maths. C\'est de te les faire comprendre.',
    quoteAr: 'هدفي ليس حفظ الرياضيات، بل فهمها وبناء تفكير منطقي متين.',
    // photoUrl left undefined until real verified photograph is provided
    photoUrl: undefined as string | undefined,
  },
  youtube: {
    channelName: 'MathsMaroc',
    channelUrl: 'https://youtube.com/@MathsMaroc',
    channelHandle: '@MathsMaroc',
    defaultVideoId: 'V6yixyiJcos',
  },
  socials: {
    youtube: 'https://youtube.com/@MathsMaroc',
    whatsappCommunity: 'https://chat.whatsapp.com/invite/MathsMarocFree',
    telegram: 'https://t.me/MathsMarocOfficiel',
    email: 'contact@mathsmaroc.ma',
  },
  meta: {
    defaultTitle: 'MathsMaroc — Cours et Exercices de Mathématiques (Collège & Lycée)',
    defaultTitleAr: 'رياضيات المغرب — دروس وتمارين وحلول واستعداد للباكالوريا',
    defaultDescription: 'Plateforme gratuite de mathématiques pour les élèves marocains du Collège et Lycée (Tronc Commun, 1ère Bac, 2ème Bac). Cours structurés, démonstrations vidéo, exercices et annales.',
    defaultDescriptionAr: 'منصة تعليمية مجانية في الرياضيات لتلاميذ الإعدادي والثانوي التأهيلي بالمغرب. دروس، فيديوهات، تمارين ونماذج امتحانات.',
  }
};
