import { NavItem, NavItemKey, NavItemPaths, NavItemValue } from "../Utilities/NavItems";

/**
 * Tests for the side navigation component.
 * @see NavItemValue
 */
export const sideNavTests = (navItemSelector: NavItemValue) => {
   cy.get('mat-nav-list')
      .should('be.visible')
      .within(() => {
      cy.contains(navItemSelector).click();
      });
    cy.url().should('include', NavItemPaths[navItemSelector]);
};
