import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { activeQuestion, type QuizmasterWorld } from './world/world'

const openEditPage = async (world: QuizmasterWorld, bookmark: string) =>
    world.createQuestionPage.goto(`${world.bookmarks[bookmark].url}/edit`)

When('I start editing question {string}', async function (this: QuizmasterWorld, bookmark: string) {
    await openEditPage(this, bookmark)
    this.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async function (this: QuizmasterWorld) {
    await this.page.waitForSelector('#is-loaded[value="loaded"]', { state: 'hidden' })

    const question = await this.createQuestionPage.questionLocator().inputValue()
    expect(question).toBe(activeQuestion(this).question)
})

When('I change question to {string}', async function (this: QuizmasterWorld, newQuestion: string) {
    await this.createQuestionPage.questionLocator().fill(newQuestion)
})

When('I save it', async function (this: QuizmasterWorld) {
    await this.createQuestionPage.submit()
})

Then('I see unchanged url', async function (this: QuizmasterWorld) {
    const link = await this.createQuestionPage.questionUrlLocator().textContent()
    expect(link).toBe(activeQuestion(this).url)
})
