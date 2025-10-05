import { useState } from 'react';

type AccordionItem = {
  id: string;
  title: string;
  content: JSX.Element;
};

export default function Medien() {
  const [openId, setOpenId] = useState<string | null>('tv');
  const [playingIds, setPlayingIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const items: AccordionItem[] = [
    {
      id: 'tv',
      title: 'TV Berichte',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['SEpS4LEEjzE', 'Yi7TYNtoWow', 'VyNS5cGQ8-g', 'bduOrx3_Bck'].map((id) => {
            const isPlaying = !!playingIds[id];
            return (
              <div
                key={id}
                className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative" style={{ paddingTop: '56.25%' }}>
                  {isPlaying ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      title={`YouTube video ${id}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      aria-label="Play video"
                      className="absolute inset-0 w-full h-full"
                      onClick={() => setPlayingIds((p) => ({ ...p, [id]: true }))}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                        alt="YouTube thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:bg-white shadow-xl ring-1 ring-black/5 transition transform-gpu group-hover:scale-105">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-amber-700">
                            <path d="M8 5v14l11-7z"></path>
                          </svg>
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'presse',
      title: 'Presse Berichte',
      content: (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          PDF bağlantıları buraya eklenecek.
        </div>
      ),
    },
    {
      id: 'online',
      title: 'Online News',
      content: (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          İş yerleri için linkler ve haberler buraya eklenecek.
        </div>
      ),
    },
  ];

  return (
    <div className="pt-24 pb-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-500 mb-12 text-center">
          Medien
        </h1>
          <p className="max-w-3xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed mx-auto text-center">
          In diesem Bereich teilen wir ausgewählte Medienbeiträge über <span className="font-semibold">happybeck</span>
          – von TV-Berichten über Presseartikel bis hin zu Online-News. Seit unserer Eröffnung ist viel passiert,
          und auch wenn wir nicht alle Beiträge vollständig zusammentragen können, möchten wir Ihnen hier
          einige Highlights präsentieren.
        </p>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
          {items.map((it) => (
            <div key={it.id} className="bg-white dark:bg-gray-800">
              <button
                onClick={() => toggle(it.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-expanded={openId === it.id}
              >
                <span className="font-semibold text-gray-900 dark:text-white">{it.title}</span>
                <span className="text-gray-500 dark:text-gray-400">{openId === it.id ? '-' : '+'}</span>
              </button>
              {openId === it.id && (
                <div className="px-5 pb-5 text-gray-800 dark:text-gray-200">
                  {it.content}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}


