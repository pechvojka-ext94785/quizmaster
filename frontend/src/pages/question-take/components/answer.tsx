import type React from 'react'
import { useState } from 'react'

import { AnswerFeedback } from 'pages/question-take'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
    readonly isChecked?: boolean
}

export const Answer = (props: AnswerProps) => {
    const answerId = `answer-row-${props.idx}`
    const checkType = props.isMultipleChoice ? 'checkbox' : 'radio'
    const checkName = props.isMultipleChoice ? answerId : 'answer'
    const [isChecked, setIsChecked] = useState(() => props.isChecked ?? false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked)
        props.onAnswerChange(props.idx, event.target.checked)
    }

    return (
        <li data-test-id={`answer-row-${props.answer}`} key={props.idx}>
            <input
                type={checkType}
                name={checkName}
                id={answerId}
                value={props.answer}
                onChange={onChange}
                defaultChecked={isChecked}
            />
            <label htmlFor={answerId}>
                {props.answer}
                {props.showFeedback && (
                    <AnswerFeedback
                        correct={props.isCorrect}
                        explanation={props.explanation}
                        isChecked={isChecked}
                        isMultipleChoice={props.isMultipleChoice}
                    />
                )}
            </label>
            <br />
            <br />
        </li>
    )
}
