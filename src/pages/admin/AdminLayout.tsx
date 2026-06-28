import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, UtensilsCrossed, Users, Film, Briefcase, Sparkles, Gift, Instagram,
  LogOut, ChevronRight, Menu as MenuIcon, X 
} from 'lucide-react';

const ADMIN_PASSWORD = 'happy2026';
const AUTH_KEY = 'happybeck_admin_auth';

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  return { authed, login, logout };
}

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login, authed } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authed) navigate('/admin/menu');
  }, [authed, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="glass-card p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full border border-gold-400/30 flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-7 h-7 text-gold-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Admin Panel</h1>
          <p className="text-white/40 font-sans text-sm mt-2">Happy Beck Verwaltung</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="input-premium"
              placeholder="Admin-Passwort eingeben"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 font-sans">Falsches Passwort. Bitte versuchen Sie es erneut.</p>
          )}
          <button type="submit" className="btn-gold w-full">
            Anmelden
          </button>
        </form>
      </div>
    </section>
  );
}

const navItems = [
  { path: '/admin/menu', label: 'Menü', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { path: '/admin/team', label: 'Team', icon: <Users className="w-4 h-4" /> },
  { path: '/admin/medien', label: 'Medien', icon: <Film className="w-4 h-4" /> },
  { path: '/admin/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  { path: '/admin/aktuelles', label: 'Tagesangebote', icon: <Sparkles className="w-4 h-4" /> },
  { path: '/admin/deals', label: 'Jubiläums-Deals', icon: <Gift className="w-4 h-4" /> },
  { path: '/admin/instagram', label: 'Instagram Feed', icon: <Instagram className="w-4 h-4" /> },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { authed, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authed) navigate('/admin');
  }, [authed, navigate]);

  if (!authed) return null;

  return (
    <div className="min-h-screen pt-20 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-20 left-0 bottom-0 bg-dark-800 border-r border-white/5">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-serif font-bold text-gold-gradient">Admin Panel</h2>
          <p className="text-white/30 font-sans text-xs mt-1">Happy Beck Verwaltung</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-20 left-0 right-0 z-30 bg-dark-800/95 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-serif font-bold text-gold-gradient">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-gold-400 transition-colors">
          {sidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-20 pt-32">
          <div className="absolute inset-0 bg-dark-700/90 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-dark-800 border-r border-white/5 w-64 h-full p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all ${
                  location.pathname === item.path
                    ? 'bg-gold-400/10 text-gold-400'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-white/40 hover:text-red-400 w-full mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-6 lg:p-10 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
