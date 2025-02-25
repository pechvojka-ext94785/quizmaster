interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        <br />
        Explanation: <span>{props.text}</span>
    </>
)

export const QuestionExplanation = (props: ExplanationProps) => <p>{props.text}</p>
