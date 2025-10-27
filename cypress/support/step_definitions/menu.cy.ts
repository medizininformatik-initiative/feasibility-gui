import { defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { MenuItemValue } from '../../e2e/Utilities/menuItems'

export class MenuTests {
  /**
   * Opens the menu by clicking on the button with data-cy attribute "openMenu".
   */
  public openMenu() {
    cy.get('[data-cy="openMenu"]').click()
  }

  /**
   * @see MenuItemValue
   * @param menuItemLabel
   */
  public clickMenuItem(menuItemLabel: MenuItemValue) {
    cy.get('.mat-mdc-menu-content:visible')
      .should('exist')
      .within(() => {
        cy.get('.mat-mdc-menu-item').contains(menuItemLabel).should('be.visible').click()
      })
  }
}

const menuTests = new MenuTests()

defineStep('I open the menu', () => menuTests.openMenu())
defineStep('I click on the menu item {string}', (menuItem: string) =>
  menuTests.clickMenuItem(menuItem)
)
