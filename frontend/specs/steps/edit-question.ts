import { expect } from '@playwright/test'
import { Then, When } from './fixture.ts'
import type { QuizmasterWorld } from './world/world'

const openEditPage = async (world: QuizmasterWorld, bookmark: string) =>
    world.createQuestionPage.goto(`${world.bookmarks[bookmark].url}/edit`)

When('I start editing question {string}', async function (bookmark: string) {
    await openEditPage(this, bookmark)
    this.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async function () {
    await this.page.waitForSelector('#is-loaded[value="loaded"]', { state: 'hidden' })

    const question = await this.createQuestionPage.questionLocator().inputValue()
    expect(question).toBe(this.activeQuestion.question)
})

When('I change question to {string}', async function (newQuestion: string) {
    await this.createQuestionPage.questionLocator().fill(newQuestion)
})

When('I save it', async function () {
    await this.createQuestionPage.submit()
})

Then('I see unchanged url', async function () {
    const link = await this.createQuestionPage.questionUrlLocator().textContent()
    expect(link).toBe(this.activeQuestion.url)
})
