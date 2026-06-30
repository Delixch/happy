import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Instagram, Phone, MapPin } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'unternehmen', label: 'Unternehmen', href: '/unternehmen' },
    { id: 'team', label: 'Team', href: '/team' },
    { id: 'menu', label: 'Menü', href: '/menu' },
    { id: 'aktuelles', label: 'Aktuelles', href: '/aktuelles' },
    { id: 'medien', label: 'Medien', href: '/medien' },
    { id: 'jobs', label: 'Jobs', href: '/jobs' },
    { id: 'kontakt', label: 'Kontakt', href: '/kontakt' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 ${
          scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <div className="mx-auto w-full max-w-5xl transition-all duration-500">
          {/* Inner glass capsule panel */}
          <div
            className={`flex items-center justify-between transition-all duration-500 rounded-full border ${
              scrolled
                ? 'bg-dark-900/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-gold-400/20 px-6 py-3 sm:px-8'
                : 'bg-dark-900/50 backdrop-blur-md shadow-lg border-white/5 px-6 py-4 sm:px-8'
            }`}
          >
            {/* Logo & Brand text */}
            <Link to="/" className="group flex items-center gap-3 sm:gap-4 z-10">
              <div className="flex flex-col justify-center text-left">
                <p className="font-serif font-semibold text-white tracking-wide leading-tight group-hover:text-gold-400 transition-colors whitespace-nowrap text-sm sm:text-lg">
                  Happy <span className="text-gold-400 group-hover:text-white transition-colors">Beck</span>
                </p>
                <p className="tracking-[0.18em] sm:tracking-[0.25em] uppercase text-gold-400/60 font-sans leading-none mt-1 whitespace-nowrap text-[7.5px] sm:text-[10px]">
                  Ein Häppchen Glück
                </p>
              </div>
              <div className="relative rounded-full overflow-hidden ring-1 ring-gold-400/30 transition-all duration-500 group-hover:ring-gold-400/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src="/logo.png"
                  alt="Happy Beck"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </Link>

            {/* Desktop Nav in Glass Pill Container */}
            <div className="hidden lg:flex items-center gap-0.5 bg-white/5 rounded-full p-1 border border-white/5">
              {menuItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-sans font-medium tracking-widest uppercase transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-gold-400/20 to-amber-500/20 border border-gold-400/30 text-gold-400 font-semibold shadow-[0_2px_10px_rgba(212,175,55,0.1)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-50 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all duration-300 select-none group ${
                scrolled ? 'w-9 h-9' : 'w-11 h-11'
              }`}
              aria-label="Toggle menu"
            >
              {/* Outer Spinning Golden Line Loop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-400 via-transparent to-amber-500 animate-spin" style={{ animationDuration: '4s' }} />

              {/* Inner dark backdrop leaving a thin outer gold ring */}
              <div className="absolute inset-[1.5px] rounded-full bg-dark-900" />

              {/* Inner Golden Orbit Ring */}
              <div className="absolute inset-1.5 rounded-full border border-gold-400/10 shadow-[0_0_10px_rgba(212,175,55,0.05)]" />
              
              {/* Core container holding the SVGs */}
              <div className={`absolute inset-2.5 rounded-full bg-dark-900/90 flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'shadow-[0_0_15px_rgba(212,175,55,0.25)] border border-gold-400/25' : 'border border-white/5'
              }`}>
                {isOpen ? (
                  <svg 
                    className="w-3 h-3 text-gold-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg 
                    className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 22,12M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" opacity="0.08" />
                    <path d="M12 20V10M12 13C13 12 14.5 10 14.5 9C14.5 8 13.5 8 12.5 9C12.3 9.2 12.1 9.5 12 10M12 13C11 12 9.5 10 9.5 9C9.5 8 10.5 8 11.5 9C11.7 9.2 11.9 9.5 12 10M12 10C13 9 14.5 7 14.5 6C14.5 5 13.5 5 12.5 6C12.3 6.2 12.1 6.5 12 7M12 10C11 9 9.5 7 9.5 6C9.5 5 10.5 5 11.5 6C11.7 6.2 11.9 6.5 12 7M12 7C13 6 14.5 4 14.5 3C14.5 2 13.5 2 12.5 3C12.3 3.2 12.1 3.5 12 4M12 7C11 6 9.5 4 9.5 3C9.5 2 10.5 2 11.5 3C11.7 3.2 11.9 3.5 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Menu (Sleek Floating Vertical Glass Card) */}
      <div
        className={`fixed top-4 right-4 bottom-4 z-50 w-[280px] rounded-3xl bg-dark-900/95 backdrop-blur-2xl border border-gold-400/20 shadow-2xl lg:hidden transition-all duration-500 ease-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Happy Beck"
                className="w-8 h-8 object-contain"
              />
              <p className="font-serif text-sm font-semibold text-white tracking-wide">
                Happy <span className="text-gold-400">Beck</span>
              </p>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-gold-400 p-1.5 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Menü schliessen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 my-auto py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-250 ${
                    active 
                      ? 'bg-gold-400/10 text-gold-400 font-semibold border border-gold-400/20' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-sans font-medium tracking-widest uppercase">
                    {item.label}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 ${
                    active ? 'text-gold-400 opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 group-hover:text-gold-400'
                  }`} />
                </Link>
              );
            })}

            {/* Smaller Supervisor Login Button inside Mobile Menu (Above Footer Divider Line) */}
            <div className="flex justify-center mt-6">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="relative inline-flex items-center justify-center p-[1px] rounded-lg overflow-hidden group/btn w-36"
              >
                <span className="absolute inset-[-1000%] animate-border-beam bg-[conic-gradient(from_90deg_at_50%_50%,#FFE066_0%,#D4AF37_50%,#FFE066_100%)]" />
                <span 
                  className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-[7px] bg-gold-400 px-3 py-1.5 text-[9px] font-sans font-bold tracking-widest uppercase transition-colors duration-300 group-hover/btn:bg-gold-300"
                  style={{ color: '#0f0d0c' }}
                >
                  Supervisor Login
                </span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/5 pt-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <a href="https://instagram.com/happybeck.ch" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="tel:+41440000000" className="text-white/40 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <a href="/kontakt" className="text-white/40 hover:text-gold-400 transition-colors">
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[10px] text-white/30 font-sans tracking-wide text-center leading-relaxed">
              Langstrasse 120, 8004 Zürich <br />
              <span className="text-[9px] text-gold-400/50 mt-0.5 block">© Happy Beck 2026</span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
