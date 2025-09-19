Feature: Cohort editing
  Background:
    Given I am logged in as a user
    And I am on the "Feasibility Search" page
    And I set the language to English
  Scenario Outline: I edit <criterium> criterium
    Given I add the criterium "<criterium>" to the editor
    When I open the menu
    When I click on the menu item "Apply filter"
    Then I should see "Edit Cohort" modal opening
    When I set the time restriction filter to before with date "04.04.2045"
    Then I click on Auswählen button
    Then I see the criterium "<criterium>" with filter chip "04.04.2045" in the block "before"
    When I drag "<criterium>" criterium to the "Inclusion" list
    Then the button "Feasibility" should be enabled
    When I click on the button "Feasibility"
    Then I am on the "Feasibility Result" page
    When I click on the button "Edit cohort selection"
    Then I am on the "Feasibility Editor" page
    Examples:
      | criterium                    |
      | 17-keto reductase deficiency |
      | 11-hydroxylase deficiency    |


  Scenario Outline: I edit <criterium>
    Given I add the criterium "<criterium>" to the editor
    When I open the menu
    When I click on the menu item "Apply filter"
    When I open the panel with the name "<panel_name>"
    Then I should see "<default_filter>" selected in the panel
    When I select "<new_filter>" from the panel with the name "<panel_name>"
    Then I should see "<new_filter>" selected in the panel
    Then I select a value of <value>
    And  I select the unit "<unit>"
    When I click on Auswählen button
    Then I should see "Edit Cohort" modal closing
    And I should see "<criterium>" in the cohort criteria list with "<panel_name>" and "<chip_value>" selected
    Examples:
      | criterium                 | default_filter | new_filter | panel_name    | value | unit | chip_value |
      | Current chronological age | No filter      | greater    | Current chronological age | 5     | a    | 5          |


  Scenario Outline: I add criterium to inlcusion list
    Given I add the criterium "<criterium>" to the editor
    Then I should see the criterium "<criterium>" in the editor
    When I drag "<criterium>" criterium to the "Inclusion" list
    Then the button "Feasibility" should be enabled
    When I click on the button "Feasibility"
    Then I am on the "Feasibility Result" page
    And I wait for 11 seconds
    Examples:
      | criterium                    |
      | 17-keto reductase deficiency |

