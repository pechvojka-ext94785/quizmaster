interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        Explanation: <span class="explanation">{props.text}</span>
    </>
)

export const QuestionExplanation = (props: ExplanationProps) => <p class="question-explanation">{props.text}</p>
