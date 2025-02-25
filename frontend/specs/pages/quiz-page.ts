import type { Page } from '@playwright/test'

export class QuizPage {
    constructor(private page: Page) {}

    nextQuestionButtonLocator = () => this.page.locator('button#next-question')
    evaluationButtonLocator = () => this.page.locator('#evaluate-button')

    next = () => this.nextQuestionButtonLocator().click()
    evaluate = () => this.evaluationButtonLocator().click()
}
