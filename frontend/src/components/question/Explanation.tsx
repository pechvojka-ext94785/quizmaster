import { Show } from 'solid-js'


interface ExplanationProps {
    readonly correct: boolean
    readonly explanation: string
    readonly showExplanation: boolean
}

export const Explanation = (props: ExplanationProps) =>
    <span>
        {' '}
        <span class={props.correct ? 'greenSpan' : 'redSpan'}>{props.correct ? 'Correct!' : 'Incorrect!'}</span> &nbsp;
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

export const QuestionExplanation = (questionExplanation: string) => (
    <p class="questionExplanation">{questionExplanation}</p>
)
