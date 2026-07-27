import { useState } from 'react';
import { X } from 'lucide-react';

interface JuiceItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  bg: string;
  badgeBg: string;
  textColor: string;
  imageUrl: string;
}

const JUICE_ITEMS: JuiceItem[] = [
  {
    id: 1,
    name: 'Berry Cloud',
    desc: 'Cremiger Himbeer-Drink mit frischen Beeren, verfeinert mit Milchschaum.',
    price: 'CHF 8.90',
    bg: '#FDF2F8',
    badgeBg: '#BE185D',
    textColor: '#831843',
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Mango Dream',
    desc: 'Fruchtiger Mango-Genuss für sonnige Momente.',
    price: 'CHF 8.50',
    bg: '#FEFCE8',
    badgeBg: '#D97706',
    textColor: '#92400E',
    imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Blue Lagoon',
    desc: 'Spritzige Erfrischung mit fruchtigem Geschmack und einem Hauch Zitrone.',
    price: 'CHF 7.90',
    bg: '#EFF6FF',
    badgeBg: '#2563EB',
    textColor: '#1E40AF',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Pink Lemonade',
    desc: 'Hausgemachte Limonade – fruchtig, frisch und einfach unwiderstehlich.',
    price: 'CHF 7.50',
    bg: '#FDF2F8',
    badgeBg: '#DB2777',
    textColor: '#9D174D',
    imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'Coconut Cloud',
    desc: 'Cremige Kokos-Spezialität mit feinem Milchschaum.',
    price: 'CHF 8.90',
    bg: '#F5F3FF',
    badgeBg: '#7C3AED',
    textColor: '#5B21B6',
    imageUrl: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    name: 'Peach Ice Tea Deluxe',
    desc: 'Pfirsich-Eistee mit frischen Früchten verfeinert – ein echter Klassiker.',
    price: 'CHF 7.90',
    bg: '#FFF7ED',
    badgeBg: '#EA580C',
    textColor: '#9A3412',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80',
  },
];

export default function FreshJuiceModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button at Bottom Left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-5 py-3.5 rounded-full bg-[#1E293B] text-[#FFBB00] font-sans font-black text-xs md:text-sm uppercase tracking-wider flex items-center gap-3 shadow-2xl border-2 border-[#FFBB00] hover:scale-105 transition-all cursor-pointer group"
      >
        <span className="text-xl animate-bounce">🍹</span>
        <span className="hidden sm:inline">Frische Säfte & Drinks</span>
        <span className="sm:hidden">Säfte 🍹</span>
        <span className="px-2 py-0.5 rounded-full bg-[#FFBB00] text-[#1E293B] text-[10px] font-black uppercase">
          Neu
        </span>
      </button>

      {/* Modal Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#1E293B] rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/20 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[#FFBB00] hover:text-[#1E293B] flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFBB00] text-[#1E293B] font-sans text-xs font-black tracking-[0.2em] uppercase mb-3 shadow-md">
                100% HAUSGEMACHT & FRISCH
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white">
                Frisch gemachte <span className="text-[#FFBB00] underline">Säfte & Drinks</span>
              </h2>
            </div>

            {/* Content Layout: Left Moka Menu + Right 6 Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Dark Column */}
              <div className="lg:col-span-4 bg-[#2A2421] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-white/60 font-sans text-[10px] tracking-[0.25em] uppercase font-black block mb-1">
                    FRISCH GEMACHT
                  </span>
                  <h3 className="text-3xl font-serif font-black text-white mb-6">
                    Säfte
                  </h3>

                  <div className="space-y-5">
                    {[
                      { icon: '🍊', title: 'Sunrise Boost', sub: 'Orange · Apfel · Ingwer' },
                      { icon: '🍏', title: 'Green Power', sub: 'Apfel · Gurke · Zitrone' },
                      { icon: '🥭', title: 'Tropical Dream', sub: 'Mango · Orange · Apfel' },
                      { icon: '🍓', title: 'Berry Fresh', sub: 'Erdbeere · Orange · Apfel' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 border-b border-white/10 pb-3">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <p className="text-white font-serif font-bold text-base leading-snug">{s.title}</p>
                          <p className="text-white/60 font-sans text-xs">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Options */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-black/30 p-3 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/50 text-[10px] uppercase font-bold">3 DL</p>
                      <p className="text-[#FFBB00] font-serif font-black text-lg">CHF 7.50</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/50 text-[10px] uppercase font-bold">5 DL</p>
                      <p className="text-[#FFBB00] font-serif font-black text-lg">CHF 9.50</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-[10px] font-sans text-center italic">
                    Bitte an der Kasse bestellen ▼
                  </p>
                </div>
              </div>

              {/* Right 6 Pastel Drinks Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {JUICE_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl p-5 shadow-lg border border-black/5 flex flex-col justify-between relative overflow-hidden min-h-[260px] group transition-transform duration-300 hover:scale-[1.03]"
                    style={{ backgroundColor: item.bg }}
                  >
                    <div>
                      {/* Badge & Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-7 h-7 rounded-full text-white font-sans font-black text-xs flex items-center justify-center shadow-md flex-shrink-0"
                          style={{ backgroundColor: item.badgeBg }}
                        >
                          {item.id}
                        </span>
                        <h4 className="font-serif font-black text-base leading-tight" style={{ color: item.textColor }}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-xs font-sans font-medium text-black/70 leading-relaxed mb-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* Drink Thumbnail Image */}
                    <div className="w-full h-28 rounded-2xl overflow-hidden mb-3 my-1 shadow-md border border-black/5">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Price Pill */}
                    <div>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E293B] text-white font-sans font-black text-xs shadow-md">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
