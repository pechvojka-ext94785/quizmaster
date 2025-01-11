package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(0)
class NotEnoughAnswersValidationRule implements QuizQuestionValidationRule {

    @Override
    public boolean isValid(QuizQuestion question) {
        return question.getAnswers() != null && question.getAnswers().length > 1;
    }

}
