import type { Page } from '@playwright/test'

export class CreateQuestionPage {
    constructor(private page: Page) {}

    goto = (url: string) => this.page.goto(url)

    questionLocator = () => this.page.locator('#question-text')

    enterQuestion = (question: string) => this.questionLocator().fill(question)

    multipleChoiceLocator = () => this.page.locator('#is-multiple-choice')

    setMultipleChoice = () => this.multipleChoiceLocator().check()

    async setExplanationsAlways(always: boolean) {
        const checkbox = await this.page.$('#show-explanations-always')
        if (checkbox) {
            const isChecked = await checkbox.isChecked()
            if (isChecked !== always) {
                await checkbox.click()
            }
        }
    }

    answerTextLocator = (index: number) => this.page.locator(`#answer-text-${index}`)

    enterAnswer = async (index: number, value: string, correct: boolean, explanation: string) => {
        await this.answerTextLocator(index).fill(value)

        if (explanation) await this.page.fill(`#answer-explanation-${index}`, explanation)

        if (correct) await this.page.check(`#answer-checkbox-${index}`)
    }

    questionExplanationLocator = () => this.page.locator('#question-explanation')

    enterQuestionExplanation = (question: string) => this.questionExplanationLocator().fill(question)

    clickAddAnswerButton = async (idx: number) => {
        await this.page.locator('button#add-answer').click()
        await this.page.waitForSelector(`#answer-text-${idx}`)
    }

    submit = () => this.page.locator('button[type="submit"]').click()

    questionUrlLocator = () => this.page.locator('#question-link')

    questionUrl = () => this.questionUrlLocator().textContent()

    async getErrorMessage(): Promise<string> {
        const errorMessage = await this.page.textContent('#error-message')
        return errorMessage ?? ''
    }

    async getOKStr(): Promise<string> {
        const errorMessage = await this.page.textContent('#ok-str')
        return errorMessage ?? ''
    }

    async getEmptyQuestionErrorMessage(): Promise<string> {
        const errorMessage = await this.page.textContent('#nok-emptyquestion')
        return errorMessage ?? ''
    }
}
