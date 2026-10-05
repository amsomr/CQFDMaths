import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/site-config';
import { getAllLessons, CURRICULUM_LEVELS } from '@/data/curriculum';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cours`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exercices`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bac`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/recherche`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Level & Branch routes
  const levelRoutes: MetadataRoute.Sitemap = [];
  for (const lvl of CURRICULUM_LEVELS) {
    levelRoutes.push({
      url: `${baseUrl}/cours/${lvl.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });

    for (const br of lvl.branches) {
      levelRoutes.push({
        url: `${baseUrl}/cours/${lvl.id}/${br.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      for (const ch of br.chapters) {
        levelRoutes.push({
          url: `${baseUrl}/cours/${lvl.id}/${br.id}/${ch.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  // Lesson routes
  const lessons = getAllLessons();
  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${baseUrl}/cours/${lesson.levelId}/${lesson.branchId}/${lesson.chapterSlug}/${lesson.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...levelRoutes, ...lessonRoutes];
}
