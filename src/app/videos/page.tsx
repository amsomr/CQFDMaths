'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { VideoCard } from '@/components/VideoCard';
import { YOUTUBE_VIDEOS } from '@/data/videos';
import { YouTubeVideo, LevelId } from '@/data/types';
import { SITE_CONFIG } from '@/data/site-config';
import { Filter, Search, X, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumb items={[{ name: 'Vidéothèque YouTube', url: '/videos' }]} />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-800/60 shadow-2xs">
              <Youtube className="w-3.5 h-3.5 fill-red-600" />
              <span>{SITE_CONFIG.youtube.channelName}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
              {t.videos.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-sans">
              {t.videos.subtitle}
            </p>
          </div>

          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all shrink-0 hover:-translate-y-0.5"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>S&apos;abonner sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une vidéo ou une notion..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-slate-900 dark:text-slate-100 shadow-2xs placeholder-slate-400"
              />
            </div>
            <div className="font-mono text-xs text-slate-500 shrink-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredVideos.length}</span> vidéos disponibles
            </div>
          </div>

          {/* Video Type Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-red-500" />
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedType === tp.id
                    ? 'bg-red-600 text-white font-semibold shadow-xs'
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 text-slate-100">
                <span className="font-serif text-sm sm:text-base line-clamp-1">
                  {activeModalVideo.title}
                </span>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
              <div className="p-4 bg-slate-950 flex items-center justify-between font-sans text-xs text-slate-400">
                <span className="font-mono">{activeModalVideo.topic} • {activeModalVideo.duration}</span>
                <a
                  href={`https://youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white underline underline-offset-2 flex items-center gap-1.5 font-medium"
                >
                  <span>Regarder directement sur YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
