import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }
    return result
}

export const FakeCreateQuiz = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams()
    const totalQuestions = Number(searchParams.get('count'))
    const [countPages, setCountPages] = useState(totalQuestions)

    useEffect(() => {
        const count = searchParams.get('count')
        if (count) {
            setCountPages(parseInt(count, 10))
        }
    }, [searchParams])

    const handleNext = () => {
        if (currentPage < countPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <h1>Quiz start</h1>
            <p>Q: {generateRandomString(10)}</p>
            <ul>
                <li>ano</li>
                <li>ne</li>
            </ul>
            Page {currentPage + 1} of {countPages}
            {currentPage < countPages - 1 && <button onClick={handleNext}>Next</button>}
        </div>
    )
}
