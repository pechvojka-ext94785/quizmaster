import './create-question.css'
import { useEffect, useState } from 'react'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { useParams } from 'react-router-dom'

interface AnswerData {
    readonly answer: string
    readonly isCorrect: boolean
    readonly explanation: string
}

const emptyAnswerData = (): AnswerData => ({ answer: '', isCorrect: false, explanation: '' })

export function CreateQuestionForm() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answerData, setAnswerData] = useState<AnswerData[]>([emptyAnswerData(), emptyAnswerData()])
    const [questionExplanation, setQuestionExplanation] = useState<string>('')
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [isMultipleAnswer, setIsMultipleAnswer] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionId) {
                const quizQuestion = await getQuestion(questionId)
                const answerData = quizQuestion.answers.map((answer, index) => ({
                    answer,
                    isCorrect: quizQuestion.correctAnswers.includes(index),
                    explanation: quizQuestion.explanations[index],
                }))
                setQuestion(quizQuestion.question)
                setAnswerData(answerData)
                setQuestionExplanation(quizQuestion.questionExplanation)
                setIsMultipleAnswer(quizQuestion.correctAnswers.length > 1)
                setIsLoaded(true)
            }
        }
        fetchQuestion()
    }, [questionId])

    const postData = async (formData: QuestionData) =>
        questionId
            ? updateQuestion(formData, questionId)
                  .then(() => setLinkToQuestion(`${location.origin}/question/${questionId}`))
                  .catch(error => setLinkToQuestion(error.message))
            : saveQuestion(formData)
                  .then(newQuestionId => setLinkToQuestion(`${location.origin}/question/${newQuestionId}`))
                  .catch(error => setLinkToQuestion(error.message))

    const updateAnswerData = (index: number, newValue: Partial<AnswerData>) => {
        setAnswerData(prev => {
            const newAnswerData = [...prev]
            newAnswerData[index] = { ...newAnswerData[index], ...newValue }
            return newAnswerData
        })
    }

    const toggleMultipleAnswers = () => {
        setIsMultipleAnswer(prev => !prev)
    }

    const addAnswer = () => {
        setAnswerData(prev => [...prev, emptyAnswerData()])
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        // Validate form data
        const answers = answerData.map(answer => answer.answer)
        const correctAnswers = answerData.reduce(
            (acc, answer, index) => (answer.isCorrect ? [...acc, index] : acc),
            [] as number[],
        )
        const explanations = answerData.map(answer => answer.explanation)

        if (correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        const formData = { question, answers, correctAnswers, explanations, questionExplanation }
        postData(formData)
    }

    return (
        <div className="wrapper">
            <h1>Quiz Question Creation Page</h1>
            <h2>If you're happy and you know it create the question</h2>
            <form className="question-create-form" onSubmit={handleSubmit}>
                <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
                {/* Question input */}
                <div>
                    <label htmlFor="question-text-area">Enter your question:</label>
                    <textarea
                        id="question-text-area"
                        className="textarea"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        rows={3}
                    />
                </div>
                <div className="multiple-questions-row">
                    <input
                        id="multiple-possible-answers"
                        type="checkbox"
                        checked={isMultipleAnswer}
                        onChange={toggleMultipleAnswers}
                    />
                    Is this question with multiple possible answers?
                    <br />
                </div>
                <br />
                {/* Answer rows */}
                {answerData.map((answer, index) => (
                    <div key={`answer-${index}`} className="answer-row">
                        <input
                            id={`answer-text-${index + 1}`}
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            value={answer.answer}
                            onChange={e => updateAnswerData(index, { answer: e.target.value })}
                            className="answer-input"
                        />
                        <input
                            id={`answer-checkbox-${index + 1}`}
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={e => updateAnswerData(index, { isCorrect: e.target.checked })}
                            className="checkbox"
                        />
                        <input
                            id={`answer-explanation-${index + 1}`}
                            type="text"
                            placeholder="Explanation for wrong answer"
                            value={answer.explanation}
                            onChange={e => updateAnswerData(index, { explanation: e.target.value })}
                            className="explanation-input"
                        />
                    </div>
                ))}
                {/* Add answer button */}
                <button type="button" onClick={addAnswer} className="add-answer-button">
                    Add Answer
                </button>
                <div className="general-explanation-wrapper">
                    <label htmlFor="general-explanation">General explanation for the entire question:</label>
                    <textarea
                        id="general-explanation"
                        className="general-explanation"
                        value={questionExplanation}
                        onChange={e => setQuestionExplanation(e.target.value)}
                        rows={2}
                    />
                </div>
                {/* Submit button */}
                <button type="submit" className="submit-button">
                    Submit
                </button>
                <br />
                {linkToQuestion && <span id="question-link">{linkToQuestion}</span>}
                {errorMessage && <span id="error-message">{errorMessage}</span>}
            </form>
        </div>
    )
}
