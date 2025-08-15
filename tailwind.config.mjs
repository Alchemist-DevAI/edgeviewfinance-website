/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // EVFBS Brand Colors
        'brand-primary': '#003366',
        'brand-primary-light': '#004080',
        'brand-primary-dark': '#002244',
        'brand-accent': '#0066CC',
        'brand-accent-light': '#3399FF',
        'brand-accent-dark': '#004499',
        
        // Supporting Greys
        'brand-grey-50': '#F8F9FA',
        'brand-grey-100': '#E9ECEF',
        'brand-grey-300': '#DEE2E6',
        'brand-grey-500': '#6C757D',
        'brand-grey-700': '#495057',
        'brand-grey-900': '#212529',
      },
      fontFamily: {
        // Clean, professional fonts for business
        'heading': ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom text sizes for EVFBS
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        // 8px base spacing scale
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        // Professional shadow styles
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'accent': '0 10px 25px -3px rgba(0, 102, 204, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        // Minimal animations only
        'fade-in': 'fadeIn 0.2s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}