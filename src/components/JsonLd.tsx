import React from 'react';
import { SITE_CONFIG } from '@/data/site-config';
import { Lesson, BacExam, YouTubeVideo } from '@/data/types';

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.fullName,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.meta.defaultDescription,
    inLanguage: ['fr-MA', 'ar-MA'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.domain}/recherche?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.professor.name,
      jobTitle: SITE_CONFIG.professor.title,
      description: SITE_CONFIG.professor.bio,
      sameAs: [
        SITE_CONFIG.youtube.channelUrl,
        SITE_CONFIG.socials.telegram,
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LessonJsonLd({ lesson }: { lesson: Lesson }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Course', 'LearningResource'],
    name: lesson.title,
    description: lesson.summary,
    inLanguage: 'fr-MA',
    learningResourceType: 'Lesson',
    educationalLevel: lesson.levelId,
    timeRequired: `PT${lesson.estimatedMinutes}M`,
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.professor.name,
      url: `${SITE_CONFIG.domain}/a-propos`,
    },
    isAccessibleForFree: true,
    hasPart: [
      {
        '@type': 'VideoObject',
        name: lesson.title,
        description: lesson.summary,
        thumbnailUrl: `https://img.youtube.com/vi/${lesson.youtubeVideoId}/maxresdefault.jpg`,
        uploadDate: '2025-09-01T00:00:00Z',
        embedUrl: `https://www.youtube-nocookie.com/embed/${lesson.youtubeVideoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${lesson.youtubeVideoId}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.domain}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
