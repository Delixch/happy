import { useMemo, useState } from 'react';
import { Mail, MapPin, Clock, Instagram, Send } from 'lucide-react';

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
  const initial = useMemo(() => generateQuestion(), []);
  const [question, setQuestion] = useState(initial);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(userAnswer) !== question.answer) {
      setError('Bitte beantworten Sie die Sicherheitsfrage richtig.');
      setQuestion(generateQuestion());
      setUserAnswer('');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[30vh] min-h-[220px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/default-hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700/60 via-dark-700/40 to-dark-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-700/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div>
            <p className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase mb-3">
              Schreiben Sie uns
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
              Kontakt
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="glass-card p-8 h-fit">
            <h3 className="font-serif text-lg font-semibold text-white mb-6">Informationen</h3>
            <div className="space-y-5 font-sans text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 font-medium">Adresse</p>
                  <p className="text-white/40">Langstrasse 120, 8004 Zürich</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5" />
                <div>
                  <p className="text-white/80 font-medium">Öffnungszeiten</p>
                  <p className="text-white/40">24 Stunden geöffnet</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5" />
                <div>
                  <p className="text-white/80 font-medium">E-Mail</p>
                  <a href="mailto:info@happybeck.ch" className="text-gold-400/70 hover:text-gold-400 transition-colors">
                    info@happybeck.ch
                  </a>
                </div>
              </div>

              <div className="divider-gold my-4" />

              <p className="text-white/80 font-medium mb-2">Instagram</p>
              <div className="space-y-2">
                <a
                  href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@happybeck.ch</span>
                </a>
                <a
                  href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@happybeck_</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 rounded-full border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Vielen Dank!</h3>
                <p className="text-white/50 font-sans">
                  Ihre Nachricht wurde gesendet. Wir melden uns so bald wie möglich bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Firma</label>
                    <input name="company" className="input-premium" type="text" placeholder="Firmenname" />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Ansprechpartner</label>
                    <input name="name" className="input-premium" type="text" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">E-Mail *</label>
                    <input name="email" className="input-premium" type="email" placeholder="name@example.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Telefon</label>
                    <input name="phone" className="input-premium" type="tel" placeholder="Ihre Telefonnummer" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Adresse</label>
                    <input name="address" className="input-premium" type="text" placeholder="Strasse, PLZ Ort" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Nachricht *</label>
                  <textarea name="message" className="input-premium min-h-[120px] resize-y" rows={5} placeholder="Ihre Nachricht..." required />
                </div>

                {/* Security Question */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Sicherheitsfrage</label>
                    <input className="input-premium bg-dark-500/50" type="text" value={question.text} readOnly />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">Ihre Antwort *</label>
                    <input
                      className="input-premium"
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Ergebnis"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => { setQuestion(generateQuestion()); setUserAnswer(''); }}
                      className="btn-gold-outline text-xs px-4 py-3 whitespace-nowrap"
                    >
                      Neu laden
                    </button>
                    <button type="submit" className="btn-gold flex-1 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Senden
                    </button>
                  </div>
                </div>
                {error && <p className="text-sm text-red-400 font-sans">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CSS animations for Kontakt page */}
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
      <div className="container mx-auto px-4 lg:px-8 pb-16 max-w-6xl animate-fade-in relative">
        
        {/* Animated Driving Delivery Van on the Gold Line */}
        <div className="absolute top-[-22px] left-[16px] right-[16px] lg:left-[32px] lg:right-[32px] h-[24px] pointer-events-none overflow-hidden z-20">
          <div className="animate-car-drive absolute bottom-0">
            <svg className="animate-car-bounce" width="46" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Cargo Box */}
              <path d="M4 6C4 5.4 4.4 5 5 5H28C28.6 5 29 5.4 29 6V18H4V6Z" fill="#D4AF37"/>
              {/* Cabin */}
              <path d="M29 9H34.5L41 14.2V18H29V9Z" fill="#D4AF37"/>
              {/* Windshield Window */}
              <path d="M30.5 10.5H33.8L37.8 13.8H30.5V10.5Z" fill="#E0F7FA" opacity="0.8"/>
              {/* Back Door Line */}
              <line x1="8" y1="5" x2="8" y2="18" stroke="#A6831B" strokeWidth="0.8"/>
              {/* Small Logo on Cargo (Bread outline) */}
              <path d="M13 11C14 9.5 16 9.5 17 11M17 11C18 9.5 20 9.5 21 11M17 11V14" stroke="#4D3B03" strokeWidth="1" strokeLinecap="round"/>
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
                <circle cx="12" cy="18" r="1.8" fill="#E0C368"/>
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
                <circle cx="32" cy="18" r="1.8" fill="#E0C368"/>
                <line x1="32" y1="14.5" x2="32" y2="21.5" stroke="#1A1A1A" strokeWidth="0.8"/>
                <line x1="28.5" y1="18" x2="35.5" y2="18" stroke="#1A1A1A" strokeWidth="0.8"/>
              </g>
            </svg>
          </div>
        </div>

        <div className="glass-card overflow-hidden glow-gold">
          <div className="h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />
          <div className="p-6 md:p-8">
            <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" /> Wegbeschreibung & Standort
            </h3>
            <p className="text-white/50 font-sans text-sm mb-6 leading-relaxed">
              Besuchen Sie uns an der Langstrasse 120 in 8004 Zürich. Wir sind 24 Stunden am Tag für Sie geöffnet!
            </p>
            
            {/* Map Frame */}
            <div className="relative w-full h-[380px] rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="Google Maps Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8105741639014!2d8.5257913!3d47.379477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a1f948f2195%3A0x3be699d750fae6ad!2sLangstrasse%20120%2C%208004%20Z%C3%BCrich!5e0!3m2!1sde!2sch!4v1719600000000!5m2!1sde!2sch"
                className="absolute inset-0 w-full h-full border-0 grayscale invert-[0.9] hue-rotate-[180deg] opacity-70 hover:grayscale-0 hover:invert-0 hover:hue-rotate-0 hover:opacity-100 transition-all duration-700 ease-in-out"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
              <div className="text-xs text-white/40 font-sans">
                💡 Tipp: Klicken Sie auf die Karte, um die Route direkt auf Ihrem Smartphone in Google Maps zu planen.
              </div>
              <a 
                href="https://maps.google.com/?q=Langstrasse+120,+8004+Zürich" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gold text-xs py-2.5 px-5 flex items-center gap-1.5 shadow-md hover:shadow-lg"
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
