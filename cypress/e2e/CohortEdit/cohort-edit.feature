Feature: Cohort editing

  Background:
    Given I am logged in as a user
    And I am on the Feasibility Edit page

Scenario Outline: I edit <criterium> criterium
    Given I have added "<criterium>" criterium to the cohort
    When I click on the menu item "Bearbeiten"
    Then I should see "Edit Cohort" modal opening
    When I open the panel with the name "<panel_name>"
    Then I should see "<default_filter>" selected in the panel
    When I select "<new_filter>" from the panel with the name "<panel_name>"
    Then I should see "<new_filter>" selected in the panel
    Then I select a value of 5 
    And  I select the unit "a" 
    When I click on Auswählen button
    Then I should see "Edit Cohort" modal closing
    And I should see "<criterium>" in the cohort criteria list with "<panel_name>" and "<chip_value>" selected

    Examples:
    | criterium             | default_filter | new_filter | panel_name  | value       | unit | chip_value |
    | Aktuelles chronologisches Alter | kein Filter    | größer     | Geburtsdatum |5 | a               | 5 |


