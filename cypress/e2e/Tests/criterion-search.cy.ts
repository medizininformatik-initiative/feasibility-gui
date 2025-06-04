import { defineStep } from "@badeball/cypress-cucumber-preprocessor"

export class CriterionSearchPage {
  private static selectedCriteria: number = 0
  private static addedCriteria: number = 0
  static gotoAndCheckCohortSelectionSearch() {
    cy.get('num-table tbody > tr').should('have.length', 50)
    this.checkButtons()
  }

  static gotoAndCheckCohortSelectionEdit() {
    cy.get('num-search-action-bar button').eq(1).click()
  }

  public static searchInput(text: string) {
    cy.get('num-searchbar input').clear().type(text)
    cy.wait(1000)
  }

  public static selectCriterion(indices: number[]) {
    indices.forEach((index) => {
      cy.get('num-table tbody > tr')
        .eq(index)
        .within(() => {
          cy.get('mat-checkbox').click()
        })
    })
    this.selectedCriteria += indices.length
    cy.wait(1000)
    /*cy.get('num-search-action-bar button').eq(0).should('not.have.class', 'disabled')
      cy.get('num-search-action-bar button').eq(1).should('have.class', 'disabled')
      cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(0).should('have.text', indices.length)
      cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(1).should('have.text', 0)*/
    CriterionSearchPage.checkButtons()
  }

  public static checkButtons() {
    ;[this.selectedCriteria, this.addedCriteria].forEach((value, index) => {
      cy.get('num-search-action-bar button')
        .eq(index)
        .then((button) => {
          if (value > 0) {
            cy.wrap(button).should('not.have.class', 'disabled')
          } else {
            cy.wrap(button).should('have.class', 'disabled')
          }
        })
      cy.get('num-search-action-bar num-button > span.mat-badge-content')
        .eq(index)
        .should('have.text', value)
    })
  }
}
let CriteriaSearchPage = new CriterionSearchPage()
module.exports = CriteriaSearchPage

defineStep('I go to the cohort selection search page', () => {
  CriterionSearchPage.gotoAndCheckCohortSelectionSearch()
})
defineStep('I search for criteria {string}', (text: string) => {
  CriterionSearchPage.searchInput(text)
})
defineStep('I select criteria {string}', (indices: string) => {
  const indicesArray = indices.split(',').map(Number)
  CriterionSearchPage.selectCriterion(indicesArray)
})