Feature: Answering a quiz question with multiple choice

  Background:
    Given a question "What countries are in Europe?"
    * with answers:
      | Answer  | Correct | Explanation      |
      | Italy   | Yes     | And where is it? |
      | France  | Yes     | You wish!        |
      | Morocco | No      | Almost :D        |
      | Spain   | Yes     | Manana!          |
    * with explanation "Italy, France, and Spain are in Europe. Morocco is in Africa."
    * saved and bookmarked as "Europe"

  Scenario Outline: Validate quiz answer and provide feedback
    Answer is correct only if:
    - All correct answers are selected.
    - No incorrect answer is selected.

    When I take question "Europe"
    And I answer "<answer>"
    Then I see individual feedback:
      | Answer  | Evaluation | Feedback           | Explanation           |
      | Italy   | <italy>    | <italy_feedback>   | <italy_explanation>   |
      | France  | <france>   | <france_feedback>  | <france_explanation>  |
      | Morocco | <morocco>  | <morocco_feedback> | <morocco_explanation> |
      | Spain   | <spain>    | <spain_feedback>   | <spain_explanation>   |
    And I see the question explanation if any answer evaluation is incorrect

    Examples:
      | answer                        | italy | italy_feedback | italy_explanation | france | france_feedback | france_explanation | morocco | morocco_feedback | morocco_explanation | spain | spain_feedback | spain_explanation |
      | Italy                         | ✅     | Correct!       |                   | ❌      | You missed it!  | You wish!          | ✅       | Correct!         |                     | ❌     | You missed it! | Manana!           |
      | Italy, France                 | ✅     | Correct!       |                   | ✅      | Correct!        |                    | ✅       | Correct!         |                     | ❌     | You missed it! | Manana!           |
      | Italy, France, Morocco        | ✅     | Correct!       |                   | ✅      | Correct!        |                    | ❌       | Incorrect!       | Almost :D           | ❌     | You missed it! | Manana!           |
      | Italy, France, Spain          | ✅     | Correct!       |                   | ✅      | Correct!        |                    | ✅       | Correct!         |                     | ✅     | Correct!       |                   |
      | Italy, France, Morocco, Spain | ✅     | Correct!       |                   | ✅      | Correct!        |                    | ❌       | Incorrect!       | Almost :D           | ✅     | Correct!       |                   |
