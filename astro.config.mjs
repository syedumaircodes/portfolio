// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Keep in sync with `seo.url` in src/data/site.ts — used for canonical URLs
  // and Astro.url so absolute links resolve correctly.
  site: "https://syedumaircodes.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
})
