export default function Unternehmen() {
  return (
    <section id="unternehmen" className="relative pt-20">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-500 mb-12 text-center">
          Über Uns
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              Die Bäckerei Happy wurde im Jahre 2006 von der Familie Aydin gegründet. Die Anfänge der Konditorbäckerei Aydin liegen jedoch mehrere Generationen zurück. Dabei wird grosser Wert gelegt auf handwerkliches Können und auf die Einhaltung altbewährter Rezepte, die für den hohen Qualitätsanspruch all unserer Produkte stehen. Ein Handwerk, das stets mit der Tradition verwurzelt ist, denn nur die besten und genau geprüften Rohstoffe gelangen zur Verarbeitung für die vielen Produkte aus Bäckerei und Konditorei.
            </p>

            <p>
              Die erste Happy-Filiale öffnete in Zürich an der Dienerstrasse ihre Türen. Unter guter Regie blühte die Bäckerei richtig auf. Aydins Ruf verbreitete sich weit über Zürich hinaus, und es wurden mehrere Filialen eröffnet. Heute kommt man sowohl in Filialen im Raum Zürich als auch in der Gesamtschweiz in den Genuss der breit gefächerten Happy-Produktpalette.
            </p>
          </div>

          <div className="relative">
            <div className="group relative w-full max-w-md mx-auto h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10">
              {/* Base image */}
              <img src="/uberuns.jpg" alt="Über uns" className="absolute inset-0 w-full h-full object-cover transform-gpu transition duration-700 ease-out group-hover:scale-105" />
              {/* Hover image overlay */}
              <img src="/uberuns2.jpg" alt="Über uns 2" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Subtle animated border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-amber-500/0 group-hover:ring-amber-500/40 transition duration-500"></div>
              {/* Looping sheen animation */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
