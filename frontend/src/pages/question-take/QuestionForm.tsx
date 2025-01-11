import type { QuizQuestion } from '../../model/quiz-question.ts'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { preventDefault } from '../../helpers.ts'
import { isMultipleAnswersCorrect, type MultipleAnswerResult } from '../../services/QuizQuestionService.ts'
import { QuestionExplanation } from './Explanation.tsx'
import { Feedback } from './Feedback.tsx'
import './questionForm.css'
import { Answer, type UserAnswer } from './Answer.tsx'

export const QuestionForm = ({
    id,
    question,
    answers,
    explanations,
    correctAnswers,
    questionExplanation,
}: QuizQuestion) => {
    const [selectedAnswer, setSelectedAnswer] = createSignal<number | null>(null)
    const [isAnswerCorrect, setIsAnswerCorrect] = createSignal(false)
    //const [setExplanation] = createSignal<string | ''>('')
    //const [_, setExplanationIdx] = createSignal<number | null>(null)
    const [answersRequiringFeedback, setAnswersRequiringFeedback] = createSignal<number[]>([])

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = createSignal<number[]>([])
    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([...selectedAnswerIdxs(), idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(selectedAnswerIdxs().filter(i => i !== idx))

    const [submitted, setSubmitted] = createSignal(false)

    const isMultiple = correctAnswers.length > 1

    const submitMultiple = preventDefault(async () => {
        if (selectedAnswerIdxs().length === 0) return

        isMultipleAnswersCorrect(id, selectedAnswerIdxs()).then((result: MultipleAnswerResult) => {
            setSubmitted(true)

            setIsAnswerCorrect(result.questionAnsweredCorrectly)
            setAnswersRequiringFeedback(result.answersRequiringFeedback)
        })
    })

    const handleAnswerChange = (event: UserAnswer) => {
        const { index, value } = event
        setSubmitted(false)

        if (isMultiple) {
            if (value) addSelectedAnswerIdx(index)
            else removeSelectedAnswerIdx(index)
        } else setSelectedAnswerIdx(index)

        if (!isMultiple) {
            setSelectedAnswer(index)
        }
    }

    return (
        <form onSubmit={submitMultiple}>
            <h1>{question}</h1>
            <ul>
                <For each={answers}>
                    {(answer, idx) => {
                        const isFeedbackRequired = createMemo(() => answersRequiringFeedback().some(id => id === idx()))
                        return (
                            <Answer
                                answer={answer}
                                idx={idx()}
                                explanation={explanations ? explanations[idx()] : 'not defined'}
                                isMultiple={isMultiple}
                                handleAnswerChange={handleAnswerChange}
                                isFeedbackRequired={isFeedbackRequired}
                                isSubmitted={submitted}
                                selectedIdx={selectedAnswer}
                            />
                        )
                    }}
                </For>
            </ul>
            <div class="btn-row">
                <input type="submit" class="submit-btn" value={'Submit'} />
            </div>
            <Show when={submitted()} children={Feedback(isAnswerCorrect())} keyed />
            <Show when={submitted()} children={QuestionExplanation(questionExplanation)} />
        </form>
    )
}
