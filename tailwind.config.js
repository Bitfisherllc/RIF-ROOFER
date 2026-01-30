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
        // Roofer card badges: Sponsored (blue) and Certified (green)
        'card-blue': {
          100: '#e0e9f5',
          200: '#c1d3eb',
          500: '#2461a9',
          600: '#1d4e87',
          700: '#163b66',
          800: '#0f2844',
        },
        'card-green': {
          100: '#e2f3ea',
          200: '#c5e7d5',
          500: '#24a961',
          600: '#1d8750',
          700: '#16653e',
          800: '#0f432b',
        },
      },
      animation: {
        'bounce-in': 'bounceIn 0.8s ease-out forwards',
        'location-pulse': 'locationPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3) translateY(-50px)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05) translateY(0)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        locationPulse: {
          '0%, 100%': { color: 'rgb(255 255 255)' },
          '50%': { color: 'rgb(250 204 21)' },
        },
      },
    },
  },
  plugins: [],
}
