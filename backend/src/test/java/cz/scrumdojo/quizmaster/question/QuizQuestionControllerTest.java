package cz.scrumdojo.quizmaster.question;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QuizQuestionControllerTest {

    @Autowired
    private QuizQuestionController quizQuestionController;

    private static QuizQuestion createSingleChoiceQuestion() {
        return QuizQuestion.builder()
            .question("What is the capital of Italy?")
            .answers(new String[] { "Naples", "Rome", "Florence", "Palermo" })
            .explanations(new String[] { "Nope", "Of course!", "You wish", "Sicilia!" })
            .correctAnswers(new int[] { 1 })
            .build();
    }

    @Test
    public void getQuestion() {
        var question = createSingleChoiceQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.getQuestion(questionId).getBody();

        assertNotNull(result);
        assertEquals(question.getQuestion(), result.getQuestion());
        assertArrayEquals(question.getAnswers(), result.getAnswers());
    }

    @Test
    public void nonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getQuestion(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void getAnswers() {
        var question = createSingleChoiceQuestion();
        var questionId = quizQuestionController.saveQuestion(question);
        Answers answers = quizQuestionController.getAnswers(questionId).getBody();

        assertNotNull(answers);
        assertArrayEquals(question.getCorrectAnswers(), answers.getCorrectAnswers());
        assertArrayEquals(question.getExplanations(), answers.getExplanations());
        assertSame(question.getQuestionExplanation(), answers.getQuestionExplanation());
    }

    @Test
    public void getAnswersForNonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.getAnswers(-1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testUpdateQuestion() {
        // Step 1: Create and save a test question
        var question = createSingleChoiceQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        // Step 2: Create updated question data
        var updatedQuestion = QuizQuestion.builder()
            .questionText("What is the capital of France?")
            .answers(List.of("Paris", "Lyon", "Marseille", "Nice"))
            .questionExplanations(List.of("Correct!", "Nope", "Nope", "Nope"))
            .correctAnswers(List.of(0))
            .answerExplanation("Paris is the capital of France.")
            .isMultipleAnswer(false)
            .isExplanationsAlways(true)
            .build();

        // Step 3: Call the updateQuestion method
        quizQuestionController.updateQuestion(updatedQuestion, questionId);

        // Step 4: Retrieve the updated question and verify the changes
        var retrievedQuestion = quizQuestionRepository.findById(questionId).orElseThrow();
        assertEquals("What is the capital of France?", retrievedQuestion.getQuestionText());
        assertEquals(List.of("Paris", "Lyon", "Marseille", "Nice"), retrievedQuestion.getAnswers());
        assertEquals(List.of("Correct!", "Nope", "Nope", "Nope"), retrievedQuestion.getQuestionExplanations());
        assertEquals(List.of(0), retrievedQuestion.getCorrectAnswers());
        assertEquals("Paris is the capital of France.", retrievedQuestion.getAnswerExplanation());
        assertFalse(retrievedQuestion.getIsMultipleAnswer());
        assertTrue(retrievedQuestion.getIsExplanationsAlways());
    }
}
