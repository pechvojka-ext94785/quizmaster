import { Show } from 'solid-js'

interface CorrectnessProps {
    readonly isCorrect: boolean
}

export const Correctness = (props: CorrectnessProps) => {
    const label = props.isCorrect ? 'Correct!' : 'Incorrect!'
    const className = props.isCorrect ? 'correct' : 'incorrect'

    return <span class={`feedback ${className}`}>{label}</span>
}

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
    readonly showExplanation: boolean
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => (
    <span>
        {' '}
        <Correctness isCorrect={props.correct} /> &nbsp;
        <Show
            when={props.showExplanation}
            children={
                <>
                    {'Explanation: '}
                    <span class="explanation">{props.explanation}</span>
                </>
            }
            keyed
        />
    </span>
)

export const QuestionExplanation = (questionExplanation: string) => (
    <p class="questionExplanation">{questionExplanation}</p>
)
