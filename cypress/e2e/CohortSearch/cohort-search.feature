Feature: Cohort Search

    Background: I am logged in as a user
        Given I am logged in as a user
        And I am on the Cohort Search page

    Scenario: Search for Cohort elements
        Then I see 50 criteria results
        When I search for "Chronologisches Alter"
        Then I should see "Aktuelles chronologisches Alter" in the search results
        When I select "Chronologisches Alter" from the search results
        Then I should see Parents and Children of in the right side panel

