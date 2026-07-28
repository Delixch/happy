import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, ChevronDown, ChevronRight, Check, Instagram, Phone, Lock,
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Dropdown navigation groups
  const uberUnsItems = [
    { label: 'Über Uns', href: '/unternehmen', desc: 'Unsere Geschichte & Philosophie' },
    { label: 'Unser Team', href: '/team', desc: 'Die Menschen hinter Happy Beck' },
    { label: 'Medien & Presse', href: '/medien', desc: 'Artikel, TV & Berichte' },
  ];

  const angebotItems = [
    { label: 'Speisekarte', href: '/menu', desc: 'Gipfeli, Brot, Sandwiches & Mehr' },
    { label: 'Aktuelle Deals', href: '/aktuelles', desc: 'Jubiläums-Deals & Tagesangebote' },
    { label: 'Bestellung', href: '/kontakt', desc: 'Vorbestellen & Abholen' },
  ];

  return (
    <>
      {/* ── PARALLELOGRAM RIBBON NAV BAR (Full-Width, Flush, Skewed Ribbons) ── */}
      <nav
        ref={dropdownRef}
        className="fixed top-0 left-0 right-0 z-50 w-full h-14 md:h-16 bg-[#231E2A] flex items-stretch border-b border-black/20"
      >
        {/* BRAND LOGO TAB (Flush Left) */}
        <Link
          to="/"
          className="flex items-center gap-3 px-6 bg-[#17131D] text-white flex-shrink-0 z-20 hover:bg-[#110E16] transition-colors pr-8 relative"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
        >
          <img src="/logo.png" alt="Happy Beck" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="font-serif font-black text-white leading-none text-base tracking-wider">
              HAPPY <span className="text-[#FFBB00]">BECK</span>
            </span>
            <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#FFBB00]/80 mt-0.5">
              ZÜRICH
            </span>
          </div>
        </Link>

        {/* DESKTOP PARALLELOGRAM TABS CONTAINER (Edge-To-Edge, Flush, Skewed Ribbons) */}
        <div className="hidden lg:flex items-stretch flex-1 -ml-4">
          {/* TAB 1: HOME */}
          <Link
            to="/"
            className={`flex-1 flex items-center justify-center font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer relative ${
              location.pathname === '/' ? 'bg-[#FFBB00] text-[#231E2A] z-10' : 'bg-[#2A2530] text-white hover:bg-[#3A3542]'
            }`}
            style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' }}
          >
            <span>Home</span>
          </Link>

          {/* TAB 2: ÜBER UNS (Dropdown: Über Uns, Unser Team, Medien Presse) */}
          <div
            className="flex-1 relative flex items-stretch -ml-5 z-30"
            onMouseEnter={() => setActiveDropdown('uberUns')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'uberUns' ? null : 'uberUns')}
              className={`w-full flex items-center justify-center gap-1.5 font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                ['/unternehmen', '/team', '/medien'].includes(location.pathname) || activeDropdown === 'uberUns'
                  ? 'bg-[#FFBB00] text-[#231E2A]'
                  : 'bg-[#2A2530] text-white hover:bg-[#3A3542]'
              }`}
              style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' }}
            >
              <span>Über Uns</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'uberUns' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'uberUns' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-0 w-60 p-2 bg-[#2A2530] border border-[#FFBB00]/20 text-white shadow-2xl z-50 animate-scale-in"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
              >
                <div className="space-y-1">
                  {uberUnsItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 bg-white/5 hover:bg-[#FFBB00]/15 transition-all group/item"
                    >
                      <p className="text-xs font-sans font-extrabold text-[#FFBB00] uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-white/70 font-sans mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB 3: ANGEBOT (Dropdown: Speisekarte, Aktuelle Deals, Bestellung) */}
          <div
            className="flex-1 relative flex items-stretch -ml-5 z-30"
            onMouseEnter={() => setActiveDropdown('angebot')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'angebot' ? null : 'angebot')}
              className={`w-full flex items-center justify-center gap-1.5 font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                ['/menu', '/aktuelles'].includes(location.pathname) || activeDropdown === 'angebot'
                  ? 'bg-[#FFBB00] text-[#231E2A]'
                  : 'bg-[#2A2530] text-white hover:bg-[#3A3542]'
              }`}
              style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' }}
            >
              <span>Angebot</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'angebot' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'angebot' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-0 w-64 p-2 bg-[#2A2530] border border-[#FFBB00]/20 text-white shadow-2xl z-50 animate-scale-in"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
              >
                <div className="space-y-1">
                  {angebotItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block p-3 bg-white/5 hover:bg-[#FFBB00]/15 transition-all group/item"
                    >
                      <p className="text-xs font-sans font-extrabold text-[#FFBB00] uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-white/70 font-sans mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB 4: JOBS */}
          <Link
            to="/jobs"
            className={`flex-1 flex items-center justify-center font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer relative -ml-5 ${
              location.pathname === '/jobs' ? 'bg-[#FFBB00] text-[#231E2A]' : 'bg-[#2A2530] text-white hover:bg-[#3A3542]'
            }`}
            style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' }}
          >
            <span>Jobs</span>
          </Link>

          {/* TAB 5: KONTAKT */}
          <Link
            to="/kontakt"
            className={`flex-1 flex items-center justify-center gap-2 font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer relative -ml-5 ${
              location.pathname === '/kontakt' ? 'bg-[#FFBB00] text-[#231E2A]' : 'bg-[#2A2530] text-white hover:bg-[#3A3542]'
            }`}
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <span>Kontakt</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Flush Right Mobile) */}
        <div className="flex lg:hidden items-center justify-end px-4 ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-[#FFBB00] flex items-center justify-center text-[#231E2A] cursor-pointer"
            aria-label="Menü umschalten"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-[2px] bg-[#231E2A] rounded-full transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-3/4 h-[2px] bg-[#231E2A] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-[2px] bg-[#231E2A] rounded-full transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
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
              className={`flex items-center justify-between py-2.5 px-4 bg-white/5 border border-white/10 text-white font-sans text-xs font-extrabold uppercase tracking-wider shadow-md transition-all duration-300 ${
                location.pathname === '/' ? 'ring-2 ring-[#FFBB00] text-[#FFBB00]' : 'hover:bg-white/10'
              } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
            >
              <span>Home</span>
              {location.pathname === '/' ? <Check className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
            </Link>

            {/* Category 1: Angebot */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFBB00] font-bold px-2 mb-2">
                Unsere Angebote
              </p>
              <div className="space-y-1.5">
                {angebotItems.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 bg-white/5 border border-white/10 text-white font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                      location.pathname === item.href ? 'ring-2 ring-[#FFBB00] text-[#FFBB00]' : 'hover:bg-white/10'
                    } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? `${(1 + i) * 40}ms` : '0ms' }}
                  >
                    <span>{item.label}</span>
                    {location.pathname === item.href ? <Check className="w-3.5 h-3.5 text-white" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Category 2: Über Uns */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFBB00] font-bold px-2 mb-2">
                Über Happy Beck
              </p>
              <div className="space-y-1.5">
                {uberUnsItems.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 bg-white/5 border border-white/10 text-white font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                      location.pathname === item.href ? 'ring-2 ring-[#FFBB00] text-[#FFBB00]' : 'hover:bg-white/10'
                    } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? `${(4 + i) * 40}ms` : '0ms' }}
                  >
                    <span>{item.label}</span>
                    {location.pathname === item.href ? <Check className="w-3.5 h-3.5 text-white" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <Link
                to="/jobs"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 bg-white/5 border border-white/10 text-white font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                  location.pathname === '/jobs' ? 'ring-2 ring-[#FFBB00] text-[#FFBB00]' : 'hover:bg-white/10'
                } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? '280ms' : '0ms' }}
              >
                <span>Offene Stellen (Jobs)</span>
                {location.pathname === '/jobs' ? <Check className="w-3.5 h-3.5 text-white" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 bg-white/5 border border-white/10 text-white font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                  location.pathname === '/kontakt' ? 'ring-2 ring-[#FFBB00] text-[#FFBB00]' : 'hover:bg-white/10'
                } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? '320ms' : '0ms' }}
              >
                <span>Kontakt & Anfahrt</span>
                {location.pathname === '/kontakt' ? <Check className="w-3.5 h-3.5 text-white" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
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
