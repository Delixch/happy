import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(() => {
    try {
      return !sessionStorage.getItem('happybeck_loaded');
    } catch {
      return true;
    }
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    try {
      sessionStorage.setItem('happybeck_loaded', 'true');
    } catch (e) {
      console.error(e);
    }

    // Snappier intro: 1.0s display + 600ms fade transition
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center transition-opacity duration-700 ease-out select-none ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Subtle floating background ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/3 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Floating Magic Golden Stars / Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '40%', top: '33%', delay: '0.1s', size: '10px', x: '-20px', y: '-30px' },
          { left: '56%', top: '31%', delay: '0.5s', size: '8px', x: '25px', y: '-25px' },
          { left: '36%', top: '46%', delay: '0.3s', size: '12px', x: '-30px', y: '15px' },
          { left: '62%', top: '44%', delay: '0.7s', size: '9px', x: '30px', y: '20px' },
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

      <div className="relative flex flex-col items-center z-10">
        
        {/* Steam Waves Rising above the logo */}
        <div className="flex gap-4 mb-2 justify-center h-7 opacity-75">
          {[
            { delay: '0.1s', h: 'h-5' },
            { delay: '0.4s', h: 'h-7' },
            { delay: '0.2s', h: 'h-5' },
          ].map((s, idx) => (
            <svg
              key={idx}
              className={`w-3 ${s.h} text-gold-400/30 animate-steam`}
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

        {/* Glowing circular logo frame */}
        <div className="relative mb-6 animate-logo-intro">
          {/* Outer rotating/pulsing aura */}
          <div className="absolute inset-[-8px] rounded-full border border-gold-400/20 animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute inset-[-15px] rounded-full bg-gold-400/5 blur-md animate-pulse" />

          {/* Logo container */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gold-400/30 bg-dark-800 p-2.5 shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Happy Beck"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text fading in with slide up and gold shimmer */}
        <div className="text-center animate-text-intro mt-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide leading-none text-gold-gradient">
            Happy <span className="text-gold-gradient">Beck</span>
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto my-3" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold-400/70 font-sans leading-none">
            Ein Häppchen Glück
          </p>
        </div>
      </div>

      <style>{`
        @keyframes logoIntro {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.03); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes textIntro {
          0% { transform: translateY(12px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(var(--x), var(--y)) scale(1.1); opacity: 0.9; }
        }
        @keyframes steam {
          0% { transform: translateY(8px) scaleX(0.8); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-16px) scaleX(1.2); opacity: 0; }
        }
        .animate-logo-intro {
          animation-name: logoIntro;
          animation-duration: 1.8s;
          animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          animation-fill-mode: forwards;
        }
        .animate-text-intro {
          animation-name: textIntro;
          animation-duration: 2s;
          animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
          animation-fill-mode: forwards;
          animation-delay: 0.2s;
          opacity: 0;
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
      `}</style>
    </div>
  );
}
