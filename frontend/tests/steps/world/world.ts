import type { IWorld } from '@cucumber/cucumber'
import type { Browser, BrowserContext, Page } from '@playwright/test'

import type { CreateQuestionPage, TakeQuestionPage } from '../../pages'
import type { Question } from './question'

export interface QuizmasterWorld extends IWorld {
    browser: Browser
    context: BrowserContext
    page: Page

    createQuestionPage: CreateQuestionPage
    quizTakingPage: TakeQuestionPage

    questionWip: Question
    nextAnswerIdx: number
    bookmarks: Record<string, Question>
    activeBookmark: string
}
