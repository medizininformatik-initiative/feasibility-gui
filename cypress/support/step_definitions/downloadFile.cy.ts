import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

export class DownloadFile {

    public downloadFile(fileName: string): void {
        cy.get('[data-cy="download-ccdl"]').click().then(() => {
            cy.get('num-save-file-modal').should('be.visible');
            cy.get('num-save-file-modal').find('input[type="text"]').type(fileName).should('have.value', fileName);
            cy.get('[data-cy="save-file-button"]').click();
            cy.wait(1000);
            cy.readFile(`cypress/downloads/${fileName}.json`)
        });
    }
}
export const downloadFile = new DownloadFile();
defineStep('I download the file {string}', 
    (fileName: string) => {
        downloadFile.downloadFile(fileName);
    })