import { Given, Then, world } from '@cucumber/cucumber'
import { type World, expectTextToBe } from './common.ts'

Given('I visit the quiz page', async function (this: World) {
    await this.page.goto('/quiz')
})

Given('a quiz containing questions {string1} and {string2}', () => {})

Then('I should see heading "Quiz"', async function (this: World) {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the first question', async () => {
    const firstQuestion = world.bookmarks.Sky
    await expectTextToBe(world.quizTakingPage.questionLocator(), firstQuestion.question)
})
