Feature: Displaying the quiz score
  Scenario Outline:
    When I open the page
    Then I should see heading "Quiz start"
    And I see the question and the answers tmp
  Examples:
      | correct | count | percentage |
      | 3       | 10    | 30         |
