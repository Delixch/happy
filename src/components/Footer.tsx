import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl p-6 md:p-8 bg-amber-800/60 dark:bg-gray-900/60 ring-1 ring-black/10">
            <h3 className="text-xl font-bold mb-4">Happy Beck</h3>
            <p className="text-amber-100 dark:text-gray-400 text-sm">
              Ein Häppchen Glück - Traditionelle Bäckerei mit Leidenschaft für Qualität und Innovation.
            </p>
          </div>

          <div className="rounded-xl p-6 md:p-8 bg-amber-900/60 dark:bg-gray-900/70 ring-1 ring-black/10">
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-amber-100 dark:text-gray-400">043 243 97 80</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-amber-100 dark:text-gray-400">info@happybeck.ch</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-amber-100 dark:text-gray-400">happybeck, Langstrasse 120, 8004 Zürich</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 md:p-8 bg-amber-950/50 dark:bg-black/50 ring-1 ring-black/10">
            <h4 className="font-semibold mb-4">Öffnungszeiten</h4>
            <div className="space-y-2 text-sm text-amber-100 dark:text-gray-400">
              <p>24 Stunden geöffnet</p>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-amber-100 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Happy Beck. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
