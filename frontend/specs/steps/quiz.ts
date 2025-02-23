import { expect } from '@playwright/test'
import { expectTextToBe } from './common.ts'
import { Given, When, Then } from './fixture.ts'

Given('I visit the quiz page', async function () {
    await this.page.goto('/quiz')
})

Then('I should see heading "Quiz"', async function () {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the first question', async function () {
    const firstQuestion = this.bookmarks.Sky
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I should see the next button', async function () {
    await expect(this.quizPage.next_question_btn()).toBeVisible()
})

Then('I should not see the next button', async function () {
    await expect(this.quizPage.next_question_btn()).not.toBeVisible()
})

When('I click the next button', async function () {
    await this.quizPage.submit()
})
Then('I should see the next question', async function () {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})
