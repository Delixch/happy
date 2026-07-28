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
      { threshold: 0.01 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => {
      observer.observe(el);
      // Fallback: force visible if already in viewport or small screen
      el.classList.add('visible');
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="unternehmen" className="min-h-screen bg-warm-yellow pt-16">
      {/* ─── HERO ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-10 bg-cover bg-center will-change-transform brightness-90"
          style={{ backgroundImage: "url('/uberuns.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#474150]/60 via-transparent to-[#FFBB00]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#474150]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#474150] text-[#FFBB00] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Seit 2006 in Zürich
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-4 leading-[1.15] drop-shadow-md">
              Unsere <span className="text-[#FFBB00]">Geschichte</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 1 ─── */}
      <div className="relative py-16 md:py-20 bg-[#FFBB00] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text - left */}
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#474150] flex items-center justify-center text-[#FFBB00] shadow-sm">
                  <Wheat className="w-5 h-5" />
                </div>
                <span className="text-[#474150] font-sans text-xs font-bold tracking-[0.3em] uppercase">Die Anfänge</span>
              </div>

              <div className="relative inline-block mb-8">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-[#231E2A] pb-3">
                  Tradition trifft <span className="text-[#474150]">Leidenschaft</span>
                </h2>
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#474150] rounded-full" />
              </div>

              <div className="space-y-6 text-[#231E2A] font-sans text-base md:text-lg leading-[1.8] font-medium">
                <p>
                  Die Bäckerei Happy wurde im Jahre <span className="text-[#474150] font-bold underline">2006</span> von der
                  Familie Aydin gegründet. Die Anfänge der Konditorbäckerei Aydin liegen jedoch
                  <span className="text-[#474150] font-bold"> mehrere Generationen</span> zurück. Dabei wird grosser Wert
                  gelegt auf handwerkliches Können und auf die Einhaltung altbewährter Rezepte, die für den hohen
                  Qualitätsanspruch all unserer Produkte stehen.
                </p>
                <p>
                  Ein Handwerk, das stets mit der Tradition verwurzelt ist, denn nur die besten und genau
                  geprüften Rohstoffe gelangen zur Verarbeitung für die vielen Produkte aus Bäckerei und Konditorei.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mt-8 p-6 rounded-2xl bg-[#474150] text-white shadow-xl border-l-4 border-[#FFBB00]">
                <p className="font-serif italic text-lg leading-relaxed text-white">
                  „Nur die besten Zutaten und echtes Handwerk machen den Unterschied."
                </p>
                <cite className="block mt-3 text-[#FFBB00] font-sans text-xs font-bold tracking-wider not-italic uppercase">
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
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#474150] border-4 border-white p-4">
                  <img
                    src="/logo.png"
                    alt="Happy Beck Bäckerei Logo"
                    className={`w-full h-full object-contain p-8 transform-gpu transition-all duration-750 ${
                      hover ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#474150]/90 text-center backdrop-blur-sm">
                    <p className="font-serif text-sm italic text-[#FFBB00] font-bold">
                      {hover ? '❝ Happy Beck Emblem ❞' : '❝ Unser Logo ❞'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 2 & STATS HIGHLIGHTS ─── */}
      <div className="relative py-16 md:py-20 bg-[#FFBB00] overflow-hidden border-t border-[#474150]/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <div className="mb-14 reveal">
            <div className="relative inline-block mb-6">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#231E2A] pb-3">
                Von Zürich in die <span className="text-[#474150]">ganze Schweiz</span>
              </h2>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#474150] rounded-full" />
            </div>

            <div className="space-y-6 text-[#231E2A] font-sans text-base md:text-lg leading-[1.8] font-medium max-w-3xl">
              <p>
                Die erste Happy-Filiale öffnete in Zürich an der <span className="text-[#474150] font-bold underline">Dienerstrasse</span> ihre
                Türen. Unter guter Regie blühte die Bäckerei richtig auf. Aydins Ruf verbreitete sich weit über
                Zürich hinaus, und es wurden mehrere Filialen eröffnet.
              </p>
              <p>
                Heute kommt man sowohl in Filialen im Raum Zürich als auch in der Gesamtschweiz in den Genuss
                der breit gefächerten <span className="text-[#474150] font-bold">Happy-Produktpalette</span>.
              </p>
            </div>
          </div>

          {/* 5-Card Stat Grid - Perfect Large Round Circles with Unique Color Rotating Border Animations */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
            {[
              { icon: <Award className="w-5 h-5" />, value: '20', label: 'Jahre Erfahrung', bg: '#474150', accent: '#FFBB00', ring: 'conic-gradient(from 0deg, #FFBB00, transparent 60%, #FFBB00)' },
              { icon: <Clock className="w-5 h-5" />, value: '2006', label: 'Gegründet', bg: '#3D2E28', accent: '#FFAE33', ring: 'conic-gradient(from 72deg, #FF4500, transparent 60%, #FF4500)' },
              { icon: <MapPin className="w-5 h-5" />, value: 'Zürich', label: 'Hauptsitz', bg: '#372F47', accent: '#C8A2C8', ring: 'conic-gradient(from 144deg, #A855F7, transparent 60%, #A855F7)' },
              { icon: <Wheat className="w-5 h-5" />, value: '24h', label: 'Geöffnet', bg: '#2A423D', accent: '#4DEECA', ring: 'conic-gradient(from 216deg, #00FFCC, transparent 60%, #00FFCC)' },
              { icon: <Award className="w-5 h-5" />, value: '20+', label: 'Jahre Tradition', bg: '#4A2A2A', accent: '#FF8080', ring: 'conic-gradient(from 288deg, #FF2D55, transparent 60%, #FF2D55)' },
            ].map((stat, i) => (
              <div
                key={i}
                className="reveal rounded-full aspect-square w-full max-w-[180px] sm:max-w-[190px] mx-auto p-4 text-center shadow-2xl border-2 border-white/15 hover:scale-110 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  backgroundColor: stat.bg
                }}
              >
                {/* Rotating Color Ring Effect */}
                <div className="absolute inset-0 rounded-full p-[2px] pointer-events-none overflow-hidden">
                  <div 
                    className="w-full h-full rounded-full animate-spin-slow"
                    style={{ 
                      background: stat.ring,
                      mask: 'radial-gradient(circle, transparent 66%, black 67%)',
                      WebkitMask: 'radial-gradient(circle, transparent 66%, black 67%)'
                    }}
                  />
                </div>

                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2 font-bold shadow-md relative z-10"
                  style={{ backgroundColor: stat.accent, color: '#231E2A' }}
                >
                  {stat.icon}
                </div>
                <p className="text-xl sm:text-2xl font-serif font-black text-white mb-0.5 relative z-10">{stat.value}</p>
                <p 
                  className="font-sans text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider leading-tight px-2 relative z-10"
                  style={{ color: stat.accent }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── VALUES SECTION ─── */}
      <div className="py-20 bg-[#FFBB00] border-t border-[#474150]/10 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-14 reveal">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#231E2A] pb-3">
                Was uns <span className="text-[#474150]">antreibt</span>
              </h2>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#474150] rounded-full" />
            </div>
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
                className="reveal bg-[#474150] p-8 md:p-10 rounded-3xl flex items-start gap-8 shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl md:text-5xl font-serif font-black text-[#FFBB00] flex-shrink-0">
                  {value.num}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3">{value.title}</h3>
                  <p className="text-white/90 font-sans text-sm md:text-base leading-relaxed">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
