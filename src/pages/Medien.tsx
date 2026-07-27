import { useState, useEffect } from 'react';
import { Play, Loader2, ExternalLink, Tv, Newspaper, Globe, Sparkles, Film } from 'lucide-react';
import { supabase, type MediaItem } from '../lib/supabase';

type MediaType = 'tv' | 'presse' | 'online';

const FALLBACK_MEDIA: MediaItem[] = [
  {
    id: 'yt-vyns5cgq8-g',
    title: 'Happy Beck Langstrasse Spezial',
    type: 'tv',
    url: 'https://youtu.be/VyNS5cGQ8-g?si=i0pLi7gTHOUFYzh9',
    description: 'Spannender Video-Beitrag über Happy Beck und das kulinarische Leben an der Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 1
  },
  {
    id: 'yt-promo-2026-1',
    title: '20 Jahre Happy Beck: Nachtschicht an der Langstrasse | ZüriNews',
    type: 'tv',
    url: 'https://youtu.be/oarO4pTkP68?si=mdBumvHa4rNb5ekB',
    description: 'Exklusiver ZüriNews Videobeitrag über das 20-jährige Jubiläum und die legendäre Nachtschicht bei Happy Beck an der Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 2
  },
  {
    id: 'yt-news-zh-1',
    title: 'News-ZH: Happy Beck Zürcher Langstrasse',
    type: 'tv',
    url: 'W6cadtvljew',
    description: 'Video-Reportage von News-ZH über die Kult-Bäckerei Happy Beck an der Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 3
  },
  {
    id: 'nzz-1',
    title: 'Der Happy Beck ist zurück an der Langstrasse',
    type: 'presse',
    url: 'https://www.nzz.ch/zuerich/yakup-aydin-haette-millionen-waschen-koennen-doch-er-baeckt-lieber-kleine-broetchen-der-happy-beck-ist-zurueck-an-der-langstrasse-ld.1722601',
    description: 'Exklusiver Porträt-Bericht in der NZZ (Neue Zürcher Zeitung) über Yakup Aydin und das Comeback von Happy Beck an der Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 4
  },
  {
    id: 'tagesanzeiger-1',
    title: 'Zürcher Happy Beck ändert Konzept',
    type: 'presse',
    url: 'https://www.tagesanzeiger.ch/zuercher-happy-beck-aendert-konzept-227165374694',
    description: 'Exklusiver Zeitungsartikel im Tages-Anzeiger über die Weiterentwicklung und das neue Konzept der Kult-Bäckerei Happy Beck in Zürich.',
    created_at: new Date().toISOString(),
    sort_order: 5
  },
  {
    id: 'limmattaler-1',
    title: '«Tschüss, Happy Beck!»: Langstrasse verliert ein Stück Geschichte',
    type: 'presse',
    url: 'https://www.limmattalerzeitung.ch/limmattal/zuerich/zuerich-tschuess-happy-beck-die-langstrasse-verliert-ein-stueck-ihrer-geschichte-ld.2268568',
    description: 'Ausführlicher Presseartikel in der Limmattaler Zeitung über das Erbe und die Bedeutung der Zürcher Kult-Bäckerei Happy Beck.',
    created_at: new Date().toISOString(),
    sort_order: 6
  },
  {
    id: 'vice-1',
    title: 'Party-Beichten aus dem Happy Beck',
    type: 'online',
    url: 'https://www.vice.com/de/article/party-beichten-aus-dem-happy-beck/',
    description: 'Kult-Reportage im VICE Magazin über die legendären Nächte und Geschichten im Happy Beck an der Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 7
  },
  {
    id: 'watson-1',
    title: '«Haben seit 7 Uhr offen» – Happy Beck stopft im Kreis 4 wieder Mäuler',
    type: 'online',
    url: 'https://www.watson.ch/zuerich/459897799-haben-seit-7-uhr-offen-happy-beck-stopft-im-kreis-4-wieder-maeuler',
    description: 'Watson.ch Online-Magazinbericht über die Wiedereröffnung und das 24h-Bistro Konzept von Happy Beck im Kreis 4.',
    created_at: new Date().toISOString(),
    sort_order: 8
  },
  {
    id: 'solothurner-1',
    title: 'Der Happy Beck hat sich aus Solothurn zurückgezogen',
    type: 'presse',
    url: 'https://www.solothurnerzeitung.ch/solothurn/stadt-solothurn/ladenwechsel-in-solothurn-die-pandemie-hat-den-happy-beck-kaputt-gemacht-der-zuercher-unternehmer-zieht-sich-aus-solothurn-zurueck-ld.2249537',
    description: 'Zeitungsbericht in der Solothurner Zeitung über die Unternehmensgeschichte und den Fokus auf den Hauptstandort Zürich.',
    created_at: new Date().toISOString(),
    sort_order: 9
  },
  {
    id: 'tgtg-1',
    title: 'Happy Beck | Too Good To Go in Zürich',
    type: 'online',
    url: 'https://www.toogoodtogo.com/de-ch/find/zurich/happybeck/bakedgoods/uberraschungspackli-109766089183564896',
    description: 'Gegen Lebensmittelverschwendung: Überraschungspäckli mit frischen Backwaren von Happy Beck über Too Good To Go retten.',
    created_at: new Date().toISOString(),
    sort_order: 10
  },
  {
    id: '20min-1',
    title: 'Zürich: «Happy Beck» kommt zurück an die Langstrasse',
    type: 'online',
    url: 'https://www.20min.ch/story/happy-beck-kommt-zurueck-an-die-langstrasse-491809176239',
    description: 'Grosser Bericht in 20 Minuten über das Comeback der Kult-Bäckerei Happy Beck an die Zürcher Langstrasse.',
    created_at: new Date().toISOString(),
    sort_order: 11
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
        // Filter out dummy/placeholder items and telezueri external items without video player
        const validDbData = (data || []).filter(
          i => i.url !== 'dQw4w9WgXcQ' && !i.title?.toLowerCase().includes('kassensturz') && !i.url?.includes('telezueri.ch')
        );

        if (validDbData && validDbData.length > 0) {
          const hasYtNew = validDbData.some(i => i.url?.includes('VyNS5cGQ8-g'));
          const hasYtPromo = validDbData.some(i => i.url?.includes('oarO4pTkP68'));
          const hasYtNews = validDbData.some(i => i.url?.includes('W6cadtvljew'));
          const hasNzz = validDbData.some(i => i.url?.includes('nzz.ch'));
          const hasTagesAnzeiger = validDbData.some(i => i.url?.includes('tagesanzeiger.ch'));
          const hasLimmattaler = validDbData.some(i => i.url?.includes('limmattalerzeitung.ch'));
          const hasVice = validDbData.some(i => i.url?.includes('vice.com'));
          const hasWatson = validDbData.some(i => i.url?.includes('watson.ch'));
          const hasSolothurner = validDbData.some(i => i.url?.includes('solothurnerzeitung.ch'));
          const hasTgtg = validDbData.some(i => i.url?.includes('toogoodtogo.com'));
          const has20Min = validDbData.some(i => i.url?.includes('20min.ch'));
          
          let updated = [...validDbData];
          if (!hasYtNew) updated = [FALLBACK_MEDIA[0], ...updated];
          if (!hasYtPromo) updated = [FALLBACK_MEDIA[1], ...updated];
          if (!hasYtNews) updated = [FALLBACK_MEDIA[2], ...updated];
          if (!hasNzz) updated = [FALLBACK_MEDIA[3], ...updated];
          if (!hasTagesAnzeiger) updated = [FALLBACK_MEDIA[4], ...updated];
          if (!hasLimmattaler) updated = [FALLBACK_MEDIA[5], ...updated];
          if (!hasVice) updated = [FALLBACK_MEDIA[6], ...updated];
          if (!hasWatson) updated = [FALLBACK_MEDIA[7], ...updated];
          if (!hasSolothurner) updated = [FALLBACK_MEDIA[8], ...updated];
          if (!hasTgtg) updated = [FALLBACK_MEDIA[9], ...updated];
          if (!has20Min) updated = [FALLBACK_MEDIA[10], ...updated];
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
                    src={`https://i.ytimg.com/vi/${
                      item.url.includes('youtu.be/')
                        ? item.url.split('youtu.be/')[1].split('?')[0]
                        : item.url.includes('watch?v=')
                        ? item.url.split('watch?v=')[1].split('&')[0]
                        : item.url
                    }/hqdefault.jpg`}
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
                <div className="p-6">
                  <h3 className="text-xl font-serif font-black text-white mb-2 line-clamp-2 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-sans text-xs leading-relaxed line-clamp-3 font-medium">
                    {item.description || 'Klicken Sie hier, um den Video-Beitrag abzuspielen.'}
                  </p>
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
                className="reveal rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 flex flex-col justify-between group hover:scale-[1.03] transition-all duration-300 relative"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  backgroundColor: currentConfig.bg 
                }}
              >
                {/* Dark Gold Animated Scanning Top Line */}
                <div className="h-[2px] w-full bg-black/20 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-[#FFBB00] animate-line-scan w-full h-full shadow-[0_0_12px_#FFBB00]" />
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                    <span 
                      className="px-3.5 py-1 rounded-full font-sans text-[10px] font-black uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: currentConfig.accent, color: '#1E293B' }}
                    >
                      {activeTab === 'presse' ? 'ZEITUNG' : 'DIGITAL MEDIEN'}
                    </span>
                    <ActiveIcon 
                      className={`w-6 h-6 ${activeTab === 'online' ? 'animate-spin' : activeTab === 'presse' ? 'animate-page-flip' : ''}`} 
                      style={{ color: currentConfig.accent, animationDuration: activeTab === 'online' ? '12s' : '2.5s' }} 
                    />
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
                src={`https://www.youtube.com/embed/${
                  activeVideoUrl.includes('youtu.be/')
                    ? activeVideoUrl.split('youtu.be/')[1].split('?')[0]
                    : activeVideoUrl.includes('watch?v=')
                    ? activeVideoUrl.split('watch?v=')[1].split('&')[0]
                    : activeVideoUrl
                }?autoplay=1`}
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
