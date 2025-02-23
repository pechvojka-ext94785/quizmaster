import type { Browser, BrowserContext, Page } from '@playwright/test'

import type { CreateQuestionPage, TakeQuestionPage } from '../../pages'
import type { Question } from './question'

export interface QuizmasterWorld {
    browser: Browser
    context: BrowserContext
    page: Page

    createQuestionPage: CreateQuestionPage
    takeQuestionPage: TakeQuestionPage

    questionWip: Question
    nextAnswerIdx: number
    bookmarks: Record<string, Question>
    activeBookmark: string
}

export const activeQuestion = (world: QuizmasterWorld) => world.bookmarks[world.activeBookmark]
