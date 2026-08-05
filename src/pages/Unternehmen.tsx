import { useState, useEffect, useRef } from 'react';
import { Award, Clock, MapPin, Wheat } from 'lucide-react';

const FRAME_COUNT = 300;

function FrameAnimationCard() {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    // Smooth auto-play at 30 FPS without scroll
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % FRAME_COUNT) + 1);
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, []);

  const frameNum = String(currentFrame).padStart(3, '0');

  return (
    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#1A1A00] border-4 border-white">
      <img
        src={`/uberuns/ezgif-frame-${frameNum}.jpg`}
        alt="Bäckerei Handwerk Tradition"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1A1A00]/80 backdrop-blur-sm text-center">
        <p className="font-serif text-sm italic text-[#FFFFCC] font-bold">
          ❝ Traditionelles Bäckerei Handwerk ❞
        </p>
      </div>
    </div>
  );
}

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
      el.classList.add('visible');
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="unternehmen" className="min-h-screen bg-warm-yellow pt-14 md:pt-16">
      {/* ─── HERO ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-10 bg-cover bg-center will-change-transform brightness-90"
          style={{ backgroundImage: "url('/uberuns.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Seit 2006 in Zürich
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-white mb-4 leading-[1.15] drop-shadow-md">
              Unsere <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Geschichte</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 1 ─── */}
      <div className="relative py-16 md:py-20 bg-warm-yellow overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text - left */}
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1A1A00] flex items-center justify-center text-[#FFFFCC] shadow-sm">
                  <Wheat className="w-5 h-5" />
                </div>
                <span className="text-[#1A1A00] font-sans text-xs font-bold tracking-[0.3em] uppercase">Die Anfänge</span>
              </div>

              <div className="relative inline-block mb-8">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-[#231E2A] pb-3">
                  Tradition trifft <span className="text-[#1A1A00]">Leidenschaft</span>
                </h2>
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#1A1A00] rounded-full" />
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
              <blockquote className="mt-8 p-6 rounded-2xl bg-[#1A1A00] text-white shadow-xl border-l-4 border-[#FFFFCC]">
                <p className="font-serif italic text-lg leading-relaxed text-white">
                  „Nur die besten Zutaten und echtes Handwerk machen den Unterschied."
                </p>
                <cite className="block mt-3 text-[#FFFFCC] font-sans text-xs font-bold tracking-wider not-italic uppercase">
                  — Familie Aydin, Gründer
                </cite>
              </blockquote>
            </div>

            {/* Auto-playing Frame Animation Card - right */}
            <div className="lg:col-span-5 reveal" style={{ animationDelay: '200ms' }}>
              <FrameAnimationCard />
            </div>
          </div>
        </div>
      </div>

      {/* ─── STORY SECTION 2 & STATS HIGHLIGHTS ─── */}
      <div className="relative py-16 md:py-20 bg-warm-yellow overflow-hidden border-t border-[#1A1A00]/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <div className="mb-14 reveal">
            <div className="relative inline-block mb-6">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] pb-3">
                Von Zürich in die <span className="text-[#2C2C00]">ganze Schweiz</span>
              </h2>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#1A1A00] rounded-full" />
            </div>

            <div className="space-y-6 text-[#1A1A00] font-sans text-base md:text-lg leading-[1.8] font-medium max-w-3xl">
              <p>
                Die erste Happy-Filiale öffnete in Zürich an der <span className="text-[#1A1A00] font-bold underline">Dienerstrasse</span> ihre
                Türen. Unter guter Regie blühte die Bäckerei richtig auf. Aydins Ruf verbreitete sich weit über
                Zürich hinaus, und es wurden mehrere Filialen eröffnet.
              </p>
              <p>
                Heute kommt man sowohl in Filialen im Raum Zürich als auch in der Gesamtschweiz in den Genuss
                der breit gefächerten <span className="text-[#1A1A00] font-bold">Happy-Produktpalette</span>.
              </p>
            </div>
          </div>

          {/* 5-Card Stat Grid - Round Circles with Meteor Impact Orbit Border Effect */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
            {[
              { icon: <Award className="w-5 h-5" />, value: '20', label: 'Jahre Erfahrung', bg: '#1A1A00', accent: '#FFFFCC', speed: '3s' },
              { icon: <Clock className="w-5 h-5" />, value: '2006', label: 'Gegründet', bg: '#232300', accent: '#FFFFCC', speed: '2.5s' },
              { icon: <MapPin className="w-5 h-5" />, value: 'Zürich', label: 'Hauptsitz', bg: '#2C2C00', accent: '#FFFFCC', speed: '3.2s' },
              { icon: <Wheat className="w-5 h-5" />, value: '24h', label: 'Geöffnet', bg: '#353500', accent: '#FFFFCC', speed: '2.8s' },
              { icon: <Award className="w-5 h-5" />, value: '20+', label: 'Jahre Tradition', bg: '#3D3D00', accent: '#FFFFCC', speed: '3.5s' },
            ].map((stat, i) => (
              <div
                key={i}
                className="reveal rounded-full aspect-square w-full max-w-[180px] sm:max-w-[190px] mx-auto p-4 text-center shadow-2xl border-2 border-white/20 hover:scale-110 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col items-center justify-center relative group"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  backgroundColor: stat.bg
                }}
              >
                {/* METEOR ORBIT EFFECT: Rotating Spark Head + Glowing Tail */}
                <div className="absolute inset-0 rounded-full p-[2px] pointer-events-none overflow-hidden">
                  {/* Rotating Conic Meteor Tail */}
                  <div 
                    className="w-full h-full rounded-full animate-spin-slow"
                    style={{ 
                      animationDuration: stat.speed,
                      background: 'conic-gradient(from 0deg, #FFFFCC 0%, rgba(255,187,0,0.8) 15%, transparent 40%, transparent 100%)',
                      mask: 'radial-gradient(circle, transparent 66%, black 67%)',
                      WebkitMask: 'radial-gradient(circle, transparent 66%, black 67%)'
                    }}
                  />
                </div>

                {/* Meteor Spark Head Highlight */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none animate-spin-slow"
                  style={{ animationDuration: stat.speed }}
                >
                  <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_12px_#FFFFCC,0_0_20px_#FF8000] absolute -top-1 left-1/2 -translate-x-1/2 animate-pulse" />
                </div>

                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2 font-bold shadow-md relative z-10"
                  style={{ backgroundColor: stat.accent, color: '#1A1A00' }}
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
      <div className="py-20 bg-warm-yellow border-t border-[#1A1A00]/10 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-14 reveal">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] pb-3">
                Was uns <span className="text-[#2C2C00]">antreibt</span>
              </h2>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#1A1A00] rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01',
                title: 'Handwerkskunst',
                text: 'Jedes Produkt wird mit der gleichen Sorgfalt und Hingabe hergestellt, wie es unsere Vorfahren vor Generationen getan haben.',
                bg: '#1A1A00',
              },
              {
                num: '02',
                title: 'Frische & Qualität',
                text: 'Nur die besten und genau geprüften Rohstoffe gelangen zur Verarbeitung — täglich frisch, ohne Kompromisse.',
                bg: '#2C2C00',
              },
              {
                num: '03',
                title: 'Innovation',
                text: 'Wir bewahren die Tradition und wagen gleichzeitig Neues. So entstehen Kreationen, die überraschen und begeistern.',
                bg: '#3D3D00',
              },
            ].map((value, i) => (
              <div
                key={i}
                className="reveal p-8 md:p-10 rounded-3xl flex items-start gap-8 shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms`, backgroundColor: value.bg }}
              >
                <span className="text-4xl md:text-5xl font-serif font-black text-[#FFFFCC] flex-shrink-0">
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
