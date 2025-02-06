import type { QuizQuestion } from 'model/quiz-question'
import { QuestionForm } from './question-take'

export const Quiz = () => {
    const quizQuestion: QuizQuestion = {
        id: 1,
        question: 'What is the standard colour of sky?',
        answers: ['Red', 'Blue', 'Green', 'Black'],
        explanations: [],
        questionExplanation: '',
        correctAnswers: [1],
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm question={quizQuestion} />
        </div>
    )
}
