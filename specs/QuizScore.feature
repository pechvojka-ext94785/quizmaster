Feature: Displaying the quiz score

  Scenario:
    Given I visit the quiz score page
    Then I should see heading "Quiz Score"
    And I should see the text "Your score is 3 correctly answered questions out of 10 which is 30%"

