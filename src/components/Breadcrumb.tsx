'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { BreadcrumbJsonLd } from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { isRtl } = useLanguage();

  const fullItems: BreadcrumbItem[] = [
    { name: 'Accueil', url: '/' },
    ...items,
  ];

  return (
    <>
      <BreadcrumbJsonLd items={fullItems} />
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-stone-400 py-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Accueil</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.url}>
              <ChevronRight className={`w-3.5 h-3.5 text-stone-400 dark:text-stone-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              {isLast ? (
                <span className="font-semibold text-stone-900 dark:text-stone-100 max-w-[200px] sm:max-w-xs truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors max-w-[150px] sm:max-w-[200px] truncate"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
