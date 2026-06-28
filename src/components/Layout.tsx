import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollPeelButton from './ScrollPeelButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-700 text-white font-sans">
      <ScrollToTop />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <ScrollPeelButton />
    </div>
  );
}
