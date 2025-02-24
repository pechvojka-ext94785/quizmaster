import { expect } from '@playwright/test'
import { Then, When } from './fixture.ts'

When('I start editing question {string}', async function (bookmark: string) {
    this.createQuestionPage.gotoEdit(this.bookmarks[bookmark].url)
    this.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async function () {
    await this.createQuestionPage.waitForLoaded()

    const question = await this.createQuestionPage.questionValue()
    expect(question).toBe(this.activeQuestion.question)
})

When('I change question to {string}', async function (newQuestion: string) {
    await this.createQuestionPage.enterQuestion(newQuestion)
})

When('I save it', async function () {
    await this.createQuestionPage.submit()
})

Then('I see unchanged url', async function () {
    const link = await this.createQuestionPage.questionUrl()
    expect(link).toBe(this.activeQuestion.url)
})
