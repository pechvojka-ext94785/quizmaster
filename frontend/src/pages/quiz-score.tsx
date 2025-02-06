import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

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
    const [searchParams] = useSearchParams()
    const correctAnswers = Number(searchParams.get('correct'))
    const totalQuestions = Number(searchParams.get('count'))

    useEffect(() => {
        const obj = { correctAnswers, totalQuestions }
        localStorage.setItem('quizScore', JSON.stringify(obj))
    }, [correctAnswers, totalQuestions])

    return (
        <div>
            <h1>Fake last question</h1>
            <form action="/quiz/score" method="get">
                <input type="submit" value="Finish" />
            </form>
        </div>
    )
}
