Feature: Create quiz
  Background:
    Given a question "What is capital of France?"
    * with answers:
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    And a question "What is capital of Italy?"
    * with answers:
      | Rome     | * |
      | Milan    |   |
    * saved and bookmarked as "Italy"
    And a quiz with questions "France,Italy"

  Scenario: Start quiz
    When I start the quiz
    Then I see question number 1

  @ignore
  Scenario: Start quiz and finish
    When I start the quiz
    Then I see question number 1
    When I click "Next"
    Then I see question number 2
    When I click "Finish"
    Then I see the finish message

  @ignore
  Scenario: Question is created and available to be taken
    Given I start quiz "Capitals"
    Then I see question "What is capital of France?"
    Then I see the "Next" button
    When I click "Next"
    Then I see question "What is capital of Italy?"
    Then I see the "Finish" button
    When I click "Finish"
    Then I see the finish message

