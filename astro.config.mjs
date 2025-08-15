// @ts-check
import { defineConfig } from 'astro/config';
import vercelAnalytics from '@vercel/analytics/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [vercelAnalytics()],
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
