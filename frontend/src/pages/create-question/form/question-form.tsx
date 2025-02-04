import { SubmitButton } from 'pages/components/submit-button.tsx'
import { preventDefault } from 'helpers.ts'
import {
    type AnswerData,
    AnswersEdit,
    MultipleChoiceEdit,
    QuestionEdit,
    QuestionExplanationEdit,
    type QuestionFormData,
} from 'pages/create-question/form'

interface QuestionEditProps {
    readonly questionData: QuestionFormData
    readonly setQuestionData: (questionData: QuestionFormData) => void
    readonly onSubmit: () => void
}

export const QuestionEditForm = ({ questionData, setQuestionData, onSubmit }: QuestionEditProps) => {
    const setQuestion = (question: string) => setQuestionData({ ...questionData, question })
    const setIsMultipleChoice = (isMultipleChoice: boolean) => setQuestionData({ ...questionData, isMultipleChoice })
    const setAnswers = (answers: readonly AnswerData[]) => setQuestionData({ ...questionData, answers })
    const setQuestionExplanation = (questionExplanation: string) =>
        setQuestionData({ ...questionData, questionExplanation })

    return (
        <form id="question-create-form" onSubmit={preventDefault(onSubmit)}>
            <QuestionEdit question={questionData.question} setQuestion={setQuestion} />
            <MultipleChoiceEdit
                isMultipleChoice={questionData.isMultipleChoice}
                setIsMultipleChoice={setIsMultipleChoice}
            />
            <AnswersEdit answers={questionData.answers} setAnswers={setAnswers} />
            <QuestionExplanationEdit
                questionExplanation={questionData.questionExplanation}
                setQuestionExplanation={setQuestionExplanation}
            />
            <div>
                <SubmitButton />
            </div>
        </form>
    )
}
