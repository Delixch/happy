import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // 2.2 seconds display time + 700ms fade transition
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 2200);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center transition-opacity duration-700 ease-out select-none ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Sparkles / Baking Magic Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '42%', top: '35%', delay: '0.2s', size: '12px', x: '-15px', y: '-25px' },
          { left: '55%', top: '33%', delay: '0.6s', size: '8px', x: '20px', y: '-20px' },
          { left: '38%', top: '48%', delay: '0.4s', size: '10px', x: '-25px', y: '10px' },
          { left: '60%', top: '46%', delay: '0.8s', size: '14px', x: '25px', y: '15px' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute text-gold-400/80 font-serif animate-sparkle"
            style={{
              left: star.left,
              top: star.top,
              fontSize: star.size,
              animationDelay: star.delay,
              animationDuration: '2s',
              animationIterationCount: 'infinite',
              '--x': star.x,
              '--y': star.y,
            } as any}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Main Baking Illustration Wrapper */}
      <div className="relative flex flex-col items-center">
        
        {/* Steam Waves Rising */}
        <div className="flex gap-4 mb-1 justify-center h-8">
          {[
            { delay: '0.1s', h: 'h-6' },
            { delay: '0.4s', h: 'h-8' },
            { delay: '0.2s', h: 'h-6' },
          ].map((s, idx) => (
            <svg
              key={idx}
              className={`w-3 ${s.h} text-gold-400/40 animate-steam`}
              style={{ animationDelay: s.delay }}
              fill="none"
              viewBox="0 0 10 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M5,18 C8,14 2,10 5,6 C8,2 2,-2 5,-6" />
            </svg>
          ))}
        </div>

        {/* The Baking Croissant (Rises & Glows) */}
        <div className="relative animate-bake-rise mb-6">
          {/* Radial Gold Glow Behind Croissant */}
          <div className="absolute inset-0 bg-gold-400/10 rounded-full blur-xl scale-125 animate-pulse" />

          {/* Detailed Golden Croissant SVG */}
          <svg
            className="w-36 h-28 text-gold-gradient relative z-10 drop-shadow-[0_4px_25px_rgba(212,175,55,0.25)]"
            viewBox="0 0 120 80"
            fill="currentColor"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" /> {/* amber-500 */}
                <stop offset="50%" stopColor="#FBBF24" /> {/* amber-400 */}
                <stop offset="100%" stopColor="#D97706" /> {/* amber-600 */}
              </linearGradient>
            </defs>

            {/* Croissant Segments */}
            {/* Left tip */}
            <path
              d="M 22 46 C 21 41, 31 39, 36 44 C 38 49, 33 56, 29 56 C 24 56, 22 51, 22 46 Z"
              fill="url(#goldGrad)"
            />
            {/* Left middle outer */}
            <path
              d="M 33 42 C 34 35, 43 34, 48 40 C 50 49, 42 56, 38 56 C 34 56, 33 50, 33 42 Z"
              fill="url(#goldGrad)"
              opacity="0.95"
            />
            {/* Main Center Segment (Largest/Plumpest) */}
            <path
              d="M 44 38 C 46 29, 74 29, 76 38 C 77 50, 73 60, 60 60 C 47 60, 43 50, 44 38 Z"
              fill="url(#goldGrad)"
            />
            {/* Right middle outer */}
            <path
              d="M 72 42 C 77 34, 86 35, 87 42 C 87 50, 86 56, 82 56 C 78 56, 70 49, 72 42 Z"
              fill="url(#goldGrad)"
              opacity="0.95"
            />
            {/* Right tip */}
            <path
              d="M 84 44 C 89 39, 99 41, 98 46 C 98 51, 96 56, 91 56 C 87 56, 82 49, 84 44 Z"
              fill="url(#goldGrad)"
            />
          </svg>
        </div>

        {/* Baking Status Text */}
        <div className="text-center">
          <p className="text-gold-gradient font-serif font-bold text-lg tracking-wide animate-pulse">
            Glück wird gebacken...
          </p>
          <p className="text-white/30 font-sans text-[10px] tracking-[0.2em] uppercase mt-1">
            Happy Beck Zürich
          </p>
        </div>
      </div>

      {/* Inline styles for custom preloader animations */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(var(--x), var(--y)) scale(1.1); opacity: 0.9; }
        }
        @keyframes steam {
          0% { transform: translateY(8px) scaleX(0.8); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-16px) scaleX(1.2); opacity: 0; }
        }
        @keyframes bakeRise {
          0% { transform: scale(0.7, 0.4); filter: brightness(0.75); }
          65% { transform: scale(1.08, 1.04); filter: brightness(1.0); }
          100% { transform: scale(1, 1); filter: brightness(1.05); }
        }
        .animate-sparkle {
          animation-name: sparkle;
        }
        .animate-steam {
          animation-name: steam;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .animate-bake-rise {
          animation-name: bakeRise;
          animation-duration: 2.2s;
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
