import { useEffect, useState } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

// Same dark-to-light cascading palette used on the Speisekarte (Menu.tsx)
const PALETTES = [
  { bg: '#431407', bg2: '#1F0900', accent: '#FFBB00' },
  { bg: '#7C2D12', bg2: '#431407', accent: '#FFBB00' },
  { bg: '#9A3412', bg2: '#7C2D12', accent: '#FFBB00' },
  { bg: '#C2410C', bg2: '#9A3412', accent: '#FFBB00' },
  { bg: '#EA580C', bg2: '#C2410C', accent: '#FFBB00' },
];

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  const activeMember = members.find((m) => m.id === activeId) ?? members[0];
  const activeIndex = activeMember ? members.findIndex((m) => m.id === activeMember.id) : 0;
  const activePalette = PALETTES[activeIndex % PALETTES.length];

  const [activeTop, setActiveTop] = useState(0);

  useEffect(() => {
    const updateActiveTop = () => {
      if (!activeMember) return;
      const cardEl = document.getElementById(`card-${activeMember.id}`);
      const containerEl = document.getElementById('team-container');
      if (cardEl && containerEl) {
        const cardRect = cardEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setActiveTop(cardRect.top - containerRect.top);
      }
    };

    updateActiveTop();
    window.addEventListener('resize', updateActiveTop);
    return () => window.removeEventListener('resize', updateActiveTop);
  }, [activeId, activeMember, members]);

  return (
    <section id="team" className="pt-14 md:pt-16 min-h-screen w-full bg-warm-yellow overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Unser <span className="text-[#FFBB00] [-webkit-text-stroke:1px_#474150]" style={{ paintOrder: 'stroke fill' }}>Team</span>
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#474150] animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#474150]/85 backdrop-blur-xl p-12 text-center rounded-3xl shadow-xl border border-[#FFBB00]/20">
            <p className="text-white font-sans text-lg font-medium">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          <div id="team-container" className="relative flex flex-col lg:flex-row gap-10 items-start">

            {/* Desktop: circle profile picture smoothly sliding vertically to match the active member's row top */}
            <div className="hidden lg:block w-56 flex-shrink-0 relative">
              <div
                className="absolute left-0 right-0 transition-all duration-500 ease-in-out flex flex-col items-center text-center"
                style={{ top: `${activeTop}px` }}
              >
                <div
                  className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 mx-auto transition-colors duration-500"
                  style={{ borderColor: activePalette.accent }}
                >
                  {activeMember?.image_url ? (
                    <img src={activeMember.image_url} alt={activeMember.name} className="w-full h-full object-cover transition-all duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: activePalette.accent }}>
                      <Users className="w-16 h-16" style={{ color: activePalette.bg }} />
                    </div>
                  )}
                </div>
                {activeMember && (
                  <div className="text-center mt-4">
                    <p className="font-serif font-black text-xl text-[#1E293B]">{activeMember.name}</p>
                    <p className="font-sans text-xs uppercase font-black tracking-widest text-[#1E293B]/60 mt-1">{activeMember.role}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Card list */}
            <div className="flex-1 w-full space-y-4">
              {members.map((member, i) => {
                const palette = PALETTES[i % PALETTES.length];
                const isActive = activeMember.id === member.id;
                return (
                  <div id={`card-${member.id}`} key={member.id} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>

                    {/* Mobile: photo panel opens above the card when tapped */}
                    <div
                      className={`lg:hidden overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[240px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="rounded-t-3xl p-6 flex justify-center" style={{ backgroundColor: palette.bg2 }}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-xl" style={{ borderColor: palette.accent }}>
                          {member.image_url ? (
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: palette.accent }}>
                              <Users className="w-8 h-8" style={{ color: palette.bg }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onMouseEnter={() => setActiveId(member.id)}
                      onClick={() => setActiveId(member.id)}
                      className={`w-full text-left rounded-3xl p-6 shadow-xl transition-all duration-300 cursor-pointer ${
                        isActive ? 'ring-2 ring-[#FFBB00]' : ''
                      } ${isActive ? 'lg:rounded-3xl rounded-t-none' : ''}`}
                      style={{ background: `linear-gradient(135deg, ${palette.bg} 0%, ${palette.bg2} 100%)` }}
                    >
                      <h3 className="text-xl font-serif font-black mb-1" style={{ color: palette.accent }}>
                        {member.name}
                      </h3>
                      <p className="font-sans text-xs uppercase font-black tracking-widest mb-3 text-white/70">
                        {member.role}
                      </p>
                      <p className="text-white font-sans text-sm leading-relaxed line-clamp-3 font-medium opacity-95">
                        {member.description}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
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
