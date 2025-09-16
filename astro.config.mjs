import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
// import sentry from "@sentry/astro"; // Temporarily disabled to fix 500 error

// https://astro.build/config
export default defineConfig({
  site: 'https://www.edgeviewfinance.com.au',
  output: 'server', // Server mode - required for Vercel with API routes
  adapter: vercel({
    analytics: true,
    speedInsights: { enabled: true },
    runtime: 'nodejs20.x'
  }),
  integrations: [
    // Sentry temporarily disabled to fix 500 error
    tailwind(),
    mdx(),
    react(),
    sitemap()
  ],
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