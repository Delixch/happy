import { useState, useEffect } from 'react';

export default function ScrollPeelButton() {
  const [visible, setVisible] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Show as soon as the user scrolls past 300px (scrolls down with the page)
      setVisible(scrollPos > 300);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger check once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (isPushing) return;
    setIsPushing(true);

    const duration = 1000; // 1.0 second smooth fluid scroll
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutCubic for smooth natural deceleration
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start * (1 - ease));

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    // Reset animation state after it completes
    setTimeout(() => {
      setIsPushing(false);
    }, 600);
  };

  return (
    <>
      {/* CSS Animation Keyframes for Peel Push */}
      <style>{`
        @keyframes peelVerticalPush {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          20% {
            transform: translateY(12px) scale(0.95);
            opacity: 1;
          }
          60% {
            transform: translateY(-250px) scale(1.05);
            opacity: 0;
            filter: drop-shadow(0 0 20px rgba(255,255,204,0.8));
          }
          99% {
            transform: translateY(-250px);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .peel-active-push {
          animation: peelVerticalPush 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-8 z-50 p-2 bg-transparent cursor-pointer flex flex-col items-center group ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-75 pointer-events-none'
        }`}
        title="Nach oben scrollen"
        style={{ transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <div className={`relative ${isPushing ? 'peel-active-push' : 'group-hover:-translate-y-3 transition-transform duration-300'}`}>
          {/* Custom SVG Bakery Peel with Dark Theme Colors (#1A1A00 & #FFFFCC) */}
          <svg
            viewBox="0 0 100 200"
            className="w-9 h-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform"
          >
            {/* The Wooden Peel Paddle Head */}
            <path
              d="M 28 10 C 28 5, 72 5, 72 10 L 72 60 C 72 68, 54 68, 54 75 L 53 75 L 53 190 C 53 194, 47 194, 47 190 L 47 75 L 46 75 C 46 68, 28 68, 28 60 Z"
              fill="#1A1A00"
              stroke="#FFFFCC"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Wood Texture Accent Lines on Peel Head */}
            <path
              d="M 38 20 L 38 52 M 50 15 L 50 55 M 62 20 L 62 52"
              stroke="#FFFFCC"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
        
        {/* Helper text */}
        <span className="text-[8px] font-sans font-black text-[#1A1A00] uppercase tracking-[0.25em] mt-1 group-hover:scale-110 transition-transform">
          HOCH
        </span>
      </button>
    </>
  );
}
