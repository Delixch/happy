import { Star } from 'lucide-react';
import { RATINGS } from '../lib/reviews';

/**
 * Compact row of platform ratings. Each badge names its source and links to
 * the profile it came from, so visitors can check the number themselves.
 */
export default function RatingBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {RATINGS.map((r) => (
        <a
          key={r.id}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full bg-[#1A1A00] border border-white/15 shadow-sm hover:border-white/35 transition-colors cursor-pointer"
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: r.color }}
          >
            <Star className="w-3 h-3 text-white fill-current" />
          </span>
          <span className="font-sans text-[11px] leading-none whitespace-nowrap">
            <span className="text-[#FFFFCC] font-black">{r.score}</span>
            <span className="text-white/55 font-semibold"> · {r.label}</span>
          </span>
        </a>
      ))}
      <span className="font-sans text-[10px] text-[#1A1A00]/60 font-bold">
        {RATINGS.find((r) => r.id === 'google')?.count} Google-Bewertungen
      </span>
    </div>
  );
}
