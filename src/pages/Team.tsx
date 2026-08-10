import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';
import { Reveal } from '../components/motion/Reveal';

/** Photo, role and description for one person. Used inline on mobile. */
function MemberDetails({ member }: { member: TeamMember }) {
  return (
    <div className="flex gap-4 rounded-2xl panel-inset border border-[#FFFFCC]/10 p-4">
      {/* Drops in like a blind being let down */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="w-[110px] h-[145px] flex-shrink-0 rounded-xl overflow-hidden border border-[#FFFFCC]/20 bg-[#1A1A00] shadow-lg"
      >
        <motion.div
          initial={{ y: -18 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full h-full"
        >
          {member.image_url ? (
            <img src={member.image_url} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#FFFFCC]/60">
              <Users className="w-8 h-8" />
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="min-w-0 flex-1"
      >
        <p className="font-serif font-black text-[#FFFFCC] text-lg leading-tight mb-2 normal-case tracking-normal">
          {member.name}
        </p>
        <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FFFFCC] text-[#1A1A00] font-sans font-bold text-[9px] uppercase tracking-wider mb-3">
          {member.role}
        </span>
        <p className="text-white/70 font-sans text-xs leading-[1.7] font-normal normal-case tracking-normal">
          {member.description || 'Keine Beschreibung vorhanden.'}
        </p>
      </motion.div>
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /** On mobile the details open inline under the row, so tapping the same name
      again closes it, and opening brings that row to the top of the screen —
      otherwise the panel unfolds below the fold. */
  const selectMember = (idx: number) => {
    const isMobile = window.innerWidth < 1024;
    const closing = isMobile && currentIndex === idx;
    setCurrentIndex(closing ? -1 : idx);

    if (isMobile && !closing) {
      const id = members[idx]?.id;
      requestAnimationFrame(() => {
        rowRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
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

  // currentIndex goes to -1 when a mobile row is collapsed; the desktop card
  // always needs somebody to show.
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeMember = members[activeIndex];

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

  return (
    <section id="team" className="min-h-screen bg-[#FFFFCC] pt-14 md:pt-16 pb-20">
      {/* ─── HERO HEADER ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/f_auto,q_auto/v1785404776/2_bxyceq.mp4"
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
        <Reveal className="text-[#1A1A00] text-center mb-8">
          <p className="font-sans max-w-2xl mx-auto leading-relaxed font-semibold text-base md:text-lg">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </Reveal>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#1A1A00] p-12 text-center rounded-3xl shadow-xl border border-white/20">
            <p className="text-white font-sans text-lg font-medium">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          /* Two stacked cards: who you are looking at, then everyone else.
             The first sticks so picking a name near the bottom of the list
             still updates something you can see. */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start mt-16 lg:mt-20 mb-6">

            {/* CARD 1 — photo beside the person's details. Desktop only: on
                mobile the same details open inline under the tapped name. */}
            <Reveal className="hidden lg:block panel-light rounded-3xl p-6 border border-[#FFFFCC]/15 shadow-2xl lg:sticky lg:top-20 z-10">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div
              ref={deckRef}
              className="relative w-[150px] h-[195px] sm:w-[170px] sm:h-[220px] flex-shrink-0 mx-auto sm:mx-0 select-none scroll-mt-24"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Stacked Cards */}
              <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
                {members.map((member, index) => {
                  const isCurrent = index === activeIndex;
                  const offset = (index - activeIndex + totalMembers) % totalMembers;
                  
                  // Stack offsets for non-active cards behind
                  let translateX = 0;
                  let translateY = 0;
                  let scale = 1;
                  let opacity = 1;
                  const zIndex = totalMembers - offset;

                  if (offset === 0) {
                    // Top active card
                    translateX = 0;
                    translateY = 0;
                    scale = 1;
                    opacity = 1;
                  } else if (offset === 1) {
                    // 1st card behind
                    translateX = -12;
                    translateY = -11;
                    scale = 0.94;
                    opacity = 0.75;
                  } else if (offset === 2) {
                    // 2nd card behind
                    translateX = -22;
                    translateY = -20;
                    scale = 0.88;
                    opacity = 0.5;
                  } else {
                    // Remaining cards deeper behind
                    translateX = -30;
                    translateY = -28;
                    scale = 0.82;
                    opacity = 0.25;
                  }

                  return (
                    <div
                      key={member.id}
                      onClick={() => selectMember(index)}
                      onMouseMove={(e) => {
                        if (!isCurrent) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const rx = (y / rect.height - 0.5) * -18; // Pure subtle tilt X
                        const ry = (x / rect.width - 0.5) * 18;  // Pure subtle tilt Y
                        e.currentTarget.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`;
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) return;
                        e.currentTarget.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale}) rotateX(0deg) rotateY(0deg)`;
                      }}
                      className="absolute inset-0 bg-[#1A1A00] rounded-3xl overflow-hidden shadow-2xl border border-[#FFFFCC]/20 transition-all duration-500 ease-out cursor-pointer group"
                      style={{
                        zIndex,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`,
                        opacity,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Subtle Clean Holographic Glare Overlay (Lightswind PRO Style) */}
                      {isCurrent && (
                        <div 
                          className="absolute inset-0 pointer-events-none z-30 opacity-25 group-hover:opacity-45 transition-opacity duration-300 rounded-3xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,204,0.4) 0%, transparent 50%, rgba(255,255,204,0.1) 100%)',
                          }}
                        />
                      )}

                      {/* Full Photo */}
                      {member.image_url ? (
                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1A1A00] text-[#FFFFCC]">
                          <Users className="w-20 h-20" />
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>

              {/* Details for the selected person */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#FFFFCC]/60">
                    Happy Beck Team Deck
                  </span>
                  <span className="text-[11px] font-sans font-bold text-[#1A1A00] bg-[#FFFFCC] px-3 py-1 rounded-full tabular-nums">
                    {activeIndex + 1} / {totalMembers}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FFFFCC] mb-3 leading-tight">
                  {activeMember?.name}
                </h2>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFFCC] text-[#1A1A00] font-sans font-bold text-[11px] uppercase tracking-wider">
                    {activeMember?.role || 'Team'}
                  </span>
                </div>

                <p className="text-white/70 font-sans text-sm leading-[1.75]">
                  {activeMember?.description || 'Keine Beschreibung vorhanden.'}
                </p>
              </div>
            </div>
            </Reveal>

            {/* CARD 2 — everyone else */}
            <Reveal className="panel-light rounded-3xl p-6 border border-[#FFFFCC]/15 shadow-2xl">
              <div className="space-y-1.5">
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#FFFFCC]/50 mb-3">
                  Team auswählen
                </p>

                {members.map((member, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={member.id}
                      ref={(el) => { rowRefs.current[member.id] = el; }}
                      className="scroll-mt-20"
                    >
                      <button
                        onClick={() => selectMember(idx)}
                        aria-expanded={isActive}
                        className={`w-full px-3 py-2 rounded-xl font-sans font-bold text-[11px] uppercase tracking-wider flex items-center justify-between gap-3 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-[#FFFFCC] text-[#1A1A00] shadow-lg lg:translate-x-1.5'
                            : 'panel-item text-[#FFFFCC]/75 hover:text-[#FFFFCC] lg:hover:translate-x-1 border border-[#FFFFCC]/10'
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#1A1A00]' : 'bg-[#FFFFCC]/35'}`} />
                          <span className="truncate">{member.name}</span>
                        </span>
                        <span className="text-[9px] opacity-70 font-sans tracking-normal normal-case flex-shrink-0">
                          {member.role}
                        </span>
                      </button>

                      {/* Mobile: the details open right here, so nobody has to
                          scroll back up to see who they just tapped. */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            className="lg:hidden overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="pt-2.5">
                              <MemberDetails member={member} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                {/* Join Us CTA Box Inside Right Panel (Matching Exact Styling & Alignment) */}
                <div className="mt-6 text-center panel-inset rounded-2xl p-5 border border-[#FFFFCC]/10">
                  <h4 className="text-lg font-serif font-black text-[#FFFFCC] mb-1">
                    Werden Sie Teil unseres Teams
                  </h4>
                  <p className="text-white/60 font-sans text-xs mb-4">
                    Wir suchen immer motivierte Menschen, die unsere Leidenschaft teilen.
                  </p>
                  <a
                    href="/jobs"
                    className="w-full py-3 px-6 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all duration-300 inline-block text-center cursor-pointer"
                  >
                    Offene Stellen ansehen →
                  </a>
                </div>
              </div>

            </Reveal>

          </div>
        )}
      </div>
    </section>
  );
}
