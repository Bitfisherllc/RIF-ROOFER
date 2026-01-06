/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rif-blue': {
          50: '#e6eff8',
          100: '#cce0f1',
          200: '#99c1e3',
          300: '#66a2d5',
          400: '#4a7bc0',
          500: '#255eab',
          600: '#1e4a87',
          700: '#173764',
          800: '#0f2542',
          900: '#081221',
        },
        'rif-black': '#231f20',
        'rif-white': '#ffffff',
      },
    },
  },
  plugins: [],
}
