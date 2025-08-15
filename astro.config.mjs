// @ts-check
import { defineConfig } from 'astro/config';
import vercelAnalytics from '@vercel/analytics/astro';
import vercelSpeedInsights from '@vercel/speed-insights/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [vercelAnalytics(), vercelSpeedInsights()],
  site: 'https://edgeviewfinance-website.vercel.app',
  base: '/',
  output: 'static',
  build: {
    format: 'directory'
  },
  compressHTML: true,
  trailingSlash: 'never',
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      }
    }
  }
});
