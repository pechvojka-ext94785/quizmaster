import type { QuizQuestion } from 'model/quiz-question.ts'
import { fetchJson, postJson, patchJson } from './helpers.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export type QuestionData = Omit<QuizQuestion, 'id'>

export const saveQuestion = async (question: QuestionData) =>
    await postJson<QuestionData, number>('/api/quiz-question', question)

export const updateQuestion = async (question: QuestionData, id: number) =>
    await patchJson<QuestionData, number>(`/api/quiz-question/${id}`, question)
