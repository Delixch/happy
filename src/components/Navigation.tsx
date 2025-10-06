import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Home as HomeIcon, Building2, Users2, Sandwich as SandwichIcon, Newspaper, Images, Briefcase, Phone } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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

  const iconFor = (id: string) => {
    const cls = 'w-4 h-4';
    switch (id) {
      case 'home':
        return <HomeIcon className={cls} />;
      case 'unternehmen':
        return <Building2 className={cls} />;
      case 'team':
        return <Users2 className={cls} />;
      case 'menu':
        return <SandwichIcon className={cls} />;
      case 'aktuelles':
        return <Newspaper className={cls} />;
      case 'medien':
        return <Images className={cls} />;
      case 'jobs':
        return <Briefcase className={cls} />;
      case 'kontakt':
        return <Phone className={cls} />;
      default:
        return null;
    }
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-gray-900/70 backdrop-blur-md shadow-lg border-b border-black/5'
        : 'bg-white/60 dark:bg-gray-900/50 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-500">Happy Beck</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Ein Häppchen Glück</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={handleNavClick}
                className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 dark:after:bg-amber-500 after:transition-all hover:after:w-full ${
                  location.pathname === item.href
                    ? 'text-amber-700 dark:text-amber-500 after:w-full'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {iconFor(item.id)}
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden origin-top transition-all duration-300 ease-out ${
            isOpen
              ? 'opacity-100 scale-y-100 py-4 border-t border-gray-200 dark:border-gray-700'
              : 'opacity-0 scale-y-0 h-0 overflow-hidden'
          }`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              onClick={handleNavClick}
              className={`block py-3 px-4 text-sm font-medium transition-colors ${
                location.pathname === item.href
                  ? 'text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
