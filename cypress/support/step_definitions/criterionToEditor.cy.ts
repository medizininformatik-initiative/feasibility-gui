import { defineStep } from "@badeball/cypress-cucumber-preprocessor"
import { CriterionSearch } from "../../e2e/CohortSearch/cohort-search"
import { getUrlPathByPage } from "../../e2e/Utilities/pathResolver"
import { Page } from "../../e2e/Utilities/pages"

export class CriterionToEditor {
  public addCriteriumToEditor(criterium: string) {
    const criterionSearchInstance = new CriterionSearch()
    cy.visit(getUrlPathByPage(Page.FeasibilitySearch))
    criterionSearchInstance.searchInput(criterium)
    criterionSearchInstance.selectCriterion(criterium)
    criterionSearchInstance.selectActioBarButton('hinzufügen')
    criterionSearchInstance.selectActioBarButton('anzeigen')
  }

  public shouldSeeCriteriumInEditor(criterium: string) {
    cy.get('.criteria-box').within(() => {
      cy.get('.content').should('contain', criterium).should('contain', criterium)
    })
  }
}

export const criterionToEditor = new CriterionToEditor()
defineStep('I add the criterium {string} to the editor', (criterium: string) => {criterionToEditor.addCriteriumToEditor(criterium)})
defineStep('I should see the criterium {string} in the editor', (criterium: string) => {criterionToEditor.shouldSeeCriteriumInEditor(criterium)})