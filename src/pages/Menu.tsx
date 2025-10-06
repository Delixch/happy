import { useMemo, useState } from 'react';
import { Coffee, Sandwich as SandwichIcon, IceCream, Utensils, CupSoda } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  desc?: string;
  price: string;
  image?: string; // public/ yolundan verilebilir
};

type MenuCategory = {
  id: string;
  title: string;
  cover?: string;
  intro?: string;
  items: MenuItem[];
};

export default function MenuPage() {
  const categories = useMemo<MenuCategory[]>(
    () => [
      {
        id: 'fruehstueck',
        title: 'Frühstück',
        cover: '/menu-breakfast.jpg',
        intro: 'Starten Sie glücklich in den Tag – frisch & fein.',
        items: [
          { id: 'gipfeli', name: 'Gipfeli', desc: 'Butter, täglich frisch gebacken', price: '2.20 CHF', image: '/menu-gipfeli.jpg' },
          { id: 'kaffee-gipfeli', name: 'Kaffee + Gipfeli', desc: 'Kombination', price: '4.90 CHF' },
        ],
      },
      {
        id: 'salziges',
        title: 'Salziges',
        cover: '/menu-salty.jpg',
        intro: 'Herzhafte Snacks und kleine Speisen – perfekt für zwischendurch.',
        items: [
          { id: 'brezel', name: 'Brezel', desc: 'Ofenfrisch, grobes Salz', price: '2.90 CHF', image: '/menu-brezel.jpg' },
          { id: 'quiche', name: 'Quiche', desc: 'Spinat oder Lorraine', price: '6.50 CHF', image: '/menu-quiche.jpg' },
          { id: 'panini', name: 'Panini', desc: 'Tomate-Mozzarella, Basilikum', price: '7.90 CHF' },
        ],
      },
      {
        id: 'sandwich',
        title: 'Sandwiches',
        cover: '/menu-sandwich.jpg',
        intro: 'Herzhaft, frisch belegt – perfekt für unterwegs.',
        items: [
          { id: 'happy-sandwich', name: 'Happy Sandwich', desc: 'Poulet, Salat, Sauce Happy', price: '8.90 CHF', image: '/menu-sandwich2.jpg' },
          { id: 'piadina', name: 'Piadina', desc: 'Italienische Fladenbrot-Spezialität', price: '9.90 CHF' },
        ],
      },
      {
        id: 'suess',
        title: 'Süsses',
        cover: '/menu-sweets.jpg',
        intro: 'Feine Pâtisserie – hausgemacht.',
        items: [
          { id: 'brownie', name: 'Brownie Würfel', desc: 'Schokoladig & saftig', price: '3.50 CHF' },
          { id: 'eclair', name: 'Mini Éclair', desc: 'Vanille/Schoggi', price: '3.20 CHF' },
        ],
      },
      {
        id: 'getraenke',
        title: 'Getränke',
        cover: '/menu-drinks.jpg',
        intro: 'Heiss & kalt – erfrischend oder belebend.',
        items: [
          { id: 'kaffee', name: 'Kaffee', desc: 'Espresso, Americano, Latte', price: 'ab 3.50 CHF' },
          { id: 'tee', name: 'Tee', desc: 'Verschiedene Sorten', price: '3.00 CHF' },
          { id: 'soft', name: 'Softdrinks', desc: 'Cola, Valser, Fuse Tea', price: '3.50 CHF' },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="pt-20">
      <div className="relative container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Title, lead, large image */}
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">The Menu</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              {current.intro || 'Entdecken Sie unsere Auswahl an frischen, hausgemachten Spezialitäten – mit Liebe zubereitet.'}
            </p>
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10">
              <img src={current.cover || '/menu-placeholder.jpg'} alt={current.title} className="w-full h-[360px] object-cover" />
            </div>
          </div>

          {/* Right: Tabs + list */}
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    active === cat.id
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-gray-700 hover:bg-amber-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {cat.id === 'fruehstueck' && <Coffee className="w-4 h-4" />}
                    {cat.id === 'salziges' && <Utensils className="w-4 h-4" />}
                    {cat.id === 'sandwich' && <SandwichIcon className="w-4 h-4" />}
                    {cat.id === 'suess' && <IceCream className="w-4 h-4" />}
                    {cat.id === 'getraenke' && <CupSoda className="w-4 h-4" />}
                    <span>{cat.title}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {current.items.map((item) => (
                <div key={item.id} className="p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <div className="flex-1 border-t border-dotted border-gray-300 dark:border-gray-600"></div>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">{item.price}</span>
                  </div>
                  {item.desc && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


