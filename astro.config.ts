import { defineConfig, envField } from 'astro/config';
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
  env: {
    // Public, client-side, optional: the contact form picks EmailJS when the three EMAILJS_* values are set.
    schema: {
      PUBLIC_EMAILJS_PUBLIC_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_EMAILJS_SERVICE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_EMAILJS_TEMPLATE_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_CONTACT_API: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  vite: {
    // Never inline assets as data: URIs: the CSP's font-src is 'self' only, and separate files cache better.
    build: { assetsInlineLimit: 0 },
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
