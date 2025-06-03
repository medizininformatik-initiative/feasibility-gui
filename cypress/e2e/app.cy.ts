import { gotoAndCheckCohortSelectionSearch, searchInput, selectCriterion } from "./test.cy";
import { sideNavTests } from "./Tests/sideNav.cy";
import { NavItem } from "./Utilities/NavItems";
const { criteriaSearchPage } = require('./Tests/criterion-search.cy');

describe('App Flow', () => {
    it('Logins', () => cy.login())
    it('Loads the app', () => cy.visit('/'))
    context('Cohort Selection Search', () => {
    it('loads the cohort page', () => sideNavTests(NavItem.cohort))
    criteriaSearchPage()
    })


});