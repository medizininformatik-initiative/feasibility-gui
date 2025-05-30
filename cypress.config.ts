import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    username: 'test',
    password: 'test1',
    homeUrl: 'http://localhost:4200/data-query/cohort-definition',
    redirectUrl: 'http://localhost:8080',
  },
  e2e: {
    baseUrl: "http://localhost:4200",
    port: 4300,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
