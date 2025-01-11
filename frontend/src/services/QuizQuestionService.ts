import type { QuizQuestion } from '../model/quiz-question.ts'
import { fetchJson } from './helpers.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')

export const setAnswer = async (runId: string, questionId: string | number, answers: number[]) =>
    await fetchJson(`/api/quizRun/${runId}/question/${questionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ answerIds: answers }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
