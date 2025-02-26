package cz.scrumdojo.quizmaster.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuizQuestionController {

    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuizQuestionController(
        QuizQuestionRepository quizQuestionRepository) {

        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable Integer id) {

        return response(findQuestion(id));
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/questions-count")
    public ResponseEntity<QuestionsCount> getQuestionsCount() {
        return response(Optional.of(new QuestionsCount(findQuestionsCount())));
    }

    @Transactional
    @PostMapping("/quiz-question")
    public Integer saveQuestion(@RequestBody QuizQuestion question) {
        return quizQuestionRepository.save(question).getId();
    }

    @Transactional
    @PatchMapping("/quiz-question/{id}")
    public Integer updateQuestion(@RequestBody QuizQuestion question, @PathVariable Integer id) {
        question.setId(id);
        System.out.println("Updating question: " + question);
        quizQuestionRepository.save(question);
        return id;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/answers")
    public ResponseEntity<Answers> getAnswers(@PathVariable Integer id) {
        return response(findQuestion(id).map(Answers::from));
    }

    private Optional<QuizQuestion> findQuestion(Integer id) {
        return quizQuestionRepository.findById(id);
    }

    private Long findQuestionsCount() {
        return quizQuestionRepository.count();
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
