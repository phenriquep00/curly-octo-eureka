/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 45px 70px -2px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [
    require('@catppuccin/tailwindcss')({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: 'ctp',
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: 'frappe'
    }),
  ],
}
