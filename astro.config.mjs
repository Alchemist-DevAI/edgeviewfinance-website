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
        project: "edgeview-finance-website",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
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