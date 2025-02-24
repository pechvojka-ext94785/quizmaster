import type { Page } from '@playwright/test'

export class CreateQuestionPage {
    constructor(private page: Page) {}

    goto = (url: string) => this.page.goto(url)

    questionLocator = () => this.page.locator('#question-text')

    enterQuestion = (question: string) => this.questionLocator().fill(question)

    multipleChoiceLocator = () => this.page.locator('#is-multiple-choice')

    isCorrectCheckboxLocator = (answerText: string) =>
        this.page.locator(`[id^=answer-text-][value="${answerText}"]+[id^=answer-checkbox-]`)

    isCorrectCheckboxesLocator = () => this.page.locator('[id^=answer-checkbox-]')

    setMultipleChoice = () => this.multipleChoiceLocator().check()

    setSingleChoice = () => this.multipleChoiceLocator().uncheck()

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

    errorMessage = () => this.page.textContent('#error-message')
}
