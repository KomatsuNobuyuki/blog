const colors = {
  primary: '#FF6464',
  secondary: '#00A8CC',
  dark: '#21243D',
  light: '#8695A4',
}

module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      dark: colors.dark,
      light: colors.light,
    },
    textColor: {
      primary: colors.primary,
      secondary: colors.secondary,
      dark: colors.dark,
      light: colors.light,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
