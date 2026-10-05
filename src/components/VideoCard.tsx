'use client';

import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { YouTubeVideo } from '@/data/types';
import { useLanguage } from './LanguageProvider';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay?: (video: YouTubeVideo) => void;
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const { isRtl } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const thumbUrl = imgError
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  const typeLabels = {
    cours: 'Cours Magistral',
    exercice: 'Exercice Résolu',
    astuce: 'Méthode & Astuce',
    national: 'Examen National',
  };

  return (
    <div className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-200 flex flex-col justify-between">
      {/* Thumbnail Container */}
      <div
        onClick={() => onPlay ? onPlay(video) : window.open(`https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-stone-950 select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={video.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors" />

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-stone-900/85 dark:bg-stone-100/90 text-white dark:text-stone-900 flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Duration Pill at bottom right */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-stone-950/85 text-[11px] font-mono font-medium text-stone-200 flex items-center gap-1">
          <Clock className="w-3 h-3 text-stone-400" />
          <span>{video.duration}</span>
        </div>

        {/* Popular tag */}
        {video.isPopular && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-stone-900/90 border border-stone-700/60 text-stone-200 text-[10px] font-mono uppercase tracking-wider">
            Recommandé
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              {typeLabels[video.type]}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">
              {video.topic}
            </span>
          </div>
          <h4 className="font-serif text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
            {isRtl ? video.titleAr : video.title}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
            <Youtube className="w-3.5 h-3.5 fill-red-600" />
            <span>MathsMaroc</span>
          </span>
          <a
            href={`https://youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 underline underline-offset-2"
          >
            Visionner ↗
          </a>
        </div>
      </div>
    </div>
  );
}
