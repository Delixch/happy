import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/CookieConsent';

// Lazy load public pages
const Home = lazy(() => import('./pages/Home'));
const Unternehmen = lazy(() => import('./pages/Unternehmen'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Aktuelles = lazy(() => import('./pages/Aktuelles'));
const Medien = lazy(() => import('./pages/Medien'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const Team = lazy(() => import('./pages/Team'));
const MenuPage = lazy(() => import('./pages/Menu'));
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
        <Routes>
          {/* Public Website Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/unternehmen" element={<Unternehmen />} />
            <Route path="/team" element={<Team />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/aktuelles" element={<Aktuelles />} />
            <Route path="/medien" element={<Medien />} />
            <Route path="/kontakt" element={<Kontakt />} />
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
    </Router>
  );
}

export default App;
