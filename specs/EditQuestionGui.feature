Feature: Edit question GUI

  Background:
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno        |   |
      | Berlin      |   |
      | Bratislava  |   |
      | Prague      | * |
    * saved and bookmarked as "Czechia"

  @ignore
  Scenario: Edit a single-choice question
    When I start editing question "Czechia"
    Then I see the question, answers and explanations

