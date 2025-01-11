import './question-take-page.scss'

import { createEffect, createSignal, Show } from 'solid-js'
import { useParams } from '@solidjs/router'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { getQuestion } from '../../services/QuizQuestionService.ts'
import { QuestionForm } from 'pages/question-take'

export const QuestionTakePage = () => {
    const params = useParams()
    const questionId = () => Number.parseInt(params.id)

    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    createEffect(async () => setQuizQuestion(await getQuestion(questionId())))

    return <Show when={quizQuestion()} children={ question => <QuestionForm question={question} /> }/>
}
