import type { QuizQuestion } from '../../model/quiz-question.ts'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import { QuestionExplanation } from './Explanation.tsx'
import { Feedback } from './Feedback.tsx'
import './questionForm.css'
import { Answer } from './Answer.tsx'

export const QuestionForm = ({
    question,
    answers,
    explanations,
    correctAnswers,
    questionExplanation,
}: QuizQuestion) => {
    const isMultiple = correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = createSignal<number[]>([])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([...selectedAnswerIdxs(), idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(selectedAnswerIdxs().filter(i => i !== idx))

    const onSelectedAnswerChange = (idx: number, selected: boolean) => {
        if (selected) addSelectedAnswerIdx(idx)
        else removeSelectedAnswerIdx(idx)
    }

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
            <Show when={submitted()} children={Feedback(isQuestionCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}
