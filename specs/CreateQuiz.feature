Feature: Displaying the quiz score
  Scenario Outline:
    When I open the page
    Then I should see heading "Quiz start"
  Examples:
      | correct | count | percentage |
      | 3       | 10    | 30         |
