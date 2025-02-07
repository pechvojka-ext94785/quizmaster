Feature: Displaying the quiz score
  @focus
  Scenario Outline:
    When I open the page with <count> questions
    Then I should see heading "Quiz start"
    And I see the question and the answers tmp
  Examples:
      | correct | count | percentage |
      | 3       | 10    | 30         |
      | 3       | 5     | 30         |
