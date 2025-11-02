import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// Create integrations array - Sentry disabled for development
const integrations = [
  tailwind(),
  mdx(),
  react(),
  sitemap()
];

console.log('ℹ️ Development mode - Sentry disabled for faster startup');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.edgeviewfinance.com.au',
  // Vercel deployment configuration
  output: 'server',
  adapter: vercel({
    analytics: true,
    speedInsights: { enabled: true }
  }),
  integrations,
  server: {
    port: 4002,
    host: '0.0.0.0'  // Changed from 127.0.0.1 to allow access from Windows host
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});