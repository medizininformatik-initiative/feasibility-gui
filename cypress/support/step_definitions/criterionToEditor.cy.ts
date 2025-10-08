import { defineStep } from "@badeball/cypress-cucumber-preprocessor"
import { CriterionSearch } from "../../e2e/CohortSearch/cohort-search"

export class CriterionToEditor {
  public addCriteriumToEditor(criterium: string) {
    const criterionSearchInstance = new CriterionSearch()
    criterionSearchInstance.searchInput(criterium)
    criterionSearchInstance.selectCriterion(criterium)
    criterionSearchInstance.selectActioBarButton('Add')
    criterionSearchInstance.selectActioBarButton('Show')
    cy.wait(1000) // wait for the editor to load
  }

  public shouldSeeCriteriumInEditor(criterium: string) {
    cy.get(`[data-cy="${criterium}"]`).within(() => {
      cy.get('.content').should('contain', criterium).should('contain', criterium)
    })
  }

  public dragCriteriumRightBy200px(type = "Inclusion") {
    const draggableSelector = '.cdk-drag'
    cy.wait(1000) // ensure UI is ready
    cy.get(draggableSelector).trigger('mousedown', {
      button: 0,
      timeout: 10000,
    })
    cy.get(`#${type}`)
      .trigger('mousemove', {
        timeout: 10000,
        waitForAnimations: true,
      })
      .click()
      cy.wait(1000)
  }
}

export const criterionToEditor = new CriterionToEditor()
defineStep('I add the criterium {string} to the editor', (criterium: string) => {criterionToEditor.addCriteriumToEditor(criterium)})
defineStep('I should see the criterium {string} in the editor', (criterium: string) => {criterionToEditor.shouldSeeCriteriumInEditor(criterium)})
defineStep('I drag {string} criterium to the {string} list', (criterium: string, type: string) =>
  criterionToEditor.dragCriteriumRightBy200px(type)
)
