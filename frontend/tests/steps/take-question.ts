import { Before, type DataTable, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { expectTextToBe, expectTextToContain, expectThatIsNotVisible, worldAs } from './common.ts'
import { TakeQuestionPage } from '../pages'
import type { QuizmasterWorld } from './world/world.ts'

const world = worldAs<QuizmasterWorld>()
const activeQuestion = () => world.bookmarks[world.activeBookmark]

Before(() => {
    world.takeQuestionPage = new TakeQuestionPage(world.page)
})

When('I take question {string}', async (bookmark: string) => {
    await world.page.goto(world.bookmarks[bookmark].url)
    world.activeBookmark = bookmark
})

Then('I see the question and the answers', async () => {
    await expectTextToBe(world.takeQuestionPage.questionLocator(), activeQuestion().question)
    const answers = activeQuestion().answers
    const answerLocators = world.takeQuestionPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

When('I answer {string}', async (answerList: string) => {
    const answers = answerList.split(',').map(answer => answer.trim())
    for (const answer of answers) {
        await world.takeQuestionPage.selectAnswer(answer)
    }
    await world.takeQuestionPage.submit()
})

Then('I see feedback {string}', async feedback => {
    await expectTextToBe(world.takeQuestionPage.feedbackLocator(), `The answer is:\u00A0${feedback}`)
})

Then('I see the answer explanation {string}', async answerExplanation => {
    await expectTextToBe(world.takeQuestionPage.answerExplanationLocator(), answerExplanation)
})

Then('I see the question explanation', async () => {
    await expectTextToBe(world.takeQuestionPage.questionExplanationLocator(), activeQuestion().explanation)
})

Then(/^I see the answer explanations for answers$/, async (data: DataTable) => {
    for (const row of data.rows()) {
        if (row[1]) await expectTextToBe(world.takeQuestionPage.answerExplanationLocatorForAnswer(row[0]), row[1])
        else {
            // console.log(`${row[0]} should not be there`)
            await expectThatIsNotVisible(world.takeQuestionPage.answerExplanationLocatorForAnswer(row[0]))
        }
    }
})

Then('I see the {string} question for the quiz', async (questionName: string) => {
    await expectTextToContain(world.takeQuestionPage.questionLocator(), questionName)
})
