import { Link } from 'react-router-dom';
import { ChefHat, Heart, Award, Bike } from 'lucide-react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';

export default function Home() {
  const slides = useMemo(
    () => [
      {
        image: '/Home.jpg',
        title: 'Ein Häppchen Glück!',
        subtitle: 'Willkommen bei Happy Beck',
        text: 'Traditionelles Handwerk trifft moderne Innovation. Entdecken Sie unsere Leidenschaft für frisches Brot und feine Backwaren.',
        bgColor: '#F5FFF4', // Soft Mint Cream
        cardBg: '#474150',  // Deep Plum Charcoal
        accentColor: '#474150', // Deep Plum (contrasts against the yellow hero background)
        textColor: '#231E2A',
      },
      {
        image: '/Home1.jpg',
        title: 'Frisch. Fein. Happy.',
        subtitle: 'Täglich ofenfrisch',
        text: 'Jeden Tag ofenfrisch – mit ausgewählten Zutaten und viel Liebe zum Detail.',
        bgColor: '#FFF8F0', // Soft Warm Cream / Warm Bakery Gold
        cardBg: '#3D2E28',  // Deep Espresso Moka
        accentColor: '#E5931A', // Warm Amber
        textColor: '#2D201A',
      },
      {
        image: '/home2.jpg',
        title: 'Süsses und Herzhaftes',
        subtitle: 'Für jeden Geschmack',
        text: 'Von Gipfeli bis Sandwich: Für jeden Geschmack das Richtige.',
        bgColor: '#F8F6FE', // Soft Lavender Slate
        cardBg: '#372F47',  // Deep Berry Violet
        accentColor: '#9C99B8', // Lavender Slate
        textColor: '#251D33',
      },
      {
        image: '/happylachen.jpg',
        title: 'Freude am Genuss',
        subtitle: 'Happy Beck Lachen',
        text: 'Mit bestem Handwerk und frischen Zutaten zaubern wir Ihnen jeden Tag ein Lächeln ins Gesicht.',
        bgColor: '#EFFCF6', // Fresh Teal Mint
        cardBg: '#2A423D',  // Deep Eucalyptus Teal
        accentColor: '#0D9488', // Emerald Teal
        textColor: '#192C28',
      },
    ],
    []
  );

  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, []);

  return (
    <section id="home">
      {/* Hero Container */}
      <div 
        className="relative pt-14 md:pt-16 pb-12 bg-[#FFBB00]"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Flush Left & Top Image Slider */}
            <div className="lg:col-span-6 w-full">
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] overflow-hidden shadow-2xl bg-white group rounded-br-3xl">
                {/* Changing Image with Gentle Transparency */}
                <img
                  src={slides[slide].image}
                  alt={slides[slide].title}
                  className={`w-full h-full object-cover transition-all duration-700 brightness-105 ${
                    isTransitioning ? 'opacity-0 scale-105' : 'opacity-85 scale-100'
                  }`}
                  fetchPriority="high"
                />

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

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
              <div className="relative mb-6">
                <h1 
                  className="text-2xl md:text-[68px] font-serif font-black leading-[1.15] transition-colors duration-700 inline-block pb-4 whitespace-nowrap md:whitespace-normal"
                  style={{ color: slides[slide].textColor }}
                >
                  {slides[slide].title}
                  <span 
                    className="absolute bottom-0 left-0 h-1.5 rounded-full transition-all duration-700"
                    style={{ 
                      backgroundColor: slides[slide].accentColor,
                      width: '100%'
                    }}
                  />
                </h1>
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

              {/* Uber Eats & Just Eat Delivery Banner */}
              <div className="w-full max-w-[420px] bg-[#1E293B]/95 rounded-2xl px-4 py-3 shadow-lg border border-[#FFBB00]/15 flex flex-row items-center justify-between gap-3 mt-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#FFBB00]/10 flex items-center justify-center flex-shrink-0">
                    <Bike className="w-4 h-4 text-[#FFBB00]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-sans font-semibold text-xs leading-snug truncate">
                      Lieferung direkt zu dir
                    </p>
                    <p className="text-white/50 font-sans text-[10px] leading-tight truncate">
                      Jetzt bestellen bei
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="https://www.ubereats.com/ch-de/store/happybeck/1cMo9d_uXNufL0FRptsfcA?diningMode=DELIVERY&surfaceName="
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#06C167]/90 hover:bg-[#06C167] text-white font-sans font-semibold text-[11px] tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Uber Eats
                  </a>
                  <a
                    href="https://www.just-eat.ch/speisekarte/happybeck-langstrasse"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#FF8000]/90 hover:bg-[#FF8000] text-white font-sans font-semibold text-[11px] tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Just Eat
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Features Section - Pulled Right Under Sliding Image */}
        <div className="container mx-auto px-4 lg:px-8 pt-12 md:pt-16 pb-8">
          {/* Section header */}
          <div className="text-center mb-10 reveal">
            <p 
              className="font-sans text-xs tracking-[0.3em] uppercase mb-2 font-bold transition-colors duration-700"
              style={{ color: slides[slide].cardBg }}
            >
              Unsere Philosophie
            </p>
            <div className="relative inline-block">
              <h2 
                className="text-3xl md:text-5xl font-serif font-black transition-colors duration-700 pb-3"
                style={{ color: slides[slide].textColor }}
              >
                Was uns <span style={{ color: slides[slide].cardBg }}>auszeichnet</span>
              </h2>
              <span 
                className="absolute bottom-0 left-0 h-1.5 rounded-full transition-all duration-700"
                style={{ 
                  backgroundColor: slides[slide].accentColor,
                  width: '100%'
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <FeatureCard
              icon={<ChefHat className="w-5.5 h-5.5" />}
              title="Handwerk"
              text="Traditionelle Backkunst, entwickelt über Jahrzehnte voller Erfahrung und Leidenschaft. Unsere Rezepte und handwerklichen Techniken wurden von Generation zu Generation weitergegeben und bis heute bewahrt."
              delay={0}
              bgColor={slides[slide].cardBg}
            />
            <FeatureCard
              icon={<Heart className="w-5.5 h-5.5" />}
              title="Qualität"
              text="Wir verwenden nur die besten, sorgfältig ausgewählten Zutaten, um täglich frische Backwaren von höchster Qualität herzustellen. Qualität und Leidenschaft sind die Basis für den Genuss."
              delay={150}
              bgColor={slides[slide].cardBg}
            />
            <FeatureCard
              icon={<Award className="w-5.5 h-5.5" />}
              title="Innovation"
              text="Wir verbinden kreative Innovation mit unserer traditionellen Backkunst. So entstehen einzigartige Produkte, die modern und zugleich authentisch sind."
              delay={300}
              bgColor={slides[slide].cardBg}
            />
          </div>
        </div>
      </div>

    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  delay,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
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
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="reveal h-full"
      style={{ animationDelay: `${delay}ms`, perspective: '1000px' }}
    >
      <div
        style={{
          transform,
          backgroundColor: `${bgColor || '#474150'}CC`,
        }}
        className="relative text-left p-6 rounded-2xl backdrop-blur-xl transition-all duration-700 ease-in-out will-change-transform hover:-translate-y-1 hover:glow-gold group border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.25)] h-full flex flex-col justify-start overflow-hidden"
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${bgPos}, rgba(255,255,255,0.12), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#FFBB00]/40 text-[#FFBB00] group-hover:scale-110 group-hover:bg-[#FFBB00]/20 transition-all duration-300 bg-[#FFBB00]/10 shadow-[0_0_20px_rgba(255,187,0,0.15)]"
            >
              {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-black text-[#FFBB00] tracking-wide transition-colors">{title}</h3>
          </div>
          <p className="text-white font-sans text-sm md:text-base font-medium leading-relaxed drop-shadow-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}

