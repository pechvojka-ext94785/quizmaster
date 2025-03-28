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
    await expect(this.quizPage.nextQuestionButtonLocator()).toBeVisible()
})

Then('I should not see the next button', async function () {
    await expect(this.quizPage.nextQuestionButtonLocator()).not.toBeVisible()
})

When('I click the next button', async function () {
    await this.quizPage.next()
})
Then('I should see the next question', async function () {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})

Then('I should see the evaluate button', async function () {
    await expect(this.quizPage.evaluationButtonLocator()).toBeVisible()
})

Then('I should not see the evaluate button', async function () {
    await expect(this.quizPage.evaluationButtonLocator()).not.toBeVisible()
})

Then('I click the evaluate button', async function () {
    await this.quizPage.evaluationButtonLocator().click()
    const redirectedURL = this.page.url()
    expect(redirectedURL).toContain('/evaluation')
})

Given('I refresh page', async function () {
    await this.page.reload()
})

Then('I should see answer {string} is checked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).toBeChecked()
    }
})

Then('I should see answer {string} is unchecked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).not.toBeChecked()
    }
})
