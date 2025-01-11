import type { QuizQuestion } from '../../model/quiz-question.ts'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import { QuestionExplanation } from './Explanation.tsx'
import { Feedback } from './Feedback.tsx'
import './questionForm.css'
import { Answer, type UserAnswer } from './Answer.tsx'

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

    const wrongAnswers = createMemo(() =>
        isMultiple
            ? [
                  ...selectedAnswerIdxs().filter(idx => !correctAnswers.includes(idx)),
                  ...correctAnswers.filter(idx => !selectedAnswerIdxs().includes(idx)),
              ]
            : [selectedAnswerIdxs()[0] ?? -1],
    )

    const [submitted, setSubmitted] = createSignal(false)

    const submitMultiple = preventDefault(() => {
        if (selectedAnswerIdxs().length > 0) setSubmitted(true)
    })

    const handleAnswerChange = (event: UserAnswer) => {
        const { index, value } = event
        setSubmitted(false)

        if (isMultiple) {
            if (value) addSelectedAnswerIdx(index)
            else removeSelectedAnswerIdx(index)
        } else setSelectedAnswerIdx(index)
    }

    return (
        <form onSubmit={submitMultiple}>
            <h1>{question}</h1>
            <ul>
                <For each={answers}>
                    {(answer, idx) => {
                        const isFeedbackRequired = createMemo(() => wrongAnswers().some(id => id === idx()))
                        return (
                            <Answer
                                answer={answer}
                                idx={idx()}
                                explanation={explanations ? explanations[idx()] : 'not defined'}
                                isMultiple={isMultiple}
                                handleAnswerChange={handleAnswerChange}
                                isFeedbackRequired={isFeedbackRequired}
                                isSubmitted={submitted}
                            />
                        )
                    }}
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
