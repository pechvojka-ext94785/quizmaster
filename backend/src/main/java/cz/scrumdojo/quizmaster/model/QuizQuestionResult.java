package cz.scrumdojo.quizmaster.model;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizQuestionResult {

    private QuizQuestion question;

    private int[] selectedAnswers;

    private int[] explanationsToShow;

}
