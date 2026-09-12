import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { defaultLang, langTags, locales } from './src/i18n/config';

// Locales, default and BCP-47 tags live in src/i18n/config.ts; this file only wires them into Astro.
export default defineConfig({
  site: 'https://usagiteks.com',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: [...locales],
    defaultLocale: defaultLang,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: defaultLang,
        locales: { ...langTags },
      },
    }),
  ],
});
