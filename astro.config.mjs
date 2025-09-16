import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    analytics: true,
    speedInsights: { enabled: true }
  }),
  integrations: [
    react(),
    tailwind(),
    mdx()
  ],
  site: 'https://www.edgeviewfinance.com.au',
  vite: {
    ssr: {
      noExternal: ['@astrojs/mdx']
    }
  }
});