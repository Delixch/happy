import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/CookieConsent';
import TransitionCurtain from './components/TransitionCurtain';

// Lazy load public pages
import Home from './pages/Home';
import Unternehmen from './pages/Unternehmen';
import Jobs from './pages/Jobs';
import Aktuelles from './pages/Aktuelles';
import Medien from './pages/Medien';
import Kontakt from './pages/Kontakt';
import Team from './pages/Team';
import MenuPage from './pages/Menu';
import SandwichBauen from './pages/SandwichBauen';
import Datenschutz from './pages/Datenschutz';
import NotFound from './pages/NotFound';

// Lazy load admin pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLogin })));
const AdminMenu = lazy(() => import('./pages/admin/AdminMenu'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam'));
const AdminMedien = lazy(() => import('./pages/admin/AdminMedien'));
const AdminJobs = lazy(() => import('./pages/admin/AdminJobs'));
const AdminAktuelles = lazy(() => import('./pages/admin/AdminAktuelles'));
const AdminDeals = lazy(() => import('./pages/admin/AdminDeals'));
const AdminInstagram = lazy(() => import('./pages/admin/AdminInstagram'));

// Public Layout Wrapper to render Navigation Header and Footer
function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

/**
 * Renders the routes for `displayLocation` (which lags the real location while
 * the curtain is closed) so the page swap happens hidden behind the curtain.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [covering, setCovering] = useState(false);

  const stale = location.pathname !== displayLocation.pathname;

  useEffect(() => {
    if (stale) setCovering(true);
  }, [stale]);

  const handleCovered = () => {
    setDisplayLocation(location);
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCovering(false);
  };

  return (
    <>
      <TransitionCurtain active={covering} onCovered={handleCovered} reduced={!!reduceMotion} />
      <motion.div
        key={displayLocation.pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <Routes location={displayLocation}>
          {/* Public Website Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/unternehmen" element={<Unternehmen />} />
            <Route path="/team" element={<Team />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/sandwich-bauen" element={<SandwichBauen />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/aktuelles" element={<Aktuelles />} />
            <Route path="/medien" element={<Medien />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Standalone Admin Dashboard Layouts (Isolated from public header/footer) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/menu" element={<AdminLayout><AdminMenu /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><AdminTeam /></AdminLayout>} />
          <Route path="/admin/medien" element={<AdminLayout><AdminMedien /></AdminLayout>} />
          <Route path="/admin/jobs" element={<AdminLayout><AdminJobs /></AdminLayout>} />
          <Route path="/admin/aktuelles" element={<AdminLayout><AdminAktuelles /></AdminLayout>} />
          <Route path="/admin/deals" element={<AdminLayout><AdminDeals /></AdminLayout>} />
          <Route path="/admin/instagram" element={<AdminLayout><AdminInstagram /></AdminLayout>} />
        </Routes>
      </motion.div>
    </>
  );
}

function App() {
  useEffect(() => {
    // 1. Force prevent pinch-to-zoom on touch devices
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });

    // 2. Prevent iOS Safari-specific gesture scale zoom
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    return () => {
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <Router>
      <LoadingScreen />
      <CookieConsent />
      <Suspense fallback={
        <div className="min-h-[60vh] bg-dark-900 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-gold-400/20 border-t-gold-400 animate-spin" />
        </div>
      }>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
