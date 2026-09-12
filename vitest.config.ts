import { defineConfig } from 'vitest/config';

// The unit tests import plain TypeScript modules, so Vitest's own Vite config is enough;
// going through Astro's getViteConfig would pull in a second Vite major and clash on types.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/__tests__/**/*.test.{js,ts}'],
  },
});
