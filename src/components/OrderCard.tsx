import { Star, Bike } from 'lucide-react';
import { RATINGS } from '../lib/reviews';

const google = RATINGS.find((r) => r.id === 'google')!;
const delivery = RATINGS.filter((r) => r.id !== 'google');

/** Five stars filled to `value`, so 4.3 reads as four and a bit rather than a number. */
function Stars({ value, className = 'w-3.5 h-3.5' }: { value: number; className?: string }) {
  const row = (tone: string) => (
    <span className={`flex gap-0.5 w-max ${tone}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${className} fill-current`} strokeWidth={0} />
      ))}
    </span>
  );

  return (
    <span className="relative inline-block leading-none" aria-hidden="true">
      {row('text-white/15')}
      <span className="absolute left-0 top-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        {row('text-[#FFBB00]')}
      </span>
    </span>
  );
}

/**
 * One card instead of four stacked pieces. The Uber Eats and Just Eat scores
 * belong to the same brands as the order buttons, so they ride on the buttons
 * rather than sitting apart as decoration, and Google carries the trust line
 * above. Ratings are shown as plain social proof — see lib/reviews.ts for why
 * they are not marked up as schema.
 */
export default function OrderCard({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-[440px] rounded-2xl p-px overflow-hidden ${className}`}>
      {/* A single highlight travelling the border, reusing the conic-gradient
          trick already in index.css. Slow and faint on purpose — this sits in a
          hero that is busy enough. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[240%] w-[240%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow motion-reduce:hidden"
        style={{
          animationDuration: '7s',
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(255,255,204,0.45) 6%, transparent 18%, transparent 100%)',
        }}
      />

      <div className="relative rounded-2xl bg-[#1A1A00] border border-white/10 overflow-hidden">
      {/* Trust line */}
      <a
        href={google.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/[0.04] transition-colors group"
      >
        <Stars value={google.value} />
        <span className="text-[#FFFFCC] font-sans font-semibold text-[13px] leading-none tabular-nums">
          {google.score}
        </span>
        <span className="text-white/40 font-sans text-[12px] leading-none group-hover:text-white/60 transition-colors">
          {google.count} Bewertungen auf Google
        </span>
      </a>

      <div className="h-px bg-white/10" />

      {/* Order row */}
      <div className="px-4 py-3.5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 min-w-0">
          <Bike className="w-4 h-4 text-[#FFFFCC]/70 flex-shrink-0" strokeWidth={1.5} />
          <span className="min-w-0">
            <span className="block text-white/85 font-sans font-medium text-[13px] leading-snug truncate">
              Lieferung direkt zu dir
            </span>
            <span className="block text-white/35 font-sans text-[11px] leading-tight truncate">
              Jetzt bestellen bei
            </span>
          </span>
        </span>

        <span className="flex items-center gap-2 flex-shrink-0">
          {delivery.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: r.color }}
              className="pl-3 pr-2.5 py-1.5 rounded-full text-white font-sans font-semibold text-[11px] leading-none inline-flex items-center gap-2 hover:brightness-110 transition-all whitespace-nowrap"
            >
              {r.label}
              <span className="inline-flex items-center gap-0.5 bg-black/25 rounded-full px-1.5 py-1 tabular-nums">
                <Star className="w-2.5 h-2.5 fill-current" strokeWidth={0} />
                {r.score}
              </span>
            </a>
          ))}
        </span>
      </div>
      </div>
    </div>
  );
}
