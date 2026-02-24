/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spiritual: {
          orange: '#FF6B35',
          gold: '#F7B801',
          purple: '#6A4C93',
          blue: '#1982C4',
        },
      },
      fontFamily: {
        sanskrit: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
