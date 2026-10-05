import { getAllLessons, getAllExercises } from '@/data/curriculum';
import { BAC_EXAMS } from '@/data/bac-exams';
import { YOUTUBE_VIDEOS } from '@/data/videos';
import { normalizeSearchString } from './utils';

export interface SearchResultItem {
  id: string;
  type: 'lesson' | 'exercise' | 'bac' | 'video';
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  tags: string[];
}

export function searchAll(query: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) return [];

  const q = normalizeSearchString(query);
  const results: SearchResultItem[] = [];

  // Search lessons
  const lessons = getAllLessons();
  for (const lesson of lessons) {
    const haystack = normalizeSearchString(
      `${lesson.title} ${lesson.titleAr} ${lesson.chapterTitle} ${lesson.summary} ${lesson.seoKeywords.join(' ')}`
    );
    if (haystack.includes(q)) {
      results.push({
        id: `lesson-${lesson.slug}`,
        type: 'lesson',
        title: lesson.title,
        subtitle: `${lesson.chapterTitle} • ${lesson.estimatedMinutes} min`,
        url: `/cours/${lesson.levelId}/${lesson.branchId}/${lesson.chapterSlug}/${lesson.slug}`,
        badge: 'Cours & Synthèse',
        tags: [lesson.levelId, lesson.branchId, ...lesson.seoKeywords]
      });
    }
  }

  // Search exercises
  const exercises = getAllExercises();
  for (const exo of exercises) {
    const haystack = normalizeSearchString(`${exo.title} ${exo.question} ${exo.difficulty}`);
    if (haystack.includes(q)) {
      results.push({
        id: `exo-${exo.id}`,
        type: 'exercise',
        title: exo.title,
        subtitle: `Difficulté: ${exo.difficulty} • ${exo.durationMinutes} min`,
        url: `/exercices?id=${exo.id}`,
        badge: 'Exercice Corrigé',
        tags: [exo.difficulty, exo.levelId]
      });
    }
  }

  // Search Bac Exams
  for (const exam of BAC_EXAMS) {
    const haystack = normalizeSearchString(`${exam.title} ${exam.year} ${exam.session} ${exam.keyTopics.join(' ')}`);
    if (haystack.includes(q)) {
      results.push({
        id: `exam-${exam.id}`,
        type: 'bac',
        title: exam.title,
        subtitle: `${exam.branchName} • Session ${exam.session} • ${exam.durationHours}h`,
        url: `/bac#${exam.id}`,
        badge: 'Examen National',
        tags: [String(exam.year), exam.branchName, ...exam.keyTopics]
      });
    }
  }

  // Search Videos
  for (const video of YOUTUBE_VIDEOS) {
    const haystack = normalizeSearchString(`${video.title} ${video.titleAr} ${video.topic}`);
    if (haystack.includes(q)) {
      results.push({
        id: `vid-${video.id}`,
        type: 'video',
        title: video.title,
        subtitle: `${video.topic} • Durée : ${video.duration}`,
        url: `/videos#${video.id}`,
        badge: 'Vidéo YouTube',
        tags: [video.topic, video.levelId]
      });
    }
  }

  return results;
}
