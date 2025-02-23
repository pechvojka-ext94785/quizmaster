import { Before, Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe } from './common.ts'
import { QuizPage } from '../pages/quiz-page'
import type { QuizmasterWorld } from './world/world.ts'

Before(function (this: QuizmasterWorld) {
    this.quizPage = new QuizPage(this.page)
})

Given('I visit the quiz page', async function (this: QuizmasterWorld) {
    await this.page.goto('/quiz')
})

Then('I should see heading "Quiz"', async function (this: QuizmasterWorld) {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the first question', async function (this: QuizmasterWorld) {
    const firstQuestion = this.bookmarks.Sky
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I should see the next button', async function (this: QuizmasterWorld) {
    await expect(this.quizPage.next_question_btn()).toBeVisible()
})

Then('I should not see the next button', async function (this: QuizmasterWorld) {
    await expect(this.quizPage.next_question_btn()).not.toBeVisible()
})

When('I click the next button', async function (this: QuizmasterWorld) {
    await this.quizPage.submit()
})
Then('I should see the next question', async function (this: QuizmasterWorld) {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})
