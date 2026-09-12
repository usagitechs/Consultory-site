import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://usagiteks.com',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-AR', en: 'en', pt: 'pt-BR' },
      },
    }),
  ],
});
