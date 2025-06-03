import { sideNavTests } from "./Tests/sideNav.cy";
import { NavItem } from "./Utilities/NavItems";

describe('App Flow', () => {
    it('logs in with valid credentials', () => cy.login());
    it('loads the home page', () => sideNavTests(NavItem.dataSelection))
});