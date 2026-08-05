import { useState } from 'react';

export default function ChefMascotBug() {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div
      className="fixed bottom-24 left-6 z-30"
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
    >
      {showBubble && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#1A1A00] text-[#FFFFCC] text-xs font-sans font-bold whitespace-nowrap shadow-xl animate-scale-in">
          Frisch aus dem Ofen! 👋
        </div>
      )}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFFFCC] border-2 border-[#1A1A00] shadow-xl overflow-hidden animate-float flex items-center justify-center">
        <img
          src="/b2.png"
          alt="Happy Beck Chefkoch"
          className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </div>
  );
}
