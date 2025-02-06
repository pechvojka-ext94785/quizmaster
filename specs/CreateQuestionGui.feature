Feature: Create question GUI

  Scenario: Add a single-choice question with 2 answers
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "4" marked as correct
    * I add the answer "5" marked as incorrect
    * I save the question
    Then I see a link to take the question
    When I take the question
    Then I see the question and the answers

  Scenario: Add a single-choice question with 3 answers
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "4" marked as correct
    * I add the answer "5" marked as incorrect
    * I add an additional answer field
    * I add the answer "6" marked as incorrect
    * I save the question
    Then I see a link to take the question
    When I take the question
    Then I see the question and the answers

  Scenario: Cannot save a question with no correct answer
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "5" marked as incorrect
    * I add the answer "6" marked as incorrect
    * I try saving the question
    Then I see an error message

  @looseri
  Scenario: Cannot save a question with less than 2 answers
    Given I start creating a question
    When I enter question "What is XXX?"
    * I try saving the question
    Then I see 2 answers
