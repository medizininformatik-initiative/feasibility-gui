import { defineStep } from '@badeball/cypress-cucumber-preprocessor';

export class ActionBar {
  public clickButtonByName(buttonName: string) {
    cy.get('num-search-action-bar button').contains(buttonName).click();
  }

  public shouldButtonBeDisabled(buttonName: string) {
    cy.get('num-search-action-bar button')
      .contains(buttonName)
      .should('be.disabled');
  }

  public shouldButtonBeEnabled(buttonName: string) {
    cy.get('num-search-action-bar button')
      .contains(buttonName)
      .should('not.be.disabled');
  }
}

const actionBar = new ActionBar();

defineStep('the button {string} should be disabled', (buttonName: string) => {
  actionBar.shouldButtonBeDisabled(buttonName);
});

defineStep('the button {string} should be enabled', (buttonName: string) => {
  actionBar.shouldButtonBeEnabled(buttonName);
});

defineStep('I click on the button {string}', (buttonName: string) => {
  actionBar.clickButtonByName(buttonName);
});
