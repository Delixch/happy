import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { applyTheme, resolveTheme, storeTheme, themeForHour, readStoredTheme, type Theme } from '../lib/theme';

/**
 * The bakery never closes, so the site follows the shop: bright by day, dark
 * street with the window lit by night. The clock decides unless the visitor
 * says otherwise, and that choice lasts the session.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Keep following the clock while the page stays open, unless overridden.
  useEffect(() => {
    if (readStoredTheme()) return;
    const timer = setInterval(() => {
      setTheme((current) => {
        const byClock = themeForHour(new Date().getHours());
        return byClock === current ? current : byClock;
      });
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'nacht' ? 'tag' : 'nacht';
    storeTheme(next);
    setTheme(next);
  };

  const isNight = theme === 'nacht';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isNight ? 'Zur Tagesansicht wechseln' : 'Zur Nachtansicht wechseln'}
      title={isNight ? 'Tagesansicht' : 'Nachtansicht'}
      className={`w-9 h-9 rounded-full border border-[#FFFFCC]/25 text-[#FFFFCC]/75 hover:text-[#FFFFCC] hover:border-[#FFFFCC]/50 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${className}`}
    >
      {isNight ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
    </button>
  );
}
