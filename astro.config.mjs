import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import sentry from "@sentry/astro";

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
    sentry({
      sourceMapsUploadOptions: {
        project: "javascript",
        org: "edgeview-finance",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      dsn: "https://3002f70b9e6ddd7e45b0638c0ae5c7a6@o4510027874172928.ingest.us.sentry.io/4510027902287872",
      environment: process.env.NODE_ENV || 'production',
      tracesSampleRate: 1.0,
    }),
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