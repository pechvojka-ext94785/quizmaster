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

export const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const isLastQuestion = currentQuestionIndex === quiz.length - 1

    const nextQuestionHandler = () => {
        console.log('Next question')
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSubmitted(false)
    }

    const onSubmitted = () => {
        setSubmitted(true)
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm question={quiz[currentQuestionIndex]} onSubmitted={onSubmitted} />
            {submitted && !isLastQuestion && <NextQuestionButton onClick={nextQuestionHandler} />}
            {isLastQuestion && submitted && (
                <button type="button" id="evaluate-button">
                    Evaluate
                </button>
            )}
        </div>
    )
}
