module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start'
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: "lighthouse:no-pwa",
    }
  }
};