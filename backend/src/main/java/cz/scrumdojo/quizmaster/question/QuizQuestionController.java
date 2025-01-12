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

    private final QuizQuestionService quizQuestionService;

    @Autowired
    public QuizQuestionController(
        QuizQuestionRepository quizQuestionRepository,
        QuizQuestionService quizQuestionService) {

        this.quizQuestionRepository = quizQuestionRepository;
        this.quizQuestionService = quizQuestionService;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable Integer id) {

        return response(findQuestion(id));
    }

    @Transactional
    @PostMapping("/quiz-question")
    public Integer saveQuestion(@RequestBody QuizQuestion question) {
        return quizQuestionService.saveQuestion(question);
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/answers")
    public ResponseEntity<Answers> getAnswers(@PathVariable Integer id) {
        return response(findQuestion(id).map(Answers::from));
    }

    private Optional<QuizQuestion> findQuestion(Integer id) {
        return quizQuestionRepository.findById(id);
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
