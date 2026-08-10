import { useEffect, useState } from 'react';
import { Play, ExternalLink, Tv, Newspaper, Globe, Loader2, type LucideIcon } from 'lucide-react';
import { supabase, type MediaItem } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';

type MediaType = 'tv' | 'presse' | 'online';
type FilterType = MediaType | 'all';

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

const CATEGORY_META: Record<MediaType, { label: string; Icon: LucideIcon; accent: string }> = {
  tv: { label: 'TV', Icon: Tv, accent: '#FFFFCC' },
  presse: { label: 'Presse', Icon: Newspaper, accent: '#FFFFCC' },
  online: { label: 'Online', Icon: Globe, accent: '#FFFFCC' },
};

const FILTERS: { id: FilterType; label: string; Icon?: LucideIcon }[] = [
  { id: 'all', label: 'Alles' },
  { id: 'tv', label: 'TV', Icon: Tv },
  { id: 'presse', label: 'Presse', Icon: Newspaper },
  { id: 'online', label: 'Online', Icon: Globe },
];

export default function Medien() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('media_items')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
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

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <section className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/f_auto,q_auto/v1785404003/resmi_harketlendir_video_gibi_f3beop.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              20 Jahre Happy Beck
            </span>
            <div className="relative inline-block block">
              <h1 className="text-2xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md whitespace-nowrap">
                Unsere Reise durch die <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Medien</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1A1A00] mb-3">
            Happy Beck <span className="text-[#2C2C00]">in der Presse</span>
          </h2>
          <p className="text-[#1E293B]/80 font-sans font-bold text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            TV-Reportagen, Zeitungsartikel und Online-Beiträge — eine Auswahl der Stationen unserer Geschichte an der Langstrasse.
          </p>
        </Reveal>

        {/* Filter chips */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full font-sans font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'bg-[#1A1A00] text-[#FFFFCC] shadow-md scale-105' : 'bg-[#1A1A00]/5 text-[#1A1A00]/60 hover:bg-[#1A1A00]/10'
                }`}
              >
                {f.Icon && <f.Icon className="w-3.5 h-3.5" />}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 rounded-3xl text-center text-[#1A1A00] font-sans font-medium bg-[#1A1A00]/5">
            In dieser Kategorie wurden noch keine Medienbeiträge veröffentlicht.
          </div>
        ) : (
          <RevealGroup key={filter} stagger={0.08}>
            {filtered.map((item, idx) => {
              const meta = CATEGORY_META[item.type];
              const isTv = item.type === 'tv';
              const hostname = !isTv ? getHostname(item.url) : null;
              const isLast = idx === filtered.length - 1;

              // Alternate filled and outlined down the timeline so it does not
              // read as one long wall of identical blocks.
              const outline = idx % 2 === 1;
              // Only the newest entry pulses. Twelve blinking dots would be noise;
              // one means something.
              const isNewest = idx === 0;

              return (
                <RevealItem key={item.id}>
                <div className={`relative pl-16 ${isLast ? '' : 'pb-8'}`}>
                  {!isLast && (
                    <div className="absolute left-5 top-11 bottom-0 w-0.5 bg-[#1A1A00]/10" />
                  )}
                  <div
                    className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-[#FFFFCC] z-10"
                    style={{ backgroundColor: '#1A1A00' }}
                  >
                    {isNewest && (
                      <span className="absolute inset-0 rounded-full border-2 border-[#1A1A00] animate-ping opacity-60 motion-reduce:hidden" />
                    )}
                    <meta.Icon className="relative w-4 h-4" style={{ color: meta.accent }} />
                  </div>

                  <div
                    onClick={isTv ? () => setActiveVideoUrl(item.url) : undefined}
                    className={`rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 flex gap-4 ${
                      outline
                        ? 'border-[#1A1A00]/30 hover:border-[#1A1A00]/55'
                        : 'bg-[#1A1A00] border-white/10 shadow-lg hover:shadow-xl'
                    } ${isTv ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-[10px] font-sans font-black uppercase tracking-widest ${
                          outline ? 'text-[#1A1A00]/70' : 'text-[#FFFFCC]/60'
                        }`}
                      >
                        {meta.label}
                      </span>
                      <h3
                        className={`text-base md:text-lg font-serif font-black leading-snug mt-1 mb-2 line-clamp-2 ${
                          outline ? 'text-[#1A1A00]' : 'text-[#FFFFCC]'
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p
                          className={`text-xs md:text-sm font-sans leading-relaxed line-clamp-2 mb-3 ${
                            outline ? 'text-[#1A1A00]' : 'text-white/75'
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                      {isTv ? (
                        <span
                          className={`inline-flex items-center gap-1.5 font-sans font-black text-xs uppercase tracking-wider ${
                            outline ? 'text-[#1A1A00]' : 'text-[#FFFFCC]'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" /> Ansehen
                        </span>
                      ) : (
                        item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1.5 font-sans font-black text-xs uppercase tracking-wider hover:underline ${
                              outline ? 'text-[#1A1A00]' : 'text-[#FFFFCC]'
                            }`}
                          >
                            {hostname || 'Öffnen'} <ExternalLink className="w-3 h-3" />
                          </a>
                        )
                      )}
                    </div>

                    {isTv && (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative overflow-hidden rounded-xl border border-white/10 shadow-md">
                        <img
                          src={`https://i.ytimg.com/vi/${getYoutubeThumbId(item.url)}/hqdefault.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="w-7 h-7 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#FFFFCC', color: '#1A1A00' }}>
                            <Play className="w-3 h-3 ml-0.5 fill-current" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
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
    </section>
  );
}
