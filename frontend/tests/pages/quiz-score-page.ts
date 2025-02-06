import type { Page } from '@playwright/test'

export class QuizScorePage {
    constructor(private page: Page) {}

    headerLocator = () => this.page.locator('h1')

    submit = () => this.page.locator('input[type="submit"]').click()

    paragraphLocator = () => this.page.locator('p')
}
