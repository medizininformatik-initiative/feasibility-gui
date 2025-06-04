import { gotoAndCheckCohortSelectionSearch, searchInput, selectCriterion } from "./test.cy";
import { sideNavTests } from "./Tests/sideNav.cy";
import { NavItem } from "./Utilities/NavItems";
const { criteriaSearchPage } = require('./Tests/criterion-search.cy');
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given ('I login', () => cy.login());
Then ('I should see the {Cohort Selection}', () => {
    sideNavTests("Cohort Selection");
});
When('I go to the cohort selection search page', () => {
    gotoAndCheckCohortSelectionSearch();
});
