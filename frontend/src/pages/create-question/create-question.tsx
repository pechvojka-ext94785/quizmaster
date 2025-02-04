import './create-question.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { emptyQuestionFormData, toQuestionApiData, toQuestionFormData } from './question-form-data'
import { QuestionEditForm } from './question-form'

export function CreateQuestionForm() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined

    const [questionData, setQuestionData] = useState(emptyQuestionFormData())

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionId) {
                const quizQuestion = await getQuestion(questionId)
                setQuestionData(toQuestionFormData(quizQuestion))
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

    const handleSubmit = () => {
        setErrorMessage('')

        const apiData = toQuestionApiData(questionData)

        if (apiData.correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        postData(apiData)
    }

    return (
        <div className="wrapper">
            <h1>Quiz Question Creation Page</h1>
            <h2>If you're happy and you know it create the question</h2>
            <QuestionEditForm questionData={questionData} setQuestionData={setQuestionData} onSubmit={handleSubmit} />
            {linkToQuestion && <span id="question-link">{linkToQuestion}</span>}
            {errorMessage && <span id="error-message">{errorMessage}</span>}
            <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
        </div>
    )
}
