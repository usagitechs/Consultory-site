import { defaultLang, locales, type Lang } from './config';

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

/** Language from the first path segment; the default locale has no prefix. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first && isLang(first) ? first : defaultLang;
}

/** Path for `lang`. The default locale lives at the root; others under /<lang>/. */
export function localizedPath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** Every locale's URL for the same page, for hreflang and the switcher. */
export function alternates(path = '/'): Array<{ lang: Lang; href: string }> {
  return locales.map((lang) => ({ lang, href: localizedPath(lang, path) }));
}
