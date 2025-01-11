import './question-form.css'
import { type Accessor, createMemo, For, Show } from 'solid-js'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'
import { Answer, createQuestionTakeState, QuestionCorrectness, QuestionExplanation } from 'pages/question-take'


interface QuestionFormProps {
    readonly question: Accessor<QuizQuestion>
}

export const QuestionForm = (props: QuestionFormProps) => {
    const question = props.question
    const state = createQuestionTakeState(question)

    const isQuestionCorrect = createMemo(
        () =>
            state.selectedAnswerIdxs().length === question().correctAnswers.length &&
            state.selectedAnswerIdxs().every(idx => question().correctAnswers.includes(idx)),
    )

    const isAnswerCorrect = (idx: number) =>
        (question().correctAnswers.includes(idx) && state.selectedAnswerIdxs().includes(idx)) ||
        (!question().correctAnswers.includes(idx) && !state.selectedAnswerIdxs().includes(idx))

    const showFeedback = (idx: number) =>
        state.isMultipleChoice() ? !isAnswerCorrect(idx) : state.selectedAnswerIdxs()[0] === idx

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
                            isCorrect={isAnswerCorrect(idx())}
                            explanation={question().explanations ? question().explanations[idx()] : 'not defined'}
                            showFeedback={state.submitted() && showFeedback(idx())}
                            onAnswerChange={state.onSelectedAnswerChange}
                        />
                    )}
                </For>
            </ul>
            <div class="btn-row">
                <input type="submit" class="submit-btn" value={'Submit'} />
            </div>
            <Show when={state.submitted()}>
                <QuestionCorrectness isCorrect={isQuestionCorrect()} />
            </Show>
            <Show when={state.submitted()}>
                <QuestionExplanation text={question().questionExplanation} />
            </Show>
        </form>
    )
}
