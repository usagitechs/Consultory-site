import { defineConfig } from 'vite'

// Served from the custom domain https://usagiteks.com, so assets resolve from the root.
// If the site ever moves back to usagitechs.github.io/Consultory-site/, set base: '/Consultory-site/'.
export default defineConfig({
  base: '/',
})
