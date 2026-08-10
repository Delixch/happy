/**
 * Ratings are entered by hand from the live profiles and are NOT marked up as
 * schema.org aggregateRating. Google's structured data guidelines forbid
 * marking up ratings collected on third-party sites, and self-serving
 * LocalBusiness ratings are not eligible for rich results anyway. Displaying
 * them as plain social proof with the source named is allowed.
 *
 * Update the numbers by hand when they drift.
 */
export interface RatingSource {
  id: string;
  label: string;
  /** Numeric form, used to fill the star row. */
  value: number;
  /** Swiss German display form, with a comma. */
  score: string;
  count: number;
  url: string;
  color: string;
}

export interface Quote {
  /** From the Google profile. Shortened by dropping whole sentences and
   *  lightly corrected for capitalisation only — never reworded, never
   *  invented. Every quote used here is from a five-star review, which is why
   *  the card can draw five stars; add a rating field before using any other. */
  text: string;
  author: string;
  when: string;
}

/**
 * Two reviews per card: the second is on the back and shows while the card is
 * hovered or tapped. Paired by length so the card does not jump when it turns,
 * and by theme so each pair says one thing twice over.
 */
export interface QuotePair {
  id: string;
  front: Quote;
  back: Quote;
}

export const QUOTE_PAIRS: QuotePair[] = [
  {
    id: 'nachts',
    front: {
      text: 'Ich möchte mich ganz herzlich bei den Mitarbeitern des Cafés bedanken, die in der Nacht vom 24. Juli von 0:30 Uhr bis 3:00 Uhr gearbeitet und mir in der Großstadt «Unterschlupf» gewährt haben, während ich auf den Bus nach München wartete.',
      author: 'Liubov Kovalchuk-Ovdiienko',
      when: 'Local Guide',
    },
    back: {
      text: 'Tolle Bäckerei, die zu jeder Stunde offen hat. Das Personal ist sehr freundlich, gelassen, trotz der vielen alkoholisierten und berauschend Kunden. Top Job den die da machen und es läuft dort wohl besser als in jeder anderen Bäckerei – zumindest in den Nachtstunden.',
      author: 'Google Datenkracke',
      when: 'Local Guide',
    },
  },
  {
    id: 'frisch',
    front: {
      text: 'Die 24/7 Öffnungszeiten sind absolut unschlagbar für eine Bäckerei in Zürich! Ich komme bald wieder, da ich um die Ecke arbeite. Danke Happy Beck.',
      author: 'JoEliJ86',
      when: 'Local Guide',
    },
    back: {
      text: 'Habe einen Kuchen bestellt für einen Geburtstag, ich hatte sehr spezifische Wünsche und war sehr zufrieden! Der Kuchen und Service waren sehr gut. Kann ich nur empfehlen, falls man einen Geburtstagskuchen braucht und etwas Spezielles möchte!',
      author: 'just me',
      when: 'Local Guide',
    },
  },
  {
    id: 'ort',
    front: {
      text: 'Herzige liebevolle Kultbäckerei an der Langstrasse mit einigen Sitzgelegenheiten für den Verzehr vor Ort. Super nette Besitzer.',
      author: 'Gina die Katz',
      when: 'Local Guide',
    },
    back: {
      text: 'Essen war das beste das ich seit langem hatte und der Service wooow, vorallem der werte Herr Aydin hat mich traumhaft bedient. Gerne jederzeit wieder.',
      author: 'Walter Bachhof',
      when: 'Google',
    },
  },
];

export const RATINGS: RatingSource[] = [
  {
    id: 'google',
    label: 'Google',
    value: 4.3,
    score: '4,3',
    count: 391,
    url: 'https://www.google.com/maps/search/?api=1&query=Happy+Beck+Langstrasse+120+8004+Z%C3%BCrich',
    color: '#4285F4',
  },
  {
    id: 'ubereats',
    label: 'Uber Eats',
    value: 4.7,
    score: '4,7',
    count: 25,
    url: 'https://www.ubereats.com/ch-de/store/happybeck/1cMo9d_uXNufL0FRptsfcA',
    color: '#06C167',
  },
  {
    id: 'justeat',
    label: 'Just Eat',
    value: 4.4,
    score: '4,4',
    count: 21,
    url: 'https://www.just-eat.ch/speisekarte/happybeck-langstrasse',
    color: '#FF8000',
  },
];
