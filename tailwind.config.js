/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{html,ts}",
//   ],
//   theme: {
//     listStyleType: {
//       none: 'none',
//       disc: 'disc',
//       decimal: 'decimal',
//       square: 'square',
//       roman: 'upper-roman',
//     },
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}", // Wichtig: SCSS hier hinzufügen
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}