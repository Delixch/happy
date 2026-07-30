import { useEffect, useRef, useState } from 'react';
import { Play, Loader2, ExternalLink, Tv, Newspaper, Globe, Sparkles, ChevronDown, type LucideIcon } from 'lucide-react';
import { supabase, type MediaItem } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

type MediaType = 'tv' | 'presse' | 'online';

function getYoutubeThumbId(url: string | null): string {
  if (!url) return '';
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
  if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
  return url;
}

function getHostname(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

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

// Same color system as the Speisekarte (Menu.tsx): each category gets a
// bg → bg2 gradient for its button/panel, and every category shares the
// same gold accent for badges, pills and highlights.
const CATEGORY_META: Record<MediaType, { label: string; Icon: LucideIcon; intro: string; bg: string; bg2: string; accent: string }> = {
  tv: {
    label: 'TV Berichte',
    Icon: Tv,
    intro: 'Reportagen und Videobeiträge über Happy Beck im Fernsehen.',
    bg: '#7C2D12',
    bg2: '#431407',
    accent: '#FFBB00'
  },
  presse: {
    label: 'Presse',
    Icon: Newspaper,
    intro: 'Porträts und Artikel aus Zeitungen und Magazinen.',
    bg: '#431407',
    bg2: '#1F0900',
    accent: '#FFBB00'
  },
  online: {
    label: 'Online News',
    Icon: Globe,
    intro: 'Beiträge und Berichte von Online-Magazinen und Portalen.',
    bg: '#9A3412',
    bg2: '#7C2D12',
    accent: '#FFBB00'
  },
};

const CATEGORIES: MediaType[] = ['tv', 'presse', 'online'];

export default function Medien() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<MediaType | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const mobileCatRefs = useRef<Partial<Record<MediaType, HTMLDivElement | null>>>({});

  const selectMobileCategory = (catId: MediaType, isActive: boolean) => {
    const opening = !isActive;
    setActive(isActive ? null : catId);
    if (opening) {
      requestAnimationFrame(() => {
        mobileCatRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

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

  return (
    <section className="pt-14 md:pt-16 min-h-screen bg-warm-yellow pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785404003/resmi_harketlendir_video_gibi_f3beop.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E293B] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Medien & Pressezentrum
            </span>
            <div className="relative inline-block block">
              <h1 className="text-2xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md whitespace-nowrap">
                Happy Beck in den <span className="text-[#FFBB00] [-webkit-text-stroke:1px_#1E293B]" style={{ paintOrder: 'stroke fill' }}>Medien</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="max-w-6xl mx-auto">

          {/* ── DESKTOP: video | menu | title in one row, shared content panel below ── */}
          <div className="hidden lg:block">
            <div className="mb-10 flex flex-row items-stretch justify-center gap-10">
              <video
                src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785432305/6_xbsfpy.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-80 h-auto rounded-3xl object-cover shadow-2xl border-2 border-[#FFBB00]/30 flex-shrink-0"
              />
              <div className="flex flex-col gap-3 w-full max-w-sm pt-2">
                {CATEGORIES.map((catId) => {
                  const m = CATEGORY_META[catId];
                  const count = items.filter((i) => i.type === catId).length;
                  const isActive = active === catId;
                  return (
                    <button
                      key={catId}
                      onClick={() => setActive(isActive ? null : catId)}
                      className={`relative w-full px-5 py-4 rounded-2xl font-sans font-black text-sm uppercase tracking-wider flex items-center justify-between gap-3 cursor-pointer text-white overflow-hidden shadow-xl transition-all duration-300 ${isActive ? 'ring-2 ring-[#FFBB00] scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
                      style={{ background: `linear-gradient(135deg, ${m.bg} 0%, ${m.bg2} 100%)` }}
                    >
                      <m.Icon className="absolute -right-2 -bottom-3 w-16 h-16 opacity-10 pointer-events-none rotate-[-12deg]" />
                      <span className="relative z-10 flex items-center gap-3">
                        <span
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                          style={{ backgroundColor: m.accent, color: m.bg2 }}
                        >
                          <m.Icon className="w-4 h-4" />
                        </span>
                        <span className="flex flex-col items-start">
                          <span>{m.label}</span>
                          {count > 0 && <span className="text-[10px] font-mono font-normal normal-case tracking-normal opacity-70">{count} Beiträge</span>}
                        </span>
                      </span>
                      <ChevronDown className="relative z-10 w-5 h-5 transition-transform duration-300" style={{ transform: isActive ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  );
                })}
              </div>
              <div className="text-left pt-2 max-w-sm">
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1E293B] mb-3">
                  Happy Beck <span className="text-[#C2410C]">in der Presse</span>
                </h2>
                <p className="text-[#1E293B]/80 font-sans font-bold text-sm md:text-base leading-relaxed">
                  Von TV-Reportagen bis Zeitungsartikel – hier finden Sie eine Auswahl der Medienbeiträge über Happy Beck. Wählen Sie eine Kategorie, um alle Beiträge zu sehen.
                </p>
              </div>
            </div>

            {active && (
              <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: CATEGORY_META[active].bg2 }}>
                <CategoryContent catId={active} items={items} loading={loading} onPlay={setActiveVideoUrl} />
              </div>
            )}
          </div>

          {/* ── MOBILE/TABLET: video, title, then accordion — content opens directly under the tapped category ── */}
          <div className="lg:hidden">
            <video
              src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785432305/6_xbsfpy.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 rounded-3xl object-cover shadow-2xl border-2 border-[#FFBB00]/30 mb-6"
            />
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-black text-[#1E293B] mb-3">
                Happy Beck <span className="text-[#C2410C]">in der Presse</span>
              </h2>
              <p className="text-[#1E293B]/80 font-sans font-bold text-sm leading-relaxed">
                Von TV-Reportagen bis Zeitungsartikel – hier finden Sie eine Auswahl der Medienbeiträge über Happy Beck.
              </p>
            </div>

            <div className="space-y-4">
              {CATEGORIES.map((catId) => {
                const m = CATEGORY_META[catId];
                const count = items.filter((i) => i.type === catId).length;
                const isActive = active === catId;
                return (
                  <div
                    key={catId}
                    ref={(el) => { mobileCatRefs.current[catId] = el; }}
                    className={`scroll-mt-20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${isActive ? 'ring-2 ring-[#FFBB00] shadow-2xl' : ''}`}
                  >
                    <button
                      onClick={() => selectMobileCategory(catId, isActive)}
                      className="relative w-full px-5 py-5 font-sans font-black text-base uppercase tracking-wider flex items-center justify-between gap-3 cursor-pointer text-white overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${m.bg} 0%, ${m.bg2} 100%)` }}
                    >
                      <m.Icon className="absolute -right-3 -bottom-4 w-24 h-24 opacity-10 pointer-events-none rotate-[-12deg]" />
                      <span className="relative z-10 flex items-center gap-3">
                        <span
                          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                          style={{ backgroundColor: m.accent, color: m.bg2 }}
                        >
                          <m.Icon className="w-5 h-5" />
                        </span>
                        <span className="flex flex-col items-start">
                          <span>{m.label}</span>
                          {count > 0 && <span className="text-[10px] font-mono font-normal normal-case tracking-normal opacity-70">{count} Beiträge</span>}
                        </span>
                      </span>
                      <ChevronDown className="relative z-10 w-6 h-6 transition-transform duration-300" style={{ transform: isActive ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <div className={`transition-all duration-300 ${isActive ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="p-4" style={{ backgroundColor: m.bg2 }}>
                        <CategoryContent catId={catId} items={items} loading={loading} onPlay={setActiveVideoUrl} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
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
    </section>
  );
}

function CategoryContent({
  catId,
  items,
  loading,
  onPlay,
}: {
  catId: MediaType;
  items: MediaItem[];
  loading: boolean;
  onPlay: (url: string | null) => void;
}) {
  const meta = CATEGORY_META[catId];
  const filtered = items.filter((i) => i.type === catId);

  return (
    <div>
      {/* Category Intro */}
      <div className="text-center mb-10">
        <p className="text-white/90 font-sans font-bold text-base md:text-lg max-w-xl mx-auto">
          {meta.intro}
        </p>
      </div>

      {/* Media Items Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#FFBB00] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="p-16 rounded-3xl text-center text-white/90 font-sans text-lg font-medium shadow-2xl max-w-2xl mx-auto border border-[#FFBB00]/20 backdrop-blur-xl"
          style={{ backgroundColor: `${meta.bg}D9` }}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" style={{ color: meta.accent }} />
          In dieser Kategorie wurden noch keine Medienbeiträge veröffentlicht.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => {
            const isTv = item.type === 'tv';
            const hostname = !isTv ? getHostname(item.url) : null;

            return (
              <div
                key={item.id}
                onClick={isTv ? () => onPlay(item.url) : undefined}
                className={`relative rounded-3xl p-6 border border-[#FFBB00]/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:glow-gold flex flex-col justify-between gap-4 overflow-hidden min-h-[220px] shadow-xl ${isTv ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: `${meta.bg}D9` }}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    {/* Top Row: Circular Number & Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-9 h-9 rounded-full font-sans font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md"
                        style={{ backgroundColor: meta.accent, color: '#1E293B' }}
                      >
                        {idx + 1}
                      </span>
                      <h3 className="text-xl font-serif font-black text-gold-gradient leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs md:text-sm text-white/85 font-sans leading-relaxed line-clamp-3 font-medium">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right Column: TV Thumbnail (If present) */}
                  {isTv && (
                    <div className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden rounded-2xl border border-white/10 shadow-lg group">
                      <img
                        src={`https://i.ytimg.com/vi/${getYoutubeThumbId(item.url)}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                          style={{ backgroundColor: meta.accent, color: '#1E293B' }}
                        >
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Row */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  {isTv ? (
                    <span
                      className="font-sans font-black text-sm px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5"
                      style={{ backgroundColor: meta.accent, color: '#1E293B' }}
                    >
                      <Play className="w-3 h-3 fill-current" /> Ansehen
                    </span>
                  ) : (
                    item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-sans font-black text-sm px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5"
                        style={{ backgroundColor: meta.accent, color: '#1E293B' }}
                      >
                        Öffnen <ExternalLink className="w-3 h-3" />
                      </a>
                    )
                  )}
                  <span className="text-white/60 font-sans text-xs uppercase tracking-wider font-extrabold">
                    {hostname || 'HAPPY BECK'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
