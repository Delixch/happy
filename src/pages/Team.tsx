import { useEffect, useState, useCallback } from 'react';
import { Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
    <section id="team" className="min-h-screen bg-[#FFBB00] pt-16 pb-20">
      {/* ─── HERO HEADER ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785404776/2_bxyceq.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10 z-20">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E293B] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Das Herz von Happy Beck
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unser <span className="text-[#FFBB00] [-webkit-text-stroke:1px_#474150]" style={{ paintOrder: 'stroke fill' }}>Team</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-6xl">
        <div className="text-[#231E2A] text-center mb-8">
          <p className="font-sans max-w-2xl mx-auto leading-relaxed font-semibold text-base md:text-lg">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1E293B] animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#1E293B] p-12 text-center rounded-3xl shadow-xl border border-white/20">
            <p className="text-white font-sans text-lg font-medium">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden py-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Carousel Stage */}
            <div className="w-full max-w-4xl relative h-[400px] md:h-[450px] flex items-center justify-center perspective-[1000px]">
              
              {/* Navigation Arrows */}
              <button
                onClick={() => paginate(-1)}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-[#1E293B] hover:bg-[#FFBB00] text-[#FFBB00] hover:text-[#1E293B] w-12 h-12 rounded-full flex items-center justify-center z-30 transition-all duration-300 shadow-2xl border border-white/20 hover:scale-110 cursor-pointer"
                aria-label="Vorheriges Mitglied"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <button
                onClick={() => paginate(1)}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-[#1E293B] hover:bg-[#FFBB00] text-[#FFBB00] hover:text-[#1E293B] w-12 h-12 rounded-full flex items-center justify-center z-30 transition-all duration-300 shadow-2xl border border-white/20 hover:scale-110 cursor-pointer"
                aria-label="Nächstes Mitglied"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* 3D Cards Track */}
              <div className="w-full h-full relative flex items-center justify-center">
                {members.map((member, index) => {
                  const pos = calculatePosition(index);
                  if (pos === 'hidden') return null;

                  let style: React.CSSProperties = {};
                  if (pos === 'center') {
                    style = {
                      zIndex: 20,
                      transform: 'translateX(0) scale(1.05)',
                      opacity: 1,
                      filter: 'grayscale(0%)',
                    };
                  } else if (pos === 'right-1') {
                    style = {
                      zIndex: 10,
                      transform: 'translateX(45%) scale(0.82)',
                      opacity: 0.65,
                      filter: 'grayscale(100%)',
                    };
                  } else if (pos === 'left-1') {
                    style = {
                      zIndex: 10,
                      transform: 'translateX(-45%) scale(0.82)',
                      opacity: 0.65,
                      filter: 'grayscale(100%)',
                    };
                  } else if (pos === 'right-2') {
                    style = {
                      zIndex: 5,
                      transform: 'translateX(85%) scale(0.68)',
                      opacity: 0.3,
                      filter: 'grayscale(100%)',
                    };
                  } else if (pos === 'left-2') {
                    style = {
                      zIndex: 5,
                      transform: 'translateX(-85%) scale(0.68)',
                      opacity: 0.3,
                      filter: 'grayscale(100%)',
                    };
                  }

                  return (
                    <div
                      key={member.id}
                      onClick={() => {
                        if (index !== currentIndex) {
                          setCurrentIndex(index);
                        }
                      }}
                      className="absolute w-[240px] sm:w-[290px] h-[330px] sm:h-[390px] bg-[#1E293B] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 transition-all duration-500 ease-out cursor-pointer group"
                      style={style}
                    >
                      {/* 2px Animated Scanning Top Line */}
                      <div className="h-[2px] w-full bg-black/20 relative overflow-hidden flex-shrink-0 z-20">
                        <div className="absolute inset-0 bg-[#FFBB00] animate-line-scan w-full h-full shadow-[0_0_12px_#FFBB00]" />
                      </div>

                      {/* Full Background Photo */}
                      {member.image_url ? (
                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1E293B] text-[#FFBB00]">
                          <Users className="w-20 h-20" />
                        </div>
                      )}

                      {/* Bottom Overlay Info Gradient */}
                      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center z-10">
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-white drop-shadow-md">
                          {member.name}
                        </h3>
                        <p className="font-sans text-xs uppercase font-black tracking-widest text-[#FFBB00] mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Member Full Bio / Details Card below */}
            {members[currentIndex] && (
              <div className="w-full max-w-2xl mt-8 bg-[#1E293B] rounded-3xl p-8 shadow-2xl border-2 border-white/20 text-center animate-scale-in">
                <span className="inline-block px-4 py-1 rounded-full bg-[#FFBB00] text-[#1E293B] font-sans text-xs font-black uppercase tracking-wider mb-3 shadow-md">
                  {members[currentIndex].role}
                </span>
                <h2 className="text-3xl font-serif font-black text-white mb-3">
                  {members[currentIndex].name}
                </h2>
                <p className="text-white/90 font-sans text-sm md:text-base leading-relaxed font-medium">
                  {members[currentIndex].description || 'Keine Beschreibung vorhanden.'}
                </p>
              </div>
            )}

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2.5 mt-8">
              {members.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-[#1E293B]' : 'w-3 bg-[#1E293B]/40 hover:bg-[#1E293B]/70'
                  }`}
                  aria-label={`Gehe zu Mitglied ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Join us CTA */}
        <div className="mt-14 text-center">
          <div className="bg-[#1E293B] inline-block px-10 sm:px-14 py-10 rounded-3xl shadow-2xl border-2 border-white/20">
            <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-3">
              Werden Sie Teil unseres Teams
            </h3>
            <p className="text-white/90 font-sans text-sm md:text-base mb-6 max-w-md mx-auto font-medium">
              Wir suchen immer motivierte Menschen, die unsere Leidenschaft für gutes Brot teilen.
            </p>
            <a
              href="/jobs"
              className="inline-block px-8 py-3.5 rounded-2xl bg-[#FFBB00] text-[#1E293B] font-sans font-black text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all duration-300"
            >
              Offene Stellen ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
