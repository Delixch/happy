import { Link } from 'react-router-dom';
import { ChefHat, Heart, Award, ChevronLeft, ChevronRight, Instagram, RefreshCw, Loader2, X, Gift, ChevronDown } from 'lucide-react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { supabase, type InstagramPost, type Deal } from '../lib/supabase';

const DEFAULT_POSTS: InstagramPost[] = [
  {
    id: 'def-1',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=60',
    post_url: 'https://www.instagram.com/happybeck.ch',
    caption: 'Frisches Brot jeden Morgen! 🥖 Frisch gebacken with viel Liebe und Tradition. Besuchen Sie uns in Zürich! #happybeck #zürich #bäckerei',
    created_at: ''
  },
  {
    id: 'def-2',
    image_url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=60',
    post_url: 'https://www.instagram.com/happybeck.ch',
    caption: 'Unsere legendären, goldgelben Gipfeli warten ofenfrisch auf dich. Der perfekte Start in den Züri-Morgen! 🥐 #croissant #gipfeli #zürich',
    created_at: ''
  },
  {
    id: 'def-3',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=60',
    post_url: 'https://www.instagram.com/happybeck.ch',
    caption: 'Hausgemachte Spezialitäten und feinste Pâtisserie exklusiv zu unserem 20. Jubiläum. 🎂 #20jahre #happybeck #pâtisserie',
    created_at: ''
  },
  {
    id: 'def-4',
    image_url: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=60',
    post_url: 'https://www.instagram.com/happybeck.ch',
    caption: 'Ein Blick hinter die Kulissen: Handgefertigte Teigwaren von unseren Meistern. 🥖🍞 #bäcker #handwerk #zürich',
    created_at: ''
  }
];

const optimizeUnsplashUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    let opt = url;
    if (opt.includes('w=')) {
      opt = opt.replace(/w=\d+/, 'w=300');
    } else {
      opt += '&w=300';
    }
    if (opt.includes('q=')) {
      opt = opt.replace(/q=\d+/, 'q=50');
    } else {
      opt += '&q=50';
    }
    return opt;
  }
  return url;
};

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
        accentColor: '#FFBB00', // Gold Accent
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
  const [instaPost, setInstaPost] = useState<InstagramPost>(() => DEFAULT_POSTS[Math.floor(Math.random() * DEFAULT_POSTS.length)]);
  const [loadingInsta, setLoadingInsta] = useState(false);

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [isDealsModalOpen, setIsDealsModalOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    supabase
      .from('deals')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setDeals(data);
        setLoadingDeals(false);
      });
  }, []);

  const fetchRandomInsta = useCallback(async () => {
    setLoadingInsta(true);
    try {
      const { data } = await supabase.from('instagram_posts').select('*');
      if (data && data.length > 0) {
        const random = data[Math.floor(Math.random() * data.length)];
        setInstaPost(random);
      } else {
        const randomDefault = DEFAULT_POSTS[Math.floor(Math.random() * DEFAULT_POSTS.length)];
        setInstaPost(randomDefault);
      }
    } catch (err) {
      console.error(err);
      const randomDefault = DEFAULT_POSTS[Math.floor(Math.random() * DEFAULT_POSTS.length)];
      setInstaPost(randomDefault);
    }
    setLoadingInsta(false);
  }, []);

  useEffect(() => {
    fetchRandomInsta();
  }, [fetchRandomInsta]);

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
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
            <div className={`lg:col-span-6 flex flex-col items-start text-left my-auto pt-8 lg:pt-16 px-6 lg:px-12 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm transition-colors duration-700"
                style={{ backgroundColor: slides[slide].cardBg }}
              >
                {slides[slide].subtitle}
              </span>
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-6 leading-[1.15] transition-colors duration-700"
                style={{ color: slides[slide].textColor }}
              >
                {slides[slide].title}
              </h1>
              <div 
                className="w-20 h-1.5 rounded-full mb-6 transition-colors duration-700"
                style={{ backgroundColor: slides[slide].accentColor }}
              />
              <p 
                className="text-base md:text-xl font-sans font-normal mb-8 max-w-xl leading-relaxed transition-colors duration-700 opacity-90"
                style={{ color: slides[slide].textColor }}
              >
                {slides[slide].text}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/menu" 
                  className="px-8 py-3.5 rounded-2xl text-white font-sans font-extrabold text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: slides[slide].cardBg }}
                >
                  Unsere Speisekarte
                </Link>
                <Link 
                  to="/kontakt" 
                  className="px-8 py-3.5 rounded-2xl border-2 font-sans font-extrabold text-sm tracking-wider uppercase shadow-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: slides[slide].cardBg, 
                    color: slides[slide].cardBg 
                  }}
                >
                  Kontakt
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Features Section - Pulled Right Under Sliding Image */}
        <div className="container mx-auto px-4 lg:px-8 pt-12 md:pt-16 pb-8">
          {/* Section header */}
          <div className="text-center mb-8 reveal">
            <p 
              className="font-sans text-xs tracking-[0.3em] uppercase mb-2 font-bold transition-colors duration-700"
              style={{ color: slides[slide].cardBg }}
            >
              Unsere Philosophie
            </p>
            <h2 
              className="text-3xl md:text-5xl font-serif font-bold mb-4 transition-colors duration-700"
              style={{ color: slides[slide].textColor }}
            >
              Was uns <span style={{ color: slides[slide].cardBg }}>auszeichnet</span>
            </h2>
            <div 
              className="w-16 h-1 rounded-full mx-auto transition-colors duration-700"
              style={{ backgroundColor: slides[slide].accentColor }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <FeatureCard
              icon={<ChefHat className="w-5.5 h-5.5" />}
              title="Handwerk"
              text="Traditionelle Backkunst, entwickelt über Jahrzehnte voller Erfahrung und Leidenschaft. Unsere Rezepte und handwerklichen Techniken wurden von Generation zu Generation weitergegeben und bis heute bewahrt."
              delay={0}
              bgColor={slides[slide].cardBg}
              accentColor={slides[slide].accentColor}
            />
            <FeatureCard
              icon={<Heart className="w-5.5 h-5.5" />}
              title="Qualität"
              text="Wir verwenden nur die besten, sorgfältig ausgewählten Zutaten, um täglich frische Backwaren von höchster Qualität herzustellen. Qualität und Leidenschaft sind die Basis für den Genuss."
              delay={150}
              bgColor={slides[slide].cardBg}
              accentColor={slides[slide].accentColor}
            />
            <FeatureCard
              icon={<Award className="w-5.5 h-5.5" />}
              title="Innovation"
              text="Wir verbinden kreative Innovation mit unserer traditionellen Backkunst. So entstehen einzigartige Produkte, die modern und zugleich authentisch sind."
              delay={300}
              bgColor={slides[slide].cardBg}
              accentColor={slides[slide].accentColor}
            />
          </div>
        </div>
      </div>

      {/* Exklusiv Jubiläums-Deals Modal popup */}
      <DealsModal
        isOpen={isDealsModalOpen}
        onClose={() => setIsDealsModalOpen(false)}
        deals={deals}
        loading={loadingDeals}
      />
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  delay,
  bgColor,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
  bgColor?: string;
  accentColor?: string;
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
          backgroundColor: bgColor || '#474150' 
        }}
        className="relative text-left p-6 rounded-2xl glass-card transition-all duration-700 ease-in-out will-change-transform hover:glow-gold group border border-white/10 h-full flex flex-col justify-start"
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${bgPos}, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 text-[#FFBB00] group-hover:scale-110 transition-all duration-300 bg-black/20"
            >
              {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-black text-white tracking-wide transition-colors">{title}</h3>
          </div>
          <p className="text-white font-sans text-sm md:text-base font-medium leading-relaxed drop-shadow-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}

// ── Confetti Component ──
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {[...Array(60)].map((_, i) => {
        const colors = ['#D4AF37', '#F5E6B8', '#FFD700', '#FFA500', '#FF6347', '#00CED1', '#FF69B4'];
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 8;
        const rotation = Math.random() * 360;
        return (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size * 0.6}px`,
              backgroundColor: color,
              borderRadius: '2px',
              transform: `rotate(${rotation}deg)`,
              animation: `confettiFall ${duration}s ease-out ${delay}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg) scale(0.5); }
        }
      `}</style>
    </div>
  );
}

// ── Hunger Game Component ──
function HungerGame({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [shake, setShake] = useState(false);

  const messages = [
    { q: '🍕 Hast du Hunger?', btn: 'Ja, schon ein bisschen...', color: 'from-amber-500 to-orange-500' },
    { q: '🤤 Wirklich? Wie hungrig bist du?', btn: 'SEHR hungrig!', color: 'from-orange-500 to-red-500' },
    { q: '🔥 Dann haben wir genau das Richtige!', btn: 'Zeig mir was!', color: 'from-red-500 to-pink-500' },
  ];

  const handleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    if (stage < messages.length - 1) {
      setStage(stage + 1);
    } else {
      onComplete();
      setStage(0);
    }
  };

  return (
    <div className={`glass-card p-8 text-center overflow-hidden relative min-h-[220px] flex flex-col justify-center items-center ${shake ? 'animate-bounce' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <p className="text-xl md:text-2xl font-serif font-bold text-white mb-6 min-h-[50px] flex items-center justify-center">
          {messages[stage].q}
        </p>
        <button
          onClick={handleClick}
          className={`w-full max-w-xs py-3 rounded-xl text-white font-sans font-bold text-sm bg-gradient-to-r ${messages[stage].color} hover:scale-102 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer`}
        >
          {messages[stage].btn}
        </button>
        
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {messages.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === stage ? 'bg-gold-400 scale-125' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Deal Card Component ──
function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card overflow-hidden group hover:glow-gold transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-[2px] bg-gradient-to-r ${deal.gradient.replace('/20', '')}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">
              {deal.title}
            </h3>
            {deal.subtitle && <p className="text-[10px] text-white/40 font-sans">{deal.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {deal.is_new && (
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">NEU</span>
            )}
            {deal.is_special && (
              <span className="px-2.5 py-0.5 bg-gold-400/10 text-gold-400 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border border-gold-400/20">SPECIAL</span>
            )}
            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {deal.description && (
          <div className="glass-card-light p-2.5 mb-3">
            <p className="text-xs text-white/60 font-sans flex items-start gap-2 whitespace-pre-line leading-relaxed">
              <Gift className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{deal.description}</span>
            </p>
          </div>
        )}

        <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-2.5 pt-2">
            {deal.items && deal.items.map((item, idx) => (
              <div key={idx} className={`${idx !== deal.items.length - 1 ? 'pb-2.5 border-b border-white/5' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <p className="text-white/70 font-sans text-xs flex-1">{item.name}</p>
                  <div className="text-right whitespace-nowrap">
                    {item.oldPrice && <p className="text-[10px] text-white/25 line-through font-sans">{item.oldPrice}</p>}
                    <p className={`text-xs font-serif font-bold ${deal.accent_color}`}>{item.price}</p>
                  </div>
                </div>
                {item.note && <p className="text-[10px] text-white/30 font-sans mt-0.5">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {!expanded && (
          <p className="text-[10px] text-gold-400/50 font-sans mt-2 text-center group-hover:text-gold-400/80 transition-colors">
            ▼ Tippe für Details
          </p>
        )}
      </div>
    </div>
  );
}

// ── Deals Modal Component ──
function DealsModal({
  isOpen,
  onClose,
  deals,
  loading,
}: {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  loading: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative glass-card w-full max-w-4xl max-h-[85vh] overflow-y-auto glow-gold animate-scale-in p-6 md:p-8 z-10 scrollbar-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-dark-900/50"
          aria-label="Schliessen"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <p className="text-gold-400 font-sans text-xs tracking-[0.3em] uppercase mb-1">
            Exklusiv
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">
            Jubiläums-Deals
          </h2>
          <p className="text-white/40 font-sans text-xs">Tippe auf einen Deal für Details</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-10 text-white/30 font-sans">
            Zurzeit keine Jubiläums-Deals verfügbar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2">
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



