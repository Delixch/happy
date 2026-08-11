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

const srcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${CDN}/f_auto,q_auto,w_${w}/${id} ${w}w`).join(', ');

/**
 * Without these, a 412px phone downloads the 1400px file — 164KB wasted on the
 * hero alone. The browser picks a width from the set using `sizes`.
 */
export const heroSrcSet = (id: string) => srcSet(id, [500, 700, 1000, 1400]);
export const cardSrcSet = (id: string) => srcSet(id, [400, 600, 800]);

/** Hero fills half the width on desktop and the whole width below that. */
export const HERO_SIZES = '(min-width: 1024px) 50vw, 100vw';

/** Teaser cards are a third of the container on desktop, full width on phones. */
export const CARD_SIZES = '(min-width: 768px) 33vw, 100vw';

/** Small decorative art. The mascot renders at 144px at its largest, so 300
 *  still covers a retina screen. */
export const spotImage = (id: string) => `${CDN}/f_auto,q_auto,w_300/${id}`;

/** Poster frame behind every HeroVideo, so it is worth naming once. */
export const HERO_VIDEO_POSTER = heroImage('v1786451340/default-hero_e5p9gh.jpg');

export const MENU_HERO = heroImage('v1786451304/menu-hero_qat04j.jpg');
export const UBERUNS_HERO = heroImage('v1786451374/uberuns_knt2bb.jpg');
export const HANDWERK_POSTER = cardImage('v1786451421/uberuns-poster_cdiulw.jpg');

/** Transparent cut-out — f_auto keeps the alpha, which the multiply blend needs. */
export const CHEF_MASCOT = spotImage('v1786451474/b2_nqkluw.png');

/**
 * The first slide is preloaded in index.html, with the same widths and sizes
 * as heroSrcSet and HERO_SIZES below. If those change, that markup has to
 * change with them, or the browser preloads one file and the page asks for
 * another.
 */
export const FIRST_SLIDE_ID = 'v1786450952/Home_wgi4dv.jpg';
