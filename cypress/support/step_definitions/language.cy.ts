import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

export class Language {
    public setLanguage(language: string = 'en') {
        cy.get('[data-cy="language-select"]').first().click().then(() => {
            cy.get(`[data-cy="language-option-${language}"]`).click();
        });
        cy.wait(1000);
    }
}

export const languageInstance = new Language();

defineStep('I set the language to English', () => {
    languageInstance.setLanguage('en');
});
defineStep('I set the language to German', () => {
    languageInstance.setLanguage('de');
});