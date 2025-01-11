package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import org.springframework.stereotype.Component;

import static org.apache.commons.lang3.ArrayUtils.isNotEmpty;

@Component
class AtLeastOneCorrectAnswerValidationRule implements QuizQuestionValidationRule {

    @Override
    public boolean isValid(QuizQuestion question) {
        return isNotEmpty(question.getCorrectAnswers());
    }
}
