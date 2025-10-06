import { Link } from 'react-router-dom';
import { ChefHat, Heart, Award } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Home() {
  // Background gradient cycling removed; we now emphasize image with a localized overlay behind text.

  const slides = useMemo(
    () => [
      {
        image:
          "/Home.jpg",
        title: "Ein Häppchen Glück!",
        text:
          "Traditionelles Handwerk trifft moderne Innovation. Entdecken Sie unsere Leidenschaft für frisches Brot und feine Backwaren.",
      },
      {
        image:
          "/Home1.png",
        title: "Frisch. Fein. Happy.",
        text:
          "Jeden Tag ofenfrisch – mit ausgewählten Zutaten und viel Liebe zum Detail.",
      },
      {
        image:
          "home2.jpeg",
        title: "Süsses und Herzhaftes",
        text:
          "Von Gipfeli bis Sandwich: Für jeden Geschmack das Richtige.",
      },
    ],
    []
  );
  const [slide, setSlide] = useState(0);

  const next = () => setSlide((i) => (i + 1) % slides.length);
  const prev = () => setSlide((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section id="home" className="min-h-screen pt-20">
      <div className={`relative h-[600px] overflow-hidden`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 transition-[background-image] duration-700"
          style={{ backgroundImage: `url('${slides[slide].image}')` }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-2xl text-center bg-black/60 dark:bg-black/70 rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-black/20">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-400 mb-6">
              {slides[slide].title}
            </h1>
            <p className="text-xl text-white mb-8">
              {slides[slide].text}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
          {/* Arrows */}
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-amber-700 shadow-md"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-amber-700 shadow-md"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === slide ? 'bg-amber-600' : 'bg-white/70'} ring-1 ring-black/10`}
              />
            ))}
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
