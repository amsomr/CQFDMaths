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
    <div className={`relative overflow-hidden rounded-2xl bg-slate-950 shadow-lg border border-slate-800/80 ${className}`}>
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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />

          {/* Dark gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent transition-opacity" />

          {/* Play Button - Vibrant YouTube Red with pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 ring-4 ring-white/25">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
            </div>
          </div>

          {/* Video Title and Metadata at bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
            <div className="flex items-center gap-2 mb-2 font-sans text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-2xs">
                <Youtube className="w-3.5 h-3.5 fill-red-500" />
                Vidéo YouTube
              </span>
              <span className="text-slate-300 font-medium">Prof. Omar Alami</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-medium line-clamp-2 text-white group-hover:text-blue-200 transition-colors">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Sub bar with direct YouTube subscription CTA */}
      {showSubscribeBadge && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-900/95 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-sans text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">Explication 100% gratuite & sans publicité intrusive</span>
          </div>
          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
          >
            <span>S&apos;abonner sur YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
