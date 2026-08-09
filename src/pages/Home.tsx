import { Link } from 'react-router-dom';
import { Coffee, Sandwich as SandwichIcon, IceCream } from 'lucide-react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import MarqueeTicker from '../components/MarqueeTicker';
import OrderCard from '../components/OrderCard';
import Parallax from '../components/motion/Parallax';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';

// One step lighter per slide, starting at the darkest olive. The steps are
// wide enough (0x15 apart) to read once the cards blend over the cream page.
const PHILOSOPHY_PALETTE = ['#1A1A00', '#2F2F00', '#444400', '#595900'];

export default function Home() {
  const slides = useMemo(
    () => [
      {
        image: '/Home.jpg',
        title: 'Ein Häppchen Glück!',
        subtitle: 'Willkommen bei Happy Beck',
        text: 'Traditionelles Handwerk trifft moderne Innovation. Entdecken Sie unsere Leidenschaft für frisches Brot und feine Backwaren.',
        bgColor: '#FFFFCC', // Fresh Green / Soft Light Cream
        cardBg: '#1A1A00',  // Muted Blue Green / Dark Olive
        textColor: '#1A1A00',
      },
      {
        image: '/Home1.jpg',
        title: 'Frisch. Fein. Happy.',
        subtitle: 'Täglich ofenfrisch',
        text: 'Jeden Tag ofenfrisch – mit ausgewählten Zutaten und viel Liebe zum Detail.',
        bgColor: '#FFFFCC',
        cardBg: '#1A1A00',
        textColor: '#1A1A00',
      },
      {
        image: '/home2.jpg',
        title: 'Süsses und Herzhaftes',
        subtitle: 'Für jeden Geschmack',
        text: 'Von Gipfeli bis Sandwich: Für jeden Geschmack das Richtige.',
        bgColor: '#FFFFCC',
        cardBg: '#1A1A00',
        textColor: '#1A1A00',
      },
      {
        image: '/happylachen.jpg',
        title: 'Freude am Genuss',
        subtitle: 'Happy Beck Lachen',
        text: 'Mit bestem Handwerk und frischen Zutaten zaubern wir Ihnen jeden Tag ein Lächeln ins Gesicht.',
        bgColor: '#FFFFCC',
        cardBg: '#1A1A00',
        textColor: '#1A1A00',
      },
    ],
    []
  );

  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const chefRef = useRef<HTMLDivElement>(null);

  // Track global mouse position for chef mascot
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate chef transform based on mouse position
  const chefTransform = useMemo(() => {
    if (!chefRef.current) return '';
    const rect = chefRef.current.getBoundingClientRect();
    const chefCenterX = rect.left + rect.width / 2;
    const chefCenterY = rect.top + rect.height / 2;
    const dx = mouseX - chefCenterX;
    const dy = mouseY - chefCenterY;
    const tiltX = Math.max(-12, Math.min(12, (dy / window.innerHeight) * 20));
    const scaleX = dx < 0 ? -1 : 1; // mirror when mouse is on left
    return `scaleX(${scaleX}) rotate(${tiltX * 0.4}deg)`;
  }, [mouseX, mouseY]);

  const changeSlide = useCallback((newSlide: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSlide(newSlide);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const next = useCallback(() => changeSlide((slide + 1) % slides.length), [slide, slides.length, changeSlide]);
  const prev = useCallback(() => changeSlide((slide - 1 + slides.length) % slides.length), [slide, slides.length, changeSlide]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home">
      {/* Hero Container */}
      <div 
        className="relative pt-14 md:pt-16 pb-4 bg-warm-yellow"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Flush Left & Top Image Slider */}
            <div className="lg:col-span-6 w-full">
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] overflow-hidden shadow-2xl bg-white group rounded-br-3xl">
                {/* Changing Image with Gentle Ken Burns Zoom, drifting on scroll */}
                <Parallax className="absolute inset-0" distance={10}>
                  <img
                    key={slide}
                    src={slides[slide].image}
                    alt={slides[slide].title}
                    className="w-full h-full object-cover animate-hero-ken-burns"
                    // @ts-expect-error React 18 types lack the lowercase DOM attribute
                    fetchpriority="high"
                  />
                </Parallax>

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Smooth Right Edge Gradient Overlay Blending Image into Text Area */}
                <div className="absolute inset-y-0 right-0 w-24 sm:w-36 lg:w-48 bg-gradient-to-r from-transparent via-[#FFFFCC]/40 to-[#FFFFCC] pointer-events-none z-10" />

                {/* Mobile-Only Bottom Edge Soft Gradient Overlay (Preserves Edge Gradient Intact) */}
                <div className="block lg:hidden absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent via-[#FFFFCC]/30 to-[#FFFFCC] pointer-events-none z-10" />

                {/* Image Counter Badge */}
                <div 
                  className="absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-sans font-bold tracking-widest uppercase shadow-md transition-colors duration-700"
                  style={{ backgroundColor: slides[slide].cardBg }}
                >
                  {slide + 1} / {slides.length}
                </div>

                {/* Image Navigation Arrows */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-110"
                    style={{ backgroundColor: slides[slide].cardBg }}
                    aria-label="Vorheriges Bild"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-110"
                    style={{ backgroundColor: slides[slide].cardBg }}
                    aria-label="Nächstes Bild"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Hero Text Content (Vertically Centered) */}
            <div className={`lg:col-span-6 flex flex-col items-start text-left pt-8 lg:pt-0 px-6 lg:pl-0 lg:pr-12 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm transition-colors duration-700"
                style={{ backgroundColor: slides[slide].cardBg }}
              >
                {slides[slide].subtitle}
              </span>
              {/* The visible headline rotates with the slider, so the page keeps a
                  single stable H1 for search engines instead of a changing one. */}
              <h1 className="sr-only">
                Bäckerei in Zürich – Happy Beck an der Langstrasse, 24 Stunden geöffnet
              </h1>
              <div className="relative mb-6">
                <p
                  className="text-2xl md:text-[68px] font-serif font-black leading-[1.15] transition-colors duration-700 inline-block pb-4 whitespace-nowrap md:whitespace-normal"
                  style={{ color: slides[slide].textColor }}
                >
                  {slides[slide].title}
                  <span
                    className="absolute bottom-0 left-0 h-1.5 rounded-full transition-all duration-700"
                    style={{
                      backgroundColor: PHILOSOPHY_PALETTE[slide],
                      width: '100%'
                    }}
                  />
                </p>
              </div>
              <p 
                className="text-base md:text-xl font-sans font-normal mb-8 max-w-xl leading-relaxed transition-colors duration-700 opacity-90"
                style={{ color: slides[slide].textColor }}
              >
                {slides[slide].text}
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link 
                  to="/menu" 
                  className="px-8 py-3.5 rounded-2xl text-white font-sans font-extrabold text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: slides[slide].cardBg }}
                >
                  Unsere Speisekarte
                </Link>
                <Link 
                  to="/kontakt" 
                  className="px-11 py-3.5 rounded-2xl border-2 font-sans font-extrabold text-sm tracking-wider uppercase shadow-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: slides[slide].cardBg, 
                    color: slides[slide].cardBg 
                  }}
                >
                  Kontakt
                </Link>
              </div>

              {/* Proof and ordering in one card, right where the decision happens */}
              <OrderCard className="mt-2" />
            </div>

          </div>
        </div>

        {/* ── FULL WIDTH 24H SCROLLING MARQUEE BANNER (RIGHT UNDER HERO) ── */}
        <div className="mt-8 md:-mt-2 mb-4">
          <MarqueeTicker />
        </div>

        {/* Features Section - Pulled Right Under Sliding Image */}
        <div className="container mx-auto px-4 lg:px-8 pt-6 md:pt-8 pb-8">
          {/* Section header */}
          <Reveal className="text-center mb-10">
            <p
              className="font-sans text-xs tracking-[0.3em] uppercase mb-2 font-bold transition-colors duration-700"
              style={{ color: PHILOSOPHY_PALETTE[slide] }}
            >
              Aus unserer Backstube
            </p>
            <div className="relative inline-block">
              <h2
                className="text-3xl md:text-5xl font-serif font-black transition-colors duration-700 pb-3"
                style={{ color: slides[slide].textColor }}
              >
                Ein kleiner <span style={{ color: PHILOSOPHY_PALETTE[slide] }}>Vorgeschmack</span>
              </h2>
              <span
                className="absolute bottom-0 left-0 h-1.5 rounded-full transition-colors duration-700"
                style={{
                  backgroundColor: PHILOSOPHY_PALETTE[slide],
                  width: '100%'
                }}
              />
            </div>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative" stagger={0.12}>

            {/* FIRST CARD WITH CHEF MASCOT ON TOP */}
            <div className="relative pt-16 md:pt-0">
              {/* Chef Mascot — Mobile: on top of first card | Desktop: between card 1 & 2 (via absolute on grid) */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-32 z-30 pointer-events-none
                             md:fixed md:hidden">
                <img
                  src="/b2.png"
                  alt="Happy Beck Chefkoch"
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'multiply', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.4))' }}
                />
              </div>
              <FeatureCard
                icon={<Coffee className="w-5 h-5" strokeWidth={1.5} />}
                title="Frühstück"
                text="Gipfeli, Zopf und ein Kaffee dazu. So fängt der Tag an, wie er soll."
                image="/menu-breakfast.jpg"
                href="/menu"
                cta="Zur Speisekarte"
                bgColor={PHILOSOPHY_PALETTE[slide]}
              />
            </div>

            {/* Desktop-only chef: near left edge of 3rd card — tracks mouse */}
            <div ref={chefRef} className="hidden md:block absolute -top-20 left-[calc(66.66%-16px)] w-36 h-36 z-30 pointer-events-none">
              <img
                src="/b2.png"
                alt="Happy Beck Chefkoch"
                className="w-full h-full object-contain transition-transform duration-150 ease-out"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.4))',
                  transform: chefTransform,
                }}
              />
            </div>

            <FeatureCard
              icon={<SandwichIcon className="w-5 h-5" strokeWidth={1.5} />}
              title="Sandwiches"
              text="Frisch belegt, während du wartest. Dein Brot, deine Zutaten, deine Sauce."
              image="/menu-sandwich.jpg"
              href="/sandwich-bauen"
              cta="Selber zusammenstellen"
              bgColor={PHILOSOPHY_PALETTE[slide]}
            />
            <FeatureCard
              icon={<IceCream className="w-5 h-5" strokeWidth={1.5} />}
              title="Süsses"
              text="Hausgemachte Pâtisserie, jeden Tag neu aus unserer Backstube."
              image="/menu-sweets.jpg"
              href="/aktuelles"
              cta="Heute's Spezial"
              bgColor={PHILOSOPHY_PALETTE[slide]}
            />
          </RevealGroup>
        </div>
      </div>

    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  image,
  href,
  cta,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  image: string;
  href: string;
  cta: string;
  bgColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [transform, setTransform] = useState('');
  const [bgPos, setBgPos] = useState('50% 50%');

  const handleMouseEnter = () => {
    const el = ref.current;
    if (el) {
      rectRef.current = el.getBoundingClientRect();
    }
  };

  const handleMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setBgPos(`${x * 100}% ${y * 100}%`);
  };

  const reset = () => {
    rectRef.current = null;
    setTransform('');
    setBgPos('50% 50%');
  };

  return (
    <RevealItem className="h-full">
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="h-full"
        style={{ perspective: '1000px' }}
      >
        <Link
          to={href}
          style={{
            transform,
            backgroundColor: `${bgColor || '#474150'}E6`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
          }}
          className="relative text-left rounded-2xl backdrop-blur-2xl transition-all duration-700 ease-in-out will-change-transform hover:-translate-y-1 group border border-white/12 h-full flex flex-col overflow-hidden"
        >
          {/* Product photo */}
          <div className="relative h-44 md:h-52 overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Glass sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent" />

          {/* Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(400px circle at ${bgPos}, rgba(255,255,255,0.18), transparent 40%)`,
            }}
          />

          <div className="relative z-10 p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex-shrink-0 text-[#FFFFCC]/80 group-hover:text-[#FFFFCC] transition-colors">
                {icon}
              </span>
              <h3 className="text-xl md:text-[22px] font-serif font-bold text-[#FFFFCC]">{title}</h3>
            </div>
            <p className="text-white/70 font-sans text-sm font-normal leading-[1.7]">{text}</p>

            <span className="mt-auto pt-5 flex items-center gap-2 text-[#FFFFCC]/75 group-hover:text-[#FFFFCC] font-sans font-medium text-[11px] uppercase tracking-[0.18em] transition-colors">
              {cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      </div>
    </RevealItem>
  );
}

