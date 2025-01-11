import './question-form.css'
import { createMemo, createSignal, For, Show } from 'solid-js'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { preventDefault } from 'helpers.ts'
import { Answer, QuestionCorrectness, QuestionExplanation } from 'pages/question-take'

export const QuestionForm = ({
    question,
    answers,
    explanations,
    correctAnswers,
    questionExplanation,
}: QuizQuestion) => {
    const isMultiple = correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = createSignal<number[]>([])
    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([...selectedAnswerIdxs(), idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(selectedAnswerIdxs().filter(i => i !== idx))

    const isQuestionCorrect = createMemo(
        () =>
            selectedAnswerIdxs().length === correctAnswers.length &&
            selectedAnswerIdxs().every(idx => correctAnswers.includes(idx)),
    )

    const isAnswerCorrect = (idx: number) =>
        (correctAnswers.includes(idx) && selectedAnswerIdxs().includes(idx)) ||
        (!correctAnswers.includes(idx) && !selectedAnswerIdxs().includes(idx))

    const showFeedback = (idx: number) => (isMultiple ? !isAnswerCorrect(idx) : selectedAnswerIdxs()[0] === idx)

    const [submitted, setSubmitted] = createSignal(false)

    const submitMultiple = preventDefault(() => {
        if (selectedAnswerIdxs().length > 0) setSubmitted(true)
    })

    const onSelectedAnswerChange = (idx: number, selected: boolean) => {
        setSubmitted(false)
        if (!isMultiple) setSelectedAnswerIdx(idx)
        else if (selected) addSelectedAnswerIdx(idx)
        else removeSelectedAnswerIdx(idx)
    }

    return (
        <form onSubmit={submitMultiple}>
            <h1>{question}</h1>
            <ul>
                <For each={answers}>
                    {(answer, idx) => (
                        <Answer
                            isMultipleChoice={isMultiple}
                            idx={idx()}
                            answer={answer}
                            isCorrect={isAnswerCorrect(idx())}
                            explanation={explanations ? explanations[idx()] : 'not defined'}
                            showFeedback={submitted() && showFeedback(idx())}
                            onAnswerChange={onSelectedAnswerChange}
                        />
                    )}
                </For>
            </ul>
            <div class="btn-row">
                <input type="submit" class="submit-btn" value={'Submit'} />
            </div>
            <Show when={submitted()}>
                <QuestionCorrectness isCorrect={isQuestionCorrect()} />
            </Show>
            <Show when={submitted()}>
                <QuestionExplanation text={questionExplanation} />
            </Show>
        </form>
    )
}
