/**
 * Cloudinary delivery for the photography.
 *
 * f_auto picks the format per browser (WebP or AVIF rather than JPEG), q_auto
 * tunes quality per image, and the width caps stop a 1.1MB original being sent
 * into a 400px card. Photographs were 91% of the homepage weight before this.
 */
const CDN = 'https://res.cloudinary.com/dsdsb4lqw/image/upload';

/** Full-bleed imagery: hero sliders and page headers. */
export const heroImage = (id: string) => `${CDN}/f_auto,q_auto,w_1400/${id}`;

/** Anything sitting in a card or a grid cell. */
export const cardImage = (id: string) => `${CDN}/f_auto,q_auto,w_800/${id}`;

/**
 * Preloaded in index.html. That href must stay byte-identical to this, or the
 * browser fetches one URL and the page then asks for another.
 */
export const HERO_FIRST_SLIDE = heroImage('v1786450952/Home_wgi4dv.jpg');
