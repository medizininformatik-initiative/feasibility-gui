import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

export class CohortResult {

    public spinnerIsVisible() {
        cy.get('num-spinner').should('be.visible');
    }

    public spinnerIsNotVisible() {
        cy.get('num-spinner').should('not.exist');
    }

    public resultIsVisible(seconds: number) {
        cy.wait(seconds * 1000);
        this.spinnerIsNotVisible();
        cy.get('div').contains('Number of patients').should('be.visible');
    }

    public openDetailsDialog() {
        cy.get('.button-dialog-result-details').should('not.be.disabled').click();
    }

    public closeDetailsDialog() {
        cy.get('fa-icon[icon="window-close"]').click();
    }

    public openSaveDialog() {
        cy.get('num-save-dataquery-modal').should('be.visible')
    }

    public addTitle(title: string) {
        cy.contains('label', 'title')
        .invoke('attr', 'for')
        .then((inputId) => {
            cy.get(`#${inputId}`).type(title);
  });
    }

       public addComment(title: string) {
        cy.contains('label', 'comment')
        .invoke('attr', 'for')
        .then((inputId) => {
            cy.get(`#${inputId}`).type(title);
  });
    }

    public saveCohort() {
        cy.get('.button-save > .mat-mdc-tooltip-trigger').contains('Speichern').click();
        cy.get('num-save-dataquery-modal').should('not.exist');
    }
}

export const cohortResult = new CohortResult();
defineStep('I see the spinner is visible', () => {cohortResult.spinnerIsVisible()});
defineStep('I see the spinner is not visible', () => {cohortResult.spinnerIsNotVisible()});
defineStep('I see the result after {int} seconds', (seconds: number) => {
  cohortResult.resultIsVisible(seconds);
})
defineStep('I open the details', () => {cohortResult.openDetailsDialog()});
defineStep('I close the details dialog', () => {cohortResult.closeDetailsDialog()});
defineStep('I see a dialog', () => {cohortResult.openSaveDialog()});
defineStep('I add the title {string}', (title: string) => {
  cohortResult.addTitle(title);
});
defineStep('I add the comment {string}', (comment: string) => {
  cohortResult.addComment(comment);
});
defineStep('I save the cohort', () => {cohortResult.saveCohort()});