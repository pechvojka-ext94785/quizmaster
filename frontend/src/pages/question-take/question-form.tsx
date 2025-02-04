import type { Quiz, QuizQuestion } from 'model/quiz-question.ts'
import {
    Answer,
    useQuestionFeedbackState,
    useQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'

interface QuestionFormProps {
    readonly question: QuizQuestion
    quiz: Quiz | null
}

export const QuestionForm = (props: QuestionFormProps) => {
    const state = useQuestionTakeState(props.question)
    const feedback = useQuestionFeedbackState(state, props.question)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state.selectedAnswerIdxs.length > 0) state.submit()
    }

    const incrementActualQuestionNumber = () => {
        if (props.quiz && props.quiz.actualQuestionNumber < props.quiz.questions.length - 1) {
            props.quiz.actualQuestionNumber++
        } else if (props.quiz) {
            props.quiz.actualQuestionNumber = 0
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{props.question.question}</h1>
            <ul>
                {props.question.answers.map((answer, idx) => {
                    // Create a unique key using stable values from the question
                    const uniqueKey = `${props.question.id}-${answer}-${props.question.explanations?.[idx] || ''}-${props.question.questionExplanation}`
                    return (
                        <Answer
                            key={uniqueKey}
                            isMultipleChoice={state.isMultipleChoice}
                            idx={idx}
                            answer={answer}
                            isCorrect={feedback.isAnswerCorrect(idx)}
                            explanation={props.question.explanations ? props.question.explanations[idx] : 'not defined'}
                            showFeedback={state.submitted && feedback.showFeedback(idx)}
                            onAnswerChange={state.onSelectedAnswerChange}
                        />
                    )
                })}
            </ul>
            {!state.submitted && <input type="submit" value="Submit" />}
            {state.submitted && <QuestionCorrectness isCorrect={feedback.isQuestionCorrect} />}
            {state.submitted && <QuestionExplanation text={props.question.questionExplanation} />}
            {props.quiz && <input type="button" value="Next" id="next" onClick={incrementActualQuestionNumber} />}
        </form>
    )
}
