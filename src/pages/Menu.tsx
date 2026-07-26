import { useEffect, useState } from 'react';
import { Coffee, UtensilsCrossed, Sandwich as SandwichIcon, IceCream, CupSoda, Loader2 } from 'lucide-react';
import { supabase, type MenuItem, type MenuCategory } from '../lib/supabase';

const CATEGORY_META: Record<MenuCategory, { label: string; icon: React.ReactNode; intro: string }> = {
  fruehstueck: { label: 'Frühstück', icon: <Coffee className="w-4 h-4" />, intro: 'Starten Sie glücklich in den Tag – frisch & fein.' },
  salziges: { label: 'Salziges', icon: <UtensilsCrossed className="w-4 h-4" />, intro: 'Herzhafte Snacks und kleine Speisen – perfekt für zwischendurch.' },
  sandwich: { label: 'Sandwiches', icon: <SandwichIcon className="w-4 h-4" />, intro: 'Herzhaft, frisch belegt – perfekt für unterwegs.' },
  suess: { label: 'Süsses', icon: <IceCream className="w-4 h-4" />, intro: 'Feine Pâtisserie – hausgemacht.' },
  getraenke: { label: 'Getränke', icon: <CupSoda className="w-4 h-4" />, intro: 'Heiss & kalt – erfrischend oder belebend.' },
};

const CATEGORIES: MenuCategory[] = ['fruehstueck', 'salziges', 'sandwich', 'suess', 'getraenke'];

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
    <section id="menu" className="pt-20 min-h-screen">
      {/* CSS animations for Menu page */}
      <style>{`
        @keyframes shimmerTwice {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-twice {
          animation: shimmerTwice 1.6s cubic-bezier(0.25, 1, 0.5, 1) 2 forwards;
        }

        @keyframes borderBeamRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-border-beam-once {
          animation: borderBeamRotate 1.3s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards;
        }
      `}</style>

      {/* Hero */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/menu-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/60 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Happy Beck
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-3">
              Unsere Speisekarte
            </h1>
            <p className="text-white/50 font-sans max-w-xl">{meta.intro}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-6xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {CATEGORIES.map((catId) => {
            const m = CATEGORY_META[catId];
            const count = items.filter((i) => i.category === catId).length;
            const isActive = active === catId;
            return (
              <button
                key={catId}
                onClick={() => setActive(catId)}
                className={`relative px-5 py-3 rounded-2xl flex items-center gap-2.5 text-sm font-sans font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-gold-400/20 via-gold-400/10 to-transparent text-gold-400 border border-gold-400/30 shadow-[0_4px_20px_rgba(212,175,55,0.15)] scale-105'
                    : 'bg-dark-800/60 border border-white/5 text-white/50 hover:text-white hover:bg-white/5 hover:border-white/10'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
                {count > 0 && <span className="text-xs opacity-60 font-mono">({count})</span>}
                
                {/* Clean Bottom Animated Active Indicator Line */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-400 via-amber-300 to-gold-400 rounded-full shadow-[0_0_10px_#D4AF37] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid (3 Columns matching photo reference) */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white/40 font-sans">Noch keine Artikel in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              // Rich warm gradient card background themes
              const cardThemes = [
                { bg: 'bg-gradient-to-br from-[#FFE4D6] via-[#FFD8C0] to-[#FCA5A5]/30 border-[#FFAA80]', badgeBg: 'bg-[#D82A6C]', titleColor: 'text-[#9E1B4C]', priceBg: 'bg-[#251A14]' },
                { bg: 'bg-gradient-to-br from-[#FFF0D6] via-[#FFE2B3] to-[#FCD34D]/30 border-[#FBBF24]', badgeBg: 'bg-[#E5931A]', titleColor: 'text-[#9C5A08]', priceBg: 'bg-[#251A14]' },
                { bg: 'bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#38BDF8]/20 border-[#7DD3FC]', badgeBg: 'bg-[#2563EB]', titleColor: 'text-[#1D4ED8]', priceBg: 'bg-[#251A14]' },
                { bg: 'bg-gradient-to-br from-[#FFE4E6] via-[#FECDD3] to-[#FB7185]/30 border-[#FDA4AF]', badgeBg: 'bg-[#E11D48]', titleColor: 'text-[#BE123C]', priceBg: 'bg-[#251A14]' },
                { bg: 'bg-gradient-to-br from-[#F3E8FF] via-[#E9D5FF] to-[#C084FC]/30 border-[#DDD6FE]', badgeBg: 'bg-[#7C3AED]', titleColor: 'text-[#6D28D9]', priceBg: 'bg-[#251A14]' },
                { bg: 'bg-gradient-to-br from-[#FFEDD5] via-[#FED7AA] to-[#FB923C]/30 border-[#FDBA74]', badgeBg: 'bg-[#EA580C]', titleColor: 'text-[#C2410C]', priceBg: 'bg-[#251A14]' },
              ];

              const theme = cardThemes[idx % cardThemes.length];

              return (
                <div
                  key={item.id}
                  className={`relative ${theme.bg} rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex justify-between gap-3 overflow-hidden min-h-[220px] shadow-lg`}
                >
                  {/* Left Column: Number Badge, Title, Description, Price */}
                  <div className="flex-1 flex flex-col justify-between z-10">
                    <div>
                      {/* Top Row: Circular Number & Title */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className={`w-8 h-8 rounded-full ${theme.badgeBg} text-white font-sans font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {idx + 1}
                        </span>
                        <h3 className={`text-lg md:text-xl font-bold font-sans ${theme.titleColor} leading-tight line-clamp-2`}>
                          {item.name}
                        </h3>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs md:text-sm text-[#52443C] font-sans leading-relaxed line-clamp-3 pr-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Black Pill Price Tag */}
                    <div className="mt-4">
                      <span className={`inline-block ${theme.priceBg} text-white font-sans font-bold text-xs md:text-sm px-4 py-2 rounded-full shadow-md`}>
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Tall Cropped Product Image (If present) */}
                  {item.image_url ? (
                    <div className="w-[110px] md:w-[125px] h-full flex-shrink-0 relative overflow-hidden rounded-2xl">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-[90px] h-full flex-shrink-0 flex items-center justify-center opacity-10">
                      <span className="text-4xl">🥐</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
