import './question-form.css'
import { type Accessor, For, Show } from 'solid-js'

import type { Quiz, QuizQuestion } from 'model/quiz-question.ts'
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
    quiz: Quiz | null
}

export const QuestionForm = (props: QuestionFormProps) => {
    const question = props.question
    const quiz = props.quiz
    const state = createQuestionTakeState(question)
    const feedback = createQuestionFeedbackState(state, question)



    const submitAnswers = preventDefault(() => {
        if (state.selectedAnswerIdxs().length > 0) state.submit()
    })

    const incrementActualQuestionNumber = () => {
        if (quiz && quiz.actualQuestionNumber < quiz.questions.length - 1) {
            quiz.actualQuestionNumber++
        } else if (quiz) {
            quiz.actualQuestionNumber = 0
        }
    }

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
            <Show when={!state.submitted()}>
                <input type="submit" value="Submit" />
            </Show>
            <Show when={state.submitted()}>
                <QuestionCorrectness isCorrect={feedback.isQuestionCorrect()} />
            </Show>
            <Show when={state.submitted()}>
                <QuestionExplanation text={question().questionExplanation} />
            </Show>
            <Show when={quiz}>
                <input type="button" value="Next" id="next" onclick={() => incrementActualQuestionNumber()} />
            </Show>
        </form>
    )
}
