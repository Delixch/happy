import { useEffect, useState, useRef } from 'react';
import { Users, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';

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
    <section id="team" className="pt-20 min-h-screen overflow-hidden">
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
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-dark-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3 animate-fade-in">
              Die Menschen hinter Happy Beck
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white animate-fade-in" style={{ animationDelay: '100ms' }}>
              Unser Team
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-6xl">
        <div className="text-center mb-10 reveal">
          <p className="text-white/50 font-sans max-w-2xl mx-auto leading-relaxed">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </div>

        {/* Carousel controls - visible if there are members */}
        {!loading && members.length > 0 && (
          <div className="flex justify-end gap-3 mb-6 reveal">
            <button
              onClick={() => scrollSlider('left')}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-gold-400/50 flex items-center justify-center text-white/50 hover:text-gold-400 transition-all hover:bg-white/5 cursor-pointer"
              aria-label="Nach links scrollen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-gold-400/50 flex items-center justify-center text-white/50 hover:text-gold-400 transition-all hover:bg-white/5 cursor-pointer"
              aria-label="Nach rechts scrollen"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white/30 font-sans">Team wird bald vorgestellt.</p>
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
            {members.map((member, i) => (
              <div
                key={member.id}
                className="reveal glass-card p-8 text-center group hover:glow-gold transition-all duration-500 hover:-translate-y-1 flex-shrink-0 w-[290px] sm:w-[320px] snap-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {member.image_url ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-gold-400/20 group-hover:ring-gold-400/40 transition-all pointer-events-none">
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border border-gold-400/20 flex items-center justify-center mx-auto mb-6 text-gold-400 group-hover:border-gold-400/40 group-hover:bg-gold-400/5 transition-all duration-300 pointer-events-none">
                    <Users className="w-7 h-7" />
                  </div>
                )}
                <h3 className="text-xl font-serif font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gold-400/70 font-sans text-xs uppercase tracking-wider mb-4">
                  {member.role}
                </p>
                <div className="divider-gold w-12 mx-auto mb-4" />
                <p className="text-white/40 font-sans text-sm leading-relaxed line-clamp-4">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Join us CTA */}
        <div className="mt-16 text-center reveal">
          <div className="glass-card inline-block px-12 py-10">
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Werden Sie Teil unseres Teams
            </h3>
            <p className="text-white/40 font-sans text-sm mb-6 max-w-md">
              Wir suchen immer motivierte Menschen, die unsere Leidenschaft für gutes Brot teilen.
            </p>
            <a href="/jobs" className="btn-gold-outline inline-block">
              Offene Stellen ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
