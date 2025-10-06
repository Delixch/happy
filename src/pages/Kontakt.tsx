import { useMemo, useState } from 'react';
import { Mail, MapPin, Clock, Instagram } from 'lucide-react';

type Operator = '+' | '-' | 'x';

function generateQuestion() {
  const nums = [
    [4, 5, '+'],
    [6, 3, '-'],
    [3, 5, 'x'],
  ] as Array<[number, number, Operator]>;
  const [a, b, op] = nums[Math.floor(Math.random() * nums.length)];
  let answer = 0;
  if (op === '+') answer = a + b;
  if (op === '-') answer = a - b;
  if (op === 'x') answer = a * b;
  return { text: `${a} ${op} ${b} = ?`, answer };
}

export default function Kontakt() {
  const initial = useMemo(() => generateQuestion(), []);
  const [question, setQuestion] = useState(initial);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'inperson'>('email');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(userAnswer) !== question.answer) {
      setError('Bitte beantworten Sie die Sicherheitsfrage richtig.');
      setQuestion(generateQuestion());
      setUserAnswer('');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="relative pt-20">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-500 mb-12 text-center">
        Fragen und Anliegen
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Adresse</div>
                  <div>happybeck, Langstrasse 120, 8004 Zürich</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-semibold">Öffnungszeiten</div>
                  <div>24 Stunden geöffnet</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-semibold">E-Mail</div>
                  <div>info@happybeck.ch</div>
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <div className="font-semibold">Instagram</div>
                <a
                  className="block items-center gap-2 text-amber-700 dark:text-amber-400 underline"
                  href="https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2"><Instagram className="w-4 h-4" /> @happybeck.ch</span>
                </a>
                <a
                  className="block items-center gap-2 text-amber-700 dark:text-amber-400 underline"
                  href="https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center gap-2"><Instagram className="w-4 h-4" /> @happybeck_</span>
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-xl p-6">
                Nachricht wurde gesendet. Vielen Dank!
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Firma</label>
                    <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="text" placeholder="Firmenname" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ansprechpartner</label>
                    <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="text" placeholder="Ihr Name" />
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-Mail</label>
                  <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="email" placeholder="name@example.com" required={contactMethod === 'email'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon</label>
                  <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="tel" placeholder="Ihre Telefonnummer" required={contactMethod === 'phone'} />
                </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                    <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="text" placeholder="Strasse, PLZ Ort" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nachricht</label>
                  <textarea className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" rows={5} placeholder="Ihre Nachricht..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wie möchten Sie kontaktiert werden?</label>
                  <select
                    className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as any)}
                  >
                    <option value="email">E-Mail</option>
                    <option value="phone">Telefon</option>
                    <option value="inperson">Persönlich</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sicherheitsfrage</label>
                    <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="text" value={question.text} readOnly />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ihre Antwort</label>
                    <input className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Ergebnis" required />
                  </div>
                  <div className="md:col-span-1 flex items-center gap-3">
                    <button type="button" onClick={() => { setQuestion(generateQuestion()); setUserAnswer(''); }} className="h-[42px] px-4 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">Neu laden</button>
                    <button type="submit" className="flex-1 h-[42px] bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md transition-colors">Senden</button>
                  </div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


