import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import fs from "fs-extra";
import path from "path";

export default defineConfig({
  env: {
    username: 'test',
    password: 'test1',
    homeUrl: 'http://localhost:4200/data-query/cohort-definition',
    redirectUrl: 'http://localhost:8080',
  },
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {

      on('before:run', () => {
        const folderToClear = path.join(__dirname, 'cypress', 'downloads');
        if (fs.existsSync(folderToClear)) {
          fs.removeSync(folderToClear);
          console.log(`Cleared folder: ${folderToClear}`);
        } else {
          console.log(`Folder not found: ${folderToClear}`);
        }
      });

      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },

    testIsolation: false,
    baseUrl: "http://localhost:4200",
    port: 4300,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
