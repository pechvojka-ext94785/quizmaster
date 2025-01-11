import type { QuizQuestion } from '../model/quiz-question.ts'
import { fetchJson } from './helpers.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')
