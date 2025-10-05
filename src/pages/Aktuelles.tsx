import { Sparkles, Gift, Coffee, Sandwich } from 'lucide-react';

export default function Jubilaeums() {
  const deals = [
    {
      title: 'Happy Morning',
      subtitle: '(Jubiläums-Deals)',
      description: 'Happy Start - Zu jedem Menü: Amaretti "Klein, süss - Danke Zürich!"',
      items: [
        { name: 'Kaffee + Gipfeli + Valser', price: '7.80 CHF' },
        { name: 'Frühstück klein + Costa Kaffee + Valser', price: '9.90 CHF' },
        { name: 'Happy Sandwich + Costa Kaffee', price: '9.90 CHF' }
      ],
      image: 'morning',
      color: 'from-amber-400 to-orange-500'
    },
    {
      title: 'Happy Lunch',
      subtitle: '(Jubiläums-Deals) - NEU!',
      description: 'Eleganter Genuss - Zu jedem Menü: Mini Éclair (Vanille/Schoggi) "Fein & frisch - nur fürs Jubiläum."',
      items: [
        { name: 'Happy Burger - neuer Geschmack + Beilagensalat + Cola Zero', oldPrice: '15.90 CHF', price: '12.90 CHF' },
        { name: 'La Dolce Pasta Menü + Beilagensalat + Fuse Tea', oldPrice: '18.90 CHF', price: '14.90 CHF' }
      ],
      image: 'lunch',
      color: 'from-green-400 to-emerald-500',
      isNew: true
    },
    {
      title: 'Happy Night',
      subtitle: '(Jubiläums-Deals)',
      description: 'Süsse Überraschung - Zu jedem Menü: Mini Brownie Würfel "Ein Happy-Moment extra."',
      items: [
        { name: 'Pouletschnitzel scharf + Käse + Drink', price: '10.40 CHF' },
        { name: 'Night Burger + Drink', price: '12.90 CHF' },
        { name: 'Night Piadina + Drink', price: '13.90 CHF' }
      ],
      image: 'night',
      color: 'from-red-500 to-rose-600'
    },
    {
      title: 'Happy Züri Bagel Menü',
      subtitle: 'Exklusiv zum 20 Jahre Jubiläum',
      description: 'Crazy Taste! Bagel + Drink + Amaretti',
      items: [
        { name: 'Happy Züri Bagel Kombo', oldPrice: '16.90 CHF', price: '13.90 CHF', note: '(Drink nach Wahl: Costa Kaffee, Valser oder Cola Zero)' }
      ],
      image: 'bagel',
      color: 'from-yellow-400 to-amber-500',
      special: true
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              {i % 2 === 0 ? (
                <div className="text-yellow-400 text-2xl">✨</div>
              ) : (
                <div className="text-red-500 text-2xl">🎊</div>
              )}
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-yellow-400">20</span>
            <span className="italic text-red-500"> Jahre</span>
          </h1>
          <div className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">happy</span>
            <span className="text-yellow-400">beck</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
            DANKE ZÜRICH!
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Jetzt Jubiläums-Deals im ganzen Monat!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Jubiläums-Neuheit
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Exklusiv zum 20 Jahre Jubiläum - Crazy Taste!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`h-3 bg-gradient-to-r ${deal.color}`}></div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {deal.subtitle}
                    </p>
                  </div>
                  {deal.isNew && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      NEU!
                    </span>
                  )}
                  {deal.special && (
                    <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                      SPECIAL
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <Gift className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{deal.description}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {deal.items.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-200 dark:border-gray-600 pb-3">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800 dark:text-gray-200 flex-1 mr-4">
                          {item.name}
                        </p>
                        <div className="text-right">
                          {item.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              {item.oldPrice}
                            </p>
                          )}
                          <p className="text-lg font-bold text-red-600 dark:text-red-500">
                            {item.price}
                          </p>
                        </div>
                      </div>
                      {item.note && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl shadow-2xl overflow-hidden p-8 mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                Lunch-Pass
              </h2>
              <p className="text-lg text-amber-100">
                Treue zahlt sich doppelt aus.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[
                  { num: 1, topText: null, bottomText: null },
                  { num: 2, topText: null, bottomText: null },
                  { num: 3, topText: null, bottomText: null },
                  { num: 4, topText: null, bottomText: null },
                  { num: 5, topText: 'Genießen Sie', bottomText: 'den Kaffe gratis' }
                ].map((item) => (
                  <div key={item.num} className="relative">
                    <div className={`aspect-square rounded-full ${item.topText ? 'bg-red-500' : 'bg-white'} flex flex-col items-center justify-center shadow-lg border-4 ${item.topText ? 'border-yellow-400' : 'border-gray-200'} p-3`}>
                      {item.topText && (
                        <div className="text-[9px] font-bold text-yellow-300 text-center leading-tight mb-1">
                          {item.topText}
                        </div>
                      )}
                      <span className={`text-2xl font-bold ${item.topText ? 'text-white' : 'text-gray-400'}`}>
                        {item.num}
                      </span>
                      {item.bottomText && (
                        <div className="text-[9px] font-bold text-yellow-300 text-center leading-tight mt-1">
                          {item.bottomText}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-3 mb-6">
                {[
                  { num: 6, topText: null, bottomText: null },
                  { num: 7, topText: null, bottomText: null },
                  { num: 8, topText: null, bottomText: null },
                  { num: 9, topText: null, bottomText: null },
                  { num: 10, topText: 'Sandwich oder', bottomText: 'Panini gratis' }
                ].map((item) => (
                  <div key={item.num} className="relative">
                    <div className={`aspect-square rounded-full ${item.topText ? 'bg-red-500' : 'bg-white'} flex flex-col items-center justify-center shadow-lg border-4 ${item.topText ? 'border-yellow-400' : 'border-gray-200'} p-3`}>
                      {item.topText && (
                        <div className="text-[9px] font-bold text-yellow-300 text-center leading-tight mb-1">
                          {item.topText}
                        </div>
                      )}
                      <span className={`text-2xl font-bold ${item.topText ? 'text-white' : 'text-gray-400'}`}>
                        {item.num}
                      </span>
                      {item.bottomText && (
                        <div className="text-[9px] font-bold text-yellow-300 text-center leading-tight mt-1">
                          {item.bottomText}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6 space-y-2">
                <p className="text-amber-200 text-sm">
                  Dein Happy-Genuss
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="text-white">📱 happybeck.ch</span>
                  <span className="text-white">📷 @happybeck.ch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Standort
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              📍 happybeck, Langstrasse 120, 8004 Zürich
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              ☎ 043 243 97 80
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              🌐 www.happybeck.ch | 📧 info@happybeck.ch
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
