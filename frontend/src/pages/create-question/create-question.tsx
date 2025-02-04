import './create-question.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { type AnswerData, Answers, emptyAnswerData } from 'pages/create-question'

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

    const toggleMultipleAnswers = () => {
        setIsMultipleAnswer(prev => !prev)
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
                <Answers answers={answerData} setAnswerData={setAnswerData} />
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
