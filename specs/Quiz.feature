Feature: Create quiz
  Background:
    Given a question "What is capital of France?"
    * with answers:
      | Paris    | * |
      | Toulouse |   |
    * saved and bookmarked as "France"
    And a question "What is capital of Italy?"
    * with answers:
      | Rome  | * |
      | Milan |   |
    * saved and bookmarked as "Italy"
    And a quiz with questions "France,Italy"

  Scenario: Start quiz
    When I start the quiz
    Then I see "next"

  Scenario: Start quiz and finish
    When I start the quiz
    Then I see "next"
    When I click "next"
    Then I see question
