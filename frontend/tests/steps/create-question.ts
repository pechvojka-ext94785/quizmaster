import { Before, type DataTable, Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { type TableOf, worldAs } from './common.ts'
import type { Question } from './question.ts'
import { CreateQuestionPage } from '../pages'

type AnswerRaw = [string, '*' | '', string]

interface CreateQuestionWorld {
    createQuestionPage: CreateQuestionPage
    questionWip: Question
    nextAnswerIdx: number
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<CreateQuestionWorld>()

// if change this value, also change in frontend/src/pages/create-question/create-question.tsx
const NUM_ANSWERS = 2

Before(() => {
    world.createQuestionPage = new CreateQuestionPage(world.page)
    world.nextAnswerIdx = 0
    world.bookmarks = {}
})

const openCreatePage = async () => {
    world.createQuestionPage.goto('/question/new')
    world.questionWip = { url: '', question: '', answers: [], explanation: '' }
}

const enterQuestion = async (question: string) => {
    await world.createQuestionPage.enterQuestion(question)
    world.questionWip.question = question
}

const enterAnswer = async (index: number, answer: string, isCorrect: boolean, explanation: string) => {
    await world.createQuestionPage.enterAnswer(index, answer, isCorrect, explanation)
    world.questionWip.answers[index] = { answer, isCorrect, explanation }
}

const saveQuestion = async (bookmark: string) => {
    await world.createQuestionPage.submit()
    world.questionWip.url = (await world.createQuestionPage.questionUrl()) || ''
    world.bookmarks[bookmark] = world.questionWip
}

const addAnswer = async (i: number) => {
    await world.createQuestionPage.clickAddAnswerButton(i)
}

Given('a question {string}', async (question: string) => {
    await openCreatePage()
    await enterQuestion(question)
})

Given('with answers:', async (answerRawTable: TableOf<AnswerRaw>) => {
    const raw = answerRawTable.raw()

    for (let i = 0; i < raw.length; i++) {
        if (i >= NUM_ANSWERS) await addAnswer(i)
        const [answer, correct, explanation] = raw[i]
        const isCorrect = correct === '*'
        await enterAnswer(i, answer, isCorrect, explanation || '')
    }
})

Given('with explanation {string}', async (explanation: string) => {
    await world.createQuestionPage.enterQuestionExplanation(explanation)
    world.questionWip.explanation = explanation
})

Given('saved and bookmarked as {string}', saveQuestion)

Given('I start creating a question', openCreatePage)

Given('which displays only incorrect answer explanations', async () => {
    await world.createQuestionPage.setExplanationsAlways(false)
})
Given('which displays all answer explanations', async () => {
    await world.createQuestionPage.setExplanationsAlways(true)
})

When('I enter question {string}', enterQuestion)

When(/^I add the answer "(.*)" marked as (correct|incorrect)$/, async (answer: string, correct: string) => {
    await enterAnswer(world.nextAnswerIdx++, answer, correct === 'correct', '')
})

When('I add an additional answer field', async () => await addAnswer(world.nextAnswerIdx))

When('I save the question', async () => await saveQuestion('manual'))

When('I take the question', async () => {
    await world.page.goto(world.questionWip.url)
    world.activeBookmark = 'manual'
})

When('I try saving the question', async () => {
    await world.createQuestionPage.submit()
})

Then('I see a link to take the question', async () => {
    const url = await world.createQuestionPage.questionUrl()
    expect(url).not.toBe('')
})

Then('I see an error message', async () => {
    const errorMessage = await world.createQuestionPage.getErrorMessage()
    expect(errorMessage).not.toBe('')
})

Then('I see 2 answers', async () => {
    await expect(world.createQuestionPage.answerTextLocator(0)).toBeVisible()
    await expect(world.createQuestionPage.answerTextLocator(1)).toBeVisible()
})

Then(/^Multiple choice is (checked|unchecked)$/, async (state: string) => {
    const expected = state === 'checked'
    const isChecked = await world.createQuestionPage.multipleChoiceLocator().isChecked()
    expect(isChecked).toBe(expected)
})

Then('I see empty question', async () => {
    await expect(world.createQuestionPage.questionLocator).not.toBe('')
})

/*Then('I see empty answer', async () => {
    let index = 0
    let existsElement = 1
    do {
        const textAreaLoc = world.createQuestionPage.answerTextLocator(index)

        // Check if the text area is visible
        await expect(textAreaLoc).toBeVisible()

        const isVisible = await textAreaLoc.isVisible()

        if (isVisible) {
            // Get the value of the text area
            const textAreaContent = await textAreaLoc.inputValue()

            // Check that the text area is not empty
            await expect(textAreaContent).not.toBeNull()
        } else {
            existsElement = 0
        }

        index++
    } while (existsElement > 0)
})*/
