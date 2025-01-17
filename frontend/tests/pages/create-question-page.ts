import type { Page } from '@playwright/test'

export class CreateQuestionPage {
    constructor(private page: Page) {}

    goto = (url: string) => this.page.goto(url)

    questionLocator = () => this.page.locator('#question-text-area')

    enterQuestion = (question: string) => this.questionLocator().fill(question)

    multipleChoiceLocator = () => this.page.locator('.multipleQuestionsRow > input')

    setMultipleChoice = () => this.multipleChoiceLocator().check()

    checkExplanationsAlways = (value: boolean) => {
        if (value) this.page.locator('#show-explanations-always').check()
        else this.page.locator('#show-explanations-always').uncheck()
    }

    async setExplanationsAlways(always: boolean) {
        const checkbox = await this.page.$('#show-explanations-always')
        const isChecked = await checkbox.isChecked()
        if (isChecked !== always) {
            await checkbox.click()
        }
    }

    enterAnswer = async (index: number, value: string, correct: boolean, explanation: string) => {
        const value1 = index + 1
        await this.page.fill(`#answer-text-${String(value1)}`, value)

        if (explanation) await this.page.fill(`#answer-explanation-${String(value1)}`, explanation)

        if (correct) await this.page.check(`#answer-checkbox-${String(value1)}`)
    }

    enterGeneralExplanation = (question: string) => this.page.fill('textArea.generalExplanation', question)

    clickAddAnswerButton = async (idx: number) => {
        await this.page.locator('button.addAnswerButton').click()
        await this.page.waitForSelector(`#answer-text-${String(idx + 1)}`)
    }

    submit = () => this.page.locator('button.submitButton').click()

    questionUrlLocator = () => this.page.locator('#question-link')

    questionUrl = () => this.questionUrlLocator().textContent()
}
