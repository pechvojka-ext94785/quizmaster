import type { Page } from '@playwright/test'

export class QuizPage {
    constructor(private page: Page) {}

    next_question_btn = () => this.page.locator('button#next-question')

    submit = () => this.page.locator('button#next-question').click()
}
