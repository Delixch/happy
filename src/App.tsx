import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Unternehmen from './pages/Unternehmen';
import Jobs from './pages/Jobs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unternehmen" element={<Unternehmen />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
