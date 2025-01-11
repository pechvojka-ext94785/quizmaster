import { Show } from 'solid-js'
import { Correctness, Explanation } from 'pages/question-take'

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
