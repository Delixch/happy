export type Theme = 'tag' | 'nacht';

const STORAGE_KEY = 'happybeck_theme';

/** Night runs 21:00 to 05:00, roughly when the Langstrasse shifts character. */
const NIGHT_FROM = 21;
const NIGHT_UNTIL = 5;

export function themeForHour(hour: number): Theme {
  return hour >= NIGHT_FROM || hour < NIGHT_UNTIL ? 'nacht' : 'tag';
}

/** A manual choice sticks for the session; otherwise the clock decides. */
export function readStoredTheme(): Theme | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored === 'tag' || stored === 'nacht' ? stored : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    sessionStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode — the clock still drives the theme */
  }
}

export function resolveTheme(): Theme {
  return readStoredTheme() ?? themeForHour(new Date().getHours());
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'nacht') {
    root.setAttribute('data-theme', 'nacht');
  } else {
    root.removeAttribute('data-theme');
  }
}
