import { Show } from 'solid-js'
import { AnswerFeedback } from 'pages/question-take'

export type UserAnswer = {
    readonly index: number
    readonly value: boolean
}

export type AnswerProps = {
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly showFeedback: boolean
    readonly isMultiple: boolean
    readonly handleAnswerChange: (value: UserAnswer) => void
}

export const Answer = (props: AnswerProps) => {
    const answerId: string = `answer-${props.idx}`

    const handleCheckboxChange = (event: InputEvent) => {
        const { checked } = event.target as HTMLInputElement
        props.handleAnswerChange({
            index: props.idx,
            value: checked,
        })
    }

    const handleRadioChange = () => {
        props.handleAnswerChange({
            index: props.idx,
            value: true,
        })
    }
    //<!--checked={selectedAnswers()?.[idx]}-->
    if (props.isMultiple) {
        return (
            <li class="answerOption">
                <input
                    type={'checkbox'}
                    name={`${props.idx}`}
                    id={answerId}
                    value={props.answer}
                    onInput={handleCheckboxChange}
                />
                <label for={answerId}>
                    {props.answer}
                    <Show when={props.showFeedback} keyed>
                        <AnswerFeedback correct={props.isCorrect} explanation={props.explanation} />
                    </Show>
                </label>
            </li>
        )
    }

    return (
        <li>
            <input type={'radio'} name={'answer'} id={answerId} value={props.answer} onClick={handleRadioChange} />
            <label for={answerId}>
                {props.answer}
                <Show when={props.showFeedback} keyed>
                    <AnswerFeedback correct={props.isCorrect} explanation={props.explanation} />
                </Show>
            </label>
        </li>
    )
}
