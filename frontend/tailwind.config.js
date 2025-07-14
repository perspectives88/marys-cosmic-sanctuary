/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-navy': '#0a0b1e',
        'cosmic-deep': '#1a1b3a',
        'cosmic-purple': '#2d1b3d',
        'cosmic-lavender': '#6b5b95',
        'cosmic-rose': '#d4a5a5',
        'cosmic-gold': '#e4d5a8',
        'cosmic-silver': '#c9d6ea',
        'cosmic-white': '#f7f9fc',
      },
    },
  },
  plugins: [],
};
