import { defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { ActionBar } from './action-bar.cy'

export class UploadFile {
  uploadFile(fileName: string): void {
    cy.get('[data-cy="upload-ccdl"]').selectFile(`cypress/fixtures/${fileName}.json`, { force: true });
    cy.wait(1000);
  }
}

export const uploadFile = new UploadFile()
defineStep('I upload the file {string}', (fileName: string) => {
  uploadFile.uploadFile(fileName)
})
