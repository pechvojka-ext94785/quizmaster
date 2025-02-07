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

  Scenario: Click the same option of single choice question
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Berlin"
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

  Scenario: Click another option of single choice question
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Brno"
    Then I see the answers
    | Brno       | * |
    | Berlin     |   |
    | Bratislava |   |

  # Scenario:
