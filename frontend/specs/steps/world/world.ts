import type { Page, TestInfo } from '@playwright/test'

import { CreateQuestionPage, QuizPage, TakeQuestionPage } from '../../pages'
import type { Question } from './question'

export class QuizmasterWorld {
    constructor(
        public page: Page,
        public testInfo: TestInfo,
    ) {
        this.createQuestionPage = new CreateQuestionPage(this.page)
        this.takeQuestionPage = new TakeQuestionPage(this.page)
        this.quizPage = new QuizPage(this.page)
    }

    readonly createQuestionPage: CreateQuestionPage
    readonly takeQuestionPage: TakeQuestionPage
    readonly quizPage: QuizPage

    questionWip: Question = { url: '', editUrl: '', question: '', answers: [], explanation: '' }
    nextAnswerIdx = 0
    bookmarks: Record<string, Question> = {}
    activeBookmark = ''

    get activeQuestion() {
        return this.bookmarks[this.activeBookmark]
    }

    parseAnswers(answersString: string) {
        return answersString.split(',').map(answer => answer.trim())
    }
}
