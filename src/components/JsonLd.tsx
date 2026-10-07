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

export function FAQPageJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.professor.name,
    alternateName: ['الأستاذ جامع أكناري', 'Jamaa Aknari'],
    jobTitle: SITE_CONFIG.professor.title,
    description: SITE_CONFIG.professor.bio,
    url: `${SITE_CONFIG.domain}/a-propos`,
    image: SITE_CONFIG.professor.photoUrl || `${SITE_CONFIG.domain}/images/prof-jamaa-aknari.png`,
    sameAs: [
      SITE_CONFIG.youtube.channelUrl,
      SITE_CONFIG.socials.telegram,
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.wikidata,
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: SITE_CONFIG.professor.alumniOf,
    },
    hasCredential: SITE_CONFIG.professor.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    knowsAbout: [
      'Mathématiques Lycée BIOF',
      'Baccalauréat Marocain',
      'Sciences Mathématiques A & B',
      'Sciences Physiques & Chimiques',
      'Analyse Mathématique',
      'Algèbre & Arithmétique',
      'Probabilités & Géométrie',
      'CPGE Maroc',
    ],
    worksFor: {
      '@type': 'EducationalOrganization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'p'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EducationalOrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.fullName, 'CQFD Mathématiques Maroc'],
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/icons/icon-512x512.png`,
    description: SITE_CONFIG.meta.defaultDescription,
    slogan: 'Ce qu\'il fallait démontrer',
    inLanguage: ['fr-MA', 'ar-MA'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.stats.ratingValue,
      reviewCount: SITE_CONFIG.stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.professor.name,
      jobTitle: SITE_CONFIG.professor.title,
      url: `${SITE_CONFIG.domain}/a-propos`,
      sameAs: [
        SITE_CONFIG.youtube.channelUrl,
        SITE_CONFIG.socials.telegram,
        SITE_CONFIG.socials.wikidata,
      ],
    },
    sameAs: [
      SITE_CONFIG.youtube.channelUrl,
      SITE_CONFIG.socials.telegram,
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.wikidata,
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'p'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ChapterCourseJsonLd({
  title,
  description,
  levelName,
  branchName,
  url,
  lessons,
}: {
  title: string;
  description: string;
  levelName: string;
  branchName: string;
  url: string;
  lessons: { title: string; slug: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${title} — ${branchName} (${levelName})`,
    description,
    url: `${SITE_CONFIG.domain}${url}`,
    inLanguage: 'fr-MA',
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.professor.name,
      jobTitle: SITE_CONFIG.professor.title,
      url: `${SITE_CONFIG.domain}/a-propos`,
      sameAs: [SITE_CONFIG.youtube.channelUrl],
    },
    educationalLevel: levelName,
    isAccessibleForFree: true,
    hasPart: lessons.map((l) => ({
      '@type': 'LearningResource',
      name: l.title,
      learningResourceType: 'Lesson',
      url: `${SITE_CONFIG.domain}${url}/${l.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function VideoGalleryJsonLd({ videos }: { videos: YouTubeVideo[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: `${v.topic} — Cours vidéo de mathématiques présenté par ${SITE_CONFIG.professor.name}`,
        thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
        uploadDate: '2025-09-01T00:00:00Z',
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
        duration: v.duration ? `PT${v.duration.split(':')[0]}M${v.duration.split(':')[1] || '00'}S` : 'PT15M',
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.professor.name,
          url: `${SITE_CONFIG.domain}/a-propos`,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

