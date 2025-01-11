import { type Accessor, createSignal } from 'solid-js'
import type { QuizQuestion } from 'model/quiz-question'

export interface QuestionTakeState {
    readonly isMultipleChoice: () => boolean
    readonly selectedAnswerIdxs: Accessor<number[]>
    readonly submitted: Accessor<boolean>
    readonly submit: () => void
    readonly onSelectedAnswerChange: (idx: number, selected: boolean) => void
}

export const createQuestionTakeState = (question: Accessor<QuizQuestion>): QuestionTakeState => {
    const isMultipleChoice = () => question().correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = createSignal<number[]>([])
    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([...selectedAnswerIdxs(), idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(selectedAnswerIdxs().filter(i => i !== idx))

    const [submitted, setSubmitted] = createSignal(false)
    const submit = () => setSubmitted(true)

    const onSelectedAnswerChange = (idx: number, selected: boolean) => {
        setSubmitted(false)
        if (!isMultipleChoice()) setSelectedAnswerIdx(idx)
        else if (selected) addSelectedAnswerIdx(idx)
        else removeSelectedAnswerIdx(idx)
    }

    return { isMultipleChoice, selectedAnswerIdxs, submitted, submit, onSelectedAnswerChange }
}
