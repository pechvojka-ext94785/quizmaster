package cz.scrumdojo.quizmaster.question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Integer> {
}
