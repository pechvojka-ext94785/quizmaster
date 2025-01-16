Feature: Edit question GUI

  Background:
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno        |   |
      | Berlin      |   |
      | Bratislava  |   |
      | Prague      | * |
    * saved and bookmarked as "Czechia"

  @focus
  Scenario: Edit a single-choice question
    Given I start editing a question
    When I replace Brno with Ostrava
    * I save editing question
    Then I see a link to take the question
    When I take the question
    Then I see the question and the answers
