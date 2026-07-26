import { useEffect, useState } from 'react';
import { Coffee, UtensilsCrossed, Sandwich as SandwichIcon, IceCream, CupSoda, Loader2, Sparkles } from 'lucide-react';
import { supabase, type MenuItem, type MenuCategory } from '../lib/supabase';

const CATEGORY_META: Record<MenuCategory, { label: string; icon: React.ReactNode; intro: string; bg: string; accent: string }> = {
  fruehstueck: { 
    label: 'Frühstück', 
    icon: <Coffee className="w-5 h-5" />, 
    intro: 'Starten Sie glücklich in den Tag – frisch & fein.',
    bg: '#1E293B',
    accent: '#F59E0B'
  },
  salziges: { 
    label: 'Salziges', 
    icon: <UtensilsCrossed className="w-5 h-5" />, 
    intro: 'Herzhafte Snacks und kleine Speisen – perfekt für zwischendurch.',
    bg: '#0F766E',
    accent: '#FFD700'
  },
  sandwich: { 
    label: 'Sandwiches', 
    icon: <SandwichIcon className="w-5 h-5" />, 
    intro: 'Herzhaft, frisch belegt – perfekt für unterwegs.',
    bg: '#78350F',
    accent: '#FFAE33'
  },
  suess: { 
    label: 'Süsses', 
    icon: <IceCream className="w-5 h-5" />, 
    intro: 'Feine Pâtisserie – hausgemacht mit Liebe.',
    bg: '#881337',
    accent: '#FDE047'
  },
  getraenke: { 
    label: 'Getränke', 
    icon: <CupSoda className="w-5 h-5" />, 
    intro: 'Heiss & kalt – erfrischend oder belebend.',
    bg: '#312E81',
    accent: '#38BDF8'
  },
};

const CATEGORIES: MenuCategory[] = ['fruehstueck', 'getraenke', 'salziges', 'sandwich', 'suess'];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<MenuCategory>('fruehstueck');

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setItems(data);
        setLoading(false);
      });
  }, []);

  const filtered = items.filter((i) => i.category === active);
  const meta = CATEGORY_META[active];

  return (
    <section id="menu" className="pt-16 min-h-screen bg-[#FFBB00] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center brightness-90" style={{ backgroundImage: "url('/menu-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E293B] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Ofenfrisch & Hausgemacht
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unsere <span className="text-[#FFBB00] underline decoration-[#1E293B]">Speisekarte</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        {/* Category Tabs - All 5 Buttons in 1 Row */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 mb-12 justify-center items-center">
          {CATEGORIES.map((catId) => {
            const m = CATEGORY_META[catId];
            const count = items.filter((i) => i.category === catId).length;
            const isActive = active === catId;
            return (
              <button
                key={catId}
                onClick={() => setActive(catId)}
                className={`px-7 py-4 rounded-2xl font-sans font-black text-sm md:text-base uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 ${
                  isActive
                    ? 'scale-105 border-2 border-white/40 ring-4 ring-black/20 text-white'
                    : 'opacity-75 hover:opacity-100 text-white'
                }`}
                style={{ backgroundColor: m.bg }}
              >
                <span style={{ color: m.accent }}>{m.icon}</span>
                <span>{m.label}</span>
                {count > 0 && <span className="text-xs opacity-80 font-mono">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Category Subtitle */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-white mb-3 shadow-xl border border-white/10"
            style={{ backgroundColor: meta.bg }}
          >
            <span style={{ color: meta.accent }}>{meta.icon}</span>
            <span className="font-sans text-xs font-black uppercase tracking-widest">{meta.label}</span>
          </div>
          <p className="text-[#1E293B] font-sans font-bold text-base md:text-lg max-w-xl mx-auto">
            {meta.intro}
          </p>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1E293B] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div 
            className="p-16 rounded-3xl text-center text-white/90 font-sans text-lg font-medium shadow-2xl max-w-2xl mx-auto border-2 border-white/20"
            style={{ backgroundColor: meta.bg }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" style={{ color: meta.accent }} />
            In dieser Kategorie wurden noch keine Speisen veröffentlicht.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="relative rounded-3xl p-6 border-2 border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex justify-between gap-4 overflow-hidden min-h-[220px] shadow-xl flex-col justify-between"
                style={{ backgroundColor: meta.bg }}
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
                      <h3 className="text-xl font-serif font-black text-white leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs md:text-sm text-white/85 font-sans leading-relaxed line-clamp-3 font-medium">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Image (If present) */}
                  {item.image_url && (
                    <div className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Price Tag */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span 
                    className="font-sans font-black text-sm px-5 py-2 rounded-full shadow-lg"
                    style={{ backgroundColor: meta.accent, color: '#1E293B' }}
                  >
                    {item.price}
                  </span>
                  <span className="text-white/60 font-sans text-xs uppercase tracking-wider font-extrabold">
                    HAPPY BECK
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
