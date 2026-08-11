import { Award, Clock, MapPin, Wheat } from 'lucide-react';
import Parallax from '../components/motion/Parallax';
import { UBERUNS_HERO, HANDWERK_POSTER } from '../lib/images';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';

const HANDWERK_VIDEO =
  'https://res.cloudinary.com/dsdsb4lqw/video/upload/f_auto,q_auto/v1786349917/22_rmzwgy.mp4';

/**
 * This used to flip through 300 JPEGs on a 30fps interval — 9.8 MB of frames,
 * 300 requests, and decoding on the main thread against React. The same clip as
 * a video is a fraction of that and plays on the compositor.
 */
function FrameAnimationCard() {
  return (
    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#1A1A00] border-4 border-white">
      <video
        src={HANDWERK_VIDEO}
        poster={HANDWERK_POSTER}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Bäckerei Handwerk Tradition"
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
  return (
    <section id="unternehmen" className="min-h-screen bg-warm-yellow pt-14 md:pt-16">
      {/* ─── HERO ─── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <Parallax className="absolute inset-0" distance={14}>
          <div
            className="w-full h-full bg-cover bg-center brightness-90"
            style={{ backgroundImage: `url(${UBERUNS_HERO})` }}
          />
        </Parallax>
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
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" stagger={0.15}>
            {/* Text - left */}
            <RevealItem className="lg:col-span-7">
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
            </RevealItem>

            {/* Auto-playing Frame Animation Card - right */}
            <RevealItem className="lg:col-span-5">
              <FrameAnimationCard />
            </RevealItem>
          </RevealGroup>
        </div>
      </div>

      {/* ─── STORY SECTION 2 & STATS HIGHLIGHTS ─── */}
      <div className="relative py-16 md:py-20 bg-warm-yellow overflow-hidden border-t border-[#1A1A00]/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <Reveal className="mb-14">
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
          </Reveal>

          {/* 5-Card Stat Grid - Round Circles with Meteor Impact Orbit Border Effect */}
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center" stagger={0.08}>
            {[
              { icon: <Award className="w-5 h-5" />, value: '20', label: 'Jahre Erfahrung', bg: '#1A1A00', accent: '#FFFFCC', speed: '3s' },
              { icon: <Clock className="w-5 h-5" />, value: '2006', label: 'Gegründet', bg: '#232300', accent: '#FFFFCC', speed: '2.5s' },
              { icon: <MapPin className="w-5 h-5" />, value: 'Zürich', label: 'Hauptsitz', bg: '#2C2C00', accent: '#FFFFCC', speed: '3.2s' },
              { icon: <Wheat className="w-5 h-5" />, value: '24h', label: 'Geöffnet', bg: '#353500', accent: '#FFFFCC', speed: '2.8s' },
              { icon: <Award className="w-5 h-5" />, value: '20+', label: 'Jahre Tradition', bg: '#3D3D00', accent: '#FFFFCC', speed: '3.5s' },
            ].map((stat, i) => {
              // Every other circle is left open, so the row is not five solid
              // discs in a line.
              const outline = i % 2 === 1;

              return (
              <RevealItem key={i}>
              <div
                className={`rounded-full aspect-square w-full max-w-[180px] sm:max-w-[190px] mx-auto p-4 text-center border-2 hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center relative group ${
                  outline
                    ? 'border-[#1A1A00]/25 hover:border-[#1A1A00]/45'
                    : 'border-white/20 shadow-2xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]'
                }`}
                style={{ backgroundColor: outline ? undefined : stat.bg }}
              >
                {/* METEOR ORBIT EFFECT: Rotating Spark Head + Glowing Tail */}
                <div className="absolute inset-0 rounded-full p-[2px] pointer-events-none overflow-hidden">
                  {/* Rotating Conic Meteor Tail */}
                  <div
                    className="w-full h-full rounded-full animate-spin-slow"
                    style={{
                      animationDuration: stat.speed,
                      background: outline
                        ? 'conic-gradient(from 0deg, #1A1A00 0%, rgba(26,26,0,0.55) 15%, transparent 40%, transparent 100%)'
                        : 'conic-gradient(from 0deg, #FFFFCC 0%, rgba(255,187,0,0.8) 15%, transparent 40%, transparent 100%)',
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
                  <div
                    className={`w-3 h-3 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 animate-pulse ${
                      outline
                        ? 'bg-[#1A1A00] shadow-[0_0_10px_rgba(26,26,0,0.5)]'
                        : 'bg-white shadow-[0_0_12px_#FFFFCC,0_0_20px_#FF8000]'
                    }`}
                  />
                </div>

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2 font-bold shadow-md relative z-10"
                  style={{
                    backgroundColor: outline ? '#1A1A00' : stat.accent,
                    color: outline ? stat.accent : '#1A1A00',
                  }}
                >
                  {stat.icon}
                </div>
                <p
                  className={`text-xl sm:text-2xl font-serif font-black mb-0.5 relative z-10 ${
                    outline ? 'text-[#1A1A00]' : 'text-white'
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className="font-sans text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider leading-tight px-2 relative z-10"
                  style={{ color: outline ? '#1A1A00' : stat.accent }}
                >
                  {stat.label}
                </p>
              </div>
              </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      {/* ─── VALUES SECTION ─── */}
      <div className="py-20 bg-warm-yellow border-t border-[#1A1A00]/10 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Reveal className="text-center mb-14">
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] pb-3">
                Was uns <span className="text-[#2C2C00]">antreibt</span>
              </h2>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#1A1A00] rounded-full" />
            </div>
          </Reveal>

          <RevealGroup className="space-y-6" stagger={0.12}>
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
                // Takes the tone the middle card gave up when it went open
                bg: '#2C2C00',
              },
            ].map((value, i) => {
              const outline = i === 1;

              return (
              <RevealItem key={i}>
              <div
                className={`p-8 md:p-10 rounded-3xl flex items-start gap-8 border hover:scale-[1.02] transition-all duration-300 ${
                  outline
                    ? 'border-[#1A1A00]/30 hover:border-[#1A1A00]/50'
                    : 'border-white/10 shadow-2xl'
                }`}
                style={{ backgroundColor: outline ? undefined : value.bg }}
              >
                <span
                  className={`text-4xl md:text-5xl font-serif font-black flex-shrink-0 ${
                    outline ? 'text-[#1A1A00]' : 'text-[#FFFFCC]'
                  }`}
                >
                  {value.num}
                </span>
                <div>
                  <h3
                    className={`text-xl md:text-2xl font-serif font-black mb-3 ${
                      outline ? 'text-[#1A1A00]' : 'text-white'
                    }`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`font-sans text-sm md:text-base leading-relaxed ${
                      outline ? 'text-[#1A1A00]' : 'text-white/90'
                    }`}
                  >
                    {value.text}
                  </p>
                </div>
              </div>
              </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
