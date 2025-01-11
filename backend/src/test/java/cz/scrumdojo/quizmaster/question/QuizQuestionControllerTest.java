package cz.scrumdojo.quizmaster.question;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

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

    private static QuizQuestion createMultipleChoiceQuestion() {
        return QuizQuestion.builder()
            .question("What countries are in Europe?")
            .answers(new String[] { "USA", "Italy", "Mexico", "France" })
            .explanations(new String[] { "Nope", "Yes", "No", "Yes" })
            .correctAnswers(new int[] { 1, 3 })
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

    public void answerQuestion(int answerIdx, boolean isCorrect) {
        var question = createSingleChoiceQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        var result = quizQuestionController.answerQuestion(questionId, answerIdx).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result);
    }

    @Test
    public void answerMultipleQuestionsCorrectly() {
        checkMultipleAnswers(List.of(1,3), true, List.of());
    }

    @Test
    public void answerMultipleQuestionsIncorrectly() {
        checkMultipleAnswers(List.of(2), false, List.of(1, 2, 3));
    }

    private void checkMultipleAnswers(List<Integer> userAnswersIndexes, boolean isCorrect, List<Integer> expectedWrongAnswers) {
        QuizQuestion question = createMultipleChoiceQuestion();
        var questionId = quizQuestionController.saveQuestion(question);

        MultipleAnswersResult result = quizQuestionController.answerMultipleChoice(questionId, userAnswersIndexes).getBody();

        assertNotNull(result);
        assertEquals(isCorrect, result.getQuestionAnsweredCorrectly());

        assertEquals(expectedWrongAnswers,result.getAnswersRequiringFeedback());
    }

    @Test
    public void answerSingleChoiceQuestionCorrectly() {
        answerQuestion(1, true);
    }

    @Test
    public void answerNonExistingQuestion() {
        ResponseEntity<?> response = quizQuestionController.answerQuestion(-1, 0);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
