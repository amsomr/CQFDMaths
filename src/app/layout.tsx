import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Newsreader, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageProvider';
import { WebSiteJsonLd } from '@/components/JsonLd';
import { SITE_CONFIG } from '@/data/site-config';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const arabicFont = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.fullName} — Cours et Exercices Corrigés Gratuits`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.meta.defaultDescription,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.professor.name, url: SITE_CONFIG.domain }],
  creator: SITE_CONFIG.professor.name,
  publisher: SITE_CONFIG.name,
  keywords: [
    'maths maroc',
    'cours maths maroc',
    'exercices corriges maths 2 bac',
    'examen national maths maroc',
    'professeur omar alami',
    'sciences maths',
    'sciences physiques biof',
    'tronc commun scientifique',
    'limites et continuite 2 bac',
    'nombres complexes maroc',
    'tvi maroc',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'fr-MA': '/',
      'ar-MA': '/',
    },
  },
  openGraph: {
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.meta.defaultDescription,
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    locale: 'fr_MA',
    alternateLocale: ['ar_MA'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.meta.defaultDescription,
    creator: '@ProfOmarMaths',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${sansFont.variable} ${serifFont.variable} ${arabicFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#fafaf9] dark:bg-[#0c0a09] text-[#1c1917] dark:text-[#fafaf9] selection:bg-stone-200 dark:selection:bg-stone-800">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-stone-900 text-white rounded-md shadow-lg text-sm font-medium"
        >
          Aller au contenu principal
        </a>

        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
