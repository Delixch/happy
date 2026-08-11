import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import TransitionCurtain from './components/TransitionCurtain';
import SeoManager from './components/SeoManager';

// Home is what most people land on, so it ships in the first bundle. The rest
// load on demand — otherwise opening the homepage also downloads the menu, the
// team deck, the contact form and the sandwich builder. The route curtain is
// already covering the swap, so the fetch happens behind it.
import Home from './pages/Home';

const Unternehmen = lazy(() => import('./pages/Unternehmen'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Aktuelles = lazy(() => import('./pages/Aktuelles'));
const Medien = lazy(() => import('./pages/Medien'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const Team = lazy(() => import('./pages/Team'));
const MenuPage = lazy(() => import('./pages/Menu'));
const SandwichBauen = lazy(() => import('./pages/SandwichBauen'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
  const firstRender = useRef(true);

  const stale = location.pathname !== displayLocation.pathname;

  useEffect(() => {
    if (stale) setCovering(true);
  }, [stale]);

  const handleCovered = () => {
    setDisplayLocation(location);
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCovering(false);
    firstRender.current = false;
  };

  return (
    <>
      <TransitionCurtain active={covering} onCovered={handleCovered} reduced={!!reduceMotion} />
      <motion.div
        key={displayLocation.pathname}
        // No fade on the very first paint. The page already waits on the
        // JavaScript to boot; following that with a half-second fade from
        // nothing just extends the blank screen. Route changes still get it,
        // where it covers the swap.
        initial={
          firstRender.current
            ? false
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        {/* Inside the curtain, not around it: a lazy route suspending must not
            unmount the curtain that is covering the swap. */}
        <Suspense fallback={<div className="min-h-[60vh]" />}>
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
        </Suspense>
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
      <SeoManager />
      <CookieConsent />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
