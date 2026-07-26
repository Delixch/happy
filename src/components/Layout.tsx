import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollPeelButton from './ScrollPeelButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFBB00] text-[#231E2A] font-sans">
      <ScrollToTop />
      <Navigation />
      <main className="bg-[#FFBB00]">{children}</main>
      <Footer />
      <ScrollPeelButton />
    </div>
  );
}
