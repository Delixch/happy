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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-700/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gold-400/10'
            : 'bg-transparent'
        }`}
      >
        {/* Top accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3 sm:gap-4 z-10">
              <div className="flex flex-col justify-center text-left">
                <p className="font-serif text-sm sm:text-lg font-semibold text-white tracking-wide leading-tight group-hover:text-gold-400 transition-colors">
                  Happy <span className="text-gold-400 group-hover:text-white transition-colors">Beck</span>
                </p>
                <p className="text-[7.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-gold-400/60 font-sans mt-0.5 leading-none">
                  Ein Häppchen Glück
                </p>
              </div>
              <div className={`relative rounded-full overflow-hidden ring-1 ring-gold-400/30 transition-all duration-500 group-hover:ring-gold-400/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] ${
                scrolled ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14'
              }`}>
                <img
                  src="/logo.png"
                  alt="Happy Beck"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`relative px-4 py-2 text-[13px] font-sans font-medium tracking-wide uppercase transition-all duration-300 link-underline ${
                    location.pathname === item.href
                      ? 'text-gold-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-gold-400 to-gold-300" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all duration-300 select-none group"
              aria-label="Toggle menu"
            >
              {/* Outer Golden Orbit Dashed Ring */}
              <div className={`absolute inset-0 rounded-full border border-dashed border-gold-400/40 transition-transform duration-[12000ms] linear infinite ${
                isOpen ? 'animate-spin' : 'group-hover:rotate-45'
              }`} />

              {/* Inner Golden Orbit Solid Ring */}
              <div className="absolute inset-1 rounded-full border border-gold-400/10 shadow-[0_0_10px_rgba(212,175,55,0.05)]" />
              
              {/* Rotating glowing core */}
              <div className={`absolute inset-1.5 rounded-full bg-dark-900/90 flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'shadow-[0_0_15px_rgba(212,175,55,0.25)] border border-gold-400/25' : 'border border-white/5'
              }`}>
                {isOpen ? (
                  // Custom Close (X) SVG
                  <svg 
                    className="w-4 h-4 text-gold-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Custom wheat stem (buğday başağı) SVG
                  <svg 
                    className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform duration-300"
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

      {/* Mobile Drawer Menu (Right Side Slide-In) */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[270px] bg-dark-900 border-l border-white/5 shadow-2xl lg:hidden transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
              className="text-white/60 hover:text-gold-400 p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 my-auto py-6 overflow-y-auto">
            {menuItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between py-2.5 border-b border-white/5 transition-all duration-200 ${
                    active ? 'text-gold-400 translate-x-1' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-sans font-medium tracking-wider uppercase">
                    {item.label}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 ${
                    active ? 'text-gold-400 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:text-gold-400'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-white/5 pt-4">
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
