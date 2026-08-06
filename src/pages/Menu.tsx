import { useEffect, useRef, useState } from 'react';
import { Coffee, UtensilsCrossed, Sandwich as SandwichIcon, IceCream, CupSoda, Loader2, Sparkles, ChevronDown, Leaf, Pizza as PizzaIcon, Utensils, type LucideIcon } from 'lucide-react';
import { supabase, type MenuItem, type MenuCategory } from '../lib/supabase';
import MarqueeTicker from '../components/MarqueeTicker';
import TiltCard from '../components/TiltCard';

const CATEGORY_META: Record<MenuCategory, { label: string; Icon: LucideIcon; intro: string; bg: string; bg2: string; accent: string }> = {
  fruehstueck: {
    label: 'Frühstück',
    Icon: Coffee,
    intro: 'Starten Sie glücklich in den Tag – frisch & fein.',
    bg: '#1A1A00',
    bg2: '#0D0D00',
    accent: '#FFFFCC'
  },
  getraenke: {
    label: 'Getränke',
    Icon: CupSoda,
    intro: 'Heiss & kalt – erfrischend oder belebend.',
    bg: '#232300',
    bg2: '#121200',
    accent: '#FFFFCC'
  },
  salziges: {
    label: 'Salziges',
    Icon: UtensilsCrossed,
    intro: 'Herzhafte Snacks und kleine Speisen – perfekt für zwischendurch.',
    bg: '#2C2C00',
    bg2: '#1A1A00',
    accent: '#FFFFCC'
  },
  sandwich: {
    label: 'Sandwiches',
    Icon: SandwichIcon,
    intro: 'Herzhaft, frisch belegt – perfekt für unterwegs.',
    bg: '#353500',
    bg2: '#232300',
    accent: '#FFFFCC'
  },
  suess: {
    label: 'Süsses',
    Icon: IceCream,
    intro: 'Feine Pâtisserie – hausgemacht mit Liebe.',
    bg: '#3D3D00',
    bg2: '#2C2C00',
    accent: '#FFFFCC'
  },
  pizza: {
    label: 'Pizza',
    Icon: PizzaIcon,
    intro: 'Frisch aus dem Ofen – klassisch bis kreativ.',
    bg: '#454500',
    bg2: '#353500',
    accent: '#FFFFCC'
  },
  gerichte: {
    label: 'Hauptgerichte',
    Icon: Utensils,
    intro: 'Herzhafte Teller – für den grossen Hunger.',
    bg: '#4E4E00',
    bg2: '#3D3D00',
    accent: '#FFFFCC'
  },
};

const CATEGORIES: MenuCategory[] = ['fruehstueck', 'gerichte', 'pizza', 'sandwich', 'salziges', 'suess', 'getraenke'];

type DietFilter = 'all' | 'vegetarisch';

const DIET_FILTERS: { id: DietFilter; label: string }[] = [
  { id: 'all', label: 'Alles' },
  { id: 'vegetarisch', label: 'Vegetarisch' },
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<MenuCategory | null>(null);
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const mobileCatRefs = useRef<Partial<Record<MenuCategory, HTMLDivElement | null>>>({});

  const selectMobileCategory = (catId: MenuCategory, isActive: boolean) => {
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
      .from('menu_items')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="menu" className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center brightness-90" style={{ backgroundImage: "url('/menu-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Frisch & Hausgemacht
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unsere <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Speisekarte</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <MarqueeTicker
        items={[
          { text: '🥐 Täglich frisch aus dem Ofen!', emphasis: true },
          { text: '🥪 Von Frühstück bis Sandwich – für jeden Geschmack.' },
          { text: '✨ Jetzt bestellen bei Uber Eats & Just Eat.' },
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="max-w-6xl mx-auto">

          {/* ── DIET FILTER ── */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {DIET_FILTERS.map((f) => {
              const isActive = dietFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setDietFilter(f.id)}
                  className={`px-4 py-2 rounded-full font-sans font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive ? 'bg-[#1A1A00] text-[#FFFFCC] shadow-md scale-105' : 'bg-[#1A1A00]/5 text-[#1A1A00]/60 hover:bg-[#1A1A00]/10'
                  }`}
                >
                  {f.id !== 'all' && <Leaf className="w-3.5 h-3.5" />}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* ── DESKTOP: video | menu | title in one row, shared content panel below ── */}
          <div className="hidden lg:block">
            <div className="mb-10 flex flex-row items-stretch justify-center gap-10">
              <video
                src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785332690/HAPPY_OMLETT_VIDEO_xgh4nn.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-80 h-auto rounded-3xl object-cover shadow-2xl border-2 border-[#FFBB00]/30 flex-shrink-0"
              />
              <div className="flex flex-col gap-3 w-full max-w-sm pt-2">
                {CATEGORIES.map((catId) => {
                  const m = CATEGORY_META[catId];
                  const count = items.filter((i) => i.category === catId).length;
                  const isActive = active === catId;
                  return (
                    <button
                      key={catId}
                      onClick={() => setActive(isActive ? null : catId)}
                      className={`relative w-full px-5 py-4 rounded-2xl font-sans font-black text-sm uppercase tracking-wider flex items-center justify-between gap-3 cursor-pointer text-white overflow-hidden shadow-xl transition-all duration-300 ${isActive ? 'ring-2 ring-[#FFFFCC] scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
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
                          {count > 0 && <span className="text-[10px] font-mono font-normal normal-case tracking-normal opacity-70">{count} Artikel</span>}
                        </span>
                      </span>
                      <ChevronDown className="relative z-10 w-5 h-5 transition-transform duration-300" style={{ transform: isActive ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  );
                })}
              </div>
              <div className="text-left pt-2 max-w-sm">
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1A1A00] mb-3">
                  Unsere <span className="text-[#2C2C00]">Bestseller</span>
                </h2>
                <p className="text-[#1E293B]/80 font-sans font-bold text-sm md:text-base leading-relaxed">
                  Hier finden Sie eine Auswahl unserer meistverkauften Produkte. Möchten Sie unser komplettes Sortiment entdecken, freuen wir uns, Sie persönlich bei uns in der Bäckerei begrüssen zu dürfen.
                </p>
              </div>
            </div>

            {active && (
              <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: CATEGORY_META[active].bg2 }}>
                <CategoryContent catId={active} items={items} loading={loading} dietFilter={dietFilter} />
              </div>
            )}
          </div>

          {/* ── MOBILE/TABLET: video, title, then accordion — content opens directly under the tapped category ── */}
          <div className="lg:hidden">
            <video
              src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785332690/HAPPY_OMLETT_VIDEO_xgh4nn.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 rounded-3xl object-cover shadow-2xl border-2 border-[#FFBB00]/30 mb-6"
            />
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-black text-[#1E293B] mb-3">
                Unsere <span className="text-[#C2410C]">Bestseller</span>
              </h2>
              <p className="text-[#1E293B]/80 font-sans font-bold text-sm leading-relaxed">
                Hier finden Sie eine Auswahl unserer meistverkauften Produkte. Möchten Sie unser komplettes Sortiment entdecken, freuen wir uns, Sie persönlich bei uns in der Bäckerei begrüssen zu dürfen.
              </p>
            </div>

            <div className="space-y-4">
              {CATEGORIES.map((catId) => {
                const m = CATEGORY_META[catId];
                const count = items.filter((i) => i.category === catId).length;
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
                          {count > 0 && <span className="text-[10px] font-mono font-normal normal-case tracking-normal opacity-70">{count} Artikel</span>}
                        </span>
                      </span>
                      <ChevronDown className="relative z-10 w-6 h-6 transition-transform duration-300" style={{ transform: isActive ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <div className={`transition-all duration-300 ${isActive ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="p-4" style={{ backgroundColor: m.bg2 }}>
                        <CategoryContent catId={catId} items={items} loading={loading} dietFilter={dietFilter} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function CategoryContent({
  catId,
  items,
  loading,
  dietFilter,
}: {
  catId: MenuCategory;
  items: MenuItem[];
  loading: boolean;
  dietFilter: DietFilter;
}) {
  const meta = CATEGORY_META[catId];
  const filtered = items
    .filter((i) => i.category === catId)
    .filter((i) => (dietFilter === 'vegetarisch' ? i.is_vegetarian : true));

  return (
    <div>
      {/* Category Intro */}
      <div className="text-center mb-10">
        <p className="text-white/90 font-sans font-bold text-base md:text-lg max-w-xl mx-auto">
          {meta.intro}
        </p>
      </div>

      {/* Menu Items Grid */}
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
          {dietFilter === 'all'
            ? 'In dieser Kategorie wurden noch keine Speisen veröffentlicht.'
            : 'Keine vegetarischen Speisen in dieser Kategorie.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <TiltCard
              key={item.id}
              className="rounded-3xl p-6 border border-[#FFBB00]/20 backdrop-blur-xl hover:shadow-2xl hover:glow-gold flex justify-between gap-4 overflow-hidden min-h-[220px] shadow-xl flex-col justify-between"
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
                    <h3 className="text-xl font-serif font-black text-gold-gradient leading-snug line-clamp-2 flex-1">
                      {item.name}
                    </h3>
                    {item.is_vegetarian && (
                      <span className="flex items-center gap-1 text-[10px] font-sans font-black text-white bg-green-500/80 px-2 py-1 rounded-full flex-shrink-0">
                        <Leaf className="w-3 h-3" /> VEGI
                      </span>
                    )}
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
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}
