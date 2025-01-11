import type { QuizQuestion } from '../model/quiz-question.ts'
import { fetchJson, postJson } from './helpers.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const getQuestions = async () => await fetchJson<QuizQuestion[]>('/api/quiz-question/all')

export type QuestionData = Omit<QuizQuestion, 'id'>

export const saveQuestion = async (question: QuestionData) =>
    await postJson<QuestionData, number>('/api/quiz-question', question)
