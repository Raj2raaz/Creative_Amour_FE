/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffbe98',
        secondary: '#c95741',
        accent: '#7a301b',
        'bg-white': '#ffffff',
        'bg-light': '#f5f5f5',
      },
      boxShadow: {
        'custom': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      borderColor: {
        'custom': '#e0e0e0',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        twinkleMove: {
          '0%, 100%': { 
            opacity: '0.3', 
            transform: 'scale(1) translate(0, 0)',
            filter: 'blur(2px)'
          },
          '25%': { 
            opacity: '0.8', 
            transform: 'scale(1.5) translate(3px, -3px)',
            filter: 'blur(4px)'
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(2.2) translate(0, 0)',
            filter: 'blur(5px)'
          },
          '75%': { 
            opacity: '0.7', 
            transform: 'scale(1.4) translate(-3px, 3px)',
            filter: 'blur(4px)'
          },
        },
        flash: {
          '0%, 100%': { 
            opacity: '0.2',
            transform: 'scale(1)',
            filter: 'blur(2px) brightness(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(2.5)',
            filter: 'blur(6px) brightness(2)'
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out',
        twinkle: 'twinkle 2s ease-in-out infinite',
        twinkleMove: 'twinkleMove 1.5s ease-in-out infinite',
        flash: 'flash 1.2s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        engagement: ['Engagement', 'cursive'],
      },
    },
  },
  plugins: [],
}
