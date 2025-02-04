interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        Explanation: <span className="explanation">{props.text}</span>
    </>
)

export const QuestionExplanation = (props: ExplanationProps) => <p className="question-explanation">{props.text}</p>
