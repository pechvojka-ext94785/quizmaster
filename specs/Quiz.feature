Feature: Take a quiz

  # Background:

    # Given a question "What is capital of France?"
    # * with answers:
    #   | Marseille |   |
    #   | Lyon      |   |
    #   | Paris     | * |
    #   | Toulouse  |   |
    # * saved and bookmarked as "France"
    # Given a question "What is the standard colour of grass?"
    # * with answers:
    #   | Red       |   |
    #   | Blue      |   |
    #   | Green     | * |
    #   | Black     |   |
    # * saved and bookmarked as "Grass"
    # Given a question "What is the standard colour of sky?"
    # * with answers:
    #   | Red       |   |
    #   | Blue      | * |
    #   | Green     |   |
    #   | Black     |   |
    # * saved and bookmarked as "Sky"

  @focus
  Scenario: Quiz page is available
    Given I visit the quiz page
    Then I should see heading "Quiz"

