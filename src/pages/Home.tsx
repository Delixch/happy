import { Link } from 'react-router-dom';
import { ChefHat, Heart, Award, ChevronLeft, ChevronRight, Instagram, RefreshCw, Loader2, X, Gift, ChevronDown } from 'lucide-react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { supabase, type InstagramPost, type Deal } from '../lib/supabase';

export default function Home() {
  const slides = useMemo(
    () => [
      {
        image: '/Home.jpg',
        title: 'Ein Häppchen Glück!',
        subtitle: 'Willkommen bei Happy Beck',
        text: 'Traditionelles Handwerk trifft moderne Innovation. Entdecken Sie unsere Leidenschaft für frisches Brot und feine Backwaren.',
      },
      {
        image: '/Home1.png',
        title: 'Frisch. Fein. Happy.',
        subtitle: 'Täglich ofenfrisch',
        text: 'Jeden Tag ofenfrisch – mit ausgewählten Zutaten und viel Liebe zum Detail.',
      },
      {
        image: '/home2.jpeg',
        title: 'Süsses und Herzhaftes',
        subtitle: 'Für jeden Geschmack',
        text: 'Von Gipfeli bis Sandwich: Für jeden Geschmack das Richtige.',
      },
    ],
    []
  );

  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [instaPost, setInstaPost] = useState<InstagramPost | null>(null);
  const [loadingInsta, setLoadingInsta] = useState(true);

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
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home">
      {/* Hero - Full Screen */}
      <div className="relative min-h-screen lg:h-screen overflow-hidden flex flex-col justify-center py-20 lg:py-0">
        {/* Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105 ${
            isTransitioning ? 'opacity-0 scale-110' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url('${slides[slide].image}')` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/70 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/60 to-transparent" />

        {/* Content */}
        <div className="relative container mx-auto px-4 lg:px-8 flex items-center py-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left Column: Slide Content */}
            <div className={`lg:col-span-7 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-4">
                {slides[slide].subtitle}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1]">
                {slides[slide].title}
              </h1>
              <div className="divider-gold w-24 mb-6" />
              <p className="text-lg md:text-xl text-white/70 font-sans font-light mb-10 max-w-lg leading-relaxed">
                {slides[slide].text}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="btn-gold">
                  Unsere Speisekarte
                </Link>
                <Link to="/kontakt" className="btn-gold-outline">
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Right Column: Small Floating Instagram Card */}
            <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="w-[210px] sm:w-[280px] glass-card overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 hover:glow-gold cursor-pointer transform origin-center">
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-dark-900/40">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-sans font-bold text-white/80 tracking-wider uppercase flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-gold-400" /> Instagram Feed
                    </span>
                  </div>
                  <button 
                    onClick={fetchRandomInsta}
                    className="text-white/30 hover:text-gold-400 transition-colors p-1"
                    title="Anderen Beitrag laden"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                <div className="relative aspect-square overflow-hidden bg-dark-900">
                  {loadingInsta ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
                    </div>
                  ) : instaPost ? (
                    <a href={instaPost.post_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
                      {instaPost.image_url.match(/\.(mp4|webm|ogg|mov)$/i) || instaPost.image_url.includes('/video/upload') || instaPost.image_url.includes('video') ? (
                        <video src={instaPost.image_url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                      ) : (
                        <img src={instaPost.image_url} alt="Instagram Post" className="w-full h-full object-cover" fetchPriority="high" />
                      )}
                      <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <span className="text-xs font-sans font-bold text-white border border-white/20 px-3 py-1.5 rounded-full bg-dark-900/40 backdrop-blur-sm">
                          Öffnen
                        </span>
                      </div>
                    </a>
                  ) : null}
                </div>

                {instaPost && instaPost.caption && (
                  <div className="p-3 bg-dark-900/20">
                    <p className="text-[11px] text-white/60 font-sans line-clamp-2 leading-relaxed">
                      {instaPost.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => changeSlide(i)}
                  className="group relative"
                >
                  <div className={`h-[2px] transition-all duration-500 ${
                    i === slide ? 'w-12 bg-gold-400' : 'w-6 bg-white/30 group-hover:bg-white/50'
                  }`} />
                </button>
              ))}
              <span className="text-white/30 text-xs font-sans ml-3 tabular-nums">
                {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous slide"
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-gold-400/50 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all hover:bg-gold-400/5"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="Next slide"
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-gold-400/50 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all hover:bg-gold-400/5"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom gradient to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-700 to-transparent" />
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-dark-700">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 reveal">
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Unsere Philosophie
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Was uns <span className="text-gold-gradient">auszeichnet</span>
            </h2>
            <div className="divider-gold w-20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ChefHat className="w-5.5 h-5.5" />}
              title="Handwerk"
              text="Traditionelle Backkunst, entwickelt über Jahrzehnte voller Erfahrung und Leidenschaft. Unsere Rezepte und handwerklichen Techniken wurden von Generation zu Generation weitergegeben und bis heute bewahrt."
              delay={0}
            />
            <FeatureCard
              icon={<Heart className="w-5.5 h-5.5" />}
              title="Qualität"
              text="Wir verwenden nur die besten, sorgfältig ausgewählten Zutaten, um täglich frische Backwaren von höchster Qualität herzustellen. Qualität und Leidenschaft sind die Basis für den Genuss."
              delay={150}
            />
            <FeatureCard
              icon={<Award className="w-5.5 h-5.5" />}
              title="Innovation"
              text="Wir verbinden kreative Innovation mit unserer traditionellen Backkunst. So entstehen einzigartige Produkte, die modern und zugleich authentisch sind."
              delay={300}
            />
          </div>
        </div>
      </div>

      {/* Confetti Rain */}
      <Confetti active={confettiActive} />

      {/* ─── SPIEL & SPASS SECTION (INTERACTIVE QUIZ) ─── */}
      <div className="relative py-24 bg-dark-800 border-t border-white/5 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center mb-10 reveal">
            <p className="text-gold-400 font-sans text-xs tracking-[0.3em] uppercase mb-3">
              Spiel & Spass
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              Hast du <span className="text-gold-gradient">Hunger?</span>
            </h2>
            <div className="divider-gold w-16 mx-auto mt-4" />
          </div>

          <div className="max-w-md mx-auto reveal" style={{ animationDelay: '150ms' }}>
            <HungerGame onComplete={() => {
              setConfettiActive(true);
              setIsDealsModalOpen(true);
              setTimeout(() => setConfettiActive(false), 4500);
            }} />
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
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
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
      className="reveal"
      style={{ animationDelay: `${delay}ms`, perspective: '1000px' }}
    >
      <div
        style={{ transform }}
        className="relative text-left p-6 rounded-2xl glass-card transition-all duration-300 will-change-transform hover:glow-gold group"
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${bgPos}, rgba(212,175,55,0.06), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold-400/20 text-gold-400 group-hover:border-gold-400/40 group-hover:bg-gold-400/5 transition-all duration-300">
              {icon}
            </div>
            <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-400 transition-colors">{title}</h3>
          </div>
          <p className="text-white/50 font-sans text-xs leading-relaxed">{text}</p>
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

const DEFAULT_POSTS: InstagramPost[] = [
  {
    id: 'def-1',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=60',
    post_url: 'https://www.instagram.com/happybeck.ch',
    caption: 'Frisches Brot jeden Morgen! 🥖 Frisch gebacken mit viel Liebe und Tradition. Besuchen Sie uns in Zürich! #happybeck #zürich #bäckerei',
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

