'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { VideoCard } from '@/components/VideoCard';
import { YOUTUBE_VIDEOS } from '@/data/videos';
import { YouTubeVideo, LevelId } from '@/data/types';
import { SITE_CONFIG } from '@/data/site-config';
import { Filter, Search, Play, X, ExternalLink } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { useLanguage } from '@/components/LanguageProvider';

export default function VideosPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<LevelId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalVideo, setActiveModalVideo] = useState<YouTubeVideo | null>(null);
  const { t } = useLanguage();

  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((v) => {
      if (selectedType !== 'all' && v.type !== selectedType) return false;
      if (selectedLevel !== 'all' && v.levelId !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          v.title.toLowerCase().includes(q) ||
          v.topic.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedType, selectedLevel, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Vidéothèque YouTube', url: '/videos' }]} />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200/60 dark:border-red-800/60">
              <Youtube className="w-4 h-4 fill-red-600" />
              <span>{SITE_CONFIG.youtube.channelName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.videos.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              {t.videos.subtitle}
            </p>
          </div>

          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 transition-all hover:scale-105 shrink-0"
          >
            <Youtube className="w-5 h-5 fill-white" />
            <span>S&apos;abonner sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une vidéo, un chapitre ou une notion..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-bold text-slate-900 dark:text-white">{filteredVideos.length}</span> vidéos disponibles
            </div>
          </div>

          {/* Video Type Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Type :
            </span>
            {[
              { id: 'all', label: 'Toutes les vidéos' },
              { id: 'cours', label: 'Cours magistraux' },
              { id: 'astuce', label: 'Méthodes & Astuces' },
              { id: 'national', label: 'Examens Nationaux' },
            ].map((tp) => (
              <button
                key={tp.id}
                onClick={() => setSelectedType(tp.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedType === tp.id
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>

        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={(v) => setActiveModalVideo(v)}
            />
          ))}
        </div>

        {/* Video Player Modal */}
        {activeModalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
                <span className="font-bold text-sm sm:text-base line-clamp-1">
                  {activeModalVideo.title}
                </span>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeModalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
                <span>{activeModalVideo.topic} • {activeModalVideo.duration}</span>
                <a
                  href={`https://youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Regarder directement sur YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
