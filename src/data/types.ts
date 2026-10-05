export type LevelId = '2eme-bac' | '1ere-bac' | 'tronc-commun' | 'college';

export type BranchId = 
  // 2ème Bac
  | 'sciences-maths' 
  | 'sciences-physiques' 
  | 'svt' 
  | 'sciences-eco'
  // 1ère Bac
  | 'sciences-exp'
  | '1ere-sciences-maths'
  // Tronc Commun
  | 'tc-sciences'
  | 'tc-lettres'
  // Collège
  | '3ac'
  | '2ac'
  | '1ac';

export type Difficulty = 'facile' | 'moyen' | 'difficile' | 'type-examen';

export interface ExerciseStep {
  title: string;
  content: string;
}

export interface Exercise {
  id: string;
  title: string;
  levelId: LevelId;
  branchId: BranchId;
  chapterSlug: string;
  lessonSlug?: string;
  difficulty: Difficulty;
  question: string;
  hint: string;
  solution: string;
  points?: number;
  durationMinutes: number;
  videoSolutionId?: string;
  videoTimestamp?: string;
  proTipDarija?: string;
}

export interface FormulaItem {
  name: string;
  latex: string;
  description?: string;
  context?: string;
}

export interface WorkedExample {
  title: string;
  statement: string;
  solution: string;
  methodologyTip?: string;
}

export interface CommonMistake {
  title: string;
  mistake: string;
  correction: string;
  why: string;
}

export interface Lesson {
  slug: string;
  title: string;
  titleAr: string;
  levelId: LevelId;
  branchId: BranchId;
  chapterSlug: string;
  chapterTitle: string;
  estimatedMinutes: number;
  youtubeVideoId: string;
  youtubePlaylistId?: string;
  summary: string;
  summaryAr?: string;
  objectives: string[];
  keyFormulas: FormulaItem[];
  definitions: { title: string; content: string; latex?: string }[];
  workedExamples: WorkedExample[];
  commonMistakes: CommonMistake[];
  proTipDarija?: string;
  exercises: Exercise[];
  downloadableResource?: {
    title: string;
    fileUrl: string;
    type: 'pdf' | 'formulaire';
  };
  previousLessonSlug?: string;
  nextLessonSlug?: string;
  seoKeywords: string[];
}

export interface Chapter {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  levelId: LevelId;
  branchId: BranchId;
  order: number;
  iconName: string;
  lessons: Lesson[];
}

export interface Branch {
  id: BranchId;
  name: string;
  nameAr: string;
  shortName: string;
  description: string;
  levelId: LevelId;
  chapters: Chapter[];
}

export interface Level {
  id: LevelId;
  name: string;
  nameAr: string;
  badge: string;
  cycle: 'Lycée' | 'Collège';
  description: string;
  branches: Branch[];
}

export interface BacExam {
  id: string;
  year: number;
  session: 'Normale' | 'Rattrapage';
  branchId: BranchId;
  branchName: string;
  title: string;
  durationHours: number;
  coefficient: number;
  subjectPdfUrl: string;
  correctionPdfUrl: string;
  youtubeVideoId?: string;
  totalExercises: number;
  keyTopics: string[];
  difficulty: 'Normale' | 'Exigeante' | 'Très difficile';
}

export interface YouTubeVideo {
  id: string;
  title: string;
  titleAr: string;
  levelId: LevelId;
  branchId: BranchId;
  chapterSlug: string;
  topic: string;
  duration: string;
  youtubeId: string;
  playlistId?: string;
  type: 'cours' | 'exercice' | 'astuce' | 'national';
  isPopular?: boolean;
}
