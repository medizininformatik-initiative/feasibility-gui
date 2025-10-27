import { defineStep } from '@badeball/cypress-cucumber-preprocessor';

export class ActionBar {
private getButtonByName(buttonName: string) {
  return buttonName.trim().toLowerCase();
}

  public clickButtonByName(buttonName: string) {
    const normalizedButtonName = this.getButtonByName(buttonName);
    cy.get('num-action-bar button').contains(normalizedButtonName, { matchCase: false }).click();
  }

  public shouldButtonBeDisabled(buttonName: string) {
    const normalizedButtonName = this.getButtonByName(buttonName);

    cy.get('num-action-bar button')
      .contains(normalizedButtonName, { matchCase: false })
      .should('be.disabled');
  }

  public shouldButtonBeEnabled(buttonName: string) {
    const normalizedButtonName = this.getButtonByName(buttonName);

    cy.get('num-action-bar button')
      .contains(normalizedButtonName, { matchCase: false })
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
