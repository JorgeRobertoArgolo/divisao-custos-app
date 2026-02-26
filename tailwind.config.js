const { colors } = require('./src/shared/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            sora: ['Sora', 'sans-serif'],
        },
        fontSize: {
            xs: '12px',      
            sm: '14px',      
            md: '16px',      
            'lg-label': '20px',
            'lg-heading': '20px',
            'sm-heading': '14px',
        },
        height: {
            button: 50,
        },
        colors,
    },
  },
  plugins: [],
}