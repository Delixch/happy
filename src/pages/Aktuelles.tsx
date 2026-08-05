import { useState, useEffect } from 'react';
import { Gift, Zap, PartyPopper, Eye, ChevronDown, Loader2 } from 'lucide-react';
import { supabase, type DailySpecial, type Deal } from '../lib/supabase';
import HeroVideo from '../components/HeroVideo';

// Shared dark olive gradient used across all cards on this page
const CARD_GRADIENT = 'linear-gradient(135deg, #1A1A00 0%, #0D0D00 100%)';
const CARD_BORDER = 'border border-white/15';

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
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
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
            className={`relative w-full h-full ${CARD_BORDER} rounded-3xl shadow-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] hover:glow-gold transition-all duration-500 flex flex-col justify-center`}
            style={{ background: CARD_GRADIENT }}
          >
            <Eye className="absolute -right-4 -bottom-6 w-32 h-32 opacity-10 pointer-events-none rotate-[-12deg]" />
            <div className="relative p-7 flex-1 flex flex-col justify-center">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFBB00] text-[#1E293B] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 shadow-xl transition-all duration-500">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFBB00] text-[#1E293B] font-sans text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
                  HEUTE'S SPEZIAL
                </span>
                <h3 className="text-2xl font-serif font-black text-white mb-2 leading-snug">
                  Was verbirgt sich <br />
                  <span className="text-[#FFBB00] underline">heute?</span>
                </h3>
                <p className="text-white/80 font-sans text-xs mb-6 font-medium">
                  Neugierig? Nur wer klickt, erfährt es!
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FFBB00] text-[#1E293B] font-sans font-black text-xs uppercase tracking-wider shadow-lg group-hover:scale-105 transition-all">
                  <Zap className="w-4 h-4 fill-current" />
                  Jetzt aufdecken!
                </div>
              </div>
            </div>
          </button>
        ) : (
          /* Revealed Side */
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${CARD_BORDER} animate-scale-in h-full flex flex-col justify-center`} style={{ background: CARD_GRADIENT }}>
            <PartyPopper className="absolute -right-4 -bottom-6 w-32 h-32 opacity-10 pointer-events-none rotate-[-12deg]" />
            <div className="relative p-7 flex-1 flex flex-col justify-center">
              <div className="text-center">
                <PartyPopper className="w-10 h-10 text-[#FFFFCC] mx-auto mb-3" />
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFFFCC] text-[#1A1A00] font-sans text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
                  🎉 SPEZIAL ENTHÜLLT!
                </span>
                <h3 className="text-2xl font-serif font-black text-white drop-shadow-md mb-2">
                  {special.title}
                </h3>
                {special.description && (
                  <p className="text-white/90 font-sans text-xs mb-4 max-w-xs mx-auto leading-relaxed font-medium">{special.description}</p>
                )}

                {special.image_url && (
                  <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-4 border-2 border-[#FFFFCC] shadow-xl">
                    <img src={special.image_url} alt={special.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/30 border border-white/10 shadow-inner mb-4">
                  {special.original_price && (
                    <span className="text-white/50 font-sans line-through text-sm font-medium">{special.original_price}</span>
                  )}
                  <span className="text-2xl font-serif font-black text-[#FFFFCC]">{special.special_price}</span>
                </div>

                {/* Gutschein Activation / Live Timer */}
                <div className="mt-2">
                  {!couponActive ? (
                    <button
                      onClick={handleActivate}
                      className="w-full py-3 px-4 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      Rabatt-Coupon aktivieren
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl border border-white/10 bg-black/30 text-center animate-scale-in">
                      <p className="text-xs text-[#FFFFCC] uppercase tracking-widest font-black mb-1 animate-pulse">
                        🔥 Gutschein aktiv!
                      </p>
                      <p className="text-3xl font-mono font-black text-white tracking-wider mb-1">
                        {timeLeft > 0 ? formatTime(timeLeft) : 'Abgelaufen'}
                      </p>
                      <p className="text-[10px] text-white/80 font-medium">
                        📸 Screenshot machen & an der Kasse zeigen!
                      </p>
                      <p className="text-xs text-[#FFFFCC] font-mono mt-1 font-bold select-all" title="Klicken zum Auswählen">
                        Code: {todayCode}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-white/50 font-sans text-[10px] mt-4 font-medium">
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
      className={`relative rounded-3xl overflow-hidden shadow-2xl ${CARD_BORDER} group hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full flex flex-col`}
      onClick={() => setExpanded(!expanded)}
      style={{ background: CARD_GRADIENT, animationDelay: `${index * 100}ms` }}
    >
      <Gift className="absolute -right-4 -bottom-6 w-32 h-32 opacity-10 pointer-events-none rotate-[-12deg]" />
      <div className="relative p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-black text-white drop-shadow-md mb-1">
              {deal.title}
            </h3>
            {deal.subtitle && <p className="text-xs text-white/80 font-sans font-medium">{deal.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {deal.is_new && (
              <span className="px-3 py-1 bg-[#FFFFCC] text-[#1A1A00] text-[10px] font-sans font-black uppercase tracking-wider rounded-full shadow-sm">NEU</span>
            )}
            {deal.is_special && (
              <span className="px-3 py-1 bg-[#FFFFCC] text-[#1A1A00] text-[10px] font-sans font-black uppercase tracking-wider rounded-full shadow-sm">SPECIAL</span>
            )}
            <div className="w-8 h-8 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center font-bold shadow-md">
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>

        {deal.description && (
          <div className="bg-black/20 p-4 rounded-2xl mb-4 border border-white/10">
            <p className="text-xs md:text-sm text-white/90 font-sans flex items-start gap-2 whitespace-pre-line font-medium leading-relaxed">
              <Gift className="w-5 h-5 text-[#FFFFCC] flex-shrink-0 mt-0.5" />
              <span>{deal.description}</span>
            </p>
          </div>
        )}

        <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3 pt-2">
            {deal.items && deal.items.map((item, idx) => (
              <div key={idx} className={`${idx !== deal.items.length - 1 ? 'pb-3 border-b border-white/10' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <p className="text-white font-sans text-sm font-bold flex-1">{item.name}</p>
                  <div className="text-right whitespace-nowrap">
                    {item.oldPrice && <p className="text-xs text-white/50 line-through font-sans font-medium">{item.oldPrice}</p>}
                    <p className="text-base font-serif font-black text-[#FFFFCC]">{item.price}</p>
                  </div>
                </div>
                {item.note && <p className="text-xs text-white/70 font-sans mt-1 font-medium">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {!expanded && (
          <p className="text-xs text-[#FFFFCC] font-sans mt-3 text-center font-bold tracking-wider uppercase group-hover:scale-105 transition-all">
            ▼ Details anzeigen
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
  const [celebrationType, setCelebrationType] = useState<'kaffee' | 'sandwich' | 'kasse' | null>(null);
  const [passConfetti, setPassConfetti] = useState(false);

  const handleStampClick = (num: number) => {
    setStamps((current) => (current === num ? num - 1 : num));
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (stamps === 5) {
      setCelebrationType('kaffee');
      setPassConfetti(true);
      timer = setTimeout(() => {
        setCelebrationType(null);
        setPassConfetti(false);
        setStamps(6);
      }, 2800);
    } else if (stamps === 10) {
      setCelebrationType('sandwich');
      setPassConfetti(true);
      timer = setTimeout(() => {
        setCelebrationType('kasse');
        setPassConfetti(false);
        setStamps(0);
      }, 3200);
    }
    return () => clearTimeout(timer);
  }, [stamps]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (celebrationType === 'kasse') {
      timer = setTimeout(() => {
        setCelebrationType(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [celebrationType]);

  useEffect(() => {
    if (loadingSpecial || celebrationType) return;
    let timer: ReturnType<typeof setTimeout>;
    if (stamps < 5 || (stamps > 5 && stamps < 10)) {
      timer = setTimeout(() => {
        setStamps((s) => s + 1);
      }, 650);
    }
    return () => clearTimeout(timer);
  }, [stamps, loadingSpecial, celebrationType]);

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
    <div className="min-h-screen pt-14 md:pt-16 bg-warm-yellow pb-24">
      {/* ── HERO ── */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785405038/3_d4eggy.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10 z-20">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Seit 20 Jahren Ihr Bäcker
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Aktuelles & <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Deals</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE AREA (2-COLUMN LAYOUT: SPECIAL, LUNCH PASS) ── */}
      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">

          {/* Left Column: Daily Special — deliberately wider, the story card */}
          <div className="flex flex-col h-full animate-fade-in md:col-span-3">
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
                JEDEN TAG NEU
              </span>
              <h2 className="text-2xl font-serif font-black text-[#1A1A00]">
                Heute's Spezial
              </h2>
            </div>
            <div className="flex-1">
              {loadingSpecial ? (
                <div className="p-12 text-center rounded-3xl animate-pulse h-full flex flex-col justify-center items-center shadow-2xl" style={{ background: CARD_GRADIENT }}>
                  <div className="w-12 h-12 rounded-full bg-[#FFFFCC]/20 mb-4" />
                  <div className="h-5 w-40 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-28 bg-white/10 rounded" />
                </div>
              ) : dailySpecial ? (
                <DailySpecialCard special={dailySpecial} />
              ) : (
                <div className={`relative rounded-3xl overflow-hidden text-center h-full flex flex-col justify-between items-center shadow-2xl ${CARD_BORDER}`} style={{ background: CARD_GRADIENT }}>
                  <Eye className="absolute -right-4 -bottom-6 w-32 h-32 opacity-10 pointer-events-none rotate-[-12deg]" />
                  <div className="relative p-10 flex flex-col items-center justify-center flex-1">
                    <Eye className="w-12 h-12 text-[#FFFFCC] mb-4" />
                    <p className="text-white font-serif text-lg font-bold">Heute's Spezial wird bald bekannt gegeben...</p>
                    <p className="text-white/70 font-sans text-xs mt-2 font-medium">Schaue morgen wieder vorbei!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Lunch-Pass — narrower, compact action widget */}
          <div className="flex flex-col h-full animate-fade-in md:col-span-2" style={{ animationDelay: '100ms' }}>
            <Confetti active={passConfetti} />
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
                TREUEPASS
              </span>
              <h2 className="text-2xl font-serif font-black text-[#1A1A00]">
                Lunch-Pass
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              <div className={`rounded-3xl overflow-hidden shadow-2xl ${CARD_BORDER} h-full flex flex-col justify-between relative`} style={{ background: CARD_GRADIENT }}>
                <div className="relative p-7 flex-1 flex flex-col justify-between">
                     {celebrationType === 'kaffee' && (
                    <div className="absolute inset-0 bg-[#1A1A00] z-30 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
                      <div className="w-14 h-14 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center mb-4 shadow-xl">
                        <span className="text-3xl">☕</span>
                      </div>
                      <h3 className="text-2xl font-serif font-black text-[#FFFFCC] mb-2">
                        5. Kaffee GRATIS!
                      </h3>
                      <p className="text-[#FFFFCC]/90 font-sans text-xs max-w-[220px] mb-6 font-medium">
                        Glückwunsch! Ihr gratis Kaffee wurde freigeschaltet.
                      </p>
                      <button 
                        onClick={() => setCelebrationType(null)}
                        className="px-6 py-2.5 rounded-xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        Weiter stempeln
                      </button>
                    </div>
                  )}

                  {celebrationType === 'sandwich' && (
                    <div className="absolute inset-0 bg-[#1A1A00] z-30 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
                      <div className="w-14 h-14 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center mb-4 shadow-xl">
                        <span className="text-3xl">🥪</span>
                      </div>
                      <h3 className="text-2xl font-serif font-black text-[#FFFFCC] mb-2">
                        Gratis SANDWICH!
                      </h3>
                      <p className="text-[#FFFFCC]/90 font-sans text-xs max-w-[220px] mb-6 font-medium">
                        Hauptgewinn! Geniessen Sie ein gratis Sandwich Ihrer Wahl.
                      </p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setCelebrationType(null)}
                          className="px-5 py-2.5 rounded-xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          Gutschein zeigen
                        </button>
                        <button 
                          onClick={() => { setCelebrationType(null); setStamps(0); }}
                          className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-sans font-black text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                  {celebrationType === 'kasse' && (
                    <div className="absolute inset-0 bg-[#1A1A00]/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
                      <div className="text-[#FFFFCC] font-serif font-black text-lg md:text-xl leading-snug tracking-wider animate-pulse uppercase px-2">
                        FRAGEN SIE <br />
                        AN DER KASSE <br />
                        NACH IHREM <br />
                        LUNCH-PASS!
                      </div>
                      <div className="w-12 h-1 bg-[#FFFFCC] my-4 rounded-full" />
                      <p className="text-white/60 font-sans text-xs uppercase tracking-widest font-bold">
                        Happy Beck Zürich
                      </p>
                    </div>
                  )}

                  <div className="text-center mb-5">
                    <p className="text-white/90 font-sans text-xs leading-relaxed font-medium">
                      Sammeln Sie Kaffee-Stempel: <br />
                      5. Kaffee <span className="text-[#FFFFCC] font-black">GRATIS</span> & 10. Kaffee bringt ein <span className="text-[#FFFFCC] font-black">SANDWICH GRATIS</span>!
                    </p>
                  </div>

                  {/* Stamp circles grid */}
                  <div className="relative z-10 max-w-[250px] mx-auto w-full">
                    {[
                      { row: [1, 2, 3, 4, 5], reward: { num: 5, text: 'Kaffee' } },
                      { row: [6, 7, 8, 9, 10], reward: { num: 10, text: 'Sandwich' } },
                    ].map((group, gi) => (
                      <div key={gi} className="grid grid-cols-5 gap-2 mb-3">
                        {group.row.map((num) => {
                          const isReward = num === group.reward.num;
                          const isStamped = num <= stamps;
                          return (
                            <div key={num}>
                              <button
                                onClick={() => handleStampClick(num)}
                                className={`w-full aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                                  isStamped 
                                    ? 'bg-[#FFFFCC] border-white text-[#1A1A00] font-black shadow-lg scale-105' 
                                    : isReward 
                                      ? 'bg-white/5 border-dashed border-[#FFFFCC] text-[#FFFFCC] hover:bg-white/10' 
                                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                                }`}
                              >
                                <span className={`text-xs font-serif font-black ${isStamped ? 'text-[#1A1A00]' : 'text-white'}`}>{num}</span>
                                {isReward && !isStamped && (
                                  <span className="text-[7px] font-sans font-black text-[#FFFFCC] text-center leading-none mt-0.5 px-0.5">
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
                      <p className="text-white/70 font-sans text-xs font-bold animate-pulse">
                        💡 Kreise anklicken zum Stempeln!
                      </p>
                    )}
                    {stamps > 0 && stamps < 5 && (
                      <p className="text-[#FFFFCC] font-sans text-xs font-bold">
                        Noch {5 - stamps} Stempel bis zum Gratis-Kaffee! ☕
                      </p>
                    )}
                    {stamps === 5 && (
                      <p className="text-[#FFFFCC] font-sans text-xs font-black animate-bounce">
                        🎉 Kaffee freigeschaltet!
                      </p>
                    )}
                    {stamps > 5 && stamps < 10 && (
                      <p className="text-[#FFFFCC] font-sans text-xs font-bold">
                        Noch {10 - stamps} Stempel bis zum Gratis-Sandwich! 🥪
                      </p>
                    )}
                    {stamps === 10 && (
                      <p className="text-[#FFFFCC] font-sans text-xs font-black animate-bounce">
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
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-md">
            EXKLUSIVE ANGEBOTE
          </span>
          <h2 className="text-3xl font-serif font-black text-[#1A1A00] mb-2">
            Jubiläums-Deals
          </h2>
          <p className="text-[#1A1A00]/80 font-sans text-sm font-bold">Tippe auf einen Deal für Details</p>
        </div>

        {loadingDeals ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
          </div>
        ) : deals.length === 0 ? (
          <div className={`p-10 rounded-3xl text-center text-white font-sans max-w-md mx-auto shadow-2xl ${CARD_BORDER}`} style={{ background: CARD_GRADIENT }}>
            Zurzeit keine Jubiläums-Deals verfügbar.
          </div>
        ) : (
          <div className={`grid gap-8 mb-16 items-stretch ${deals.length > 1 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 max-w-[400px] mx-auto'}`}>
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
