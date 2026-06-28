import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <h1 className="text-[120px] md:text-[180px] font-serif font-bold text-gold-gradient leading-none">
          404
        </h1>
        <div className="divider-gold w-32 mx-auto my-6" />
        <p className="text-2xl md:text-3xl font-serif text-white mb-3">
          Seite nicht gefunden
        </p>
        <p className="text-white/40 font-sans mb-10 max-w-md mx-auto">
          Die angeforderte Seite existiert leider nicht. Kehren Sie zur Startseite zurück.
        </p>
        <Link
          to="/"
          className="btn-gold inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
