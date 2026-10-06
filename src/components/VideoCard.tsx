'use client';

import React, { useState } from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
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
    cours: 'bg-blue-50 text-[#1D4ED8] border-blue-200',
    exercice: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    astuce: 'bg-amber-50 text-amber-800 border-amber-200',
    national: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <div className="group rounded-[14px] border border-[#0F172A]/10 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-[#1D4ED8] transition-all duration-200 flex flex-col justify-between font-sans">
      {/* Thumbnail Container */}
      <div
        onClick={() => onPlay ? onPlay(video) : window.open(`https://youtube.com/watch?v=${video.youtubeId}`, '_blank')}
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-[#0A192F] select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={video.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0A192F]/20 group-hover:bg-[#0A192F]/10 transition-colors" />

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#CC0000] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play className="w-5 h-5 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Duration Pill at bottom right */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-[4px] bg-[#0A192F]/90 text-[11px] font-mono font-medium text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>{video.duration}</span>
        </div>

        {/* Popular tag */}
        {video.isPopular && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[4px] bg-[#1D4ED8] text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Essentiel</span>
          </div>
        )}
      </div>

      {/* Video Details */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider border ${typeColors[video.type]}`}>
              {typeLabels[video.type]}
            </span>
            <span className="text-xs text-[#64748B] font-medium truncate">
              {video.topic}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#1D4ED8] transition-colors leading-snug">
            {isRtl ? video.titleAr : video.title}
          </h4>
        </div>

        <div className="pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1.5 font-medium text-[#475569]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            <span>Prof. Omar Alami</span>
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[#1D4ED8] group-hover:underline">
            <span>Regarder</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
