'use client';

import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { SITE_CONFIG } from '@/data/site-config';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  aspectRatio?: 'video' | 'wide';
  className?: string;
  autoplayOnClick?: boolean;
  showSubscribeBadge?: boolean;
}

export function YouTubeFacade({
  videoId,
  title,
  className = '',
  autoplayOnClick = true,
  showSubscribeBadge = true,
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const thumbUrl = imgError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone-950 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-stone-800 ${className}`}>
      {isPlaying ? (
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplayOnClick ? 1 : 0}&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      ) : (
        <div
          onClick={() => setIsPlaying(true)}
          className="group relative w-full aspect-video cursor-pointer select-none overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsPlaying(true);
            }
          }}
          aria-label={`Lire la vidéo : ${title}`}
        >
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />

          {/* Dark gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/10 transition-opacity" />

          {/* Play Button - Dignified stone/white centered badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900/90 text-stone-100 border border-stone-700/80 shadow-xl backdrop-blur-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-stone-900">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
            </div>
          </div>

          {/* Video Title and Metadata at bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-stone-100">
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-stone-900/80 text-stone-300 border border-stone-700">
                <Youtube className="w-3 h-3 fill-red-500" />
                Vidéo YouTube
              </span>
              <span className="text-stone-400">Prof. Omar Alami</span>
            </div>
            <h3 className="font-serif text-sm sm:text-base font-normal line-clamp-2 text-stone-100 group-hover:text-white transition-colors">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Sub bar with direct YouTube subscription CTA */}
      {showSubscribeBadge && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-stone-950 border-t border-stone-800/80 text-xs text-stone-400">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Explication 100% gratuite & sans publicité intrusive</span>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-stone-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            <span>S&apos;abonner sur YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}
