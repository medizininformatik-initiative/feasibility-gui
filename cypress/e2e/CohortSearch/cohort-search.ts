import { defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { sideNavTests } from '../Tests/sideNav.cy'
import { NavItem } from '../Utilities/NavItems'

export class CriterionSearch {
  private selectedCriteria: number = 0
  private addedCriteria: number = 0
  public gotoAndCheckCohortSelectionSearch(resultSize: number) {
    cy.get('num-table tbody > tr').should('have.length', resultSize)
    this.checkButtons()
  }

  public gotoAndCheckCohortSelectionEdit() {
    cy.get('num-search-action-bar button').eq(1).click()
  }

  public searchInput(text: string) {
    cy.get('num-searchbar input').clear().type(text)
    cy.wait(1000)
  }

  public opendSidePanel() {
    cy.get('mat-drawer').should('be.visible')
  }

  public findCriterion(text: string) {
    cy.get('num-table tbody > tr').contains('Aktuelles chronologisches Alter').should('exist')
    cy.wait(1000)
  }

    public selectCriterion(text: string) {
    cy.get('num-table tbody > tr').then(() => {
      cy.get('name-column highlight')
        .contains(text)
        .within(() => {
          cy.get('mat-checkbox').click()
        })
    })
  }
  
  public checkButtons() {
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

  public visitCohortSearchPage() {
    sideNavTests(NavItem.cohort)
    cy.wait(1000)
  }
}
let criterionSearch = new CriterionSearch()

defineStep('I am on the Cohort Search page', () => criterionSearch.visitCohortSearchPage())
defineStep('I see {int} criteria results', (resultSize: number) => {
  criterionSearch.gotoAndCheckCohortSelectionSearch(resultSize)
})
defineStep('I search for {string}', (text: string) => {
  criterionSearch.searchInput(text)
})
defineStep('I should see {string} in the search results', (text: string) => {
  criterionSearch.findCriterion(text)
})

defineStep('I select {string} from the search results', (text: string) => {
  criterionSearch.selectCriterion(text)
})

defineStep('I should see Parents and Children of in the right side panel', (text) => {
  criterionSearch.opendSidePanel()
})
