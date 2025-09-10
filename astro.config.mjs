import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // Hybrid mode to support API endpoints
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