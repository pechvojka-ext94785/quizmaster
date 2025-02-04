import { useMemo } from 'react'
import type { Answers } from 'model/quiz-question'
import type { QuestionTakeState } from 'pages/question-take'

export interface QuestionFeedbackState {
    readonly isQuestionCorrect: boolean
    readonly isAnswerCorrect: (idx: number) => boolean
    readonly showFeedback: (idx: number) => boolean
}

export const useQuestionFeedbackState = (state: QuestionTakeState, answers: Answers): QuestionFeedbackState => {
    const isQuestionCorrect = useMemo(
        () =>
            state.selectedAnswerIdxs.length === answers.correctAnswers.length &&
            state.selectedAnswerIdxs.every(idx => answers.correctAnswers.includes(idx)),
        [state.selectedAnswerIdxs, answers.correctAnswers],
    )

    const isAnswerCorrect = (idx: number) =>
        (answers.correctAnswers.includes(idx) && state.selectedAnswerIdxs.includes(idx)) ||
        (!answers.correctAnswers.includes(idx) && !state.selectedAnswerIdxs.includes(idx))

    const showFeedback = (idx: number) => (state.isMultipleChoice ? true : state.selectedAnswerIdxs[0] === idx)

    return { isQuestionCorrect, isAnswerCorrect, showFeedback }
}
