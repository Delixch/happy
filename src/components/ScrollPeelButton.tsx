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

    const duration = 1800; // 1.8 seconds for a slow, premium car-like scroll
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeInOutCubic (starts slow, accelerates, then decelerates slowly at the top like a car)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    // Reset animation state after it completes (850ms)
    setTimeout(() => {
      setIsPushing(false);
    }, 850);
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
          15% {
            /* Pulling down/back to charge the push */
            transform: translateY(30px) scale(0.95);
            opacity: 1;
          }
          55% {
            /* Thrusting all the way up out of the viewport and fading out */
            transform: translateY(-400px) scale(1.1);
            opacity: 0;
            filter: drop-shadow(0 0 35px rgba(212,175,55,1));
          }
          99% {
            /* Still out of view and invisible */
            transform: translateY(-400px);
            opacity: 0;
          }
          100% {
            /* Return to home position while invisible and ready for next scroll */
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .peel-active-push {
          animation: peelVerticalPush 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
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
          {/* Custom SVG Bakery Peel with a long, elegant visible handle (Compact Size) */}
          <svg
            viewBox="0 0 100 200"
            className="w-10 h-20 text-gold-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] group-hover:text-gold-300 transition-colors"
          >
            {/* The Wooden Peel Paddle Head */}
            <path
              d="M 28 10 C 28 5, 72 5, 72 10 L 72 60 C 72 68, 54 68, 54 75 L 53 75 L 53 190 C 53 194, 47 194, 47 190 L 47 75 L 46 75 C 46 68, 28 68, 28 60 Z"
              fill="currentColor"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Wood Texture Accent Lines on Peel Head */}
            <path
              d="M 38 20 L 38 52 M 50 15 L 50 55 M 62 20 L 62 52"
              stroke="#B8860B"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>
        
        {/* Helper text */}
        <span className="text-[7px] font-sans font-bold text-gold-400/50 uppercase tracking-[0.25em] mt-1 group-hover:text-gold-400 transition-colors">
          HOCH
        </span>
      </button>
    </>
  );
}
