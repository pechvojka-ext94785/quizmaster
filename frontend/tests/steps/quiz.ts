import { Before, Given, When, Then, world } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { type World, expectTextToBe } from './common.ts'
import { QuizPage } from '../pages/quiz-page'

Before(() => {
    world.quizPage = new QuizPage(world.page)
})

Given('I visit the quiz page', async function (this: World) {
    await this.page.goto('/quiz')
})

Then('I should see heading "Quiz"', async function (this: World) {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the first question', async () => {
    const firstQuestion = world.bookmarks.Sky
    await expectTextToBe(world.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I should see the next button', async () => {
    await expect(world.quizPage.next_question_btn()).toBeVisible()
})

Then('I should not see the next button', async () => {
    // Write code here that turns the phrase above into concrete actions
    await expect(world.quizPage.next_question_btn()).not.toBeVisible()
})

When('I click the next button', async () => {
    await world.quizPage.submit()
})
Then('I should see the next question', async () => {
    const secondQuestion = world.bookmarks.France
    await expectTextToBe(world.takeQuestionPage.questionLocator(), secondQuestion.question)
})
