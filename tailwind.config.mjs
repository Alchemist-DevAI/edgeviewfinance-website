/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF9E10',
        'brand-dark': '#1C2C3B',
        'orange': {
          500: '#FF9E10',
          600: '#e68a00'
        }
      }
    },
  },
  plugins: [],
}