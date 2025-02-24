import type { Page } from '@playwright/test'

export class QuizPage {
    constructor(private page: Page) {}

    nextQuestionButtonLocator = () => this.page.locator('button#next-question')

    next = () => this.nextQuestionButtonLocator().click()
}
