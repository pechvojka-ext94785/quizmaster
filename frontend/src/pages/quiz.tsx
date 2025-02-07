import type { QuizQuestion } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'

interface NextQuestionButtonProps {
    onClick: () => void
}

export const NextQuestionButton = (props: NextQuestionButtonProps) => {
    return (
        <div>
            <button type="button" onClick={props.onClick} id="next-question">
                Next Question
            </button>
        </div>
    )
}

export const Quiz = () => {
    const nextQusetionHandler = () => {
        console.log('Next question')
        setQuiz(quiz[1])
    }
    const quizQuestion1: QuizQuestion = {
        id: 1,
        question: 'What is the standard colour of sky?',
        answers: ['Red', 'Blue', 'Green', 'Black'],
        explanations: [],
        questionExplanation: '',
        correctAnswers: [1],
    }
    const quizQuestion2: QuizQuestion = {
        id: 2,
        question: 'What is capital of France?',
        answers: ['Marseille', 'Lyon', 'Paris', 'Toulouse'],
        explanations: [],
        questionExplanation: '',
        correctAnswers: [2],
    }
    const quiz = [quizQuestion1, quizQuestion2]

    const [quizQuestion, setQuiz] = useState(quiz[0])

    const [submitted, setSubmitted] = useState(false)

    const onSubmitted = () => {
        setSubmitted(true)
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm question={quizQuestion} onSubmitted={onSubmitted} />
            {submitted && <NextQuestionButton onClick={nextQusetionHandler} />}
        </div>
    )
}
