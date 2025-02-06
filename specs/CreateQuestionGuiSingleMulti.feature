Feature: Create question GUI - Single/multi choice

  Scenario: By default question is single-choice type
    Given I start creating a question
    Then Multiple choice is unchecked

  Scenario:
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     |   | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Berlin"
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

