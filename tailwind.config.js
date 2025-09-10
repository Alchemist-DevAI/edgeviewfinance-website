/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      md1: "885px",

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      xxl: "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      fontFamily: {
        // EVFBS Brand Font - Instrument Sans for all typography
        InstrumentSans: ["Instrument Sans", "sans-serif"],
        PlusJakartaSans: ["Instrument Sans", "sans-serif"], // Map existing to Instrument Sans
        DmSans: ["Instrument Sans", "sans-serif"],
        GeneralSans: ["Instrument Sans", "sans-serif"],
        Cabin: ["Instrument Sans", "sans-serif"],
        PublicSans: ["Instrument Sans", "sans-serif"],
        Syne: ["Instrument Sans", "sans-serif"],
        ClashDisplay: ["Instrument Sans", "sans-serif"],
        Kanit: ["Instrument Sans", "sans-serif"],
        Sora: ["Instrument Sans", "sans-serif"],
        Outfit: ["Instrument Sans", "sans-serif"],
        body: ["Instrument Sans", "sans-serif"], // Main body font
        FontAwesome: ["Font Awesome 6 Pro"],
      },

      colors: {
        // EVFBS Brand Colors mapped to Agency11 color names
        ColorDark: "#141F2B", // Darker version of secondary
        ColorBlack: "#1C2C3B", // EVFBS Secondary Dark
        ColorBlue: "#FF9E10", // EVFBS Primary Orange (replacing blue as primary accent)
        ColorOffWhite: "#F7F7F7", // EVFBS Neutral Light
        ColorPurple: "#FF9E10", // Map purple to orange for consistency
        ColorBluePurple: "#E68900", // Darker orange
        ColorYellow: "#FFB541", // Lighter orange
        ColorViolet: "#E68900", // Darker orange variant
        ColorAtomicTangerine: "#FF9E10", // Primary orange
        ColorLime: "#FF9E10", // Map lime to orange (key accent color)
        ColorLunarGreen: "#2A3D4F", // Lighter version of secondary
        ColorAlmond: "#F7F7F7", // Neutral light
        ColorCorn: "#FFB541", // Light orange
        ColorOil: "#141F2B", // Darkest secondary
        ColorPaleGold: "#FFB541", // Light orange
        ColorEggSour: "#FFF4E8", // Very light orange tint
        ColorDenimDarkBlue: "#1C2C3B", // Secondary dark
        ColorCaribbeanGreen: "#FF9E10", // Map green to orange
        ColorMidnightMoss: "#0A1118", // Almost black
        ColorHoneySuckle: "#FFE4C1", // Light orange tint
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
