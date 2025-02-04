import './create-question.css'
import React, { useEffect, useState } from 'react'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { useParams } from 'react-router-dom'

// if change this value, also change in frontend/tests/steps/create-question.ts
const NUM_ANSWERS = 2

export function CreateQuestionForm() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answers, setAnswers] = useState<string[]>(Array(NUM_ANSWERS).fill(''))
    const [correctAnswers, setCorrectAnswers] = useState<number[]>([])
    const [questionExplanations, setQuestionExplanations] = useState<string[]>(Array(NUM_ANSWERS).fill(''))
    const [answerExplanation, setAnswerExplanation] = useState<string>('')
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [isMultipleAnswer, setIsMultipleAnswer] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionId) {
                const quizQuestion = await getQuestion(questionId)
                setQuestion(quizQuestion.question)
                setAnswers(quizQuestion.answers)
                setCorrectAnswers(quizQuestion.correctAnswers)
                setQuestionExplanations(quizQuestion.explanations)
                setAnswerExplanation(quizQuestion.questionExplanation)
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

    const updateAnswer = (index: number, value: string) => {
        setAnswers(prev => {
            const newAnswers = [...prev]
            newAnswers[index] = value
            return newAnswers
        })
    }

    const updateExplanation = (index: number, value: string) => {
        setQuestionExplanations(prev => {
            const newExplanations = [...prev]
            newExplanations[index] = value
            return newExplanations
        })
    }

    const toggleMultipleAnswers = () => {
        setIsMultipleAnswer(prev => !prev)
    }

    const handleCorrectAnswerClick = (index: number) => {
        if (isMultipleAnswer) {
            if (correctAnswers.includes(index)) {
                setCorrectAnswers(correctAnswers.filter(item => item !== index))
            } else {
                setCorrectAnswers([...correctAnswers, index])
            }
        } else {
            setCorrectAnswers([index])
        }
    }

    const addAnswer = () => {
        setAnswers(prev => [...prev, ''])
        setQuestionExplanations(prev => [...prev, ''])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        // Validate form data
        if (correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        const formData = {
            question,
            answers,
            correctAnswers,
            explanations: questionExplanations,
            questionExplanation: answerExplanation,
        }
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
                <div className="multipleQuestionsRow">
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
                {answers.map((_, index) => (
                    <div key={index} className="answerRow">
                        <input
                            id={`answer-text-${index + 1}`}
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            value={answers[index]}
                            onChange={e => updateAnswer(index, e.target.value)}
                            className="answerInput"
                        />
                        <input
                            id={`answer-checkbox-${index + 1}`}
                            type="checkbox"
                            checked={correctAnswers.includes(index)}
                            onChange={() => handleCorrectAnswerClick(index)}
                            className="checkbox"
                        />
                        <input
                            id={`answer-explanation-${index + 1}`}
                            type="text"
                            placeholder="Explanation for wrong answer"
                            value={questionExplanations[index]}
                            onChange={e => updateExplanation(index, e.target.value)}
                            className="explanationInput"
                        />
                    </div>
                ))}
                {/* Add answer button */}
                <button type="button" onClick={addAnswer} className="addAnswerButton">
                    Add Answer
                </button>
                <div className="generalExplanationWrapper">
                    <label htmlFor="general-explanation">General explanation for the entire question:</label>
                    <textarea
                        id="general-explanation"
                        className="generalExplanation"
                        value={answerExplanation}
                        onChange={e => setAnswerExplanation(e.target.value)}
                        rows={2}
                    />
                </div>
                {/* Submit button */}
                <button type="submit" className="submitButton">
                    Submit
                </button>
                <br />
                {linkToQuestion && <span id="question-link">{linkToQuestion}</span>}
                {errorMessage && <span id="error-message">{errorMessage}</span>}
            </form>
        </div>
    )
}
