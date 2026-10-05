'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, Translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Check URL param first (?lang=ar or ?lang=fr)
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('lang') as Language | null;
    if (param && (param === 'fr' || param === 'ar')) {
      setLanguageState(param);
      document.documentElement.dir = param === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = param;
      localStorage.setItem('maths_maroc_lang', param);
      return;
    }

    // Read saved preference from localStorage
    const saved = localStorage.getItem('maths_maroc_lang') as Language | null;
    if (saved && (saved === 'fr' || saved === 'ar')) {
      setLanguageState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('maths_maroc_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const next = language === 'fr' ? 'ar' : 'fr';
    setLanguage(next);
  };

  const t = TRANSLATIONS[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        dir,
        isRtl,
      }}
    >
      <div dir={dir} className={isRtl ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
