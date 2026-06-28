import { useEffect, useState } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { supabase, type TeamMember } from '../lib/supabase';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="team" className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-dark-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Die Menschen hinter Happy Beck
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
              Unser Team
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-5xl">
        <div className="text-center mb-16 reveal">
          <p className="text-white/50 font-sans max-w-2xl mx-auto leading-relaxed">
            Hinter jedem Gipfeli und jedem frischen Brot stehen engagierte Menschen,
            die mit Herz und Handwerk arbeiten. Lernen Sie unser Team kennen.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white/30 font-sans">Team wird bald vorgestellt.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, i) => (
              <div
                key={member.id}
                className="reveal glass-card p-8 text-center group hover:glow-gold transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {member.image_url ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-gold-400/20 group-hover:ring-gold-400/40 transition-all">
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border border-gold-400/20 flex items-center justify-center mx-auto mb-6 text-gold-400 group-hover:border-gold-400/40 group-hover:bg-gold-400/5 transition-all duration-300">
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
                <p className="text-white/40 font-sans text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Join us CTA */}
        <div className="mt-20 text-center reveal">
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
