import { Show } from 'solid-js'
import { AnswerFeedback } from 'pages/question-take'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
}

export const Answer = (props: AnswerProps) => {
    const answerId = () => `answer-${props.idx}`
    const checkType = () => (props.isMultipleChoice ? 'checkbox' : 'radio')
    const checkName = () => (props.isMultipleChoice ? answerId() : 'answer')

    const onChange = (event: InputEvent) =>
        props.onAnswerChange(props.idx, (event.target as HTMLInputElement).checked)

    return (
        <li>
            <input type={checkType()} name={checkName()} id={answerId()} value={props.answer} onInput={onChange} />
            <label for={answerId()}>
                {props.answer}
                <Show when={props.showFeedback} keyed>
                    <AnswerFeedback correct={props.isCorrect} explanation={props.explanation} />
                </Show>
            </label>
        </li>
    )
}
