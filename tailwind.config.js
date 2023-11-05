/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['delay-0', 'delay-8', 'delay-16', 'delay-24', 'delay-32'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': 'url("/images/background.png")'
      },
      keyframes: {
        bubbles: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 0
          },
          '50%': {
            opacity: 1
          },
          '70%': {
            opacity: 0,
            transform: 'translateY(-100vh)'
          }
        }
      },
      animation: {
        bubbles: 'bubbles 10s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
