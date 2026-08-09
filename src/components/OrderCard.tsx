import { Star, Bike } from 'lucide-react';
import { RATINGS } from '../lib/reviews';

const google = RATINGS.find((r) => r.id === 'google')!;
const delivery = RATINGS.filter((r) => r.id !== 'google');

const OLIVE = '#1A1A00';

/**
 * Confines a background to the 1px padding ring, leaving the content box
 * genuinely transparent so the page shows through the card.
 */
const RING_MASK: React.CSSProperties = {
  padding: '1px',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
};

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
      {row('text-[#1A1A00]/15')}
      <span className="absolute left-0 top-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        {row('text-[#E09B00]')}
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
    <div className={`relative w-full max-w-[440px] rounded-2xl ${className}`}>
      {/* Olive outline, with a single highlight travelling it. Slow and faint on
          purpose — this sits in a hero that is busy enough. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        style={RING_MASK}
      >
        <span className="absolute inset-0" style={{ backgroundColor: OLIVE }} />
        <span
          className="absolute left-1/2 top-1/2 h-[240%] w-[240%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow motion-reduce:hidden"
          style={{
            animationDuration: '7s',
            background:
              'conic-gradient(from 0deg, transparent 0%, #FFBB00 6%, transparent 18%, transparent 100%)',
          }}
        />
      </span>

      {/* Trust line */}
      <a
        href={google.url}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-t-2xl hover:bg-[#1A1A00]/[0.05] transition-colors group"
      >
        <Stars value={google.value} />
        <span className="text-[#1A1A00] font-sans font-bold text-[13px] leading-none tabular-nums">
          {google.score}
        </span>
        <span className="text-[#1A1A00] font-sans font-medium text-[12px] leading-none">
          {google.count} Bewertungen auf Google
        </span>
      </a>

      <div className="relative h-px bg-[#1A1A00]/15" />

      {/* Order row */}
      <div className="relative px-4 py-3.5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 min-w-0">
          <Bike className="w-4 h-4 text-[#1A1A00]/70 flex-shrink-0" strokeWidth={1.5} />
          <span className="min-w-0">
            <span className="block text-[#1A1A00] font-sans font-semibold text-[13px] leading-snug truncate">
              Lieferung direkt zu dir
            </span>
            <span className="block text-[#1A1A00]/75 font-sans text-[11px] leading-tight truncate">
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
  );
}
