interface MultipleChoiceEditProps {
    readonly isMultipleChoice: boolean
    readonly setIsMultipleChoice: React.Dispatch<React.SetStateAction<boolean>>
}

export const MultipleChoiceEdit = ({ isMultipleChoice, setIsMultipleChoice }: MultipleChoiceEditProps) => (
    <div className="multiple-questions-row">
        <input
            id="multiple-possible-answers"
            type="checkbox"
            checked={isMultipleChoice}
            onChange={e => setIsMultipleChoice(e.target.checked)}
        />
        Is this question with multiple possible answers?
        <br />
    </div>
)
