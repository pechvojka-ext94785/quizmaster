interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        Explanation: <span class="explanation">{props.text}</span>
    </>
)
