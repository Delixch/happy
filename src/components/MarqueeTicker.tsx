type MarqueeItem = { text: string; emphasis?: boolean };

const DEFAULT_ITEMS: MarqueeItem[] = [
  { text: '🔥 24 Stunden an 7 Tagen für Sie geöffnet', emphasis: true },
  { text: '🥐 Frische Gipfeli & Sandwiches – Tag & Nacht ofenfrisch' },
  { text: '✨ Wir freuen uns auf Ihren Besuch bei Happy Beck' },
];

export default function MarqueeTicker({ items = DEFAULT_ITEMS }: { items?: MarqueeItem[] }) {
  return (
    <div className="w-full bg-[#1A1A00] py-3 md:py-3.5 border-y border-white/10 overflow-hidden relative z-20">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[1, 2, 3, 4].map((groupKey) => (
          <div key={groupKey} className="flex items-center gap-8 px-4 flex-shrink-0">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-8">
                <span
                  className={`flex items-center gap-2.5 font-sans text-sm md:text-[15px] tracking-wide ${
                    item.emphasis ? 'text-[#FFFFCC] font-medium' : 'text-white/70 font-normal'
                  }`}
                >
                  {item.emphasis && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFCC]/70 flex-shrink-0" />
                  )}
                  {item.text}
                </span>
                <span className="text-[#FFFFCC]/25 text-sm">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
