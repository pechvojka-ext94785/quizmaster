import './correctness.css'

interface AnswerCorrectnessProps {
    readonly isCorrect: boolean
    readonly isChecked: boolean
}

export const AnswerCorrectness = (props: AnswerCorrectnessProps) => {
    const evaluation = props.isCorrect ? '\u2705' : '\u274C';
    const individualFeedback = props.isCorrect ? 'Correct!' : !props.isCorrect && props.isChecked ? 'Incorrect!' : 'You missed it!'

    const className = props.isCorrect ? 'correct' : !props.isCorrect && props.isChecked ? 'incorrect' : 'missed'

    return <span>{evaluation} <span className={`feedback ${className}`}>{individualFeedback}</span></span>
}
