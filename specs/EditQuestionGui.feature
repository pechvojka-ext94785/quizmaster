Feature: Edit question GUI

  Background:
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno        |   | A |
      | Berlin      |   | B |
      | Bratislava  |   | C |
      | Prague      | * | D |
    * saved and bookmarked as "Czechia"

  @ignore
  Scenario: Edit a single-choice question
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change question to "What is capital of Slovakia?"
    And I save it
    Then I see unchanged url
