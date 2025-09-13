import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.edgeviewfinance.com.au',
  output: 'server', // Server mode - required for Vercel with API routes
  adapter: vercel({
    analytics: true,
    speedInsights: {
      enabled: true
    },
    runtime: 'nodejs20.x'
  }),
  integrations: [tailwind(), mdx(), react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});