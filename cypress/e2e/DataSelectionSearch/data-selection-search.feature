Feature: Data Selection Search

  Background: I am logged in and on the Data Selection Search page
    Given I am logged in as a user
    And I am on the "Data Selection Search" page

  Scenario Outline: User selects a data selection feature
    Given I select the feature "<feature>" from the root category "<root>"
    Then the button "<button1>" should be enabled
    And the button "<button2>" should be enabled
    When I click on the button "<button1>"
    Then the button "<button1>" should be disabled
    When I click on the button "<button2>"
    Then I am on the "Data Selection Editor" page
    And I should see a data selection box labeled "<feature>"
    When I click the edit button on the data selection box "<feature>"
    And I click on the menu item "Bearbeiten"
    Then I am on the "Data Selection Editor" page

Examples: Selection Criteria
    | root  | feature                           | button1                             | button2                | field |
    | Medikation | Medikationsverabreichung          | Zur Merkmalselektion hinzufügen     | Selektion anzeigen     | photo |


    Scenario Outline: User edits the feature "<feature>" and applies filters
    Given I select the feature "<feature>" from the root category "<root>"
        When I click on the button "<button1>"
        When I click on the button "<button2>"
        Then I am on the "Data Selection Editor" page
        Then I click the edit button on the data selection box "<feature>"
        When I click on the menu item "Bearbeiten"
        And I select the checkbox labeled "<field>"
        Then a chip labeled "<field>" should appear in the "Selected Fields" section


        When I click the "<tabname>" tab
        And I enter "Test" into the filter search field
        Then I should see a row containing "Test"
        And I select the checkbox of item "Test" from the search results
        Then a chip labeled "Andere Tests" should appear in the "Selected Filters" section

        When I click the "Zeiteinschränkung" tab
        And I set the time restriction filter to before with date "18.06.2048"
        And I click on the button "Speichern"

        When I click the "Referenzen" tab
        And I click the "Teil von" tab
        Then I should see the placeholder
        When I click to add a new reference
        Then the reference modal should be displayed

        When  I add a reference named "Procedure"
        Then I add the reference

        #Then I in the editor header a chip with the label "18.06.2048" should be visible in the selected filter section
    Examples: Selection Criteria
    | root  | feature                           | button1                             | button2                | field | tabname |
    | Medikation | Medikationsverabreichung          | Zur Merkmalselektion hinzufügen     | Selektion anzeigen     | Hinweis | Filter |
