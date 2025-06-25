# Testing Documentation (Cypress BDD)

This documentation provides an overview of the step definitions implemented for Behavior-Driven Development (BDD) testing with Cypress using Cucumber/Gherkin syntax. Step definitions link human-readable steps in `.feature` files to executable Cypress commands and custom helper functions in the codebase.

## Table of Contents

- [Important Notes](#important-notes)
- [Feature Files & Gherkin](#feature-files--gherkin)
- [Implemented Step Definitions](#implemented-step-definitions)
- [Running test](#test-runs)
  - [Authentication & Navigation Steps](#authentication--navigation-steps)
  - [Menu Interaction](#menu-interaction)
  - [Navigation Steps](#navigation-steps)
  - [Table / Row Assertions & Interaction](#table--row-assertions--interaction)
  - [Time Restriction Filter Steps](#time-restriction-filter-steps)
  - [Action Bar Button Steps](#action-bar-button-steps)
  - [Search Input Field](#search-input-field)
  - [Upload File](#upload-files) 
  - [Download file](#download-files)
  - [Utilities](#utilities)
  - [Language Steps](#language-steps)
- [Navigation Label to URL Mapping](#navigation-label-to-url-mapping)
- [Examples](#example)
- [Helpful Links](#helpful-links)
- [Utilities](#utilities)

---

## Important Notes

All step strings (e.g., button names or labels) are case-sensitive and must match exactly.  
This includes whitespace and special characters (e.g., `"Zur Kohortenselektion hinzufügen"` must be written precisely).

---

## Feature Files & Gherkin

All BDD scenarios are written in **feature files** using the [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/).

- Feature files have the `.feature` extension and contain scenarios written in plain English (or other supported languages).
- Each scenario describes user behavior using steps like `Given`, `When`, `Then`, `And`, and `But`.
- The file name and location must match the patterns defined in your Cypress or Cucumber configuration (see `package-lock.json` or `cypress.config.js` for the relevant glob patterns).

## Running test

When you run Cypress using the command:
```console
npx cypress run
```
it starts executing defined test cases. During this process, Cypress automatically performs several tasks:

Screenshots: If a test fails or if you've enabled screenshot capture, Cypress will generate and save screenshots in the cypress/screenshots/ directory.

File Downloads: If the application triggers any downloads during testing (e.g., JSON), those files will be saved to the cypress/downloads/ folder.

To ensure a clean test environment, the following folders are automatically cleared before each test run:

* cypress/downloads/

* cypress/screenshots/

This behavior is implemented in the [Cypress configuration](../cypress.config.ts) using the `before:run` hook. It guarantees that test artifacts from previous runs don’t interfere with current results.

## Implemented Step Definitions

These step definitions cover common user actions and assertions implemented in the Cypress step definition files. You can use them directly in the `.feature` files without needing to write additional code for these actions. This documentation will be updated as new steps are implemented.

In the following sections, you will find a list of already implemented step definitions that can be used directly in your feature files to write end-to-end tests. Use these steps as building blocks for your test scenarios.

### Authentication & Navigation Steps

- `I go to the login page`
- `I fill in the login form with valid credentials`
- `I am logged in as a user`

### Menu Interaction

- `I open the menu`
- `I click on the menu item {string}` – e.g., `"Bearbeiten"`

### Navigation Steps

- `I navigate to the {string} page`
- `I am on the {string} page` — for supported pages, see [Navigation Label to URL Mapping](#navigation-label-to-url-mapping)

### Table / Row Assertions & Interaction

- `I should see a row containing {string}` – checks for a table row with matching text
- `I select the checkbox in the row containing {string}` – selects a checkbox in the same row
- `I select the checkbox of item {string} from the search results`
- `the table should have {int} rows`

### Time Restriction Filter Steps

The following steps are available for setting time restriction filters in your scenarios:

- `I set the time restriction filter to before with date {string}`
- `I set the time restriction filter to on with date {string}`
- `I set the time restriction filter to after with date {string}`
- `I set the time restriction filter to equal with date {string}`
- `I set the time restriction filter to between {string} and {string}`

### Action Bar Button Steps

- `the button {string} should be disabled`
- `the button {string} should be enabled`
- `I click on the button {string}`

### Search Input Field

- `I type {string} in the search input field`
- `I clear the search input field`

### Upload files

- `I upload the file {string}`

### Download files

- `I download the file {string}`

### Utilities

#### Feasibility

##### Editor

- `I add the criterium {string} to the editor`
- `I should see the criterium {string} in the editor`
- `I see the criterium {string} with filter chip {string} in the block {string}`
- `I see the criterium {string} with filter chip block {string}`
- `I drag "{string}" criterium to the {string} list` - (Inclusion | Exlusion)

### Language Steps

The following steps are available for setting the application language in your scenarios:

- `I set the language to English`
- `I set the language to German`

## 🔗 Navigation Label to URL Mapping

This table shows the mapping between user-facing labels and the internal route URLs used in the application.

| Label                          | URL                           |
| ------------------------------ | ----------------------------- |
| Feasibility Editor             | /feasibility/editor           |
| Feasibility Search             | /feasibility/search           |
| Feasibility Result             | /feasibility/result           |
| Data Selection Editor          | /data-selection/editor        |
| Data Selection Search          | /data-selection/search        |
| Data Query - Cohort Definition | /data-query/cohort-definition |
| Data Query - Data Selection    | /data-query/data-selection    |
| Query Editor - Criteria        | /query-editor/criterion       |
| Query Editor - Profile         | /query-editor/profile         |

---

## Example

```gherkin
  Feature: Cohort Search

    Background:
      Given I am logged in as a user
      And I am on the Feasibility Editor page

    Scenario: Button test
      When I click on the button "Zur Kohortenselektion hinzufügen"
      Then the button "Kohortenselektion anzeigen" should be enabled
      And the button "Zur Kohortenselektion hinzufügen" is disabled
```

```gherkin
  Feature: Cohort Search

    Background:
      Given I am logged in as a user
      And I am on the Cohort Editor page

    Scenario: Search for Cohort elements
      Then I see 50 criteria results
      And the button "Zur Kohortenselektion hinzufügen" is disabled
```

---

## Helpful Links

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [Gherkin Language Reference](https://cucumber.io/docs/gherkin/reference/)
