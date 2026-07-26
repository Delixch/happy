import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, ChevronDown, ChevronRight, Instagram, Phone, MapPin, Sparkles, Lock, 
  Building2, Users, UtensilsCrossed, Gift, Film, Briefcase, Mail, Home as HomeIcon 
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Dropdown navigation groups
  const uberUnsItems = [
    { label: 'Über Uns', href: '/unternehmen', desc: 'Unsere Geschichte & Philosophie', icon: <Building2 className="w-4 h-4 text-gold-400" /> },
    { label: 'Unser Team', href: '/team', desc: 'Die Menschen hinter Happy Beck', icon: <Users className="w-4 h-4 text-gold-400" /> },
    { label: 'Medien & Presse', href: '/medien', desc: 'Artikel, TV & Berichte', icon: <Film className="w-4 h-4 text-gold-400" /> },
  ];

  const angebotItems = [
    { label: 'Speisekarte', href: '/menu', desc: 'Gipfeli, Brot, Sandwiches & Mehr', icon: <UtensilsCrossed className="w-4 h-4 text-gold-400" /> },
    { label: 'Aktuelles & Deals', href: '/aktuelles', desc: 'Jubiläums-Deals & Tagesangebote', icon: <Gift className="w-4 h-4 text-gold-400" /> },
  ];

  return (
    <>
      {/* ── TOP UTILITY BAR (Luxury Slim Strip) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-dark-950/90 backdrop-blur-md border-b border-gold-400/10 py-1.5 px-4 lg:px-12 text-[11px] font-sans text-white/50 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-400/90 font-medium">
              <MapPin className="w-3 h-3 text-gold-400" />
              <span>Langstrasse 120, 8004 Zürich</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-white/40">
              <span>Täglich geöffnet: 06:00 – 22:00 Uhr</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+41440000000"
              className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>+41 44 000 00 00</span>
            </a>
            <span className="w-[1px] h-3 bg-white/10" />
            <Link
              to="/admin"
              className="text-white/40 hover:text-gold-400 transition-colors flex items-center gap-1 uppercase tracking-wider text-[10px] font-semibold"
            >
              <Lock className="w-3 h-3 text-gold-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── MAIN LUXURY FLOATING NAV BAR ── */}
      <nav
        ref={dropdownRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 px-4 lg:px-12 ${
          scrolled ? 'top-3' : 'top-9'
        }`}
      >
        <div className="mx-auto w-full max-w-6xl">
          <div
            className={`flex items-center justify-between transition-all duration-500 rounded-2xl border ${
              scrolled
                ? 'bg-dark-900/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-gold-400/30 px-6 py-2.5'
                : 'bg-dark-800/70 backdrop-blur-xl shadow-2xl border-white/10 px-7 py-3.5'
            }`}
          >
            {/* BRAND LOGO WITH GOLD GLOW */}
            <Link to="/" className="group flex items-center gap-3.5 z-10">
              <div className="relative rounded-xl overflow-hidden ring-1 ring-gold-400/40 transition-all duration-500 group-hover:ring-gold-400 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] w-10 h-10 lg:w-11 lg:h-11 bg-dark-950 p-1 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Happy Beck"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center text-left">
                <p className="font-serif font-black text-white tracking-wider leading-none text-base lg:text-xl group-hover:text-gold-400 transition-colors">
                  HAPPY <span className="text-gold-gradient">BECK</span>
                </p>
                <p className="tracking-[0.28em] uppercase text-gold-400/80 font-sans font-semibold leading-none mt-1 text-[8px] lg:text-[9px]">
                  ZÜRICH · SEIT 2006
                </p>
              </div>
            </Link>

            {/* DESKTOP DROPDOWN NAVIGATION */}
            <div className="hidden lg:flex items-center gap-2 bg-dark-950/80 rounded-xl p-1.5 border border-white/10 shadow-inner">
              {/* HOME LINK */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
                  location.pathname === '/'
                    ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>

              {/* DROPDOWN 1: ÜBER UNS */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'uberUns' ? null : 'uberUns')}
                  onMouseEnter={() => setActiveDropdown('uberUns')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    ['/unternehmen', '/team', '/medien'].includes(location.pathname) || activeDropdown === 'uberUns'
                      ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Über Uns</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'uberUns' ? 'rotate-180 text-gold-400' : ''}`} />
                </button>

                {/* Dropdown Menu Box */}
                {activeDropdown === 'uberUns' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-3 w-64 glass-card p-3 rounded-2xl glow-gold border border-gold-400/30 animate-scale-in z-50 bg-dark-900/95 backdrop-blur-2xl shadow-2xl"
                  >
                    <div className="space-y-1">
                      {uberUnsItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
                        >
                          <div className="p-2 rounded-lg bg-dark-800 border border-white/10 group-hover/item:border-gold-400/40 transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-xs font-sans font-bold text-white group-hover/item:text-gold-400 transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-white/40 font-sans mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DROPDOWN 2: ANGEBOT */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'angebot' ? null : 'angebot')}
                  onMouseEnter={() => setActiveDropdown('angebot')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    ['/menu', '/aktuelles'].includes(location.pathname) || activeDropdown === 'angebot'
                      ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Angebot</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'angebot' ? 'rotate-180 text-gold-400' : ''}`} />
                </button>

                {/* Dropdown Menu Box */}
                {activeDropdown === 'angebot' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-3 w-72 glass-card p-3 rounded-2xl glow-gold border border-gold-400/30 animate-scale-in z-50 bg-dark-900/95 backdrop-blur-2xl shadow-2xl"
                  >
                    <div className="space-y-1">
                      {angebotItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
                        >
                          <div className="p-2 rounded-lg bg-dark-800 border border-white/10 group-hover/item:border-gold-400/40 transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-xs font-sans font-bold text-white group-hover/item:text-gold-400 transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-white/40 font-sans mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DIRECT LINKS: JOBS & KONTAKT */}
              <Link
                to="/jobs"
                className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
                  location.pathname === '/jobs'
                    ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Jobs
              </Link>

              <Link
                to="/kontakt"
                className={`px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
                  location.pathname === '/kontakt'
                    ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Kontakt
              </Link>
            </div>

            {/* ACTION CTA BUTTON (SPEISEKARTE QUICK ACTION) */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/menu"
                className="btn-gold text-xs py-2.5 px-5 rounded-xl font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4 text-dark-950" />
                <span>Speisekarte</span>
              </Link>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 w-11 h-11 rounded-xl border border-gold-400/30 bg-dark-900/90 flex items-center justify-center text-gold-400 hover:bg-gold-400/10 transition-all cursor-pointer shadow-lg"
              aria-label="Menü umschalten"
            >
              {isOpen ? <X className="w-6 h-6" /> : (
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="w-full h-[2px] bg-gold-400 rounded-full transition-all" />
                  <span className="w-3/4 h-[2px] bg-gold-400 rounded-full transition-all self-end" />
                  <span className="w-full h-[2px] bg-gold-400 rounded-full transition-all" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/85 backdrop-blur-md lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE LUXURY CATEGORIZED DRAWER MENU */}
      <div
        className={`fixed top-4 right-4 bottom-4 z-50 w-[310px] rounded-3xl bg-dark-900/95 backdrop-blur-2xl border border-gold-400/30 shadow-2xl lg:hidden transition-all duration-500 ease-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
              <div>
                <p className="font-serif text-base font-bold text-white leading-none">
                  HAPPY <span className="text-gold-gradient">BECK</span>
                </p>
                <p className="text-[8px] font-sans uppercase tracking-widest text-gold-400/80 mt-1">Zürich</p>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-gold-400 p-2 rounded-xl border border-white/10 bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Grouped Categories */}
          <div className="flex flex-col gap-5 my-auto py-4 overflow-y-auto scrollbar-none">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/5 text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold-400/10 hover:text-gold-400 transition-all"
            >
              <span className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-gold-400" />
                Home
              </span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </Link>

            {/* Category 1: Angebot */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold-400/70 font-bold px-2 mb-2">
                Unsere Angebote
              </p>
              <div className="space-y-1">
                {angebotItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-white/80 hover:text-gold-400 font-sans text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2.5">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Category 2: Über Uns */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold-400/70 font-bold px-2 mb-2">
                Über Happy Beck
              </p>
              <div className="space-y-1">
                {uberUnsItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-white/80 hover:text-gold-400 font-sans text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2.5">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              <Link
                to="/jobs"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-white/80 hover:text-gold-400 font-sans text-xs font-semibold transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-gold-400" />
                  Offene Stellen (Jobs)
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-white/80 hover:text-gold-400 font-sans text-xs font-semibold transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold-400" />
                  Kontakt & Anfahrt
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              </Link>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-white/10 pt-4 flex flex-col items-center gap-3">
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-gold-400/30 bg-gold-400/10 text-gold-400 font-sans text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-gold-400/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel Login</span>
            </Link>
            <div className="flex items-center gap-4 text-white/40">
              <a href="https://instagram.com/happybeck.ch" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="tel:+41440000000" className="hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
