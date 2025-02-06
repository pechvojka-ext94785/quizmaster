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

export const FakeLastQuestion = () => {
    const obj = { correct: 3, total: 10 }
    localStorage.setItem('quizScore', JSON.stringify(obj))
    return (
        <div>
            <h1>Fake last question</h1>
            <form action="/quiz/score" method="get">
                <input type="submit" value="Finish" />
            </form>
        </div>
    )
}
