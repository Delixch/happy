import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, Users, Film, Briefcase, Sparkles, Gift, Instagram,
  LogOut, ChevronRight, Menu as MenuIcon, X, Home
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login, authed, checking } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authed) navigate('/admin/menu');
  }, [authed, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const errorMessage = await login(email, password);
    setSubmitting(false);
    if (errorMessage) {
      setError('E-Mail oder Passwort ist falsch.');
      setPassword('');
    }
  };

  if (checking) return null;

  return (
    <section className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="admin-card p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full border border-[#FFFFCC]/30 flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-7 h-7 text-[#FFFFCC]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Admin Panel</h1>
          <p className="text-white/40 font-sans text-sm mt-2">Happy Beck Verwaltung</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              className="admin-input"
              placeholder="admin@happybeck.ch"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className="admin-input"
              placeholder="Admin-Passwort eingeben"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 font-sans">{error}</p>
          )}
          <button type="submit" disabled={submitting} className="admin-btn w-full disabled:opacity-60">
            {submitting ? 'Anmelden…' : 'Anmelden'}
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
  const { authed, checking, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!checking && !authed) navigate('/admin');
  }, [authed, checking, navigate]);

  if (checking || !authed) return null;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 bottom-0 bg-[#1A1A00] border-r border-white/5">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-serif font-bold text-[#FFFFCC]">Admin Panel</h2>
          <p className="text-white/30 font-sans text-xs mt-1">Happy Beck Verwaltung</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#FFFFCC]/10 text-[#FFFFCC] border border-[#FFFFCC]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-white/50 hover:text-[#FFFFCC] hover:bg-white/5 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Zur Website</span>
          </Link>
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
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#1A1A00]/95 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-serif font-bold text-[#FFFFCC]">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-[#FFFFCC] transition-colors">
          {sidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-20 pt-12">
          <div className="absolute inset-0 bg-[#1A1A00]/90 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-[#1A1A00] border-r border-white/5 w-64 h-full p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all ${
                  location.pathname === item.path
                    ? 'bg-[#FFFFCC]/10 text-[#FFFFCC]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-white/50 hover:text-[#FFFFCC] mt-4"
            >
              <Home className="w-4 h-4" />
              <span>Zur Website</span>
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-white/40 hover:text-red-400 w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen bg-[#1A1A00]">
        <div className="p-6 lg:p-10 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
