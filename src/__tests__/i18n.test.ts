import { describe, it, expect } from 'vitest';
import { locales } from '../i18n/config';
import { getLangFromUrl, localizedPath, alternates } from '../i18n/utils';

// Every section dictionary must expose the same keys in every locale.
const sections = import.meta.glob('../i18n/sections/*.ts', { eager: true, import: 'default' }) as Record<
  string,
  Record<string, Record<string, string>>
>;

describe('i18n dictionaries', () => {
  it('there is at least one section dictionary', () => {
    expect(Object.keys(sections).length).toBeGreaterThan(0);
  });

  for (const [file, dict] of Object.entries(sections)) {
    it(`${file.split('/').pop()} has identical keys and no empty strings in es/en/pt`, () => {
      const reference = Object.keys(dict.es).sort();
      for (const lang of locales) {
        expect(dict[lang], `${file}: missing locale ${lang}`).toBeDefined();
        expect(Object.keys(dict[lang]).sort(), `${file}: keys differ in ${lang}`).toEqual(reference);
        for (const [k, v] of Object.entries(dict[lang])) {
          expect(v.trim(), `${file}: empty value for ${lang}.${k}`).not.toBe('');
        }
      }
    });
  }
});

describe('i18n routing helpers', () => {
  it('detects the language from the first path segment', () => {
    expect(getLangFromUrl(new URL('https://usagiteks.com/'))).toBe('es');
    expect(getLangFromUrl(new URL('https://usagiteks.com/en/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://usagiteks.com/pt'))).toBe('pt');
    expect(getLangFromUrl(new URL('https://usagiteks.com/xx/'))).toBe('es');
  });

  it('builds localized paths with the default locale at the root', () => {
    expect(localizedPath('es')).toBe('/');
    expect(localizedPath('en')).toBe('/en/');
    expect(localizedPath('pt')).toBe('/pt/');
  });

  it('lists an alternate for every locale', () => {
    expect(alternates().map((a) => a.lang)).toEqual([...locales]);
  });
});
