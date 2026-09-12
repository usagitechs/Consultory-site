export const locales = ['es', 'en', 'pt'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'es';

/** BCP-47 tags used in <html lang> and hreflang. */
export const langTags: Record<Lang, string> = { es: 'es-AR', en: 'en', pt: 'pt-BR' };
/** Native names for the language switcher. */
export const langNames: Record<Lang, string> = { es: 'Español', en: 'English', pt: 'Português' };

/** A section dictionary: the same flat keys for every locale. */
export type Dict<K extends string = string> = Record<Lang, Record<K, string>>;
