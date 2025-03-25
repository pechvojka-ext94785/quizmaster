Feature: Evaluate quiz score

  @skip
  Scenario: Quiz score is
    Given a quiz with 10 questions
    When I answer 5 questions correctly and 5 questions incorrectly
    Then I see the score
    | correct answers | total answers |
    | 5               | 10            |
