/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{blade.php,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
}
