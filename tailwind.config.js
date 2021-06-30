const colors = {
  primary: '#FF6464',
  secondary: '#00A8CC',
  dark: '#21243D',
  light: '#E0E0E0',
}

module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors
    },
    textColor: {
      ...colors
    },
    borderColor: {
      ...colors
    },
    extend: {},
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
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
