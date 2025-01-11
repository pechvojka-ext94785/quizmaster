package cz.scrumdojo.quizmaster.model;

import lombok.*;

@Data
@Getter
public class QuizScore {
    public QuizScore(Integer question_count, Integer success_count) {
        this.question_count = question_count;
        this.success_count = success_count;
        this.score = calculateScore();
    }

    public Integer question_count;

    public Integer success_count;

    public Integer score;

    private Integer calculateScore() {
        return (success_count * 100) / question_count;
    }
}
