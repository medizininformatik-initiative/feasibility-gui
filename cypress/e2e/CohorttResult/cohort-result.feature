Feature: Cohort Result

    Scenario Outline: I edit <criterium> criterium

    Background:
        Given I am logged in as a user
        And I am on the "Feasibility Search" page
        And I set the language to English

        When I add the criterium "<criterium>" to the editor
        Then I should see the criterium "<criterium>" in the editor
        When I drag "<criterium>" criterium to the "Inclusion" list
        And I click on the button "Feasibility"
        Then I am on the "Feasibility Result" page
        And I see the spinner is visible
        Then I see the result after 10 seconds
        When I open the details
        Then I should see a row containing "DIZ 1" 
        Then I close the details dialog
        When I click on the button "Save cohort"
        Then I see a dialog
        Then I add the title "Bla"
        Then I add the comment "Bla"
        Then I save the cohort
        Then I am on the "Saved Queries" page
    Examples:
        | criterium                | default_filter | new_filter | panel_name   | value | unit | chip_value |
        | 17-keto reductase deficiency | kein Filter    | größer     | Geburtsdatum | 5     | a    | 5          |
