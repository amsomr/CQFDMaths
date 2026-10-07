'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  inline?: boolean;
  className?: string;
}

export function MathView({ math, inline = false, className = '' }: MathViewProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return `<span class="text-rose-500 font-mono text-sm">${math}</span>`;
    }
  }, [math, inline]);

  if (inline) {
    return (
      <span
        dir="ltr"
        className={`inline-math font-serif inline-block px-1 align-baseline ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      dir="ltr"
      className={`block-math w-full overflow-x-auto py-2 my-2 text-center text-slate-900 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * TextWithMath helper:
 * Parses text containing inline math `$math$` and block math `$$math$$`
 * and renders them seamlessly.
 */
export function TextWithMath({ text, className = '' }: { text?: string | null; className?: string }) {
  if (!text) return null;
  // If no math markers, return raw text
  if (!text.includes('$')) {
    return <span className={className}>{text}</span>;
  }

  // Split on $$ first for block equations, then $ for inline
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.slice(2, -2).trim();
          return <MathView key={idx} math={formula} inline={false} />;
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          const formula = part.slice(1, -1).trim();
          return <MathView key={idx} math={formula} inline={true} />;
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
}
