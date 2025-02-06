Feature: Displaying the quiz score
  @focus
  Scenario Outline:
    Given I visit the Fake last question with <correct> correct answers out of <count> questions
    When I click the submit button
    Then I should see heading "Quiz Score"
    And I should see the text "Your score is <correct> correctly answered questions out of <count> which is <percentage>%"
  Examples:
      | correct | count | percentage |
      | 3       | 10    | 30         |
      | 5       | 11    | 45         |
      | 0       | 10    | 0          |
      | 0       | 0     | NaN        |
