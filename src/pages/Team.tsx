import { useEffect, useState, useCallback, useRef } from 'react';
import { Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const selectMember = (idx: number) => {
    setCurrentIndex(idx);
    if (window.innerWidth < 1024 && deckRef.current) {
      deckRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    supabase
      .from('team_members')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setMembers(data);
        setLoading(false);
      });
  }, []);

  const totalMembers = members.length;

  const paginate = useCallback(
    (newDirection: number) => {
      if (totalMembers === 0) return;
      setCurrentIndex((prev) => (prev + newDirection + totalMembers) % totalMembers);
    },
    [totalMembers]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) paginate(1);
      else paginate(-1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const wrapIndex = (index: number) => (index + totalMembers) % totalMembers;

  const calculatePosition = (index: number) => {
    const activeIndex = currentIndex;
    const diff = wrapIndex(index - activeIndex);
    if (diff === 0) return 'center';
    if (diff === 1 || diff === totalMembers - 1) return diff === 1 ? 'right-1' : 'left-1';
    if (diff === 2 || diff === totalMembers - 2) return diff === 2 ? 'right-2' : 'left-2';
    return 'hidden';
  };

  return (
    <section id="team" className="min-h-screen bg-[#FFFFCC] pt-14 md:pt-16 pb-20">
      {/* ─── HERO HEADER ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785404776/2_bxyceq.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10 z-20">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Das Herz von Happy Beck
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unser <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Team</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-6xl">
        <div className="text-[#1A1A00] text-center mb-8">
          <p className="font-sans max-w-2xl mx-auto leading-relaxed font-semibold text-base md:text-lg">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#1A1A00] p-12 text-center rounded-3xl shadow-xl border border-white/20">
            <p className="text-white font-sans text-lg font-medium">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          /* ── 2-COLUMN LIGHTSWIND PRO HOLOGRAPHIC DECK LAYOUT ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6">
            
            {/* LEFT COLUMN: 3D Holographic Stacked Deck (Preserves Mobile mt-0 Intact, Shifts Higher Up Only on Desktop) */}
            <div 
              ref={deckRef}
              className="lg:col-span-6 relative h-[380px] sm:h-[430px] flex items-center justify-center select-none mt-0 lg:-mt-[420px] scroll-mt-24"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Stacked Cards */}
              <div className="relative w-[280px] sm:w-[330px] h-[370px] sm:h-[430px] flex items-center justify-center perspective-[1200px]">
                {members.map((member, index) => {
                  const isCurrent = index === currentIndex;
                  const offset = (index - currentIndex + totalMembers) % totalMembers;
                  
                  // Stack offsets for non-active cards behind
                  let translateX = 0;
                  let translateY = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = totalMembers - offset;

                  if (offset === 0) {
                    // Top active card
                    translateX = 0;
                    translateY = 0;
                    scale = 1;
                    opacity = 1;
                  } else if (offset === 1) {
                    // 1st card behind
                    translateX = -28;
                    translateY = -24;
                    scale = 0.94;
                    opacity = 0.85;
                  } else if (offset === 2) {
                    // 2nd card behind
                    translateX = -52;
                    translateY = -46;
                    scale = 0.88;
                    opacity = 0.65;
                  } else {
                    // Remaining cards deeper behind
                    translateX = -70;
                    translateY = -65;
                    scale = 0.82;
                    opacity = 0.35;
                  }

                  return (
                    <div
                      key={member.id}
                      onClick={() => setCurrentIndex(index)}
                      onMouseMove={(e) => {
                        if (!isCurrent) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const rx = (y / rect.height - 0.5) * -24; // Tilt X
                        const ry = (x / rect.width - 0.5) * 24;  // Tilt Y
                        e.currentTarget.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`;
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) return;
                        e.currentTarget.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale}) rotateX(0deg) rotateY(0deg)`;
                      }}
                      className="absolute inset-0 bg-[#1A1A00] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFFFCC]/40 transition-all duration-500 ease-out cursor-pointer group"
                      style={{
                        zIndex,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`,
                        opacity,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Scanning Top Glow Line */}
                      <div className="h-[3px] w-full bg-black/30 relative overflow-hidden flex-shrink-0 z-20">
                        <div className="absolute inset-0 bg-[#FFFFCC] animate-line-scan w-full h-full shadow-[0_0_15px_#FFFFCC]" />
                      </div>

                      {/* 3D Holographic Rainbow Shimmer Foil */}
                      {isCurrent && (
                        <div 
                          className="absolute inset-0 pointer-events-none z-30 opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-3xl mix-blend-color-dodge"
                          style={{
                            background: 'linear-gradient(125deg, transparent 20%, rgba(255,255,204,0.7) 40%, rgba(255,187,0,0.9) 50%, rgba(255,255,204,0.7) 60%, transparent 80%)',
                            backgroundSize: '200% 200%',
                            animation: 'spinSlow 5s linear infinite'
                          }}
                        />
                      )}

                      {/* Full Photo */}
                      {member.image_url ? (
                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1A1A00] text-[#FFFFCC]">
                          <Users className="w-20 h-20" />
                        </div>
                      )}

                      {/* Card Overlay Text */}
                      <div 
                        className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-left z-20"
                        style={{ transform: isCurrent ? 'translateZ(35px)' : 'none' }}
                      >
                        <span className="inline-block px-3 py-1 rounded-full bg-[#FFFFCC] text-[#1A1A00] font-sans text-[10px] font-black uppercase tracking-wider mb-2">
                          {member.role}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight drop-shadow-md">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Lightswind PRO Holographic Control Deck Panel */}
            <div className="lg:col-span-6 bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-[#1A1A00]/20 shadow-2xl flex flex-col justify-between min-h-[440px]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-[#1A1A00]/70">
                    HAPPY BECK TEAM DECK
                  </span>
                  <span className="text-[11px] font-sans font-extrabold text-[#1A1A00] bg-[#FFFFCC] px-3 py-1 rounded-full border border-[#1A1A00]/15">
                    {currentIndex + 1} / {totalMembers}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A00] mb-2 leading-tight">
                  Unsere Mitarbeiter
                </h2>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-lg bg-[#1A1A00] text-[#FFFFCC] font-sans font-black text-[11px] uppercase tracking-wider">
                    {members[currentIndex]?.role || 'Team Member'}
                  </span>
                  <span className="text-xs font-sans text-[#1A1A00]/70 font-semibold">
                    Happy Beck Expert
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-black text-[#1A1A00] mb-3">
                  {members[currentIndex]?.name}
                </h3>

                <p className="text-[#1A1A00]/80 font-sans text-sm sm:text-base leading-relaxed font-medium mb-6">
                  {members[currentIndex]?.description || 'Keine Beschreibung vorhanden.'}
                </p>
              </div>

              {/* Interactive Layer Selection Deck Buttons (Lightswind PRO Style) */}
              <div className="space-y-2.5 pt-4 border-t border-[#1A1A00]/15">
                <p className="text-[10px] font-sans font-black uppercase tracking-widest text-[#1A1A00]/60 mb-1">
                  Klick zum Auswählen des Team-Mitglieds:
                </p>

                {members.map((member, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={member.id}
                      onClick={() => selectMember(idx)}
                      className={`w-full px-4 py-3 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1A00] text-[#FFFFCC] shadow-lg translate-x-2'
                          : 'bg-white/70 text-[#1A1A00] hover:bg-white hover:translate-x-1 border border-[#1A1A00]/10'
                      }`}
                    >
                      <span className="font-extrabold flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#FFFFCC] animate-ping' : 'bg-[#1A1A00]/30'}`} />
                        {member.name}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {member.role} →
                      </span>
                    </button>
                  );
                })}
                {/* Join Us CTA Box Inside Right Panel (Matching Exact Styling & Alignment) */}
                <div className="mt-6 pt-6 border-t border-[#1A1A00]/15 text-center bg-white/40 rounded-2xl p-5 border border-[#1A1A00]/10">
                  <h4 className="text-lg font-serif font-black text-[#1A1A00] mb-1">
                    Werden Sie Teil unseres Teams
                  </h4>
                  <p className="text-[#1A1A00]/80 font-sans text-xs mb-4 font-semibold">
                    Wir suchen immer motivierte Menschen, die unsere Leidenschaft teilen.
                  </p>
                  <a
                    href="/jobs"
                    className="w-full py-3 px-6 rounded-2xl bg-[#1A1A00] text-[#FFFFCC] font-sans font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] hover:bg-[#2A2A00] transition-all duration-300 inline-block text-center cursor-pointer"
                  >
                    Offene Stellen ansehen →
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </section>
  );
}
