import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Clock, Instagram, Send, ChefHat, ShoppingBag, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/contact';

const ORDER_STEPS = [
  { icon: Send, label: 'Nachricht erhalten' },
  { icon: ChefHat, label: 'Wird zubereitet' },
  { icon: ShoppingBag, label: 'Bereit zur Abholung' },
];
import HeroVideo from '../components/HeroVideo';

type Operator = '+' | '-' | 'x';

function generateQuestion() {
  const nums = [
    [4, 5, '+'],
    [6, 3, '-'],
    [3, 5, 'x'],
    [7, 2, '+'],
    [9, 4, '-'],
    [2, 8, 'x'],
  ] as Array<[number, number, Operator]>;
  const [a, b, op] = nums[Math.floor(Math.random() * nums.length)];
  let answer = 0;
  if (op === '+') answer = a + b;
  if (op === '-') answer = a - b;
  if (op === 'x') answer = a * b;
  return { text: `${a} ${op} ${b} = ?`, answer };
}

export default function Kontakt() {
  const location = useLocation();
  const prefillMessage = (location.state as { prefillMessage?: string } | null)?.prefillMessage ?? '';
  const initial = useMemo(() => generateQuestion(), []);
  const [question, setQuestion] = useState(initial);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number(userAnswer) !== question.answer) {
      setError('Bitte beantworten Sie die Sicherheitsfrage richtig.');
      setQuestion(generateQuestion());
      setUserAnswer('');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      company: data.get('company'),
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      address: data.get('address'),
      message: data.get('message'),
    };

    setError(null);
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request failed');
      form.reset();
      setSubmitted(true);
    } catch {
      setError('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kontakt" className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/f_auto,q_auto/v1785405572/4_jc4bnc.mp4"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Vorbestellung & Kontakt
            </span>
            <div className="relative inline-block block">
              <h1 className="text-3xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md whitespace-nowrap">
                Kontakt & <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Bestellung</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">
        {/* Yellow Area Title & Intro Text */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
            NACHRICHT & VORBESTELLUNG
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] mb-3 leading-tight flex items-center justify-center gap-3">
            <span>Schreiben Sie uns oder bestellen Sie vor</span>
            <div className="w-12 h-12 rounded-2xl bg-[#1A1A00] text-[#FFFFCC] flex items-center justify-center shadow-lg border border-white/20 inline-flex flex-shrink-0 animate-envelope-open">
              <Mail className="w-6 h-6 stroke-[2.5]" />
            </div>
          </h2>
          <p className="text-[#1A1A00]/85 font-sans text-sm md:text-base leading-relaxed font-semibold">
            Haben Sie Fragen zu unseren Produkten, möchten Sie eine Vorbestellung für Events tätigen oder Feedback teilen? Füllen Sie einfach das Formular aus – wir melden uns umgehend bei Ihnen!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="bg-[#1A1A00] backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 h-fit">
            <div className="p-8">
              <h3 className="font-serif text-xl font-black text-[#FFFFCC] mb-6">Informationen</h3>
              <div className="space-y-6 font-sans text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center font-bold shadow-md flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Adresse</p>
                    <p className="text-white/80 font-medium">Langstrasse 120, 8004 Zürich</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center font-bold shadow-md flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Öffnungszeiten</p>
                    <p className="text-white/80 font-medium">24 Stunden geöffnet</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center font-bold shadow-md flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Telefon</p>
                    <a href={`tel:${PHONE_TEL}`} className="text-[#FFFFCC] font-bold hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center font-bold shadow-md flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">E-Mail</p>
                    <a href="mailto:info@happybeck.ch" className="text-[#FFFFCC] font-bold hover:underline">
                      info@happybeck.ch
                    </a>
                  </div>
                </div>

                <div className="w-full h-0.5 bg-white/10 my-4" />

                <p className="text-white font-bold text-base mb-2">Instagram</p>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-white/90 hover:text-[#FFFFCC] font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#FFFFCC]" />
                    <span>@happybeck.ch</span>
                  </a>
                  <a
                    href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-white/90 hover:text-[#FFFFCC] font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#FFFFCC]" />
                    <span>@happybeck_</span>
                  </a>
                </div>

                <div className="w-full h-0.5 bg-white/10 my-4" />

                {/* Delivery Partners Box */}
                <div>
                  <p className="text-white font-bold text-base mb-1">Online Bestellung 🛵</p>
                  <p className="text-white/70 text-xs mb-3 font-medium">Direkt nach Hause liefern lassen:</p>
                  <div className="space-y-2.5">
                    <a
                      href="https://www.ubereats.com/ch-de/store/happybeck/1cMo9d_uXNufL0FRptsfcA?diningMode=DELIVERY&surfaceName="
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#06C167] text-white font-sans font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <span>Uber Eats</span>
                      <span>Bestellen ↗</span>
                    </a>
                    <a
                      href="https://www.just-eat.ch/speisekarte/happybeck-langstrasse"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FF8000] text-white font-sans font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <span>Just Eat</span>
                      <span>Bestellen ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[#1A1A00] backdrop-blur-xl p-12 text-center rounded-3xl shadow-2xl border border-white/20">
                <div className="w-16 h-16 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center mx-auto mb-6 shadow-xl font-bold">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-black text-[#FFFFCC] mb-3">Vielen Dank!</h3>
                <p className="text-white/90 font-sans text-base font-medium">
                  Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
                </p>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-white/50 font-sans text-xs uppercase tracking-wider font-bold mb-5">
                    So geht's bei einer Vorbestellung weiter
                  </p>
                  <div className="flex items-start justify-center gap-2 sm:gap-4">
                    {ORDER_STEPS.map((step, i) => (
                      <div key={step.label} className="flex items-start">
                        <div className="flex flex-col items-center gap-2 w-20">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                              i === 0 ? 'bg-[#FFFFCC] border-[#FFFFCC] text-[#1A1A00]' : 'border-white/20 text-white/40'
                            }`}
                          >
                            <step.icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-sans font-bold leading-tight ${i === 0 ? 'text-[#FFFFCC]' : 'text-white/40'}`}>
                            {step.label}
                          </span>
                        </div>
                        {i < ORDER_STEPS.length - 1 && <div className="w-6 sm:w-10 h-0.5 bg-white/10 mt-5" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-[#1A1A00] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 space-y-6 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Firma</label>
                    <input name="company" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors" type="text" placeholder="Firmenname" />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Ansprechpartner</label>
                    <input name="name" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors" type="text" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">E-Mail *</label>
                    <input name="email" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors" type="email" placeholder="name@example.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Telefon</label>
                    <input name="phone" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors" type="tel" placeholder="Ihre Telefonnummer" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Adresse / Ort</label>
                    <input name="address" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors" type="text" placeholder="Strasse, PLZ Ort" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Nachricht / Bestellung *</label>
                  <textarea name="message" defaultValue={prefillMessage} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors min-h-[130px] resize-y" rows={5} placeholder="Ihre Bestellung oder Nachricht..." required />
                </div>

                {/* Security Question & Action Row */}
                <div className="flex flex-wrap items-end gap-4 pt-2">
                  <div className="w-full sm:w-36">
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Sicherheitsfrage</label>
                    <input className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-2xl text-[#FFFFCC] font-sans text-sm font-bold text-center" type="text" value={question.text} readOnly />
                  </div>
                  <div className="w-full sm:w-28">
                    <label className="block text-xs font-sans font-black text-white/80 uppercase tracking-wider mb-2">Ergebnis *</label>
                    <input
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white font-sans text-sm outline-none focus:border-[#FFFFCC] transition-colors font-bold text-center"
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="?"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                    <button
                      type="button"
                      onClick={() => { setQuestion(generateQuestion()); setUserAnswer(''); }}
                      className="py-3 px-5 rounded-2xl border border-white/20 text-white font-sans font-bold text-xs uppercase hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Neu laden
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex-1 py-3 px-6 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Send className="w-4 h-4 fill-current" />
                      {sending ? 'Wird gesendet…' : 'Senden'}
                    </button>
                  </div>
                </div>
                {error && <p className="text-sm text-red-400 font-sans font-bold">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CSS animations for Kontakt page (Driving Delivery Van) */}
      <style>{`
        @keyframes carDrive {
          0% { left: -60px; }
          100% { left: calc(100% + 60px); }
        }
        .animate-car-drive {
          position: absolute;
          animation: carDrive 16s linear infinite;
          width: 46px;
        }

        @keyframes carBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        .animate-car-bounce {
          animation: carBounce 0.35s ease-in-out infinite;
        }
      `}</style>

      {/* ── GOOGLE MAPS SECTION ── */}
      <div className="container mx-auto px-4 lg:px-8 pb-12 max-w-6xl relative pt-6">
        
        {/* Animated Driving Delivery Van on the Gold Line */}
        <div className="absolute top-[-10px] left-[16px] right-[16px] lg:left-[32px] lg:right-[32px] h-[36px] pointer-events-none overflow-hidden z-30">
          <div className="animate-car-drive absolute bottom-0">
            <svg className="animate-car-bounce" width="72" height="36" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Cargo Box */}
              <path d="M4 6C4 5.4 4.4 5 5 5H28C28.6 5 29 5.4 29 6V18H4V6Z" fill="#1E293B"/>
              {/* Cabin */}
              <path d="M29 9H34.5L41 14.2V18H29V9Z" fill="#1E293B"/>
              {/* Windshield Window */}
              <path d="M30.5 10.5H33.8L37.8 13.8H30.5V10.5Z" fill="#FFBB00" opacity="0.9"/>
              {/* Back Door Line */}
              <line x1="8" y1="5" x2="8" y2="18" stroke="#FFBB00" strokeWidth="0.8"/>
              {/* Brand mark on the cargo — HB, since the full name will not
                  read at this size */}
              <text
                x="18.5"
                y="14.6"
                textAnchor="middle"
                fill="#FFBB00"
                fontFamily="Fraunces, Georgia, serif"
                fontSize="9"
                fontWeight="900"
                letterSpacing="0.3"
              >
                HB
              </text>
              {/* Tail Light */}
              <rect x="4" y="8" width="1" height="3.5" fill="#EF5350"/>
              {/* Headlight */}
              <path d="M41 14.5L42.5 15.2L41 16V14.5Z" fill="#FFF9E6"/>
              {/* Wheels */}
              <g>
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0 12 18" 
                  to="360 12 18" 
                  dur="0.4s" 
                  repeatCount="indefinite" 
                />
                <circle cx="12" cy="18" r="4.5" fill="#1A1A1A"/>
                <circle cx="12" cy="18" r="1.8" fill="#FFBB00"/>
                <line x1="12" y1="14.5" x2="12" y2="21.5" stroke="#1A1A1A" strokeWidth="0.8"/>
                <line x1="8.5" y1="18" x2="15.5" y2="18" stroke="#1A1A1A" strokeWidth="0.8"/>
              </g>
              <g>
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0 32 18" 
                  to="360 32 18" 
                  dur="0.4s" 
                  repeatCount="indefinite" 
                />
                <circle cx="32" cy="18" r="4.5" fill="#1A1A1A"/>
                <circle cx="32" cy="18" r="1.8" fill="#FFBB00"/>
                <line x1="32" y1="14.5" x2="32" y2="21.5" stroke="#1A1A1A" strokeWidth="0.8"/>
                <line x1="28.5" y1="18" x2="35.5" y2="18" stroke="#1A1A1A" strokeWidth="0.8"/>
              </g>
            </svg>
          </div>
        </div>

        <div className="bg-[#1A1A00] backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <div className="h-2.5 w-full bg-[#FFFFCC]" />
          <div className="p-8 md:p-10">
            <h3 className="font-serif text-2xl font-black text-[#FFFFCC] mb-3 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#FFFFCC]" /> Wegbeschreibung & Standort
            </h3>
            <p className="text-white/90 font-sans text-sm mb-6 leading-relaxed font-medium">
              Besuchen Sie uns an der Langstrasse 120 in 8004 Zürich. Wir sind 24 Stunden am Tag für Sie geöffnet!
            </p>
            
            {/* Map Frame */}
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                title="Google Maps Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8105741639014!2d8.5257913!3d47.379477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a1f948f2195%3A0x3be699d750fae6ad!2sLangstrasse%20120%2C%208004%20Z%C3%BCrich!5e0!3m2!1sde!2sch!4v1719600000000!5m2!1sde!2sch"
                className="absolute inset-0 w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
              <div className="text-xs text-white/70 font-sans font-medium">
                💡 Tipp: Klicken Sie auf die Karte, um die Route direkt auf Ihrem Smartphone in Google Maps zu planen.
              </div>
              <a 
                href="https://maps.google.com/?q=Langstrasse+120,+8004+Zürich" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Routenplaner öffnen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
