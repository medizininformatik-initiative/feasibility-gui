import { defineStep } from "@badeball/cypress-cucumber-preprocessor";
import { NavItemValue, NavItemPaths } from "../../e2e/Utilities/NavItems";
import { UrlPaths } from "../e2e";
import { getUrlPathByLabel } from "../../e2e/Utilities/pathResolver";

/**
 * Class for side navigation component tests.
 * @see NavItemValue
 */
export class SideNavTests {
  public navigateTo(navItemSelector: NavItemValue) {
    cy.get('mat-nav-list')
      .should('be.visible')
      .within(() => {
        cy.contains(navItemSelector).click().then(() => {
          cy.url().should('include', NavItemPaths[navItemSelector]);
        })
      });
  }

  public visitUrl(url: string) {
    const resolvedUrl: string = getUrlPathByLabel(url);
    cy.visit(resolvedUrl);
    cy.url().should('include', resolvedUrl);

  }
}
export const sideNavTests = new SideNavTests();
defineStep('I navigate to the {string} page', (navItem: NavItemValue) => {
  sideNavTests.navigateTo(navItem);
})
defineStep('I am on the {string} page', (url: string) => {
  sideNavTests.visitUrl(url)
});
