import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// Try to import Sentry, but handle gracefully if it fails
let sentry = null;
try {
  const sentryModule = await import("@sentry/astro");
  sentry = sentryModule.default;
  console.log('✅ Sentry module loaded successfully');
} catch (error) {
  console.warn('⚠️ Sentry module failed to load:', error.message);
  console.warn('⚠️ Continuing without Sentry - application will work normally');
}

// Check if Sentry should be enabled
const shouldEnableSentry = process.env.NODE_ENV === 'production' || process.env.ENABLE_SENTRY === 'true';

// Create integrations array
const integrations = [
  tailwind(),
  mdx(),
  react(),
  sitemap()
];

// Add Sentry integration if available and should be enabled
if (sentry && shouldEnableSentry) {
  try {
    integrations.unshift(sentry());
    console.log('✅ Sentry integration enabled successfully');
  } catch (error) {
    console.warn('⚠️ Failed to configure Sentry integration:', error.message);
    console.warn('⚠️ Continuing without Sentry');
  }
} else if (!shouldEnableSentry) {
  console.log('ℹ️ Sentry integration disabled in development mode');
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.edgeviewfinance.com.au',
  output: 'server', // Server mode - required for Vercel with API routes
  adapter: vercel({
    analytics: true,
    speedInsights: { enabled: true },
    runtime: 'nodejs20.x'
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