export const SITE_URL = 'https://happybeck.ch';

export interface PageSeo {
  title: string;
  description: string;
}

/**
 * Keyword map for the public routes. Each page owns one primary local search
 * term so the pages do not compete with each other:
 *
 *   /           Bäckerei Zürich / Bäckerei Langstrasse / 24h Bäckerei
 *   /menu       Frühstück Zürich / frische Sandwiches / Gipfeli
 *   /kontakt    Öffnungszeiten / Langstrasse 120 / Kreis 4
 *   /aktuelles  Tagesangebot / Deals
 *   the rest    brand and trust terms
 *
 * Titles stay under ~60 characters and descriptions under ~160 so Google shows
 * them without truncating.
 */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Bäckerei Zürich – 24h frisch | Happy Beck Langstrasse',
    description:
      'Happy Beck an der Langstrasse 120 in Zürich: Bäckerei mit frischen Sandwiches, Frühstück und Gipfeli – 24 Stunden an 7 Tagen geöffnet. Seit 2006.',
  },
  '/menu': {
    title: 'Speisekarte: Frühstück, Sandwiches & Gipfeli | Zürich',
    description:
      'Die Speisekarte der Bäckerei Happy Beck in Zürich: frisches Frühstück, belegte Sandwiches, Pizza, Salziges und hausgemachte Pâtisserie – täglich ofenfrisch.',
  },
  '/kontakt': {
    title: 'Kontakt & Öffnungszeiten – Langstrasse 120, Zürich',
    description:
      'Besuchen Sie die Bäckerei Happy Beck an der Langstrasse 120 in 8004 Zürich, Kreis 4. Rund um die Uhr geöffnet – Anfahrt, Karte und Kontakt auf einen Blick.',
  },
  '/aktuelles': {
    title: 'Tagesangebote & Deals | Bäckerei Happy Beck Zürich',
    description:
      'Aktuelle Tagesangebote, Jubiläums-Deals und der Lunch-Pass der Bäckerei Happy Beck in Zürich. Jeden Tag ein neues Spezial an der Langstrasse.',
  },
  '/unternehmen': {
    title: 'Über uns – Bäckerei seit 2006 in Zürich | Happy Beck',
    description:
      'Die Geschichte der Bäckerei Happy Beck: 2006 von der Familie Aydin in Zürich gegründet, mit Rezepten aus mehreren Generationen Konditorbäckerei.',
  },
  '/team': {
    title: 'Unser Team – Bäckerei Happy Beck in Zürich',
    description:
      'Die Menschen hinter Happy Beck: Bäckerinnen, Konditoren und Verkaufsteam, die täglich frisches Brot und Gipfeli für Zürich backen.',
  },
  '/jobs': {
    title: 'Jobs in der Bäckerei Zürich | Happy Beck',
    description:
      'Offene Stellen bei der Bäckerei Happy Beck an der Langstrasse in Zürich. Bewerben Sie sich als Bäcker, Konditor oder im Verkauf.',
  },
  '/medien': {
    title: 'Happy Beck in der Presse | Bäckerei Zürich',
    description:
      'TV-Reportagen, Zeitungsartikel und Online-Beiträge über die Bäckerei Happy Beck an der Langstrasse in Zürich.',
  },
  '/sandwich-bauen': {
    title: 'Sandwich selber zusammenstellen | Happy Beck Zürich',
    description:
      'Stellen Sie Ihr Sandwich bei Happy Beck in Zürich selbst zusammen – frisches Brot, feine Zutaten, genau nach Ihrem Geschmack.',
  },
  '/datenschutz': {
    title: 'Datenschutz | Happy Beck Zürich',
    description: 'Datenschutzerklärung der Bäckerei Happy Beck, Langstrasse 120, 8004 Zürich.',
  },
};

export const FALLBACK_SEO: PageSeo = {
  title: 'Seite nicht gefunden | Happy Beck Zürich',
  description: 'Diese Seite existiert nicht. Zurück zur Bäckerei Happy Beck in Zürich.',
};
