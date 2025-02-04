interface QuestionExplanationEditProps {
    readonly questionExplanation: string
    readonly setQuestionExplanation: React.Dispatch<React.SetStateAction<string>>
}

export const QuestionExplanationEdit = ({
    questionExplanation,
    setQuestionExplanation,
}: QuestionExplanationEditProps) => (
    <>
        <label htmlFor="general-explanation">General explanation for the entire question:</label>
        <textarea
            id="general-explanation"
            className="general-explanation"
            value={questionExplanation}
            onChange={e => setQuestionExplanation(e.target.value)}
            rows={2}
        />
    </>
)
