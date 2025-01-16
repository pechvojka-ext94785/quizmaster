import { Before, Then, When } from '@cucumber/cucumber'
import { CreateQuestionPage } from '../pages'
import { expectTextToBe, worldAs } from './common'
import type { Question } from './question'

interface EditQuestionWorld {
    editQuestionPage: CreateQuestionPage
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<EditQuestionWorld>()
const openEditPage = async () => world.editQuestionPage.goto()
Before(() => {
    world.editQuestionPage = new CreateQuestionPage(world.page)
})
When('I start editing question {string}', async (bookmark: string) => {
    await openEditPage()
    world.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async () => {
    await expectTextToBe(world.editQuestionPage.questionLocator(), world.bookmarks[world.activeBookmark].question)
})
