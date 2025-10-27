import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

export class Table {
  /**
   * This method asserts that a row containing the specified text exists in the table.
   * @param text 
   */

  public assertRowItemExits(text: string) {
    cy.contains('td', new RegExp(text, 'i')).should('exist');
  }

  /**
   * This method selects the checkbox in a row that contains the specified text.
   * @param text The text to search for in the table row.
   */
  public selectCheckboxInRow(text: string): void {
    cy.get('num-table tbody > tr').contains('td', new RegExp(text, 'i')).should('exist').within(() => {
      cy.get('input[type="checkbox"]').check();
    })
  }
  
  /**
   * This method asserts that the table has the specified number of rows.
   * @param rowCount 
   */
  public assertTableRowCount(rowCount: number): void {
    cy.get('num-table tbody > tr').should('have.length', rowCount)
  } 
}


export const tableInstance = new Table();

/**
 * Step definitions for interacting with the table in the Cohort Search page.
 */
defineStep('I should see a row containing {string}', (text: string) => {
  tableInstance.assertRowItemExits(text);
});
defineStep('I select the checkbox in the row containing {string}', (text: string) => {
  tableInstance.selectCheckboxInRow(text);
});

defineStep('the table should have {int} rows', (rowCount: number) => {tableInstance.assertTableRowCount(rowCount) })
