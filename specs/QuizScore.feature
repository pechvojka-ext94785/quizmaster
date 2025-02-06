Feature: Displaying the quiz score

  Scenario:
    Given I visit the quiz score page
    Then I should see heading "Quiz Score"
    And I should see the text "Your score is <correct> correctly answered questions out of <count> which is <percentage>%"
  Examples:
      | correct | count | percentage |
      | 3       | 10    | 30         |
