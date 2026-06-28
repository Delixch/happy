import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Unternehmen from './pages/Unternehmen';
import Jobs from './pages/Jobs';
import Aktuelles from './pages/Aktuelles';
import Medien from './pages/Medien';
import Kontakt from './pages/Kontakt';
import Team from './pages/Team';
import MenuPage from './pages/Menu';
import NotFound from './pages/NotFound';

// Admin
import { AdminLogin, AdminLayout } from './pages/admin/AdminLayout';
import AdminMenu from './pages/admin/AdminMenu';
import AdminTeam from './pages/admin/AdminTeam';
import AdminMedien from './pages/admin/AdminMedien';
import AdminJobs from './pages/admin/AdminJobs';
import AdminAktuelles from './pages/admin/AdminAktuelles';
import AdminDeals from './pages/admin/AdminDeals';
import AdminInstagram from './pages/admin/AdminInstagram';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/unternehmen" element={<Unternehmen />} />
          <Route path="/team" element={<Team />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/aktuelles" element={<Aktuelles />} />
          <Route path="/medien" element={<Medien />} />
          <Route path="/kontakt" element={<Kontakt />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/menu" element={<AdminLayout><AdminMenu /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><AdminTeam /></AdminLayout>} />
          <Route path="/admin/medien" element={<AdminLayout><AdminMedien /></AdminLayout>} />
          <Route path="/admin/jobs" element={<AdminLayout><AdminJobs /></AdminLayout>} />
          <Route path="/admin/aktuelles" element={<AdminLayout><AdminAktuelles /></AdminLayout>} />
          <Route path="/admin/deals" element={<AdminLayout><AdminDeals /></AdminLayout>} />
          <Route path="/admin/instagram" element={<AdminLayout><AdminInstagram /></AdminLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
