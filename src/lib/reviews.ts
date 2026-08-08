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
  score: string;
  count: number;
  url: string;
  color: string;
}

export const RATINGS: RatingSource[] = [
  {
    id: 'google',
    label: 'Google',
    score: '4,3',
    count: 391,
    url: 'https://www.google.com/maps/search/?api=1&query=Happy+Beck+Langstrasse+120+8004+Z%C3%BCrich',
    color: '#4285F4',
  },
  {
    id: 'ubereats',
    label: 'Uber Eats',
    score: '4,7',
    count: 25,
    url: 'https://www.ubereats.com/ch-de/store/happybeck/1cMo9d_uXNufL0FRptsfcA',
    color: '#06C167',
  },
  {
    id: 'justeat',
    label: 'Just Eat',
    score: '4,4',
    count: 21,
    url: 'https://www.just-eat.ch/speisekarte/happybeck-langstrasse',
    color: '#FF8000',
  },
];
