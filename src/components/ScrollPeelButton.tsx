import { useState, useEffect } from 'react';

export default function ScrollPeelButton() {
  const [visible, setVisible] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY;

      // Show when scrolled near the bottom (within 300px of page end)
      const isNearBottom = windowHeight + scrollPos >= docHeight - 300;
      setVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger check once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    if (isPushing) return;
    setIsPushing(true);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

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
          {/* Custom SVG Bakery Peel with a long, elegant visible handle */}
          <svg
            viewBox="0 0 100 200"
            className="w-14 h-28 text-gold-400 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] group-hover:text-gold-300 transition-colors"
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
        <span className="text-[8px] font-sans font-bold text-gold-400/60 uppercase tracking-[0.25em] mt-2 group-hover:text-gold-400 transition-colors">
          HOCH
        </span>
      </button>
    </>
  );
}
