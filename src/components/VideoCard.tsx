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
    cours: 'Cours magistral',
    exercice: 'Exercice corrigé',
    astuce: 'Méthode & Astuce',
    national: 'Examen National',
  };

  const typeBadges = {
    cours: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    exercice: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    astuce: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    national: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:bg-red-600">
            <Play className="w-5 h-5 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Duration Pill at bottom right */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-mono font-medium text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>{video.duration}</span>
        </div>

        {/* Popular tag */}
        {video.isPopular && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            <span>Top Vu</span>
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${typeBadges[video.type]}`}>
              {typeLabels[video.type]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {video.topic}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {isRtl ? video.titleAr : video.title}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
            <Youtube className="w-3.5 h-3.5 fill-red-600 dark:fill-red-400" />
            <span>Chaîne YouTube</span>
          </span>
          <a
            href={`https://youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline text-indigo-600 dark:text-indigo-400"
          >
            Ouvrir dans YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}
