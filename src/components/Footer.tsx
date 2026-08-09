import { Mail, Phone, MapPin, Instagram, Clock, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_STREET, ADDRESS_CITY } from '../lib/contact';

const INSTAGRAM = [
  { handle: '@happybeck.ch', url: 'https://www.instagram.com/happybeck.ch?igsh=eGdtbW1ud3p6ZDFx' },
  { handle: '@happybeck_', url: 'https://www.instagram.com/happybeck_?igsh=MXM0eGN1enZydzl0cQ==' },
];

/** Quiet, wide-tracked label. The footer sits under the page, so it whispers. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-[#FFFFCC]/70 text-[11px] font-bold uppercase tracking-[0.28em] mb-6">
      {children}
    </h3>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#FFFFCC]/80 flex-shrink-0">
        {icon}
      </span>
      {children}
    </span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1A1A00] text-white border-t border-[#FFFFCC]/25">
      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-7xl">
        {/* No nav column here — the header already carries the full menu. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#FFFFCC]/40 bg-white p-0.5 group-hover:scale-105 transition-transform">
                <img src="/logo.png" alt="Happy Beck" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-white leading-none">
                  Happy <span className="text-[#FFFFCC]">Beck</span>
                </p>
                <span className="text-[10px] text-[#FFFFCC]/70 font-sans font-semibold tracking-[0.22em] uppercase block mt-1.5">
                  Zürich · Seit 2006
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-[1.8] font-sans max-w-xs">
              Ein Häppchen Glück — traditionelle Bäckerei mit Leidenschaft für Qualität und Innovation.
            </p>

            {/* Legal sits under the brand rather than in a strip of its own */}
            <p className="text-white/35 text-[13px] font-sans flex flex-wrap items-center gap-x-3 gap-y-1 mt-8">
              <span>&copy; {currentYear} Happy Beck Zürich</span>
              <span className="text-white/15">·</span>
              <Link to="/datenschutz" className="hover:text-white/70 transition-colors">
                Datenschutz
              </Link>
              <span className="text-white/15">·</span>
              <Link to="/admin" className="hover:text-white/70 transition-colors">
                Login
              </Link>
            </p>
          </div>

          {/* Contact */}
          <div>
            <ColumnHeading>Kontakt</ColumnHeading>
            <div className="space-y-4 text-[15px] font-sans text-white/65">
              <a href={`tel:${PHONE_TEL}`} className="block hover:text-white transition-colors">
                <ContactRow icon={<Phone className="w-4 h-4" />}>{PHONE_DISPLAY}</ContactRow>
              </a>
              <a href={`mailto:${EMAIL}`} className="block hover:text-white transition-colors">
                <ContactRow icon={<Mail className="w-4 h-4" />}>{EMAIL}</ContactRow>
              </a>
              <ContactRow icon={<MapPin className="w-4 h-4" />}>
                {ADDRESS_STREET}, {ADDRESS_CITY}
              </ContactRow>
              <ContactRow icon={<Clock className="w-4 h-4" />}>24 Stunden geöffnet</ContactRow>
            </div>
          </div>

          {/* Social */}
          <div>
            <ColumnHeading>Social Media</ColumnHeading>
            <div className="space-y-4 text-[15px] font-sans text-white/65">
              {INSTAGRAM.map((account) => (
                <a
                  key={account.handle}
                  href={account.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  <ContactRow icon={<Instagram className="w-4 h-4" />}>{account.handle}</ContactRow>
                </a>
              ))}

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 mt-8 text-[11px] font-sans font-bold tracking-[0.2em] text-[#FFFFCC]/70 uppercase border border-[#FFFFCC]/25 hover:border-[#FFFFCC]/60 hover:text-[#FFFFCC] px-4 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Nach oben
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
