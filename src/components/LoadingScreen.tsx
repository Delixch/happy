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
      {/* Subtle floating background ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-400/3 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative flex flex-col items-center z-10">
        {/* Glowing circular logo frame */}
        <div className="relative mb-6 animate-logo-intro">
          {/* Outer rotating/pulsing aura */}
          <div className="absolute inset-[-8px] rounded-full border border-gold-400/20 animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute inset-[-15px] rounded-full bg-gold-400/5 blur-md animate-pulse" />

          {/* Logo container */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gold-400/30 bg-dark-800 p-2.5 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center justify-center">
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
          0% { transform: scale(0.8); opacity: 0; filter: blur(5px); }
          60% { transform: scale(1.03); opacity: 0.9; filter: blur(0px); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes textIntro {
          0% { transform: translateY(12px); opacity: 0; filter: blur(2px); }
          50% { opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
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
      `}</style>
    </div>
  );
}
