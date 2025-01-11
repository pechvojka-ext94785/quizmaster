package cz.scrumdojo.quizmaster.model;

import cz.scrumdojo.quizmaster.question.QuizQuestion;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizData {

    private Integer id;

    private String name;

    private List<QuizQuestion> questions;

}
