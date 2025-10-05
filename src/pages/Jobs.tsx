import { Clock, MapPin, Briefcase } from 'lucide-react';

export default function Jobs() {
  const jobListing = {
    title: 'Bäcker/in für Nachtschicht',
    location: 'Langstrasse, Zürich',
    type: 'Vollzeit',
    shift: 'Nachtschicht',
    description: 'Wir suchen einen erfahrenen Bäcker für unsere Filiale an der Langstrasse.',
    requirements: [
      'Erfahrung in der Bäckerei',
      'Bereitschaft zur Nachtarbeit',
      'Zuverlässigkeit und Pünktlichkeit',
      'Teamfähigkeit'
    ]
  };

  return (
    <section id="jobs" className="pt-20">
      <div className="relative flex items-start pt-16 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-15"></div>

        <div className="relative container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-500 mb-12">
            Karriere bei Happy Beck
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {jobListing.title}
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>{jobListing.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>{jobListing.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>{jobListing.shift}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {jobListing.description}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Anforderungen:
              </h3>
              <ul className="space-y-2">
                {jobListing.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
              Jetzt bewerben
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
