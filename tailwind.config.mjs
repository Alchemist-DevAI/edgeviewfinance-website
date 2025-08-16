/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      md1: "885px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      fontFamily: {
        // Agency11 fonts with EVFBS defaults
        PlusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
        PublicSans: ["Public Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        heading: ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        FontAwesome: ["Font Awesome 6 Pro"],
      },
      colors: {
        // Agency11 colors with EVFBS brand integration
        ColorDark: "#191919",
        ColorBlack: "#0A102F",
        ColorBlue: "#3147FF", // Keep Agency11 vibrant blue for accent elements
        ColorOffWhite: "#FAF9F5",
        ColorPurple: "#A259FF", // Keep Agency11 purple for creative elements
        ColorBluePurple: "#004499",
        ColorYellow: "#FFC900",
        ColorViolet: "#A259FF",
        ColorAtomicTangerine: "#FF9966",
        ColorLime: "#C1FF00", // Keep Agency11 lime for CTAs
        ColorLunarGreen: "#324438",
        ColorAlmond: "#EBDECE",
        ColorCorn: "#F4B905",
        ColorOil: "#221F1A",
        ColorPaleGold: "#FFD874",
        ColorEggSour: "#FFF4D9",
        ColorDenimDarkBlue: "#003366",
        ColorCaribbeanGreen: "#15CF92",
        ColorMidnightMoss: "#010D09",
        ColorHoneySuckle: "#E9FF97",
        
        // EVFBS specific colors
        'brand-primary': '#003366',
        'brand-primary-light': '#004080',
        'brand-primary-dark': '#002244',
        'brand-accent': '#0066CC',
        'brand-accent-light': '#3399FF',
        'brand-accent-dark': '#004499',
        
        // Supporting Greys
        'brand-grey-50': '#F8F9FA',
        'brand-grey-100': '#E9ECEF',
        'brand-grey-200': '#DEE2E6',
        'brand-grey-300': '#CED4DA',
        'brand-grey-400': '#ADB5BD',
        'brand-grey-500': '#6C757D',
        'brand-grey-600': '#495057',
        'brand-grey-700': '#343A40',
        'brand-grey-800': '#212529',
        'brand-grey-900': '#1A1A1A',
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
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
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
        'fade-in': 'fadeIn 0.2s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'fill-up-initial': 'fill-up-initial 0.3s forwards',
        'fill-up-end': 'fill-up-end 0.3s forwards 0.3s',
        'horizontal-slide-from-right-to-left': 'horizontal-slide-from-right-to-left linear 10s infinite',
        'horizontal-slide-from-left-to-right': 'horizontal-slide-from-left-to-right linear 10s infinite',
        'rotate-360': 'rotate-360 20s linear infinite',
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
        'fill-up-initial': {
          '100%': {
            opacity: '0',
            transform: 'translate3d(0, -105%, 0) scale3d(1, 2, 1)',
          },
        },
        'fill-up-end': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0) scale3d(1, 2, 1)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'horizontal-slide-from-right-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'horizontal-slide-from-left-to-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'rotate-360': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}