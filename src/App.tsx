import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Unternehmen from './pages/Unternehmen';
import Jobs from './pages/Jobs';
import Aktuelles from './pages/Aktuelles';
import Medien from './pages/Medien';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unternehmen" element={<Unternehmen />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/aktuelles" element={<Aktuelles />} />
          <Route path="/medien" element={<Medien />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
