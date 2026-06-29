import { useState, useEffect, useRef } from 'react';
import { Award, Clock, MapPin, Wheat } from 'lucide-react';

export default function Unternehmen() {
  const [hover, setHover] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax effect on hero
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="unternehmen" className="min-h-screen">
      {/* ─── HERO ─── */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-10 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/uberuns.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/50 via-dark-700/30 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
              Seit 2006 in Zürich
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-5 leading-[1.1] animate-fade-in" style={{ animationDelay: '100ms' }}>
              Unsere <br />
              <span className="text-gold-gradient">Geschichte</span>
            </h1>
            <div className="divider-gold w-20 animate-fade-in" style={{ animationDelay: '200ms' }} />
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 1 ─── */}
      <div className="relative py-24 bg-dark-700 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/[0.02] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text - left */}
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-gold-400/20 flex items-center justify-center">
                  <Wheat className="w-5 h-5 text-gold-400" />
                </div>
                <span className="text-gold-400/60 font-sans text-xs tracking-[0.3em] uppercase">Die Anfänge</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                Tradition trifft <span className="text-gold-gradient">Leidenschaft</span>
              </h2>

              <div className="space-y-6 text-white/50 font-sans text-base leading-[1.8]">
                <p>
                  Die Bäckerei Happy wurde im Jahre <span className="text-white/80 font-medium">2006</span> von der
                  Familie Aydin gegründet. Die Anfänge der Konditorbäckerei Aydin liegen jedoch
                  <span className="text-gold-400/80"> mehrere Generationen</span> zurück. Dabei wird grosser Wert
                  gelegt auf handwerkliches Können und auf die Einhaltung altbewährter Rezepte, die für den hohen
                  Qualitätsanspruch all unserer Produkte stehen.
                </p>
                <p>
                  Ein Handwerk, das stets mit der Tradition verwurzelt ist, denn nur die besten und genau
                  geprüften Rohstoffe gelangen zur Verarbeitung für die vielen Produkte aus Bäckerei und Konditorei.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mt-10 pl-6 border-l-2 border-gold-400/30">
                <p className="text-white/60 font-serif italic text-lg leading-relaxed">
                  „Nur die besten Zutaten und echtes Handwerk machen den Unterschied."
                </p>
                <cite className="block mt-3 text-gold-400/50 font-sans text-sm not-italic">
                  — Familie Aydin, Gründer
                </cite>
              </blockquote>
            </div>

            {/* Image - right */}
            <div className="lg:col-span-5 reveal" style={{ animationDelay: '200ms' }}>
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onTouchStart={() => setHover(true)}
                onTouchEnd={() => setHover(false)}
                onTouchCancel={() => setHover(false)}
                onClick={() => setHover((v) => !v)}
                role="button"
                aria-label="Bild wechseln"
              >
                {/* Decorative frame */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-gold-400/10 rounded-2xl" />
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold-400/5 rounded-2xl" />

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  {/* Glowing gold shimmer line at the top of the image */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-400 via-amber-300 to-gold-400 animate-shimmer z-30" />
                  
                  {/* Single image — grayscale by default, color on hover */}
                  <img
                    src="/uberuns.jpg"
                    alt="Happy Beck Bäckerei"
                    className={`absolute inset-0 w-full h-full object-cover z-0 transform-gpu transition-all duration-750 ${
                      hover ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      filter: hover ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(75%)',
                      WebkitFilter: hover ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(75%)'
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-700/60 via-transparent to-transparent z-20" />

                  {/* Gold border glow on hover */}
                  <div className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition-all duration-500 z-30 ${
                    hover ? 'border-gold-400/40 shadow-[inset_0_0_60px_rgba(212,175,55,0.08)]' : 'border-white/5'
                  }`} />

                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <p className={`font-serif text-sm italic transition-all duration-500 ${
                      hover ? 'text-gold-400' : 'text-white/60'
                    }`}>
                      {hover ? '❝ In voller Farbe ❞' : '❝ Familie Aydin ❞'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 2 ─── */}
      <div className="relative py-24 bg-dark-800 overflow-hidden">
        {/* Full-width image band */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Home.jpg')" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Large number */}
            <div className="lg:col-span-4 reveal text-center lg:text-left">
              <div className="inline-block">
                <p className="text-[120px] md:text-[160px] font-serif font-bold text-gold-gradient leading-none">
                  20
                </p>
                <p className="text-gold-400/60 font-sans text-sm tracking-[0.3em] uppercase mt-2">
                  Jahre Erfahrung
                </p>
              </div>
            </div>

            {/* Text - right */}
            <div className="lg:col-span-8 reveal" style={{ animationDelay: '200ms' }}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                Von Zürich in die <span className="text-gold-gradient">ganze Schweiz</span>
              </h2>

              <div className="space-y-6 text-white/50 font-sans text-base leading-[1.8]">
                <p>
                  Die erste Happy-Filiale öffnete in Zürich an der <span className="text-white/80 font-medium">Dienerstrasse</span> ihre
                  Türen. Unter guter Regie blühte die Bäckerei richtig auf. Aydins Ruf verbreitete sich weit über
                  Zürich hinaus, und es wurden mehrere Filialen eröffnet.
                </p>
                <p>
                  Heute kommt man sowohl in Filialen im Raum Zürich als auch in der Gesamtschweiz in den Genuss
                  der breit gefächerten <span className="text-gold-400/80">Happy-Produktpalette</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATS / HIGHLIGHTS ─── */}
      <div className="py-20 bg-dark-700">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, value: '2006', label: 'Gegründet' },
              { icon: <MapPin className="w-5 h-5" />, value: 'Zürich', label: 'Hauptsitz' },
              { icon: <Wheat className="w-5 h-5" />, value: '24h', label: 'Geöffnet' },
              { icon: <Award className="w-5 h-5" />, value: '20+', label: 'Jahre Tradition' },
            ].map((stat, i) => (
              <div
                key={i}
                className="reveal glass-card p-6 text-center group hover:glow-gold transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full border border-gold-400/20 flex items-center justify-center mx-auto mb-4 text-gold-400 group-hover:border-gold-400/40 group-hover:bg-gold-400/5 transition-all">
                  {stat.icon}
                </div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/30 font-sans text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── VALUES SECTION ─── */}
      <div className="py-24 bg-dark-800">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Unsere Werte
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Was uns <span className="text-gold-gradient">antreibt</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01',
                title: 'Handwerkskunst',
                text: 'Jedes Produkt wird mit der gleichen Sorgfalt und Hingabe hergestellt, wie es unsere Vorfahren vor Generationen getan haben.',
              },
              {
                num: '02',
                title: 'Frische & Qualität',
                text: 'Nur die besten und genau geprüften Rohstoffe gelangen zur Verarbeitung — täglich frisch, ohne Kompromisse.',
              },
              {
                num: '03',
                title: 'Innovation',
                text: 'Wir bewahren die Tradition und wagen gleichzeitig Neues. So entstehen Kreationen, die überraschen und begeistern.',
              },
            ].map((value, i) => (
              <div
                key={i}
                className="reveal glass-card p-8 md:p-10 flex items-start gap-8 group hover:glow-gold transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl md:text-5xl font-serif font-bold text-gold-400/20 group-hover:text-gold-400/40 transition-colors flex-shrink-0">
                  {value.num}
                </span>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/40 font-sans text-sm leading-relaxed">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
