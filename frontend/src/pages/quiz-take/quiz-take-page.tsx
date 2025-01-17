import './quiz-take-page.scss'

import { createEffect, createSignal, Show } from 'solid-js'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { getQuestion } from 'api/quiz-question.ts'
import { QuestionForm } from 'pages/question-take'


export const QuizTakePage = () => {
    const questionId = () => 1

    console.log('QuizTakePage', questionId())

    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    createEffect(async () => setQuizQuestion(await getQuestion(questionId())))

    return <Show when={quizQuestion()} children={question => <QuestionForm question={question} quiz={true} />} />
}
