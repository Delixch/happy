import { Mail, Phone, MapPin, Instagram, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-900 border-t border-white/5">
      {/* Gold top accent */}
      <div className="divider-gold" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gold-400/30">
                <img src="/logo.png" alt="Happy Beck" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-white">
                  Happy <span className="text-gold-400">Beck</span>
                </p>
              </div>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed font-sans">
              Ein Häppchen Glück — Traditionelle Bäckerei mit Leidenschaft für Qualität und Innovation. Seit 2006 in Zürich.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold uppercase tracking-widest mb-6">Navigation</h4>
            <nav className="grid grid-cols-2 gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Menü', href: '/menu' },
                { label: 'Unternehmen', href: '/unternehmen' },
                { label: 'Team', href: '/team' },
                { label: 'Aktuelles', href: '/aktuelles' },
                { label: 'Jobs', href: '/jobs' },
                { label: 'Medien', href: '/medien' },
                { label: 'Kontakt', href: '/kontakt' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-white/65 hover:text-gold-400 transition-colors duration-300 font-sans py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold uppercase tracking-widest mb-6">Kontakt</h4>
            <div className="space-y-4 text-sm font-sans">
              <a href="tel:+41432439780" className="flex items-center gap-3 text-white/65 hover:text-gold-400 transition-colors group">
                <Phone className="w-4 h-4 text-gold-400/60 group-hover:text-gold-400 transition-colors" />
                <span>043 243 97 80</span>
              </a>
              <a href="mailto:info@happybeck.ch" className="flex items-center gap-3 text-white/65 hover:text-gold-400 transition-colors group">
                <Mail className="w-4 h-4 text-gold-400/60 group-hover:text-gold-400 transition-colors" />
                <span>info@happybeck.ch</span>
              </a>
              <div className="flex items-start gap-3 text-white/65">
                <MapPin className="w-4 h-4 text-gold-400/60 mt-0.5 flex-shrink-0" />
                <span>Langstrasse 120, 8004 Zürich</span>
              </div>
              <div className="flex items-center gap-3 text-white/65">
                <Clock className="w-4 h-4 text-gold-400/60" />
                <span>24 Stunden geöffnet</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold uppercase tracking-widest mb-6">Social Media</h4>
            <div className="space-y-3 flex flex-col items-start">
              <a
                href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-gold-400 transition-colors group font-sans"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gold-400/40 flex items-center justify-center transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@happybeck.ch</span>
              </a>
              <a
                href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-gold-400 transition-colors group font-sans"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gold-400/40 flex items-center justify-center transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@happybeck_</span>
              </a>

              {/* Rotating Border Beam Supervisor Login Button */}
              <Link
                to="/admin"
                className="relative inline-flex items-center justify-center p-[1px] rounded-lg overflow-hidden group/btn w-44 mt-4"
              >
                <span className="absolute inset-[-1000%] animate-border-beam bg-[conic-gradient(from_90deg_at_50%_50%,#FFE066_0%,#D4AF37_50%,#FFE066_100%)]" />
                <span 
                  className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-[7px] bg-gold-400 px-4 py-2.5 text-xs font-sans font-bold tracking-widest uppercase transition-colors duration-300 group-hover/btn:bg-gold-300"
                  style={{ color: '#0f0d0c' }}
                >
                  Supervisor Login
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gold mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs font-sans">
            &copy; {currentYear} Happy Beck. Alle Rechte vorbehalten.
          </p>
          <p className="text-white/35 text-[10px] font-sans tracking-wider uppercase">
            Traditionelle Bäckerei · Zürich, Schweiz
          </p>
        </div>
      </div>
    </footer>
  );
}
