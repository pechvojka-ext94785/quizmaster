import { Then, When, Before } from '@cucumber/cucumber'
import { type World, worldAs, expectTextToBe } from './common'
import { QuizScorePage } from '../pages/quiz-score-page'
import { expect } from '@playwright/test'

interface QuizScoreWorld {
    QuizScorePage: QuizScorePage
}

const world = worldAs<QuizScoreWorld>()
Before(() => {
    world.QuizScorePage = new QuizScorePage(world.page)
})

When('I open the page with {int} questions', async function (this: World, count: number) {
    await this.page.goto(`/quiz/fakeCreate?count=${count}`)
})

Then('I should see heading "Quiz start"', async function (this: World) {
    await expectTextToBe(world.QuizScorePage.headerLocator(), 'Quiz start')
})

Then('I see the question and the answers tmp', async function (this: World) {
    const questionText = await world.QuizScorePage.paragraphLocator().textContent()
    expect(questionText).toMatch(/^Q: .{10}$/)
    const listItems = await world.QuizScorePage.listLocator().allTextContents()
    expect(listItems.length).toBeGreaterThan(0)
})
