import './create-question.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionData, saveQuestion, getQuestion, updateQuestion } from 'api/quiz-question.ts'
import { Answers } from 'pages/create-question'
import { QuestionEdit } from './question-edit'
import { MultipleChoiceEdit } from './multiple-choice-edit'
import { QuestionExplanationEdit } from './question-explanation-edit'
import { SubmitButton } from 'pages/components/submit-button'
import { type AnswerData, emptyQuestionFormData, toQuestionApiData, toQuestionFormData } from './question-form-data'

export function CreateQuestionForm() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [questionData, setQuestionData] = useState(emptyQuestionFormData())

    const setQuestion = (question: string) => setQuestionData(prev => ({ ...prev, question }))
    const setAnswers = (updateAnswers: (prev: readonly AnswerData[]) => readonly AnswerData[]) => {
        const answers = updateAnswers(questionData.answers)
        setQuestionData(prev => ({ ...prev, answers }))
    }
    const setQuestionExplanation = (questionExplanation: string) =>
        setQuestionData(prev => ({ ...prev, questionExplanation }))
    const setIsMultipleChoice = (isMultipleChoice: boolean) => setQuestionData(prev => ({ ...prev, isMultipleChoice }))

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
            <form className="question-create-form" onSubmit={handleSubmit}>
                <QuestionEdit question={questionData.question} setQuestion={setQuestion} />
                <MultipleChoiceEdit
                    isMultipleChoice={questionData.isMultipleChoice}
                    setIsMultipleChoice={setIsMultipleChoice}
                />
                <Answers answers={questionData.answers} setAnswerData={setAnswers} />
                <QuestionExplanationEdit
                    questionExplanation={questionData.questionExplanation}
                    setQuestionExplanation={setQuestionExplanation}
                />
                <div>
                    <SubmitButton />
                </div>
                {linkToQuestion && <span id="question-link">{linkToQuestion}</span>}
                {errorMessage && <span id="error-message">{errorMessage}</span>}
                <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
            </form>
        </div>
    )
}
