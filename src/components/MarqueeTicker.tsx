type MarqueeItem = { text: string; emphasis?: boolean };

const DEFAULT_ITEMS: MarqueeItem[] = [
  { text: '🔥 24 STUNDEN AN 7 TAGEN FÜR SIE GEÖFFNET!', emphasis: true },
  { text: '🥐 Frische Gipfeli & Sandwiches – Tag & Nacht ofenfrisch!' },
  { text: '✨ Wir freuen uns auf Ihren Besuch bei Happy Beck!' },
];

export default function MarqueeTicker({ items = DEFAULT_ITEMS }: { items?: MarqueeItem[] }) {
  return (
    <div className="w-full bg-[#1A1A00] py-2.5 md:py-3.5 border-y-2 border-white/20 overflow-hidden shadow-2xl relative z-20">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[1, 2, 3, 4].map((groupKey) => (
          <div key={groupKey} className="flex items-center gap-8 px-4 flex-shrink-0">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-8">
                <span
                  className={`flex items-center gap-3 font-sans text-sm md:text-base tracking-widest ${
                    item.emphasis ? 'text-[#FFFFCC] font-black uppercase' : 'text-white font-bold'
                  }`}
                >
                  {item.emphasis && <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFCC] animate-ping" />}
                  {item.text}
                </span>
                <span className="text-[#FFFFCC]/40 text-xl font-bold">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
