import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, RotateCcw } from 'lucide-react';

export default function NotFound() {
  // State for the 3 candles (spelling 4 0 4)
  const [candles, setCandles] = useState({
    candle1: true, // Lit (4)
    candle2: true, // Lit (0)
    candle3: true, // Lit (4)
  });

  const blowOut = (key: 'candle1' | 'candle2' | 'candle3') => {
    setCandles((prev) => ({ ...prev, [key]: false }));
  };

  const relight = () => {
    setCandles({ candle1: true, candle2: true, candle3: true });
  };

  // Check if all candles are blown out
  const allBlownOut = !candles.candle1 && !candles.candle2 && !candles.candle3;

  return (
    <section className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4">
      <div className="text-center max-w-xl w-full">
        {/* Interactive Cake Section */}
        <div className="relative w-72 h-72 mx-auto mb-8 flex items-end justify-center">
          
          {/* Ambient Gold Glow behind cake */}
          <div className="absolute inset-0 bg-gold-400/5 rounded-full blur-[60px] pointer-events-none" />

          {/* Magical Floating Sparkles when all candles are blown out */}
          {allBlownOut && (
            <div className="absolute inset-x-0 -top-12 h-20 text-gold-400/60 text-xs pointer-events-none animate-pulse">
              <span className="absolute left-[20%] top-[10%] animate-ping text-[10px]">✦</span>
              <span className="absolute right-[25%] top-[30%] animate-ping text-[12px] delay-300">✦</span>
              <span className="absolute left-[45%] top-[0%] animate-ping text-[8px] delay-500">✦</span>
            </div>
          )}

          {/* Interactive Cake Illustration SVG */}
          <svg
            className="w-64 h-64 relative z-10 select-none overflow-visible"
            viewBox="0 0 160 160"
            fill="currentColor"
          >
            {/* Defs for gradients */}
            <defs>
              <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1915" /> {/* Dark chocolate */}
                <stop offset="100%" stopColor="#120E0C" />
              </linearGradient>
              <linearGradient id="goldFrost" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F5E6B8" />
                <stop offset="100%" stopColor="#9A7B1A" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>

            {/* Cake Base Plate / Stand */}
            <path
              d="M 20 135 C 20 128, 140 128, 140 135 C 140 142, 20 142, 20 135 Z"
              fill="url(#goldFrost)"
              className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            />
            <rect x="70" y="137" width="20" height="8" rx="2" fill="#9A7B1A" />

            {/* Cake Body (Rich Chocolate Layer) */}
            <path
              d="M 30 130 L 30 95 C 30 90, 130 90, 130 95 L 130 130 Z"
              fill="url(#cakeGrad)"
              stroke="#D4AF37"
              strokeWidth="0.5"
            />

            {/* Icing Creams on Top Layer */}
            <path
              d="M 30 95 Q 40 92 50 95 Q 60 98 70 95 Q 80 92 90 95 Q 100 98 110 95 Q 120 92 130 95 L 130 100 Q 120 97 110 100 Q 100 103 90 100 Q 80 97 70 100 Q 60 103 50 100 Q 40 97 30 100 Z"
              fill="url(#goldFrost)"
            />

            {/* Decorative Stars on Cake Body */}
            <circle cx="50" cy="115" r="2.5" fill="#D4AF37" opacity="0.6" />
            <circle cx="80" cy="112" r="3.5" fill="#D4AF37" opacity="0.8" />
            <circle cx="110" cy="115" r="2.5" fill="#D4AF37" opacity="0.6" />

            {/* CANDLE 1 (Number 4) */}
            <g
              className="cursor-pointer group/c1"
              onClick={() => blowOut('candle1')}
              onMouseEnter={() => blowOut('candle1')}
            >
              {/* Wick */}
              <line x1="50" y1="90" x2="50" y2="70" stroke="#777" strokeWidth="1.5" />
              {/* Candle Body */}
              <rect x="47" y="70" width="6" height="22" rx="1" fill="#D4AF37" />
              {/* Number 4 text overlay */}
              <text x="50" y="85" fill="#120E0C" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-serif select-none pointer-events-none">
                4
              </text>
              {/* Flame (if lit) */}
              {candles.candle1 ? (
                <path
                  d="M 50 70 C 47 67, 46 60, 50 50 C 54 60, 53 67, 50 70 Z"
                  fill="url(#flameGrad)"
                  className="animate-flicker origin-bottom"
                />
              ) : (
                /* Smoke (if blown out) */
                <path
                  d="M 50 68 C 47 62, 53 56, 50 50"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-smoke opacity-0"
                />
              )}
            </g>

            {/* CANDLE 2 (Number 0) */}
            <g
              className="cursor-pointer group/c2"
              onClick={() => blowOut('candle2')}
              onMouseEnter={() => blowOut('candle2')}
            >
              {/* Wick */}
              <line x1="80" y1="87" x2="80" y2="67" stroke="#777" strokeWidth="1.5" />
              {/* Candle Body */}
              <rect x="77" y="67" width="6" height="25" rx="1" fill="#F5E6B8" />
              {/* Number 0 text overlay */}
              <text x="80" y="83" fill="#120E0C" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-serif select-none pointer-events-none">
                0
              </text>
              {/* Flame (if lit) */}
              {candles.candle2 ? (
                <path
                  d="M 80 67 C 77 64, 76 57, 80 47 C 84 57, 83 64, 80 67 Z"
                  fill="url(#flameGrad)"
                  className="animate-flicker origin-bottom"
                  style={{ animationDelay: '0.15s' }}
                />
              ) : (
                /* Smoke (if blown out) */
                <path
                  d="M 80 65 C 77 59, 83 53, 80 47"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-smoke opacity-0"
                  style={{ animationDelay: '0.05s' }}
                />
              )}
            </g>

            {/* CANDLE 3 (Number 4) */}
            <g
              className="cursor-pointer group/c3"
              onClick={() => blowOut('candle3')}
              onMouseEnter={() => blowOut('candle3')}
            >
              {/* Wick */}
              <line x1="110" y1="90" x2="110" y2="70" stroke="#777" strokeWidth="1.5" />
              {/* Candle Body */}
              <rect x="107" y="70" width="6" height="22" rx="1" fill="#D4AF37" />
              {/* Number 4 text overlay */}
              <text x="110" y="85" fill="#120E0C" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-serif select-none pointer-events-none">
                4
              </text>
              {/* Flame (if lit) */}
              {candles.candle3 ? (
                <path
                  d="M 110 70 C 107 67, 106 60, 110 50 C 114 60, 113 67, 110 70 Z"
                  fill="url(#flameGrad)"
                  className="animate-flicker origin-bottom"
                  style={{ animationDelay: '0.3s' }}
                />
              ) : (
                /* Smoke (if blown out) */
                <path
                  d="M 110 68 C 107 62, 113 56, 110 50"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-smoke opacity-0"
                  style={{ animationDelay: '0.1s' }}
                />
              )}
            </g>
          </svg>
        </div>

        {/* Message block */}
        <div className="relative z-10 px-4">
          <p className="text-xs uppercase font-sans font-bold text-gold-400 tracking-[0.25em] mb-2 animate-pulse">
            {allBlownOut ? 'Pust! Alle Kerzen sind aus.' : 'Puste die Kerzen aus!'}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {allBlownOut ? 'Oops! Hier ist das Licht ausgegangen.' : '404 — Seite nicht gefunden'}
          </h2>
          <p className="text-white/50 font-sans text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            {allBlownOut 
              ? 'Die Kerzen auf unserer Jubiläumstorte wurden ausgeblasen! Hier gibt es leider kein Häppchen Glück zu finden.' 
              : 'Bewegen Sie die Maus über die Kerzen oder tippen Sie sie an, um sie auszublasen! Lassen Sie uns den Weg zurück finden.'}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Home className="w-4 h-4" />
              Zur Startseite
            </Link>

            {/* Relight button if any candles are blown out */}
            {(!candles.candle1 || !candles.candle2 || !candles.candle3) && (
              <button 
                onClick={relight}
                className="btn-gold-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                Kerzen anzünden
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded CSS for Interactive 404 Animations */}
      <style>{`
        @keyframes flicker {
          0%, 100% { transform: scale(1) rotate(-1.5deg); filter: brightness(1); }
          50% { transform: scale(0.9) rotate(2deg) translateY(-0.8px); filter: brightness(1.2); }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scaleX(0.8); opacity: 0.7; }
          40% { opacity: 0.5; }
          100% { transform: translateY(-24px) scaleX(1.4); opacity: 0; }
        }
        .animate-flicker {
          animation-name: flicker;
          animation-duration: 0.25s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .animate-smoke {
          animation-name: smoke;
          animation-duration: 1.8s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}
