import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageProvider';
import { WebSiteJsonLd } from '@/components/JsonLd';
import { SITE_CONFIG } from '@/data/site-config';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
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
    images: [
      {
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Plateforme Gratuite de Mathématiques au Maroc`,
      },
    ],
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
      className={`${jakarta.variable} ${notoArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg text-sm font-semibold"
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
