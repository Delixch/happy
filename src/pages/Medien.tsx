import { useState, useEffect } from 'react';
import { ChevronDown, Play, Loader2 } from 'lucide-react';
import { supabase, type MediaItem } from '../lib/supabase';

type MediaType = 'tv' | 'presse' | 'online';

export default function Medien() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openType, setOpenType] = useState<MediaType>('tv');
  const [playingIds, setPlayingIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase
      .from('media_items')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setItems(data);
        setLoading(false);
      });
  }, []);

  const toggle = (type: MediaType) => setOpenType((prev) => (prev === type ? type : type));

  const typeLabels: Record<MediaType, string> = { tv: 'TV Berichte', presse: 'Presse Berichte', online: 'Online News' };
  const types: MediaType[] = ['tv', 'presse', 'online'];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/default-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/60 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Presse & Berichte
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
              Medien
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <p className="text-white/50 font-sans text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          In diesem Bereich teilen wir ausgewählte Medienbeiträge über{' '}
          <span className="text-gold-400 font-semibold">happybeck</span>{' '}
          – von TV-Berichten über Presseartikel bis hin zu Online-News.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {types.map((type) => {
              const typeItems = items.filter((i) => i.type === type);
              return (
                <div key={type} className="glass-card overflow-hidden">
                  <button
                    onClick={() => toggle(type)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                    aria-expanded={openType === type}
                  >
                    <span className="font-serif text-lg font-semibold text-white">
                      {typeLabels[type]} ({typeItems.length})
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gold-400 transition-transform duration-300 ${
                      openType === type ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`transition-all duration-500 overflow-hidden ${
                    openType === type ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      {typeItems.length === 0 ? (
                        <div className="text-sm text-white/40 font-sans p-6 glass-card-light text-center">
                          Beiträge werden in Kürze hier veröffentlicht.
                        </div>
                      ) : type === 'tv' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {typeItems.map((item) => {
                            const isPlaying = !!playingIds[item.id];
                            return (
                              <div
                                key={item.id}
                                className="group rounded-xl overflow-hidden border border-white/5 bg-dark-500 transition-all duration-300 hover:-translate-y-1 hover:glow-gold"
                              >
                                <div className="relative" style={{ paddingTop: '56.25%' }}>
                                  {isPlaying ? (
                                    <iframe
                                      className="absolute inset-0 w-full h-full border-0"
                                      src={`https://www.youtube.com/embed/${item.url}?autoplay=1`}
                                      title={item.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                    />
                                  ) : (
                                    <button
                                      type="button"
                                      aria-label="Video abspielen"
                                      className="absolute inset-0 w-full h-full"
                                      onClick={() => setPlayingIds((p) => ({ ...p, [item.id]: true }))}
                                    >
                                      <img
                                        src={`https://i.ytimg.com/vi/${item.url}/hqdefault.jpg`}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-dark-700/70 via-transparent to-transparent" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-dark-700/80 border border-gold-400/30 group-hover:border-gold-400/60 group-hover:bg-gold-400/10 shadow-xl transition-all duration-300 group-hover:scale-110">
                                          <Play className="w-6 h-6 text-gold-400 ml-0.5" fill="currentColor" />
                                        </span>
                                      </div>
                                      <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white/80 font-sans text-sm font-medium truncate">{item.title}</p>
                                      </div>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {typeItems.map((item) => (
                            <div key={item.id} className="glass-card-light p-4 flex items-center gap-4">
                              <div className="flex-1">
                                <p className="text-white font-sans text-sm font-medium">{item.title}</p>
                                {item.description && <p className="text-white/30 font-sans text-xs mt-1">{item.description}</p>}
                              </div>
                              {item.url && (
                                <a href={item.url} target="_blank" rel="noreferrer" className="btn-gold-outline text-xs px-3 py-1.5">
                                  Öffnen
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
