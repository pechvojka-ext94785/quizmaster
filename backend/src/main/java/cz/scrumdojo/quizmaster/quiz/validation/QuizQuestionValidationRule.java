package cz.scrumdojo.quizmaster.quiz.validation;

import cz.scrumdojo.quizmaster.question.QuizQuestion;

interface QuizQuestionValidationRule {

    boolean isValid(QuizQuestion question);

}
