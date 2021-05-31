module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        maxWidth: '1200px',
      },
      minHeight: {
        'full-min-nav': 'calc(100vh - 80px)',
      },
      height: {
        'full-min-nav': 'calc(100vh - 80px)',
        '9/10': '90%',
        88: '22rem',
        '1/10': '10%',
        125: '31.25rem',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      skew: {
        5: '-5deg',
      },
      colors: {
        rouge: '#e53845',
      },
      lineHeight: {
        12: '3.5rem',
        5.5: '1.3',
      },
      inset: {
        '4/10': '40%',
        '7/10': '35%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
