import type { Quiz, SingleQuiz } from '../model/quiz-question.ts'
import { fetchJson, postJson } from './helpers.ts'

export const createQuiz = async (quiz: Quiz) => await postJson<Quiz, number>('/api/quiz', quiz)

export const getQuizMaster = async (quizId: string | number) => await fetchJson<SingleQuiz>(`/api/quiz/${quizId}`)

export const createQuizRun = async (quizId: string) => await postJson<string, void>(`/api/quizRun/${quizId}`, quizId)

export const setAnswer = async (runId: string, questionId: string | number, answers: number[]) =>
    await postJson(`/api/quizRun/${runId}/question/${questionId}/answer`, { answerIds: answers })
