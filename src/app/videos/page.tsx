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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <Youtube className="w-3.5 h-3.5 fill-red-600" />
              <span>{SITE_CONFIG.youtube.channelName}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 dark:text-stone-100 tracking-tight">
              {t.videos.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans">
              {t.videos.subtitle}
            </p>
          </div>

          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 shadow-xs transition-colors shrink-0"
          >
            <Youtube className="w-4 h-4 fill-red-600" />
            <span>S&apos;abonner sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une vidéo ou une notion..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-stone-400"
              />
            </div>
            <div className="font-mono text-xs text-stone-500">
              <span className="font-semibold text-stone-900 dark:text-stone-100">{filteredVideos.length}</span> vidéos disponibles
            </div>
          </div>

          {/* Video Type Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 mr-2 flex items-center gap-1">
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
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                  selectedType === tp.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200'
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-stone-800">
              <div className="flex items-center justify-between p-4 border-b border-stone-800 text-stone-100">
                <span className="font-serif text-sm sm:text-base line-clamp-1">
                  {activeModalVideo.title}
                </span>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800"
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
              <div className="p-3.5 bg-stone-950 flex items-center justify-between font-mono text-xs text-stone-400">
                <span>{activeModalVideo.topic} • {activeModalVideo.duration}</span>
                <a
                  href={`https://youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white underline underline-offset-2 flex items-center gap-1 font-medium"
                >
                  <span>Regarder directement sur YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
