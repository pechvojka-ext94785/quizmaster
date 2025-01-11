import { Show } from 'solid-js'

interface CorrectnessProps {
    readonly isCorrect: boolean
}

export const Correctness = (props: CorrectnessProps) => {
    const label = props.isCorrect ? 'Correct!' : 'Incorrect!'
    const className = props.isCorrect ? 'correct' : 'incorrect'

    return <span class={`feedback ${className}`}>{label}</span>
}

interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        Explanation: <span class="explanation">{props.text}</span>
    </>
)

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
    readonly showExplanation: boolean
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => (
    <span>
        &nbsp;
        <Correctness isCorrect={props.correct} />
        &nbsp;
        <Show when={props.showExplanation} keyed>
            <Explanation text={props.explanation} />
        </Show>
    </span>
)

export const QuestionExplanation = (questionExplanation: string) => (
    <p class="questionExplanation">{questionExplanation}</p>
)
