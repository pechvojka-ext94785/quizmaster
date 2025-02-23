import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { worldAs } from './common'
import { activeQuestion, type QuizmasterWorld } from './world/world'

const world = worldAs<QuizmasterWorld>()
const openEditPage = async (bookmark: string) => world.createQuestionPage.goto(`${world.bookmarks[bookmark].url}/edit`)

When('I start editing question {string}', async (bookmark: string) => {
    await openEditPage(bookmark)
    world.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async () => {
    await world.page.waitForSelector('#is-loaded[value="loaded"]', { state: 'hidden' })

    const question = await world.createQuestionPage.questionLocator().inputValue()
    expect(question).toBe(activeQuestion(world).question)
})

When('I change question to {string}', async (newQuestion: string) => {
    await world.createQuestionPage.questionLocator().fill(newQuestion)
})

When('I save it', async () => {
    await world.createQuestionPage.submit()
})

Then('I see unchanged url', async () => {
    const link = await world.createQuestionPage.questionUrlLocator().textContent()
    expect(link).toBe(activeQuestion(world).url)
})
