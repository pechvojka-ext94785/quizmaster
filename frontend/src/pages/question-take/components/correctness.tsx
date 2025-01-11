interface CorrectnessProps {
    readonly isCorrect: boolean
}

export const Correctness = (props: CorrectnessProps) => {
    const label = props.isCorrect ? 'Correct!' : 'Incorrect!'
    const className = props.isCorrect ? 'correct' : 'incorrect'

    return <span class={`feedback ${className}`}>{label}</span>
}
