import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_SEO, FALLBACK_SEO, SITE_URL } from '../lib/seo';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps the title, description, canonical and Open Graph tags in sync with the
 * current route. Google renders JavaScript so it picks these up, but the tags
 * in index.html stay correct for the homepage as a static fallback for crawlers
 * and scrapers that do not execute scripts.
 */
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    const seo = PAGE_SEO[pathname] ?? FALLBACK_SEO;
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}
