Feature: Create question GUI - Single/multi choice

  Background:
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno       |   | A |
      | Berlin     |   | B |
      | Bratislava |   | C |

  @focus
  Scenario: By default question is single-choice type
    Given I start creating a question
    Then Multiple choice is unchecked
