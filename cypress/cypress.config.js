const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ar5e18",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
