import { Link } from 'react-router-dom';
import { ChefHat, Heart, Award } from 'lucide-react';

export default function Home() {
  return (
    <section id="home" className="min-h-screen pt-20">
      <div className="relative h-[600px] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 dark:text-amber-500 mb-6">
              Ein Häppchen Glück!
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Traditionelles Handwerk trifft moderne Innovation. Entdecken Sie unsere Leidenschaft für frisches Brot und feine Backwaren.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/unternehmen"
                className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Mehr erfahren
              </Link>
              <a
                href="#kontakt"
                className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-amber-900 dark:text-amber-500 rounded-lg font-medium border-2 border-amber-700 transition-colors duration-200"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Handwerk</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Traditionelle Backkunst mit über Jahren Erfahrung und Leidenschaft
            </p>
          </div>

          <div className="text-center p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
              <Heart className="w-8 h-8 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Qualität</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nur beste Zutaten für unsere frischen Backwaren jeden Tag
            </p>
          </div>

          <div className="text-center p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
              <Award className="w-8 h-8 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kreative neue Produkte bei gleichzeitiger Tradition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
