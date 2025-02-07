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
  @focus
  Scenario: Quiz question is answered
    Given I visit the quiz page
    When I answer "Green"
    Then I should see the next button
