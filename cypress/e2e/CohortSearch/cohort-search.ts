import { ActionBar } from '../../support/step_definitions/action-bar.cy';
import { defineStep } from '@badeball/cypress-cucumber-preprocessor';
import { NavItem } from '../Utilities/NavItems';
import { SideNavTests } from '../../support/step_definitions/sideNav.cy';
import { Table } from '../../support/step_definitions/table.cy';

export class CriterionSearch {

  public assertActionBarButtonDisabled(buttonName: string) {
    const actionBar = new ActionBar()
    actionBar.shouldButtonBeDisabled(buttonName)
  }

  public assertActionBarButtonEnabled(buttonName: string) {
    const actionBar = new ActionBar()
    actionBar.shouldButtonBeEnabled(buttonName)
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
    const table = new Table()
    table.assertRowItemExits(text)
  }

  public selectCriterion(text: string) {
    const table = new Table()
    table.selectCheckboxInRow(text)
}
  
  public selectActioBarButton(buttoname: string) {
    const actioNabr = new ActionBar()
    actioNabr.clickButtonByName(buttoname)
  }

  public visitCohortSearchPage() {
    const sideNav = new SideNavTests()
    sideNav.navigateTo(NavItem.cohort)

  }
}
let criterionSearch = new CriterionSearch()

defineStep('I search for {string}', (text: string) => {
  criterionSearch.searchInput(text)
})
defineStep('I should see {string} in the search results', (text: string) => {
  criterionSearch.findCriterion(text)
})

defineStep('I select the checkbox of item {string} from the search results', (text: string) => {
  criterionSearch.selectCriterion(text)
})

defineStep('I should see Parents and Children of in the right side panel', (text) => {
  criterionSearch.opendSidePanel()
})
