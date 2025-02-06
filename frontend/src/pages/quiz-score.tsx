interface QuizScoreProps {
    readonly correct: number
    readonly total: number
}

export const QuizScore = ({ correct, total }: QuizScoreProps) => {
    return (
        <div>
            <h1>Quiz Score</h1>
            <p>
                Your score is {correct} correctly answered questions out of {total} which is{' '}
                {Math.round((correct / total) * 100)}%
            </p>
        </div>
    )
}
