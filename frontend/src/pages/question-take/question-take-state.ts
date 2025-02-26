import { useEffect, useState } from 'react'
import type { QuizQuestion } from 'model/quiz-question'

export interface QuestionTakeState {
    readonly isMultipleChoice: boolean
    readonly selectedAnswerIdxs: number[]
    readonly submitted: boolean
    readonly submit: () => void
    readonly onSelectedAnswerChange: (idx: number, selected: boolean) => void
}

export const useQuestionTakeState = (question: QuizQuestion, checkedAnswers?: number[]): QuestionTakeState => {
    const isMultipleChoice = question.correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = useState<number[]>(checkedAnswers ?? [])

    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => [...prev, idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => prev.filter(i => i !== idx))

    const [submitted, setSubmitted] = useState(false)

    const submit = () => setSubmitted(true)

    const onSelectedAnswerChange = (idx: number, selected: boolean) => {
        setSubmitted(false)
        if (!isMultipleChoice) setSelectedAnswerIdx(idx)
        else if (selected) addSelectedAnswerIdx(idx)
        else removeSelectedAnswerIdx(idx)
    }

    return {
        isMultipleChoice,
        selectedAnswerIdxs,
        submitted,
        submit,
        onSelectedAnswerChange,
    }
}
