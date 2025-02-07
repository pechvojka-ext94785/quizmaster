import type { QuizQuestion } from 'model/quiz-question'
import { NextQuestionButton, QuestionForm } from './question-take'
import { useState } from 'react'

export const Quiz = () => {
    const quizQuestion: QuizQuestion = {
        id: 1,
        question: 'What is the standard colour of sky?',
        answers: ['Red', 'Blue', 'Green', 'Black'],
        explanations: [],
        questionExplanation: '',
        correctAnswers: [1],
    }

    const [submitted, setSubmitted] = useState(false)

    const onSubmitted = () => {
        setSubmitted(true)
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm question={quizQuestion} onSubmitted={onSubmitted} />
            {submitted && <NextQuestionButton />}
        </div>
    )
}
