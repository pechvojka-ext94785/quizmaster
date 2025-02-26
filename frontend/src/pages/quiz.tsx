import type { QuizQuestion } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
const sessionKey = 'quizState'
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
    correctAnswers: [2, 0],
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
    const resolveAnswers = (question: QuizQuestion, lastAnswers: number[], answerIndex: number, selected: boolean) => {
        const isMultiple = question.correctAnswers.length > 1
        if (!isMultiple) {
            return [answerIndex]
        }
        const answers = Array.from(new Set([...lastAnswers, answerIndex]))
        const removingAnswers = !selected ? [answerIndex] : []
        return answers.filter(i => !removingAnswers.includes(i))
    }
    const handleStateChanged = (answerIndex: number, selected: boolean) => {
        console.log(quiz[currentQuestionIndex], answerIndex, selected)
        const question = quiz[currentQuestionIndex]
        const questionId = question.id
        const quizState = getQuizState()
        const lastAnswers = quizState[questionId] ?? []
        const currentAnswers = resolveAnswers(question, lastAnswers, answerIndex, selected)
        sessionStorage.setItem(sessionKey, JSON.stringify({ ...quizState, [questionId]: currentAnswers }))
    }
    const getQuizState = () => {
        const sessionStorageValue = sessionStorage.getItem(sessionKey)
        const quizState = sessionStorageValue ? JSON.parse(sessionStorageValue) : {}
        return quizState
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm
                question={quiz[currentQuestionIndex]}
                onSubmitted={onSubmitted}
                onAnswerChange={handleStateChanged}
                quizState={getQuizState()}
            />
            {submitted && !isLastQuestion && <NextQuestionButton onClick={nextQuestionHandler} />}
            {isLastQuestion && submitted && (
                <Link to="/evaluation" id="evaluate-button">
                    Evaluate
                </Link>
            )}
        </div>
    )
}
