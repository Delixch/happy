import { useState, useEffect } from 'react';
import { Gift, Zap, PartyPopper, Eye, ChevronDown, Loader2 } from 'lucide-react';
import { supabase, type DailySpecial, type Deal } from '../lib/supabase';

// ── Confetti Component ──
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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


// ── Daily Special Mystery Card ──
function DailySpecialCard({ special }: { special: DailySpecial }) {
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [couponActive, setCouponActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    let timer: any;
    if (couponActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [couponActive, timeLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleReveal = () => {
    setRevealed(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleActivate = () => {
    setCouponActive(true);
    setTimeLeft(900);
  };

  const todayCode = `HB-${new Date().getDate()}${new Date().getMonth() + 1}-${special.title.slice(0, 3).toUpperCase()}`;

  return (
    <>
      <Confetti active={confetti} />
      <div className="relative h-full flex flex-col">
        {!revealed ? (
          /* Mystery Side */
          <button
            onClick={handleReveal}
            className="w-full h-full glass-card overflow-hidden group cursor-pointer hover:glow-gold-strong transition-all duration-500 flex flex-col justify-center"
          >
            <div className="h-[2px] bg-gradient-to-r from-gold-400 via-amber-300 to-gold-400 animate-shimmer" />
            <div className="relative p-6 flex-1 flex flex-col justify-center">
              {/* Animated sparkles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-gold-400/30 animate-float"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                      fontSize: `${8 + Math.random() * 10}px`,
                    }}
                  >
                    ✦
                  </div>
                ))}
              </div>

              <div className="relative z-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400/20 to-amber-500/10 border-2 border-gold-400/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-gold-400/60 transition-all duration-500">
                  <Eye className="w-6 h-6 text-gold-400 group-hover:animate-pulse" />
                </div>
                <p className="text-gold-400 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
                  Heute's Spezial
                </p>
                <h3 className="text-xl font-serif font-bold text-white mb-3 leading-snug">
                  Was verbirgt sich <br />
                  <span className="text-gold-gradient">heute?</span>
                </h3>
                <p className="text-white/40 font-sans text-xs mb-4">
                  Neugierig? Nur wer klickt, erfährt es!
                </p>
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 font-sans font-semibold text-xs group-hover:bg-gold-400/20 group-hover:border-gold-400/50 transition-all">
                  <Zap className="w-3.5 h-3.5" />
                  Jetzt aufdecken!
                </div>
              </div>
            </div>
          </button>
        ) : (
          /* Revealed Side */
          <div className="glass-card overflow-hidden animate-scale-in glow-gold-strong h-full flex flex-col justify-center">
            <div className="h-[2px] bg-gradient-to-r from-emerald-400 via-gold-400 to-emerald-400" />
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="text-center">
                <PartyPopper className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <p className="text-emerald-400 font-sans text-[10px] tracking-[0.3em] uppercase mb-2 font-bold">
                  🎉 Heute's Spezial enthüllt!
                </p>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {special.title}
                </h3>
                {special.description && (
                  <p className="text-white/60 font-sans text-xs mb-4 max-w-xs mx-auto leading-relaxed">{special.description}</p>
                )}

                {special.image_url && (
                  <div className="w-28 h-28 rounded-xl overflow-hidden mx-auto mb-4 ring-2 ring-gold-400/30">
                    <img src={special.image_url} alt={special.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-dark-400 border border-gold-400/20">
                  {special.original_price && (
                    <span className="text-white/30 font-sans line-through text-sm">{special.original_price}</span>
                  )}
                  <span className="text-xl font-serif font-bold text-gold-400">{special.special_price}</span>
                </div>

                {/* Gutschein Activation / Live Timer */}
                <div className="mt-4">
                  {!couponActive ? (
                    <button
                      onClick={handleActivate}
                      className="w-full btn-gold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Rabatt-Coupon aktivieren
                    </button>
                  ) : (
                    <div className="p-3 rounded-lg border border-gold-400/20 bg-gold-400/5 text-center animate-scale-in">
                      <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold mb-1 animate-pulse">
                        🔥 Gutschein aktiv!
                      </p>
                      <p className="text-2xl font-mono font-bold text-white tracking-wider mb-1">
                        {timeLeft > 0 ? formatTime(timeLeft) : 'Abgelaufen'}
                      </p>
                      <p className="text-[9px] text-white/40">
                        📸 Screenshot machen & an der Kasse zeigen!
                      </p>
                      <p className="text-[9px] text-gold-400/80 font-mono mt-1 select-all" title="Klicken zum Auswählen">
                        Code: {todayCode}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-white/20 font-sans text-[9px] mt-4">
                  Nur heute gültig · Solange der Vorrat reicht
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card overflow-hidden group hover:glow-gold transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-[2px] bg-gradient-to-r ${deal.gradient.replace('/20', '')}`} />
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">
              {deal.title}
            </h3>
            {deal.subtitle && <p className="text-xs text-white/40 font-sans">{deal.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {deal.is_new && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-sans font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">NEU</span>
            )}
            {deal.is_special && (
              <span className="px-3 py-1 bg-gold-400/10 text-gold-400 text-[10px] font-sans font-bold uppercase tracking-wider rounded-full border border-gold-400/20">SPECIAL</span>
            )}
            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {deal.description && (
          <div className="glass-card-light p-3 mb-4">
            <p className="text-xs text-white/60 font-sans flex items-start gap-2 whitespace-pre-line">
              <Gift className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{deal.description}</span>
            </p>
          </div>
        )}

        <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3 pt-2">
            {deal.items && deal.items.map((item, idx) => (
              <div key={idx} className={`${idx !== deal.items.length - 1 ? 'pb-3 border-b border-white/5' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <p className="text-white/70 font-sans text-sm flex-1">{item.name}</p>
                  <div className="text-right whitespace-nowrap">
                    {item.oldPrice && <p className="text-xs text-white/25 line-through font-sans">{item.oldPrice}</p>}
                    <p className={`text-sm font-serif font-bold ${deal.accent_color}`}>{item.price}</p>
                  </div>
                </div>
                {item.note && <p className="text-[11px] text-white/30 font-sans mt-1">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {!expanded && (
          <p className="text-xs text-gold-400/50 font-sans mt-2 text-center group-hover:text-gold-400/80 transition-colors">
            ▼ Tippe für Details
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──
export default function Aktuelles() {
  const [dailySpecial, setDailySpecial] = useState<DailySpecial | null>(null);
  const [loadingSpecial, setLoadingSpecial] = useState(true);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(true);

  // Interactive Lunch-Pass Simulator State
  const [stamps, setStamps] = useState(0);
  const [celebrationType, setCelebrationType] = useState<'kaffee' | 'sandwich' | null>(null);
  const [passConfetti, setPassConfetti] = useState(false);

  const handleStampClick = (num: number) => {
    // Tapping the active stamp number resets it back one step. Tapping any other number sets to that count.
    const newCount = stamps === num ? num - 1 : num;
    setStamps(newCount);

    if (newCount === 5) {
      setCelebrationType('kaffee');
      setPassConfetti(true);
      setTimeout(() => setPassConfetti(false), 4000);
    } else if (newCount === 10) {
      setCelebrationType('sandwich');
      setPassConfetti(true);
      setTimeout(() => setPassConfetti(false), 4000);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    supabase
      .from('daily_specials')
      .select('*')
      .eq('is_active', true)
      .eq('valid_date', today)
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setDailySpecial(data[0]);
        setLoadingSpecial(false);
      });

    supabase
      .from('deals')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setDeals(data);
        setLoadingDeals(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* ── HERO ── */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        {/* Fallback Header Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/default-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/60 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/25" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="text-gold-400/40" style={{ fontSize: `${8 + Math.random() * 16}px` }}>✦</div>
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10 z-20">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Seit 20 Jahren Ihr Bäcker
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-1">
              Aktuelles & Deals
            </h1>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE AREA (2-COLUMN LAYOUT: SPECIAL, LUNCH PASS) ── */}
      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Column: Daily Special */}
          <div className="flex flex-col h-full animate-fade-in">
            <div className="text-center mb-4">
              <p className="text-gold-400 font-sans text-[10px] tracking-[0.3em] uppercase mb-1">
                Jeden Tag neu
              </p>
              <h2 className="text-lg font-serif font-bold text-white">
                Heute's <span className="text-gold-gradient">Spezial</span>
              </h2>
            </div>
            <div className="flex-1">
              {loadingSpecial ? (
                <div className="glass-card p-12 text-center animate-pulse h-full flex flex-col justify-center items-center">
                  <div className="w-12 h-12 rounded-full bg-gold-400/10 mb-4" />
                  <div className="h-5 w-40 bg-white/5 rounded mb-3" />
                  <div className="h-4 w-28 bg-white/5 rounded" />
                </div>
              ) : dailySpecial ? (
                <DailySpecialCard special={dailySpecial} />
              ) : (
                <div className="glass-card p-10 text-center h-full flex flex-col justify-center items-center">
                  <Eye className="w-10 h-10 text-white/20 mb-4" />
                  <p className="text-white/40 font-sans text-sm">Heute's Spezial wird bald bekannt gegeben...</p>
                  <p className="text-white/20 font-sans text-xs mt-2">Schaue morgen wieder vorbei!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Lunch-Pass */}
          <div className="flex flex-col h-full animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Confetti active={passConfetti} />
            <div className="text-center mb-4">
              <p className="text-gold-400 font-sans text-[10px] tracking-[0.3em] uppercase mb-1">
                Treuepass
              </p>
              <h2 className="text-lg font-serif font-bold text-white">
                Lunch-Pass
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="glass-card overflow-hidden glow-gold h-full flex flex-col justify-between relative">
                {/* Top decorative gold line */}
                <div className="h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
                
                <div className="relative p-6 flex-1 flex flex-col justify-between">
                  {/* Interactive Celebrations Overlays */}
                  {celebrationType === 'kaffee' && (
                    <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
                      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-3 border border-gold-400/30">
                        <span className="text-2xl">☕</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gold-gradient mb-1">
                        5. Kaffee GRATIS!
                      </h3>
                      <p className="text-white/60 font-sans text-[10px] max-w-[200px] mb-4">
                        Glückwunsch! Ihr gratis Kaffee wurde freigeschaltet.
                      </p>
                      <button 
                        onClick={() => setCelebrationType(null)}
                        className="btn-gold text-[9px] px-3.5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all"
                      >
                        Weiter stempeln
                      </button>
                    </div>
                  )}

                  {celebrationType === 'sandwich' && (
                    <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
                      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-3 border border-gold-400/30">
                        <span className="text-2xl">🥪</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gold-gradient mb-1">
                        Gratis SANDWICH!
                      </h3>
                      <p className="text-white/60 font-sans text-[10px] max-w-[200px] mb-4">
                        Hauptgewinn! Geniessen Sie ein gratis Sandwich Ihrer Wahl.
                      </p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setCelebrationType(null)}
                          className="btn-gold text-[9px] px-3.5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all"
                        >
                          Gutschein zeigen
                        </button>
                        <button 
                          onClick={() => { setCelebrationType(null); setStamps(0); }}
                          className="btn-gold-outline text-[9px] px-3.5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <p className="text-white/60 font-sans text-[11px] leading-relaxed">
                      Sammeln Sie Kaffee-Stempel: <br />
                      5. Kaffee <span className="text-gold-400 font-semibold">gratis</span> & 10. Kaffee bringt ein <span className="text-gold-400 font-semibold">Sandwich gratis</span>!
                    </p>
                  </div>

                  {/* Stamp circles grid */}
                  <div className="relative z-10 max-w-[240px] mx-auto w-full">
                    {[
                      { row: [1, 2, 3, 4, 5], reward: { num: 5, text: 'Kaffee' } },
                      { row: [6, 7, 8, 9, 10], reward: { num: 10, text: 'Sandwich' } },
                    ].map((group, gi) => (
                      <div key={gi} className="grid grid-cols-5 gap-1.5 mb-3">
                        {group.row.map((num) => {
                          const isReward = num === group.reward.num;
                          const isStamped = num <= stamps;
                          return (
                            <div key={num}>
                              <button
                                onClick={() => handleStampClick(num)}
                                className={`w-full aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                                  isStamped 
                                    ? 'bg-gradient-to-br from-gold-400 to-amber-500 border-gold-300 text-dark-900 font-bold shadow-[0_0_12px_rgba(212,175,55,0.45)] scale-105' 
                                    : isReward 
                                      ? 'bg-gold-400/5 border-dashed border-gold-400/40 text-gold-400/60 hover:border-gold-400/80 hover:bg-gold-400/10' 
                                      : 'bg-dark-400 border-white/10 text-white/30 hover:border-gold-400/30 hover:bg-dark-300'
                                }`}
                              >
                                <span className={`text-xs font-serif font-bold ${isStamped ? 'text-dark-900' : isReward ? 'text-gold-400' : 'text-white/20'}`}>{num}</span>
                                {isReward && !isStamped && (
                                  <span className="text-[7px] font-sans font-bold text-gold-400/80 text-center leading-none mt-0.5 px-0.5">
                                    {group.reward.text}
                                  </span>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Dynamic interactive guide message */}
                  <div className="text-center mt-3 min-h-[22px]">
                    {stamps === 0 && (
                      <p className="text-white/30 font-sans text-[9px] animate-pulse">
                        💡 Kreise anklicken zum Stempeln!
                      </p>
                    )}
                    {stamps > 0 && stamps < 5 && (
                      <p className="text-gold-400/80 font-sans text-[9px] font-medium">
                        Noch {5 - stamps} Stempel bis zum Gratis-Kaffee! ☕
                      </p>
                    )}
                    {stamps === 5 && (
                      <p className="text-gold-400 font-sans text-[9px] font-bold animate-bounce">
                        🎉 Kaffee freigeschaltet!
                      </p>
                    )}
                    {stamps > 5 && stamps < 10 && (
                      <p className="text-gold-400/80 font-sans text-[9px] font-medium">
                        Noch {10 - stamps} Stempel bis zum Gratis-Sandwich! 🥪
                      </p>
                    )}
                    {stamps === 10 && (
                      <p className="text-gold-400 font-sans text-[9px] font-bold animate-bounce">
                        🎉 Sandwich freigeschaltet!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DEALS ── */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-gold-400 font-sans text-[10px] tracking-[0.3em] uppercase mb-1">
            Exklusiv
          </p>
          <h2 className="text-lg font-serif font-bold text-white mb-1">
            Jubiläums-Deals
          </h2>
          <p className="text-white/30 font-sans text-xs">Tippe auf einen Deal für Details</p>
        </div>

        {loadingDeals ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : deals.length === 0 ? (
          <div className="glass-card p-8 text-center text-white/30 font-sans max-w-md mx-auto">
            Zurzeit keine Jubiläums-Deals verfügbar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
