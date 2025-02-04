import './create-question.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { type AnswerData, Answers, emptyAnswerData } from 'pages/create-question'
import { QuestionEdit } from './question-edit'
import { MultipleChoiceEdit } from './multiple-choice-edit'

export function CreateQuestionForm() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answerData, setAnswerData] = useState<AnswerData[]>([emptyAnswerData(), emptyAnswerData()])
    const [questionExplanation, setQuestionExplanation] = useState<string>('')
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(false)
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
                setIsMultipleChoice(quizQuestion.correctAnswers.length > 1)
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
                <QuestionEdit question={question} setQuestion={setQuestion} />
                <MultipleChoiceEdit isMultipleChoice={isMultipleChoice} setIsMultipleChoice={setIsMultipleChoice} />
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
