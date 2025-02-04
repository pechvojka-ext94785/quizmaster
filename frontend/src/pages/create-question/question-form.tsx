import { Answers } from './answers.tsx'
import { QuestionEdit } from './question-edit.tsx'
import { MultipleChoiceEdit } from './multiple-choice-edit.tsx'
import { QuestionExplanationEdit } from './question-explanation-edit.tsx'
import { SubmitButton } from 'pages/components/submit-button.tsx'
import type { AnswerData, QuestionFormData } from './question-form-data.ts'
import { preventDefault } from 'helpers.ts'

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
        <form className="question-create-form" onSubmit={preventDefault(onSubmit)}>
            <QuestionEdit question={questionData.question} setQuestion={setQuestion} />
            <MultipleChoiceEdit
                isMultipleChoice={questionData.isMultipleChoice}
                setIsMultipleChoice={setIsMultipleChoice}
            />
            <Answers answers={questionData.answers} setAnswers={setAnswers} />
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
