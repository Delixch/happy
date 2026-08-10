import { useEffect, useState } from 'react';
import { Clock, MapPin, Briefcase, Mail, Loader2 } from 'lucide-react';
import { supabase, type Job } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';
import MarqueeTicker from '../components/MarqueeTicker';
import TiltCard from '../components/TiltCard';



const FALLBACK_JOBS: Job[] = [
  {
    id: 'sample-1',
    title: 'Bäcker / Konditor (m/w/d)',
    location: 'Zürich Langstrasse',
    type: 'Vollzeit (100%)',
    shift: 'Nacht- / Frühschicht',
    description: 'Für unsere traditionsreiche Bäckerei an der Langstrasse suchen wir einen leidenschaftlichen Bäcker, der unsere Kunden jeden Tag mit frischem Gipfeli, Handbrot und feinem Gebäck begeistert.',
    requirements: [
      'Abgeschlossene Ausbildung als Bäcker-Konditor EFZ oder mehrjährige Erfahrung',
      'Leidenschaft für handwerkliche Qualität & frische Backwaren',
      'Zuverlässigkeit und Freude an der Arbeit im Team',
      'Gute Deutschkenntnisse'
    ],
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Service- & Verkaufstalent (m/w/d)',
    location: 'Zürich Langstrasse',
    type: 'Vollzeit / Teilzeit (60-100%)',
    shift: 'Früh- / Spätschicht (24/7 Betrieb)',
    description: 'Du liebst den Kontakt mit Menschen und möchtest Teil des herzlichsten Teams in Zürich werden? Wir suchen aufgestellte Verkaufspersönlichkeiten für unser 24h-Bistrot.',
    requirements: [
      'Erfahrung im Verkauf, Gastronomie oder Kundenservice von Vorteil',
      'Freundliches, gepflegtes Auftreten und hohe Kundenorientierung',
      'Flexibilität für Schichtarbeit',
      'Fliessend Deutsch (Schweizerdeutsch von Vorteil)'
    ],
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  }
];

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(FALLBACK_JOBS);
        }
        setLoading(false);
      });
  }, []);

  return (
    <section id="jobs" className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/f_auto,q_auto/v1785404003/resmi_harketlendir_video_gibi_f3beop.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Werden Sie Teil unseres Teams
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Offene <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Stellen</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <MarqueeTicker
        items={[
          { text: '💼 Wir suchen dich – jetzt bewerben!', emphasis: true },
          { text: '🤝 Werde Teil des herzlichsten Teams an der Langstrasse.' },
          { text: '⏰ Flexible Schichten, faire Bezahlung.' },
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map((job) => (
              <TiltCard
                key={job.id}
                className="bg-[#1A1A00] backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif font-black text-[#FFFFCC] mb-3">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {job.location && (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 text-white/90 text-xs font-sans font-bold border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-[#FFFFCC]" /> {job.location}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 text-white/90 text-xs font-sans font-bold border border-white/10">
                          <Briefcase className="w-3.5 h-3.5 text-[#FFFFCC]" /> {job.type}
                        </span>
                        {job.shift && (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 text-white/90 text-xs font-sans font-bold border border-white/10">
                            <Clock className="w-3.5 h-3.5 text-[#FFFFCC]" /> {job.shift}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-[#FFFFCC] text-[#1A1A00] text-xs font-sans font-black uppercase tracking-wider rounded-full shadow-md">
                      JETZT OFFEN
                    </span>
                  </div>

                  <div className="w-full h-0.5 bg-white/10 my-6" />

                  <p className="text-white/90 font-sans text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-serif font-black text-white mb-3">
                        Anforderungen
                      </h3>
                      <ul className="space-y-2.5">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/80 font-sans text-xs md:text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-[#FFFFCC] mt-1.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={`mailto:info@happybeck.ch?subject=Bewerbung: ${job.title}`}
                    className="px-6 py-3.5 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                  >
                    <Mail className="w-4 h-4 fill-current" />
                    Jetzt bewerben
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
