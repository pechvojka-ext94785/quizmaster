Feature: Take a quiz

   Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red       |   |
      | Blue      | * |
      | Green     |   |
      | Black     |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz page is available
    Given I visit the quiz page
    Then I should see heading "Quiz"

  Scenario: Quiz question is displayed
    Given I visit the quiz page
    Then I see the first question

  Scenario: Quiz question is answered
    Given I visit the quiz page
    When I answer "Green"
    Then I should see the next button

  Scenario: Quiz question is answered and the next button is clicked
    Given I visit the quiz page
    When I answer "Green"
    And I click the next button
    Then I should see the next question

  Scenario: User proceed to last question
    Given I visit the quiz page
    When I answer "Green"
    And I click the next button
    Then I should see the next question
    Then I should not see the evaluate button
    When I answer "Lyon"
    Then I should see the evaluate button
    Then I should not see the next button
