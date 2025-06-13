import { UrlPaths } from '../../support/e2e'
import { defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { FilterChips } from '../../support/step_definitions/filter-chips.cy'
import { menuItems } from '../Utilities/menuItems'
import { MenuTests } from '../../support/step_definitions/menu.cy'
import { searchInput, selectCriterion } from '../test.cy'
import { CriterionSearch } from '../CohortSearch/cohort-search'

export class CohortEdit {
  public goToCohortEditPage() {
    cy.visit(UrlPaths.feasibilityQuery.search)
  }

  public addCriteriumToCohort(criterium: string) {
    const criterionSearch = new CriterionSearch()
    criterionSearch.searchInput(criterium)
    selectCriterion([0])
    cy.get('num-search-action-bar button').eq(0).click()
    cy.get('num-search-action-bar button').eq(1).click()
  }

  public shouldSeeModalOpening(modalTitle: string) {
    cy.get('mat-dialog-container').should('be.visible')
  }

  public openPanelByName(panelName: string) {
    cy.contains('mat-expansion-panel-header', panelName).click()
  }
  public shouldSeeSelectedInPanel(selected: string) {
    cy.get('num-edit-criterion-modal').within(() => {
      cy.get('num-quantity-comparision-select').contains(selected).should('be.visible')
    })
  }
  public selectFromPanelByName(option: string, panelName: string) {
    cy.get('num-quantity-comparision-select')
      .click()
      .then(() => {
        cy.get('.mat-mdc-option').contains(option).click()
      })
  }
  public clickAuswaehlenButton() {
    cy.contains('button', 'Auswählen').click()
  }
  public shouldSeeModalClosing(modalTitle: string) {
    cy.get('.mat-dialog-title').should('not.exist')
  }

  public shouldSeeCriteriumInListWithSelected(
    criterium: string,
    panelName: string,
    chipValue: string
  ) {
    const filterChip = new FilterChips()
    filterChip.getFilterChipBlock(criterium, panelName)
    cy.get('.criteria-box').within(() => {
      cy.get('.content').should('contain', criterium).should('contain', chipValue)
    })
    filterChip.getFilterChipByName(criterium, panelName, chipValue)
  }

  public selectValue(value: string) {
    cy.get('num-value-select').click().type(value)
  }

  public selectUnit(unit: string) {
    cy.get('num-allowed-units')
      .click()
      .then(() => {
        cy.get('.mat-mdc-option').contains(unit).click()
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
      cy.wait(1000) // wait for the drag to complete
  }
}

const cohortEdit = new CohortEdit()

defineStep('I should see {string} modal opening', (modalTitle: string) =>
  cohortEdit.shouldSeeModalOpening(modalTitle)
)
defineStep('I open the panel with the name {string}', (panelName: string) =>
  cohortEdit.openPanelByName(panelName)
)
defineStep('I should see {string} selected in the panel', (selected: string) =>
  cohortEdit.shouldSeeSelectedInPanel(selected)
)
defineStep(
  'I select {string} from the panel with the name {string}',
  (option: string, panelName: string) => cohortEdit.selectFromPanelByName(option, panelName)
)
defineStep('I click on Auswählen button', () => cohortEdit.clickAuswaehlenButton())
defineStep('I should see {string} modal closing', (modalTitle: string) =>
  cohortEdit.shouldSeeModalClosing(modalTitle)
)
defineStep('I select a value of {int}', (value: number) => cohortEdit.selectValue(value.toString()))
defineStep('I select the unit {string}', (unit: string) => cohortEdit.selectUnit(unit))
defineStep(
  'I should see {string} in the cohort criteria list with {string} and {string} selected',
  (criterium: string, panelName: string, chipValue: string) =>
    cohortEdit.shouldSeeCriteriumInListWithSelected(criterium, panelName, chipValue)
)
