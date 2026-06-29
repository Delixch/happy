import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user already gave consent
    const consent = localStorage.getItem('happybeck_cookie_consent');
    if (!consent) {
      // Delay showing the banner by 3.5 seconds (gives time for Preloader 2.2s + fade 0.7s)
      const timer = setTimeout(() => {
        setShow(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('happybeck_cookie_consent', 'all');
    setShow(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('happybeck_cookie_consent', 'necessary');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] max-w-sm w-[calc(100vw-3rem)] animate-slide-up">
      {/* Premium Glassmorphic Card Container */}
      <div className="glass-card p-6 rounded-2xl border border-gold-400/20 shadow-[0_15px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl bg-dark-900/90 relative overflow-hidden">
        
        {/* Subtle decorative gold light flare */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Close icon for soft bypass (sets necessary by default) */}
        <button
          onClick={handleAcceptNecessary}
          className="absolute top-4 right-4 text-white/40 hover:text-gold-400 transition-colors p-1"
          aria-label="Schliessen"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title and Icon */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-serif font-bold text-white text-base tracking-wide">
            Cookie-Einstellungen
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/50 font-sans text-xs leading-relaxed mb-5">
          Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, den Datenverkehr zu analysieren und Social-Media-Funktionen bereitzustellen. Mit Klick auf «Alle akzeptieren» stimmen Sie dieser Verwendung zu. Weitere Informationen finden Sie in unserer{' '}
          <a href="/kontakt" className="text-gold-400 hover:underline">
            Datenschutzerklärung
          </a>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAcceptAll}
            className="btn-gold w-full text-xs py-2.5 font-sans font-semibold tracking-wider uppercase text-center"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleAcceptNecessary}
            className="btn-gold-outline w-full text-xs py-2.5 font-sans font-medium tracking-wider uppercase text-center"
          >
            Nur notwendige
          </button>
        </div>
      </div>

      {/* Embedded CSS for slide-up entry */}
      <style>{`
        @keyframes slideUp {
          0% { transform: translateY(30px); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
