import { useEffect, useState, useRef } from 'react';
import { Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [members]);

  // Drag scroll handlers for desktop mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    el.scrollLeft = scrollLeft - walk;
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 340; // Card width + gap
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="team" className="pt-14 md:pt-16 min-h-screen w-full bg-warm-yellow overflow-hidden">
      {/* Scrollbar hide styling */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785404776/2_bxyceq.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#474150]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#474150]/80 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#474150] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Die Menschen hinter Happy Beck
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unser <span className="text-[#FFBB00]">Team</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-14 max-w-6xl">
        <div className="text-center mb-10 reveal">
          <p className="text-[#231E2A] font-sans max-w-2xl mx-auto leading-relaxed font-semibold text-base md:text-lg">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </div>

        {/* Carousel controls - visible if there are members */}
        {!loading && members.length > 0 && (
          <div className="flex justify-end gap-3 mb-6 reveal">
            <button
              onClick={() => scrollSlider('left')}
              className="w-10 h-10 rounded-full bg-[#474150] text-white hover:bg-[#342F3C] flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110"
              aria-label="Nach links scrollen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-10 h-10 rounded-full bg-[#474150] text-white hover:bg-[#342F3C] flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110"
              aria-label="Nach rechts scrollen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#474150] animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#474150]/85 backdrop-blur-xl p-12 text-center rounded-3xl shadow-xl border border-[#FFBB00]/20">
            <p className="text-white font-sans text-lg font-medium">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          /* Draggable Swipeable Carousel Container */
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none w-full scroll-smooth`}
          >
            {members.map((member, i) => {
              // High contrast luxury color palettes for team member cards
              const palettes = [
                { bg: '#1E293B', accent: '#F59E0B', text: '#FFFFFF' }, // Navy Moka & Bright Amber
                { bg: '#0F766E', accent: '#FFD700', text: '#FFFFFF' }, // Emerald Teal & Gold
                { bg: '#881337', accent: '#FDE047', text: '#FFFFFF' }, // Velvet Crimson & Lemon
                { bg: '#312E81', accent: '#38BDF8', text: '#FFFFFF' }, // Midnight Indigo & Sky Blue
                { bg: '#78350F', accent: '#F43F5E', text: '#FFFFFF' }, // Warm Cinnamon & Rose
              ];
              const palette = palettes[i % palettes.length];

              return (
                <div
                  key={member.id}
                  className="reveal rounded-3xl overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#FFBB00]/25 group hover:scale-[1.04] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-500 flex-shrink-0 w-[290px] sm:w-[320px] snap-center flex flex-col justify-between relative"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    backgroundColor: `${palette.bg}D9`,
                  }}
                >
                  <div className="p-8 text-center flex-1 flex flex-col justify-between">
                    <div>
                      {member.image_url ? (
                        <div 
                          className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 shadow-xl pointer-events-none"
                          style={{ borderColor: palette.accent }}
                        >
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl pointer-events-none font-bold"
                          style={{ backgroundColor: palette.accent, color: '#1E293B' }}
                        >
                          <Users className="w-9 h-9" />
                        </div>
                      )}
                      <h3
                        className="text-2xl font-serif font-black mb-1 drop-shadow-sm"
                        style={{ color: palette.accent }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="font-sans text-xs uppercase font-black tracking-widest mb-4 text-white/70"
                      >
                        {member.role}
                      </p>
                      <div 
                        className="w-14 h-1.5 rounded-full mx-auto mb-4" 
                        style={{ backgroundColor: palette.accent }}
                      />
                    </div>
                    <p className="text-white font-sans text-sm leading-relaxed line-clamp-4 font-medium opacity-95">
                      {member.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Join us CTA */}
        <div className="mt-14 text-center reveal">
          <div className="bg-[#1E293B]/85 backdrop-blur-xl inline-block px-10 sm:px-14 py-10 rounded-3xl shadow-2xl border border-[#FFBB00]/20">
            <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-3">
              Werden Sie Teil unseres Teams
            </h3>
            <p className="text-white/90 font-sans text-sm md:text-base mb-6 max-w-md mx-auto font-medium">
              Wir suchen immer motivierte Menschen, die unsere Leidenschaft für gutes Brot teilen.
            </p>
            <a 
              href="/jobs" 
              className="inline-block px-8 py-3.5 rounded-2xl bg-[#F59E0B] text-[#1E293B] font-sans font-black text-sm tracking-wider uppercase shadow-xl hover:scale-105 hover:bg-[#FFAE33] transition-all duration-300"
            >
              Offene Stellen ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
