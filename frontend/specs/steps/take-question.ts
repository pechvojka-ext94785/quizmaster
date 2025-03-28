import type { DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { expectTextToBe, expectTextToContain } from './common.ts'
import { Then, When } from './fixture.ts'

When('I take question {string}', async function (bookmark: string) {
    await this.page.goto(this.bookmarks[bookmark].url)
    this.activeBookmark = bookmark
})

Then('I see the question and the answers', async function () {
    await expectTextToBe(this.takeQuestionPage.questionLocator(), this.activeQuestion.question)
    const answers = this.activeQuestion.answers
    const answerLocators = this.takeQuestionPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

When('I answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.selectAnswer(answer)
    }
    await this.takeQuestionPage.submit()
})

When('I uncheck answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.unselectAnswer(answer)
    }
})

When('I check answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.selectAnswer(answer)
    }
})

When('I submit question', async function () {
    await this.takeQuestionPage.submit()
})

Then('I see feedback {string}', async function (feedback: string) {
    await expectTextToBe(this.takeQuestionPage.feedbackLocator(), `The answer is:\u00A0${feedback}`)
})

Then('no answer is selected', async function () {
    await expect(await this.takeQuestionPage.selectedAnswersLocator().count()).toBe(0)
})

Then('I see the answer explanation {string}', async function (answerExplanation: string) {
    await expectTextToBe(this.takeQuestionPage.answerExplanationLocator(), answerExplanation)
})

Then('I see the question explanation', async function () {
    await expectTextToBe(this.takeQuestionPage.questionExplanationLocator(), this.activeQuestion.explanation)
})

Then(/^I see the answer explanations for answers$/, async function (data: DataTable) {
    for (const row of data.rows()) {
        const [answer, expectedExplanation] = row
        const answerExplanationLocator =
            expectedExplanation !== ''
                ? this.takeQuestionPage.answerExplanationLocatorForAnswer(answer)
                : this.takeQuestionPage.emptyAnswerExplanationLocatorForAnswer(answer)
        await expectTextToBe(answerExplanationLocator, expectedExplanation)
    }
})

Then('I see the {string} question for the quiz', async function (questionName: string) {
    await expectTextToContain(this.takeQuestionPage.questionLocator(), questionName)
})

Then('I see individual feedback:', async function (dataTable: DataTable) {
    const rows = dataTable.hashes()

    for (const row of rows) {
        const { answer, evaluation, feedback } = row
        const answerRow = this.page.locator(`[data-test-id="answer-row-${answer}"]`)
        await expect(answerRow).toContainText(evaluation)
        await expect(answerRow).toContainText(feedback)
    }
})
