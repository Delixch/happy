import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, ChevronDown, ChevronRight, Check, Instagram, Phone, Lock,
} from 'lucide-react';
import { PHONE_TEL } from '../lib/contact';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openHours, setOpenHours] = useState<number>(0);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live 24/7 Hours Counter since Jan 1, 2006
  useEffect(() => {
    const startDate = new Date('2006-01-01T00:00:00');
    const updateCounter = () => {
      const now = new Date();
      const diffInMs = now.getTime() - startDate.getTime();
      const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
      setOpenHours(totalHours);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 60000);
    return () => clearInterval(interval);
  }, []);

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
    { label: 'Karriere & Jobs', href: '/jobs', desc: 'Offene Stellen bei Happy Beck' },
    { label: 'Medien & Presse', href: '/medien', desc: 'Artikel, TV & Berichte' },
  ];

  const angebotItems = [
    { label: 'Speisekarte', href: '/menu', desc: 'Gipfeli, Brot, Sandwiches & Mehr' },
    { label: 'Sandwich Builder', href: '/sandwich-bauen', desc: 'Bau dir dein Traum-Sandwich', isNew: true },
    { label: 'Aktuelle Deals', href: '/aktuelles', desc: 'Jubiläums-Deals & Tagesangebote' },
    { label: 'Bestellung', href: '/kontakt', desc: 'Vorbestellen & Abholen' },
  ];

  return (
    <>
      {/* ── PARALLELOGRAM RIBBON NAV BAR (Full-Width, Flush, Skewed Ribbons) ── */}
      <nav
        ref={dropdownRef}
        className="fixed top-0 left-0 right-0 z-50 w-full h-14 md:h-16 bg-[#1A1A00] flex items-stretch"
      >
        {/* BRAND LOGO TAB (Flush Left) */}
        <Link
          to="/"
          className="flex items-center gap-2.5 px-5 sm:px-8 bg-[#0E0E00] text-white flex-shrink-0 z-20 hover:bg-black transition-colors pr-9 lg:pr-14 relative border-r border-[#FFFFCC]/20"
          style={{ clipPath: window.innerWidth >= 1024 ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' : 'none' }}
        >
          <div className="flex flex-col">
            <span className="font-serif font-black text-white leading-none text-xl sm:text-2xl tracking-wider drop-shadow-md">
              HAPPY <span className="text-[#FFFFCC]">BECK</span>
            </span>
            <span className="text-xs font-sans font-black uppercase tracking-[0.3em] text-[#FFFFCC] mt-1">
              ZÜRICH
            </span>
          </div>
        </Link>

        {/* MOBILE LIVE 24/7 COUNTER BADGE (OUTSIDE BRAND TAB - IN MIDDLE SPACE) */}
        <div className="flex lg:hidden items-center my-auto ml-3 mr-auto z-20">
          <div className="bg-white/[0.04] border border-[#FFFFCC]/15 rounded-full pl-2.5 pr-3 py-1.5 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06C167] opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#06C167]" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-sans leading-none whitespace-nowrap">
                <span className="text-[#FFFFCC] font-semibold tabular-nums">
                  {openHours > 0 ? openHours.toLocaleString('de-CH') : "180'000+"}
                </span>
                <span className="text-white/45 font-normal"> h</span>
              </span>
              <span className="text-[7px] font-sans font-medium text-white/30 uppercase tracking-[0.15em] whitespace-nowrap mt-1">
                Seit 2006
              </span>
            </div>
          </div>
        </div>

        {/* DESKTOP PARALLELOGRAM TABS CONTAINER (Tight Compact Widths, Flush Left) */}
        <div className="hidden lg:flex items-stretch justify-start -ml-4">
          {/* TAB 1: HOME */}
          <Link
            to="/"
            className={`px-8 md:px-10 flex items-center justify-center font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer relative ${
              location.pathname === '/' ? 'bg-[#FFFFCC] text-[#1A1A00] z-10 font-black' : 'bg-[#1A1A00] text-[#FFFFCC] hover:bg-[#2A2A00]'
            }`}
            style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
          >
            <span>Home</span>
          </Link>

          {/* TAB 2: ÜBER UNS (Dropdown: Über Uns, Unser Team, Medien Presse) */}
          <div
            className="relative flex items-stretch -ml-4 z-30"
            onMouseEnter={() => setActiveDropdown('uberUns')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'uberUns' ? null : 'uberUns')}
              className={`px-8 md:px-10 flex items-center justify-center gap-1.5 font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                ['/unternehmen', '/team', '/jobs', '/medien'].includes(location.pathname) || activeDropdown === 'uberUns'
                  ? 'bg-[#FFFFCC] text-[#1A1A00] font-black'
                  : 'bg-[#1A1A00] text-[#FFFFCC] hover:bg-[#2A2A00]'
              }`}
              style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
            >
              <span>Über Uns</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'uberUns' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'uberUns' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-0 w-60 p-2 bg-[#1A1A00] border border-[#FFFFCC]/30 text-white shadow-2xl z-50 animate-scale-in"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
              >
                <div className="space-y-1">
                  {uberUnsItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block p-3 transition-all group/item ${
                        location.pathname === item.href ? 'bg-[#FFFFCC]/20' : 'bg-white/5 hover:bg-[#FFFFCC]/20'
                      }`}
                    >
                      <p className="text-xs font-sans font-extrabold text-[#FFFFCC] uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-white/80 font-sans mt-0.5">
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
            className="relative flex items-stretch -ml-4 z-30"
            onMouseEnter={() => setActiveDropdown('angebot')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'angebot' ? null : 'angebot')}
              className={`px-8 md:px-10 flex items-center justify-center gap-1.5 font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                ['/menu', '/sandwich-bauen', '/aktuelles'].includes(location.pathname) || activeDropdown === 'angebot'
                  ? 'bg-[#FFFFCC] text-[#1A1A00] font-black'
                  : 'bg-[#1A1A00] text-[#FFFFCC] hover:bg-[#2A2A00]'
              }`}
              style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
            >
              <span>Angebot</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'angebot' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'angebot' && (
              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-0 w-64 p-2 bg-[#1A1A00] border border-[#FFFFCC]/30 text-white shadow-2xl z-50 animate-scale-in"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
              >
                <div className="space-y-1">
                  {angebotItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block p-3 transition-all group/item ${
                        item.isNew
                          ? 'bg-gradient-to-r from-[#FFBB00]/20 to-transparent border-l-2 border-[#FFBB00] hover:from-[#FFBB00]/30'
                          : location.pathname === item.href ? 'bg-[#FFFFCC]/20' : 'bg-white/5 hover:bg-[#FFFFCC]/20'
                      }`}
                    >
                      <p className="text-xs font-sans font-extrabold text-[#FFFFCC] uppercase tracking-wider flex items-center gap-2">
                        {item.label}
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#FFBB00] text-[#1A1A00] text-[9px] font-black uppercase animate-pulse">
                            Neu
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-white/80 font-sans mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB 4: KONTAKT */}
          <Link
            to="/kontakt"
            className={`px-8 md:px-10 flex items-center justify-center font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer relative -ml-4 ${
              location.pathname === '/kontakt' ? 'bg-[#FFFFCC] text-[#1A1A00] font-black' : 'bg-[#1A1A00] text-[#FFFFCC] hover:bg-[#2A2A00]'
            }`}
            style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <span>Kontakt</span>
          </Link>
        </div>

        {/* ── LIVE 24/7 NON-STOP OPEN HOURS COUNTER BADGE (Desktop Right Side) ── */}
        <div className="hidden lg:flex items-center gap-3 ml-auto pr-6">
          <ThemeToggle />
          <div className="bg-white/[0.04] border border-[#FFFFCC]/15 rounded-full pl-3.5 pr-4 py-2 flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06C167] opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#06C167]" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-sans leading-none">
                <span className="text-[#FFFFCC] font-semibold tabular-nums">
                  {openHours > 0 ? openHours.toLocaleString('de-CH') : "180'000+"}
                </span>
                <span className="text-white/45 font-normal"> Stunden ununterbrochen</span>
              </span>
              <span className="text-[8px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] mt-1.5">
                Seit Januar 2006
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Flush Right Mobile) */}
        <div className="flex lg:hidden items-center justify-end gap-2 px-4 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-[#FFFFCC] flex items-center justify-center text-[#1A1A00] cursor-pointer rounded-xl shadow-md"
            aria-label="Menü umschalten"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-[2.5px] bg-[#1A1A00] rounded-full transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-3/4 h-[2.5px] bg-[#1A1A00] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-[2.5px] bg-[#1A1A00] rounded-full transition-all duration-300 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
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

      {/* MOBILE LUXURY CATEGORIZED DRAWER MENU
          The clipping wrapper matters: when closed the drawer is parked 48px to
          the right, which pushed it past the viewport and gave the whole page a
          horizontal scrollbar. Clipping here keeps the slide-in distance. */}
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none lg:hidden">
      <div
        className={`absolute top-4 right-4 bottom-4 w-[310px] rounded-3xl bg-[#1A1A00] backdrop-blur-2xl border-2 border-[#FFFFCC]/30 shadow-2xl transition-all duration-500 ease-out transform ${
          isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain brightness-125" />
              <div>
                <p className="font-serif text-base font-bold text-white leading-none">
                  HAPPY <span className="text-[#FFFFCC]">BECK</span>
                </p>
                <p className="text-[8px] font-sans uppercase tracking-widest text-[#FFFFCC] mt-1">Zürich</p>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-[#FFFFCC] p-2 rounded-xl border border-white/10 bg-white/5 transition-colors"
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
              className={`flex items-center justify-between py-2.5 px-4 border border-white/10 font-sans text-xs font-extrabold uppercase tracking-wider shadow-md transition-all duration-300 ${
                location.pathname === '/' ? 'bg-[#FFFFCC] text-[#1A1A00] font-black' : 'bg-white/5 text-white hover:bg-white/10'
              } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
            >
              <span>Home</span>
              {location.pathname === '/' ? <Check className="w-4 h-4 text-[#1A1A00]" /> : <ChevronRight className="w-4 h-4 text-white" />}
            </Link>

            {/* Category 1: Angebot */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFFFCC] font-bold px-2 mb-2">
                Unsere Angebote
              </p>
              <div className="space-y-1.5">
                {angebotItems.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 border font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                      item.isNew
                        ? 'border-[#FFBB00] bg-[#FFBB00]/15 text-[#FFBB00] hover:bg-[#FFBB00]/25'
                        : `border-white/10 ${location.pathname === item.href ? 'bg-[#FFFFCC] text-[#1A1A00] font-black' : 'bg-white/5 text-white hover:bg-white/10'}`
                    } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? `${(1 + i) * 40}ms` : '0ms' }}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#FFBB00] text-[#1A1A00] text-[9px] font-black uppercase animate-pulse">
                          Neu
                        </span>
                      )}
                    </span>
                    {location.pathname === item.href ? <Check className="w-3.5 h-3.5 text-[#1A1A00]" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Category 2: Über Uns */}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFFFCC] font-bold px-2 mb-2">
                Über Happy Beck
              </p>
              <div className="space-y-1.5">
                {uberUnsItems.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 border border-white/10 font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                      location.pathname === item.href ? 'bg-[#FFFFCC] text-[#1A1A00] font-black' : 'bg-white/5 text-white hover:bg-white/10'
                    } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? `${(4 + i) * 40}ms` : '0ms' }}
                  >
                    <span>{item.label}</span>
                    {location.pathname === item.href ? <Check className="w-3.5 h-3.5 text-[#1A1A00]" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <Link
                to="/kontakt"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 border border-white/10 font-sans text-xs font-bold shadow-sm transition-all duration-300 ${
                  location.pathname === '/kontakt' ? 'bg-[#FFFFCC] text-[#1A1A00] font-black' : 'bg-white/5 text-white hover:bg-white/10'
                } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)', transitionDelay: isOpen ? '320ms' : '0ms' }}
              >
                <span>Kontakt & Anfahrt</span>
                {location.pathname === '/kontakt' ? <Check className="w-3.5 h-3.5 text-[#1A1A00]" /> : <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </Link>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-white/10 pt-4 flex flex-col items-center gap-3">
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-[#FFFFCC]/30 bg-[#FFFFCC]/10 text-[#FFFFCC] font-sans text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#FFFFCC]/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel Login</span>
            </Link>
            <div className="flex items-center gap-4 text-white/40">
              <a href="https://instagram.com/happybeck.ch" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFFFCC] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-[#FFFFCC] transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
