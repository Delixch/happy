import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Star, Quote as QuoteIcon, RotateCw } from 'lucide-react';
import { QUOTE_PAIRS, RATINGS, type Quote } from '../lib/reviews';
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal';

const google = RATINGS.find((r) => r.id === 'google')!;

type Variant = 'solid' | 'outline';

/** Three identical dark blocks read as a wall, so the middle one is an outline. */
const SKIN: Record<Variant, Record<string, string>> = {
  solid: {
    shell: 'bg-[#1A1A00] border-[#FFFFCC]/12 shadow-xl',
    mark: 'text-[#FFFFCC]/35',
    hint: 'text-[#FFFFCC]/30',
    body: 'text-white/75',
    rule: 'border-[#FFFFCC]/10',
    star: 'text-[#FFBB00]',
    name: 'text-[#FFFFCC]',
    meta: 'text-white/35',
  },
  outline: {
    shell: 'bg-transparent border-[#1A1A00]/35',
    mark: 'text-[#1A1A00]/40',
    hint: 'text-[#1A1A00]/50',
    body: 'text-[#1A1A00]',
    rule: 'border-[#1A1A00]/20',
    star: 'text-[#E09B00]',
    name: 'text-[#1A1A00]',
    meta: 'text-[#1A1A00]/65',
  },
};

function Face({
  quote,
  hint,
  variant = 'solid',
  className = '',
}: {
  quote: Quote;
  hint?: boolean;
  variant?: Variant;
  className?: string;
}) {
  const s = SKIN[variant];

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center text-center rounded-2xl border p-6 ${s.shell} ${className}`}
    >
      {/* Out of the flow so it cannot pull the centred column off axis */}
      {hint && (
        <span
          className={`absolute top-5 right-5 flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.15em] ${s.hint}`}
        >
          <RotateCw className="w-3 h-3" strokeWidth={2} />
          1 von 2
        </span>
      )}

      <QuoteIcon className={`w-5 h-5 flex-shrink-0 mb-4 ${s.mark}`} strokeWidth={1.5} />

      {/* Centred vertically too, so the shorter quotes do not hang at the top */}
      <blockquote className={`flex-1 flex items-center font-sans text-sm leading-[1.75] overflow-hidden ${s.body}`}>
        <span>{quote.text}</span>
      </blockquote>

      <figcaption className={`w-full mt-5 pt-4 border-t flex-shrink-0 ${s.rule}`}>
        <span className={`flex justify-center gap-0.5 mb-2 ${s.star}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3 h-3 fill-current" strokeWidth={0} />
          ))}
        </span>
        <p className={`font-sans font-semibold text-[13px] leading-tight ${s.name}`}>{quote.author}</p>
        <p className={`font-sans text-[11px] mt-0.5 ${s.meta}`}>{quote.when} · Google</p>
      </figcaption>
    </div>
  );
}

/** Turns to show a second review while hovered, or tapped on touch screens. */
function FlipCard({ front, back, variant }: { front: Quote; back: Quote; variant: Variant }) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-scene h-full min-h-[350px] sm:min-h-[330px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label="Weitere Bewertung anzeigen"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      {reduced ? (
        <div className="relative h-full">
          <Face quote={flipped ? back : front} hint variant={variant} />
        </div>
      ) : (
        <div className={`flip-inner h-full ${flipped ? 'is-flipped' : ''}`}>
          {/* The rotation and backface-visibility have to sit on the same
              element, or the back shows through mirrored. */}
          <Face quote={front} hint variant={variant} className="flip-face" />
          <Face quote={back} variant={variant} className="flip-face flip-face-back" />
        </div>
      )}
    </div>
  );
}

/**
 * Real reviews from the Google profile, quoted verbatim and attributed, with a
 * link back so anyone can check them. Deliberately not marked up as schema —
 * see lib/reviews.ts for why.
 */
export default function ReviewQuotes() {
  return (
    <div className="container mx-auto px-4 lg:px-8 pb-16 md:pb-20">
      <Reveal className="text-center mb-10">
        <p className="font-sans text-xs tracking-[0.3em] uppercase mb-2 font-bold text-[#1A1A00]/60">
          Was Gäste sagen
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] leading-tight">
          {google.count} Bewertungen, {google.score} Sterne
        </h2>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch" stagger={0.12}>
        {QUOTE_PAIRS.map((pair, i) => (
          <RevealItem key={pair.id} className="h-full">
            <FlipCard front={pair.front} back={pair.back} variant={i === 1 ? 'outline' : 'solid'} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="text-center mt-8">
        <a
          href={google.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[#1A1A00]/70 hover:text-[#1A1A00] font-sans font-medium text-[11px] uppercase tracking-[0.18em] transition-colors"
        >
          Alle Bewertungen auf Google
          <span>→</span>
        </a>
      </Reveal>
    </div>
  );
}
