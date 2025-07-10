Feature: Data Query Cohort
    Background: I am logged in and on the Data Query Cohort page
        Given I am logged in as a user
        And I am on the "Data Query - Cohort Definition" page
        And I set the language to English

    Scenario Outline: User uploads file "<fileName>"
        Given I upload the file "<fileName>"
        Then I download the file "<fileName>"


        Examples:
            | fileName                                 |
            | Single_Inclusion_Criteria_With_Patient |
