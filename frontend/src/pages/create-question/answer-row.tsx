export interface AnswerData {
    readonly answer: string
    readonly isCorrect: boolean
    readonly explanation: string
}

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
