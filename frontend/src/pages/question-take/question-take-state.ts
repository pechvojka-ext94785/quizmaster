import { useEffect, useState } from 'react'
import type { QuizQuestion } from 'model/quiz-question'

export interface QuestionTakeState {
    readonly isMultipleChoice: boolean
    readonly selectedAnswerIdxs: number[]
    readonly submitted: boolean
    readonly submit: () => void
    readonly onSelectedAnswerChange: (idx: number, selected: boolean) => void
}

export const useQuestionTakeState = (question: QuizQuestion): QuestionTakeState => {
    const isMultipleChoice = question.correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = useState<number[]>([])
    const [submitted, setSubmitted] = useState(false)

    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => [...prev, idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => prev.filter(i => i !== idx))

    const submit = () => setSubmitted(true)

    const reset = () => {
        setSelectedAnswerIdxs([])
        setSubmitted(false)
    }

    useEffect(() => {
        reset()
    }, [question])

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
