import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    questionLocator = () => this.page.locator('h1')

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) =>
        this.page.locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)

    answerExplanationLocatorForAnswer = (answer: string) =>
        this.page
            .locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)
            .locator('..')
            .locator('span.explanation')

    selectAnswer = (answer: string) => this.answerLocator(answer).check()

    submit = () => this.page.locator('input[type="submit"]').click()

    feedbackLocator = () => this.page.locator('p.question-correctness')

    answerExplanationLocator = () => this.page.locator('span.explanation')

    questionExplanationLocator = () => this.page.locator('p.question-explanation')

    evaluateButtonLocator = () => this.page.locator('#evaluate-button')
}
