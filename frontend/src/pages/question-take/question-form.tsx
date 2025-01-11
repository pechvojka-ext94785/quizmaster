import './question-form.css'
import { type Accessor, For, Show } from 'solid-js'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'
import {
    Answer,
    createQuestionFeedbackState,
    createQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'

interface QuestionFormProps {
    readonly question: Accessor<QuizQuestion>
}

export const QuestionForm = (props: QuestionFormProps) => {
    const question = props.question
    const state = createQuestionTakeState(question)
    const feedback = createQuestionFeedbackState(state, question)

    const submitAnswers = preventDefault(() => {
        if (state.selectedAnswerIdxs().length > 0) state.submit()
    })

    return (
        <form onSubmit={submitAnswers}>
            <h1>{question().question}</h1>
            <ul>
                <For each={question().answers}>
                    {(answer, idx) => (
                        <Answer
                            isMultipleChoice={state.isMultipleChoice()}
                            idx={idx()}
                            answer={answer}
                            isCorrect={feedback.isAnswerCorrect(idx())}
                            explanation={question().explanations ? question().explanations[idx()] : 'not defined'}
                            showFeedback={state.submitted() && feedback.showFeedback(idx())}
                            onAnswerChange={state.onSelectedAnswerChange}
                        />
                    )}
                </For>
            </ul>
            <input type="submit" value="Submit" />
            <Show when={state.submitted()}>
                <QuestionCorrectness isCorrect={feedback.isQuestionCorrect()} />
            </Show>
            <Show when={state.submitted()}>
                <QuestionExplanation text={question().questionExplanation} />
            </Show>
        </form>
    )
}
