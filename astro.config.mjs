import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static generation to avoid runtime issues
  adapter: vercel({
    analytics: true,
    speedInsights: {
      enabled: true
    }
  }),
  integrations: [tailwind(), mdx(), react()],
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});