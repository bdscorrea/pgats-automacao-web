const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retrise: {
    openMode: 0,
    runMode: 2,
  },
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
