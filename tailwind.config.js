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
  corePlugins: {
    container: false
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '640px',
          padding: '0 2rem',
          '@screen sm': {
          },
          '@screen md': {
            maxWidth: '682px',
            padding: '0',
          },
          '@screen lg': {
            maxWidth: '682px',
            padding: '0',
          },
          '@screen xl': {
            maxWidth: '682px',
            padding: '0',
          },
          '@screen 2xl': {
            maxWidth: '682px',
            padding: '0',
          },
        }
      })
    }
  ],
}
