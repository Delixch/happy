import { useEffect, useState } from 'react';
import { Clock, MapPin, Briefcase, Mail, Loader2 } from 'lucide-react';
import { supabase, type Job } from '../lib/supabase';

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
        if (data) setJobs(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="jobs" className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/default-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/60 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Werden Sie Teil unseres Teams
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
              Karriere
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-white/50 font-sans text-lg mb-2">Zurzeit keine offenen Stellen.</p>
            <p className="text-white/30 font-sans text-sm">
              Schauen Sie bald wieder vorbei oder senden Sie uns eine Initiativbewerbung an{' '}
              <a href="mailto:info@happybeck.ch" className="text-gold-400 hover:underline">info@happybeck.ch</a>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="glass-card overflow-hidden">
                {/* Gold accent top */}
                <div className="h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {job.location && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-300 text-white/50 text-xs font-sans border border-white/5">
                            <MapPin className="w-3 h-3 text-gold-400" /> {job.location}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-300 text-white/50 text-xs font-sans border border-white/5">
                          <Briefcase className="w-3 h-3 text-gold-400" /> {job.type}
                        </span>
                        {job.shift && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-300 text-white/50 text-xs font-sans border border-white/5">
                            <Clock className="w-3 h-3 text-gold-400" /> {job.shift}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-gold-400/10 text-gold-400 text-xs font-sans font-semibold uppercase tracking-wider rounded-full border border-gold-400/20">
                      Offen
                    </span>
                  </div>

                  <div className="divider-gold mb-8" />

                  <p className="text-white/60 font-sans leading-relaxed mb-8">
                    {job.description}
                  </p>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-lg font-serif font-semibold text-white mb-4">
                        Anforderungen
                      </h3>
                      <ul className="space-y-3">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/50 font-sans text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={`mailto:info@happybeck.ch?subject=Bewerbung: ${job.title}`}
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Jetzt bewerben
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
