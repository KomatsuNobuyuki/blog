const colors = {
  primary: '#ffffdf',
  black: '#000',
  alto: '#ddd',
  glay: '#333',
  subglay: '#666',
  violetred: '#ff357f'
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
