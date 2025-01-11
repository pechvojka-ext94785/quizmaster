import { Correctness, Explanation } from 'pages/question-take'

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => (
    <span>
        &nbsp;
        <Correctness isCorrect={props.correct} />
        &nbsp;
        <Explanation text={props.explanation} />
    </span>
)
