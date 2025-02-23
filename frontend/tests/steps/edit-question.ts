import { Before, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CreateQuestionPage } from '../pages'
import { worldAs } from './common'
import type { QuizmasterWorld } from './world/world'

const world = worldAs<QuizmasterWorld>()
const openEditPage = async (bookmark: string) => world.editQuestionPage.goto(`${world.bookmarks[bookmark].url}/edit`)
Before(() => {
    world.editQuestionPage = new CreateQuestionPage(world.page)
})
When('I start editing question {string}', async (bookmark: string) => {
    await openEditPage(bookmark)
    world.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async () => {
    await world.page.waitForSelector('#is-loaded[value="loaded"]', { state: 'hidden' })

    const question = await world.editQuestionPage.questionLocator().inputValue()
    expect(question).toBe(world.bookmarks[world.activeBookmark].question)
})

When('I change question to {string}', async (newQuestion: string) => {
    await world.editQuestionPage.questionLocator().fill(newQuestion)
})

When('I save it', async () => {
    await world.editQuestionPage.submit()
})

Then('I see unchanged url', async () => {
    const link = await world.editQuestionPage.questionUrlLocator().textContent()
    expect(link).toBe(world.bookmarks[world.activeBookmark].url)
})
