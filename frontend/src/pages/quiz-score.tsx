export const QuizScore = () => {
    let score = { correctAnswers: 0, totalQuestions: 0 }
    const data = localStorage.getItem('quizScore')
    if (data) {
        score = JSON.parse(data)
    }
    return (
        <div>
            <h1>Quiz Score</h1>
            <p>
                Your score is {score.correctAnswers} correctly answered questions out of {score.totalQuestions} which is{' '}
                {Math.round((score.correctAnswers / score.totalQuestions) * 100)}%
            </p>
        </div>
    )
}

export const FakeLastQuestion = () => {
    const obj = { correctAnswers: 3, totalQuestions: 10 }
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
