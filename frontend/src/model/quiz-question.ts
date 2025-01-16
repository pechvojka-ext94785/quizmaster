// TODO refactor optional params
export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: readonly string[]
    readonly explanations: readonly string[]
    readonly questionExplanation: string
    readonly correctAnswers: number[]
}

export interface Answers {
    readonly correctAnswers: readonly number[]
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}

export interface QuizQuestionProps extends QuizQuestion {
    readonly quizId: string
    readonly quizRunId: string
    readonly onSuccessfulSubmit: () => void
}

export interface Quiz {
    readonly questions: string[]
    readonly actualQuestionNumber: number
}
