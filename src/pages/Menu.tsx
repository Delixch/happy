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
            return (
              <button
                key={catId}
                onClick={() => setActive(catId)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                  active === catId
                    ? 'bg-gold-400 text-dark-700 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-dark-400 text-white/50 border border-white/10 hover:border-gold-400/30 hover:text-white/80'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
                {count > 0 && <span className="text-xs opacity-60">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white/30 font-sans">Noch keine Artikel in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-6 md:p-8 transition-colors hover:bg-white/[0.02] ${
                  idx !== filtered.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Thumbnail */}
                {item.image_url && (
                  <div className="hidden sm:block w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base md:text-lg font-serif font-semibold text-white">
                      {item.name}
                    </h3>
                    <div className="flex-1 border-t border-dotted border-white/10" />
                    <span className="text-gold-400 font-serif font-bold text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-white/40 font-sans mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
