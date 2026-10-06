'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { VideoCard } from '@/components/VideoCard';
import { YOUTUBE_VIDEOS } from '@/data/videos';
import { YouTubeVideo, LevelId } from '@/data/types';
import { SITE_CONFIG } from '@/data/site-config';
import { Filter, Search, X, ExternalLink, Play } from 'lucide-react';
import { Youtube } from '@/components/icons/YouTubeIcon';
import { useLanguage } from '@/components/LanguageProvider';

export default function VideosPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalVideo, setActiveModalVideo] = useState<YouTubeVideo | null>(null);
  const { t } = useLanguage();

  const filteredVideos = useMemo(() => {
    return YOUTUBE_VIDEOS.filter((v) => {
      if (selectedType !== 'all' && v.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          v.title.toLowerCase().includes(q) ||
          v.topic.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FAF9F5] text-[#0F172A] relative font-sans">
      {/* Coordinate grid accent in background */}
      <div className="absolute inset-0 math-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumb items={[{ name: 'Vidéothèque YouTube', url: '/videos' }]} />

        {/* Page Header - Editorial Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F172A]/10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] text-xs font-bold uppercase tracking-wider bg-red-50 text-[#CC0000] border border-red-200">
              <Youtube className="w-3.5 h-3.5 fill-[#CC0000]" />
              <span>{SITE_CONFIG.youtube.channelName} • Chaîne Officielle</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
              {t.videos.title}
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              {t.videos.subtitle} Des cours magistraux, des démonstrations théoriques et des résolutions pas à pas des épreuves du Bac.
            </p>
          </div>

          <a
            href={SITE_CONFIG.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-xs sm:text-sm font-bold text-white bg-[#CC0000] hover:bg-[#b00000] transition-colors shrink-0 shadow-xs"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>S&apos;abonner sur YouTube ({SITE_CONFIG.youtube.subscribersCount})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 rounded-[14px] bg-white border border-[#0F172A]/10 shadow-2xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une vidéo ou une notion (ex: limites, complexes, TVI)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-[#FAF9F5] border border-[#0F172A]/10 text-xs sm:text-sm focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-[#0F172A] placeholder-[#94A3B8]"
              />
            </div>
            <div className="text-xs text-[#64748B] shrink-0 font-medium">
              <span className="font-bold text-[#0F172A]">{filteredVideos.length}</span> vidéos disponibles
            </div>
          </div>

          {/* Video Type Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#0F172A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Catégorie :
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
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
                  selectedType === tp.id
                    ? 'bg-[#1D4ED8] text-white shadow-2xs'
                    : 'bg-[#FAF9F5] text-[#475569] border border-[#0F172A]/10 hover:border-[#1D4ED8]/40'
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-xs">
            <div className="relative w-full max-w-4xl bg-[#0A192F] rounded-[16px] overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
                <span className="font-bold text-sm sm:text-base line-clamp-1">
                  {activeModalVideo.title}
                </span>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1.5 rounded-[6px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeModalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 bg-[#0A192F] text-xs text-slate-300 flex items-center justify-between">
                <span>{activeModalVideo.topic} • Durée : {activeModalVideo.duration}</span>
                <a
                  href={`https://youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#93C5FD] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Ouvrir dans YouTube</span>
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
