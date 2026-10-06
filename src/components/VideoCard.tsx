'use client';

import React, { useState } from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
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

  const typeColors = {
    cours: 'bg-blue-50 text-[#0056d2] border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    exercice: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    astuce: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    national: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  };

  return (
    <div className="group rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md hover:border-[#0056d2] transition-all duration-200 flex flex-col justify-between font-sans">
      {/* Thumbnail Container */}
      <div
        onClick={() => onPlay ? onPlay(video) : window.open(`https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-950 select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={video.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/30 transition-colors" />

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-[#cc0000] text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
            <Play className="w-4 h-4 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Duration Pill at bottom right */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[11px] font-mono font-medium text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>{video.duration}</span>
        </div>

        {/* Popular tag */}
        {video.isPopular && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0056d2] text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Top Vu</span>
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold border ${typeColors[video.type]}`}>
              {typeLabels[video.type]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              {video.topic}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-[#0056d2] transition-colors leading-snug">
            {isRtl ? video.titleAr : video.title}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0056d2]" />
            <span>Prof. Omar Alami</span>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#0056d2] group-hover:underline">
            <span>Regarder</span>
            <span>↗</span>
          </span>
        </div>
      </div>
    </div>
  );
}
