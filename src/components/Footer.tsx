import { Mail, Phone, MapPin, Instagram, Clock, ArrowUp, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Dynamic theme colors matching the current active page
  const getPageTheme = () => {
    switch (location.pathname) {
      case '/menu':
        return { bg: 'bg-[#1E293B]', border: 'border-[#FFBB00]', textAccent: 'text-[#FFBB00]', btnBg: 'bg-[#FFBB00]', btnText: 'text-[#1E293B]' };
      case '/medien':
        return { bg: 'bg-[#1E293B]', border: 'border-[#FFBB00]', textAccent: 'text-[#FFBB00]', btnBg: 'bg-[#FFBB00]', btnText: 'text-[#1E293B]' };
      case '/team':
        return { bg: 'bg-[#312E81]', border: 'border-[#38BDF8]', textAccent: 'text-[#38BDF8]', btnBg: 'bg-[#38BDF8]', btnText: 'text-[#312E81]' };
      case '/unternehmen':
        return { bg: 'bg-[#474150]', border: 'border-[#FFBB00]', textAccent: 'text-[#FFBB00]', btnBg: 'bg-[#FFBB00]', btnText: 'text-[#474150]' };
      case '/aktuelles':
        return { bg: 'bg-[#881337]', border: 'border-[#FDE047]', textAccent: 'text-[#FDE047]', btnBg: 'bg-[#FDE047]', btnText: 'text-[#881337]' };
      case '/jobs':
        return { bg: 'bg-[#78350F]', border: 'border-[#FFAE33]', textAccent: 'text-[#FFAE33]', btnBg: 'bg-[#FFAE33]', btnText: 'text-[#78350F]' };
      case '/kontakt':
        return { bg: 'bg-[#1E293B]', border: 'border-[#FFBB00]', textAccent: 'text-[#FFBB00]', btnBg: 'bg-[#FFBB00]', btnText: 'text-[#1E293B]' };
      default:
        return { bg: 'bg-[#1E293B]', border: 'border-[#FFBB00]', textAccent: 'text-[#FFBB00]', btnBg: 'bg-[#FFBB00]', btnText: 'text-[#1E293B]' };
    }
  };

  const theme = getPageTheme();

  return (
    <footer className={`relative ${theme.bg} text-white border-t-4 ${theme.border} shadow-2xl transition-colors duration-500`}>
      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${theme.border} bg-white p-0.5 shadow-lg group-hover:scale-105 transition-transform`}>
                <img src="/logo.png" alt="Happy Beck" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-serif text-3xl font-black text-white leading-none">
                  Happy <span className={theme.textAccent}>Beck</span>
                </p>
                <span className={`text-xs ${theme.textAccent} font-sans font-bold tracking-[0.2em] uppercase block mt-1.5`}>
                  Zürich · Seit 2006
                </span>
              </div>
            </Link>
            <p className="text-white/90 text-base leading-relaxed font-sans font-medium">
              Ein Häppchen Glück — Traditionelle Bäckerei mit Leidenschaft für Qualität und Innovation.&nbsp;24&nbsp;Stunden frisch für&nbsp;Sie&nbsp;da.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={`font-serif ${theme.textAccent} text-base font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2`}>
              <span className={`w-2.5 h-2.5 rounded-full ${theme.btnBg}`} />
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Speisekarte', href: '/menu' },
                { label: 'Über Uns', href: '/unternehmen' },
                { label: 'Unser Team', href: '/team' },
                { label: 'Aktuelles', href: '/aktuelles' },
                { label: 'Jobs', href: '/jobs' },
                { label: 'Medien', href: '/medien' },
                { label: 'Kontakt', href: '/kontakt' },
              ].map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-base font-sans py-1 font-bold flex items-center gap-1.5 transition-colors ${
                      isActive ? `${theme.textAccent} underline underline-offset-4` : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span className={`${theme.textAccent} opacity-80 text-sm`}>›</span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-serif ${theme.textAccent} text-base font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2`}>
              <span className={`w-2.5 h-2.5 rounded-full ${theme.btnBg}`} />
              Kontakt
            </h3>
            <div className="space-y-4 text-base font-sans">
              <a href="tel:+41432439780" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors font-bold group">
                <div className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ${theme.textAccent} group-hover:bg-white group-hover:text-black transition-all`}>
                  <Phone className="w-4 h-4" />
                </div>
                <span>043 243 97 80</span>
              </a>

              <a href="mailto:info@happybeck.ch" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors font-bold group">
                <div className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ${theme.textAccent} group-hover:bg-white group-hover:text-black transition-all`}>
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@happybeck.ch</span>
              </a>

              <div className="flex items-start gap-3 text-white/90 font-medium">
                <div className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ${theme.textAccent} flex-shrink-0 mt-0.5`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Langstrasse 120, 8004 Zürich</span>
              </div>

              <div className="flex items-center gap-3 text-white/90 font-medium">
                <div className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ${theme.textAccent}`}>
                  <Clock className="w-4 h-4" />
                </div>
                <span>24 Stunden geöffnet</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className={`font-serif ${theme.textAccent} text-base font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2`}>
              <span className={`w-2.5 h-2.5 rounded-full ${theme.btnBg}`} />
              Social Media
            </h3>
            <div className="space-y-4 flex flex-col items-start">
              <a
                href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-base text-white/90 hover:text-white transition-colors group font-sans font-bold"
              >
                <div className={`w-10 h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center ${theme.textAccent} transition-all`}>
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@happybeck.ch</span>
              </a>

              <a
                href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-base text-white/90 hover:text-white transition-colors group font-sans font-bold"
              >
                <div className={`w-10 h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center ${theme.textAccent} transition-all`}>
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@happybeck_</span>
              </a>

              {/* Lieferpartner Buttons */}
              <div className="pt-2 w-full">
                <p className={`font-serif ${theme.textAccent} text-sm font-black uppercase tracking-[0.15em] mb-3 flex items-center gap-1.5`}>
                  <span>🛵</span> Lieferpartner
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.ubereats.com/ch-de/store/happybeck/1cMo9d_uXNufL0FRptsfcA?diningMode=DELIVERY&surfaceName="
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#06C167] text-white font-sans font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Uber Eats</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <a
                    href="https://www.just-eat.ch/speisekarte/happybeck-langstrasse"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#FF8000] text-white font-sans font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Just Eat</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Supervisor Login Button */}
              <Link
                to="/admin"
                className={`mt-4 px-4 py-2 rounded-lg ${theme.btnBg} ${theme.btnText} font-sans font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:scale-105 hover:bg-white hover:text-black transition-all cursor-pointer`}
              >
                <Lock className="w-3.5 h-3.5" />
                Supervisor Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full h-0.5 bg-white/10 mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm font-sans font-medium flex items-center gap-3">
            <span>&copy; {currentYear} Happy Beck Zürich. Alle Rechte vorbehalten.</span>
            <span className="text-white/30">·</span>
            <Link to="/datenschutz" className="hover:text-white transition-colors underline underline-offset-2">
              Datenschutz
            </Link>
          </p>
          <div className="flex items-center gap-6">
            <p className="text-white/70 text-xs font-sans tracking-wider uppercase font-bold">
              Traditionelle 24h Bäckerei · Zürich, Schweiz
            </p>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-2 text-xs font-sans font-black tracking-wider ${theme.btnText} uppercase ${theme.btnBg} hover:bg-white hover:text-black px-4 py-2 rounded-xl shadow-lg transition-all cursor-pointer`}
            >
              <span>HOCH</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
