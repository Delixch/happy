import { Mail, Phone, MapPin, Instagram, Clock, ArrowUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1E293B] text-white border-t-4 border-[#FFBB00] shadow-2xl">
      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFBB00] bg-white p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/logo.png" alt="Happy Beck" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-white leading-none">
                  Happy <span className="text-[#FFBB00]">Beck</span>
                </p>
                <span className="text-[10px] text-[#FFBB00] font-sans font-bold tracking-[0.2em] uppercase block mt-1">
                  Zürich · Seit 2006
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed font-sans font-medium">
              Ein Häppchen Glück — Traditionelle Bäckerei mit Leidenschaft für Qualität und Innovation. 24 Stunden frisch für Sie da.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-[#FFBB00] text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBB00]" />
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Speisekarte', href: '/menu' },
                { label: 'Über Uns', href: '/unternehmen' },
                { label: 'Unser Team', href: '/team' },
                { label: 'Aktuelles', href: '/aktuelles' },
                { label: 'Jobs', href: '/jobs' },
                { label: 'Medien', href: '/medien' },
                { label: 'Kontakt', href: '/kontakt' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-white/80 hover:text-[#FFBB00] transition-colors font-sans py-1 font-bold flex items-center gap-1.5"
                >
                  <span className="text-[#FFBB00] opacity-60 text-xs">›</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-[#FFBB00] text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBB00]" />
              Kontakt
            </h3>
            <div className="space-y-4 text-sm font-sans">
              <a href="tel:+41432439780" className="flex items-center gap-3 text-white/90 hover:text-[#FFBB00] transition-colors font-bold group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFBB00] group-hover:bg-[#FFBB00] group-hover:text-[#1E293B] transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>043 243 97 80</span>
              </a>

              <a href="mailto:info@happybeck.ch" className="flex items-center gap-3 text-white/90 hover:text-[#FFBB00] transition-colors font-bold group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFBB00] group-hover:bg-[#FFBB00] group-hover:text-[#1E293B] transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@happybeck.ch</span>
              </a>

              <div className="flex items-start gap-3 text-white/90 font-medium">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFBB00] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Langstrasse 120, 8004 Zürich</span>
              </div>

              <div className="flex items-center gap-3 text-white/90 font-medium">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFBB00]">
                  <Clock className="w-4 h-4" />
                </div>
                <span>24 Stunden geöffnet</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-serif text-[#FFBB00] text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBB00]" />
              Social Media
            </h3>
            <div className="space-y-3 flex flex-col items-start">
              <a
                href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/90 hover:text-[#FFBB00] transition-colors group font-sans font-bold"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FFBB00] group-hover:bg-[#FFBB00] group-hover:text-[#1E293B] flex items-center justify-center text-[#FFBB00] transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@happybeck.ch</span>
              </a>

              <a
                href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/90 hover:text-[#FFBB00] transition-colors group font-sans font-bold"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FFBB00] group-hover:bg-[#FFBB00] group-hover:text-[#1E293B] flex items-center justify-center text-[#FFBB00] transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@happybeck_</span>
              </a>

              {/* Supervisor Login Button */}
              <Link
                to="/admin"
                className="mt-4 px-6 py-3 rounded-2xl bg-[#FFBB00] text-[#1E293B] font-sans font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 hover:bg-white transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Supervisor Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full h-0.5 bg-white/10 mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-xs font-sans font-medium">
            &copy; {currentYear} Happy Beck Zürich. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-white/50 text-[11px] font-sans tracking-wider uppercase font-bold">
              Traditionelle 24h Bäckerei · Zürich, Schweiz
            </p>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-sans font-black tracking-wider text-[#1E293B] uppercase bg-[#FFBB00] hover:bg-white px-4 py-2 rounded-xl shadow-lg transition-all cursor-pointer"
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
