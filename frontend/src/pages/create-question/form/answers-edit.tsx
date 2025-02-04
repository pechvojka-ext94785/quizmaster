import { type AnswerData, emptyAnswerData } from './question-form-data.ts'

interface AnswerRowProps {
    readonly answer: AnswerData
    readonly index: number
    readonly updateAnswerData: (index: number, newValue: Partial<AnswerData>) => void
}

export const AnswerRow = ({ answer, index, updateAnswerData }: AnswerRowProps) => (
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
)

interface AddAnswerProps {
    readonly addAnswer: () => void
}

export const AddAnswerButton = ({ addAnswer }: AddAnswerProps) => (
    <div>
        <button type="button" onClick={addAnswer} className="add-answer-button">
            Add Answer
        </button>
    </div>
)

interface AnswersProps {
    readonly answers: readonly AnswerData[]
    readonly setAnswers: (answers: readonly AnswerData[]) => void
}

export const AnswersEdit = ({ answers, setAnswers }: AnswersProps) => {
    const updateAnswerData = (index: number, newValue: Partial<AnswerData>) => {
        const newAnswerData = [...answers]
        newAnswerData[index] = { ...newAnswerData[index], ...newValue }
        setAnswers(newAnswerData)
    }

    const addAnswer = () => setAnswers([...answers, emptyAnswerData()])

    return (
        <>
            {answers.map((answer, index) => (
                <AnswerRow answer={answer} index={index} updateAnswerData={updateAnswerData} />
            ))}
            <AddAnswerButton addAnswer={addAnswer} />
        </>
    )
}
