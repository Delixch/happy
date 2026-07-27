import { useState, useEffect } from 'react';
import { Play, Loader2, ExternalLink, Tv, Newspaper, Globe, Sparkles, Film } from 'lucide-react';
import { supabase, type MediaItem } from '../lib/supabase';

type MediaType = 'tv' | 'presse' | 'online';

const FALLBACK_MEDIA: MediaItem[] = [
  {
    id: 'telezueri-1',
    title: '20 Jahre Happy Beck: Nachtschicht an der Langstrasse',
    type: 'tv',
    url: 'https://www.telezueri.ch/zuerinews/20-jahre-happy-beck-nachtschicht-an-der-langstrasse-162235856',
    description: 'Exklusiver Videobeitrag von TeleZüri über das 20-jährige Jubiläum und die legendäre Nachtschicht bei Happy Beck an der Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 1
  },
  {
    id: 'telezueri-2',
    title: '«Happy Beck» an der Langstrasse schliesst',
    type: 'tv',
    url: 'https://www.telezueri.ch/zuerinews/happy-beck-an-der-langstrasse-schliesst-145244292',
    description: 'TeleZüri TV-Bericht über die historische Bäckerei Happy Beck und die Geschichte des Standorts an der Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 2
  },
  {
    id: '20min-1',
    title: 'Zürich: «Happy Beck» kommt zurück an die Langstrasse',
    type: 'online',
    url: 'https://www.20min.ch/story/happy-beck-kommt-zurueck-an-die-langstrasse-491809176239',
    description: 'Grosser Bericht in 20 Minuten über das Comeback der Kult-Bäckerei Happy Beck an die Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 3
  }
];

export default function Medien() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<MediaType>('tv');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('media_items')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const hasTele1 = data.some(i => i.url?.includes('162235856'));
          const hasTele2 = data.some(i => i.url?.includes('145244292'));
          const has20Min = data.some(i => i.url?.includes('20min.ch'));
          
          let updated = [...data];
          if (!hasTele1) updated = [FALLBACK_MEDIA[0], ...updated];
          if (!hasTele2) updated = [FALLBACK_MEDIA[1], ...updated];
          if (!has20Min) updated = [FALLBACK_MEDIA[2], ...updated];
          setItems(updated);
        } else {
          setItems(FALLBACK_MEDIA);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, activeTab]);

  const activeItems = items.filter((i) => i.type === activeTab);

  const categoryConfig: Record<MediaType, { title: string; subtitle: string; icon: any; bg: string; accent: string; text: string }> = {
    tv: {
      title: 'TV & Video Berichte',
      subtitle: 'Happy Beck in Fernsehbeiträgen und exklusiven Interviews',
      icon: Tv,
      bg: '#1E293B',
      accent: '#F59E0B',
      text: '#FFFFFF'
    },
    presse: {
      title: 'Presse & Zeitungsartikel',
      subtitle: 'Zeitungsberichte und Magazinbeiträge über unsere Bäckerei',
      icon: Newspaper,
      bg: '#0F766E',
      accent: '#FFD700',
      text: '#FFFFFF'
    },
    online: {
      title: 'Online News & Webportale',
      subtitle: 'Berichte in digitalen Medien und Online-Magazinen',
      icon: Globe,
      bg: '#312E81',
      accent: '#38BDF8',
      text: '#FFFFFF'
    },
  };

  const currentConfig = categoryConfig[activeTab];
  const ActiveIcon = currentConfig.icon;

  return (
    <div className="pt-16 min-h-screen bg-[#FFBB00] pb-24">
      {/* ─── HERO HEADER ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center brightness-90" style={{ backgroundImage: "url('/default-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E293B] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Medien & Pressezentrum
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Happy Beck <span className="text-[#FFBB00] underline decoration-[#1E293B]">in den Medien</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">

        {/* ─── SHOWROOM CATEGORY TAB SELECTOR ─── */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 reveal">
          {[
            { id: 'tv', label: 'TV Berichte', count: items.filter(i => i.type === 'tv').length, icon: Tv, bg: '#1E293B', accent: '#F59E0B' },
            { id: 'presse', label: 'Presse Berichte', count: items.filter(i => i.type === 'presse').length, icon: Newspaper, bg: '#0F766E', accent: '#FFD700' },
            { id: 'online', label: 'Online News', count: items.filter(i => i.type === 'online').length, icon: Globe, bg: '#312E81', accent: '#38BDF8' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as MediaType)}
                className={`px-8 py-4 rounded-2xl font-sans font-black text-sm md:text-base uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 ${
                  isActive
                    ? 'scale-105 border-2 border-white/40 ring-4 ring-black/20 text-white'
                    : 'opacity-70 hover:opacity-100 text-white'
                }`}
                style={{ backgroundColor: tab.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: tab.accent }} />
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* ─── SECTION TITLE & DESCRIPTION ─── */}
        <div className="text-center mb-12 reveal">
          <div 
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-white mb-3 shadow-xl border border-white/10"
            style={{ backgroundColor: currentConfig.bg }}
          >
            <ActiveIcon className="w-5 h-5" style={{ color: currentConfig.accent }} />
            <span className="font-sans text-xs font-black uppercase tracking-widest">{currentConfig.title}</span>
          </div>
          <p className="text-[#1E293B] font-sans font-bold text-base md:text-lg max-w-xl mx-auto">
            {currentConfig.subtitle}
          </p>
        </div>

        {/* ─── SHOWROOM GRID CONTENT ─── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1E293B] animate-spin" />
          </div>
        ) : activeItems.length === 0 ? (
          <div 
            className="p-16 rounded-3xl text-center text-white/90 font-sans text-lg font-medium shadow-2xl max-w-2xl mx-auto border-2 border-white/20"
            style={{ backgroundColor: currentConfig.bg }}
          >
            <Film className="w-12 h-12 mx-auto mb-4 opacity-80" style={{ color: currentConfig.accent }} />
            In dieser Kategorie wurden noch keine Medienbeiträge veröffentlicht.
          </div>
        ) : activeTab === 'tv' ? (
          /* TV SHOWROOM GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeItems.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setActiveVideoUrl(item.url)}
                className="reveal rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group cursor-pointer hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  backgroundColor: currentConfig.bg 
                }}
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${item.url}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform font-bold"
                      style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                    >
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </span>
                  </div>
                  <span 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                  >
                    TV BEITRAG
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-black text-white mb-2 line-clamp-2 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/80 font-sans text-xs leading-relaxed line-clamp-3 font-medium mb-4">
                      {item.description || 'Klicken Sie hier, um den Video-Beitrag abzuspielen.'}
                    </p>
                  </div>
                  {item.url && item.url.startsWith('http') && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 w-full py-3 rounded-2xl font-sans font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl hover:bg-white transition-colors"
                      style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                    >
                      TeleZüri Video öffnen <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* PRESSE & ONLINE NEWS SHOWROOM GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeItems.map((item, i) => (
              <div
                key={item.id}
                className="reveal rounded-3xl p-7 shadow-2xl border-2 border-white/20 flex flex-col justify-between group hover:scale-[1.03] transition-all duration-300"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  backgroundColor: currentConfig.bg 
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span 
                      className="px-3.5 py-1 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                    >
                      {activeTab === 'presse' ? 'ZEITUNG' : 'DIGITAL MEDIEN'}
                    </span>
                    <ActiveIcon className="w-6 h-6" style={{ color: currentConfig.accent }} />
                  </div>
                  <h3 className="text-xl font-serif font-black text-white mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-white/85 font-sans text-sm leading-relaxed line-clamp-4 font-medium">
                    {item.description || 'Presseartikel und Details zum Beitrag.'}
                  </p>
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 w-full py-3.5 rounded-2xl font-sans font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl hover:bg-white transition-colors"
                    style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                  >
                    Beitrag öffnen <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ─── VIDEO POPUP CINEMA MODAL ─── */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFBB00]">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFBB00] text-[#1E293B] font-bold flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg"
            >
              ✕
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1`}
                title="Video Oynatıcı"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
