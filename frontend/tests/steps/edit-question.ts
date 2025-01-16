import { Before, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CreateQuestionPage } from '../pages'
import { worldAs } from './common'
import type { Question } from './question'

interface EditQuestionWorld {
    editQuestionPage: CreateQuestionPage
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<EditQuestionWorld>()
const openEditPage = async () => world.editQuestionPage.goto()
Before(() => {
    world.editQuestionPage = new CreateQuestionPage(world.page, '/question/:id/edit')
})
When('I start editing question {string}', async (bookmark: string) => {
    await openEditPage()
    world.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async () => {
    const question = await world.editQuestionPage.questionLocator().inputValue()
    expect(question).toBe(world.bookmarks[world.activeBookmark].question)
})
