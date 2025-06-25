import { defineStep } from "@badeball/cypress-cucumber-preprocessor"
import { ActionBar } from "./action-bar.cy"

export class UploadFile {
  uploadFile(fileName: string): void {
    const actionBar = new ActionBar()
    actionBar.clickButtonByName('Upload Data Request')
    cy.wait(1000) // Wait for the modal to open
    cy.fixture(fileName, 'utf8').then((fileContent) => {
      const blob = new Blob([fileContent], { type: 'application/json' })
      const file = new File([blob], fileName, { type: 'application/json' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

          cy.get('num-action-bar button').contains('Upload Data Request', { matchCase: false }).click().then(($input) => {
        const el = $input[0] as HTMLInputElement // 👈 Cast to HTMLInputElement

        el.files = dataTransfer.files
        el.dispatchEvent(new Event('change', { bubbles: true }))
      })
    })
  }
}

export const uploadFile = new UploadFile()
defineStep('I upload the file {string}', (fileName: string) => {
  uploadFile.uploadFile(fileName)
})