import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'Amazonbot',
          'meta-externalagent',
          'Bytespider',
          'CCBot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
