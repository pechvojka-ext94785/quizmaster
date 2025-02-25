Feature: Answering a quiz question with multiple choice

  Background:
    Given a question "What countries are in Europe?"
    * with answers:
      | Italy   | * | And where is it? |
      | France  | * | You wish!        |
      | Morocco |   | Almost :D        |
      | Spain   | * | Manana!          |
    * with explanation "Italy, France, and Spain are in Europe. Morocco is in Africa."
    * saved and bookmarked as "Europe"

  Scenario Outline: Detailed feedback is displayed for each selected answer
    Answer is considered correct if and only if:
    - All correct answers are selected.
    - No incorrect answer is selected.

    When I take question "Europe"
    And I answer "<answer>"
    Then I see individual feedback:
      | answer  | evaluation | feedback           |
      | Italy   | <italy>    | <italy_feedback>   |
      | France  | <france>   | <france_feedback>  |
      | Morocco | <morocco>  | <morocco_feedback> |
      | Spain   | <spain>    | <spain_feedback>   |
    And I see the question explanation

    Examples:
      | answer                        | italy | italy_feedback | france | france_feedback | morocco | morocco_feedback | spain | spain_feedback |
      | Italy                         | ✅     | Correct!       | ❌      | You missed it!  | ✅       | Correct!         | ❌     | You missed it! |
      | Italy, France                 | ✅     | Correct!       | ✅      | Correct!        | ✅       | Correct!         | ❌     | You missed it! |
      | Italy, France, Morocco        | ✅     | Correct!       | ✅      | Correct!        | ❌       | Incorrect!       | ❌     | You missed it! |
      | Italy, France, Spain          | ✅     | Correct!       | ✅      | Correct!        | ✅       | Correct!         | ✅     | Correct!       |
      | Italy, France, Morocco, Spain | ✅     | Correct!       | ✅      | Correct!        | ❌       | Incorrect!       | ✅     | Correct!       |

  Scenario: Explanations for all answers are displayed after answering the question
    When I take question "Europe"
    And I answer "France, Morocco, Spain"
    Then I see the answer explanations for answers
      | answer  | explanation      |
      | Italy   | And where is it? |
      | France  | You wish!        |
      | Morocco | Almost :D        |
      | Spain   | Manana!          |
    And I see the question explanation
