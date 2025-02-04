import './quiz-take-page.scss'
import { useEffect, useState } from 'react'

import type { QuizQuestion } from 'model/quiz-question.ts'
import type { Quiz } from 'model/quiz-question.ts'
import { getQuestion } from 'api/quiz-question.ts'
import { QuestionForm } from 'pages/question-take'

export const QuizTakePage = () => {
    const quiz = {
        questions: ['1', '2'],
        actualQuestionNumber: 1,
    } as Quiz

    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            const question = await getQuestion(quiz.actualQuestionNumber)
            setQuizQuestion(question)
        }
        fetchQuestion()
    }, [quiz.actualQuestionNumber])

    console.log('QuizTakePage', quiz.actualQuestionNumber)

    return quizQuestion ? <QuestionForm question={quizQuestion} quiz={quiz} /> : null
}
