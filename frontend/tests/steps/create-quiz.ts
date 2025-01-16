import { Before, Given, Then, When } from '@cucumber/cucumber'
import type { Question } from './question.ts'
import type { Quiz } from './quiz.ts'
import { TakeQuestionPage } from '../pages'

import { worldAs } from './common.ts'

interface CreateQuizWorld {
    quizTakingPage: TakeQuestionPage
    bookmarks: Record<string, Question>
    quiz: Quiz
}

const world = worldAs<CreateQuizWorld>()

Before(() => {
    world.quiz = { questions: [], actualQuestionNumber: 0 }
    world.bookmarks = {}
    world.quizTakingPage = new TakeQuestionPage(world.page)
})

Given('a quiz with questions {string}', async (questions: string) => {
    world.quiz.questions = questions.split(',').map(answer => answer.trim())
})

When('I start the quiz', async () => {
    await world.page.goto(world.bookmarks[world.quiz.questions[world.quiz.actualQuestionNumber]].url)
})

Then('I see question number {int}', async (questions: number) => {
    await world.page.goto(world.bookmarks[world.quiz.questions[questions - 1]].url)
})

When('I click {string}', async (name: string) => {
    await world.quizTakingPage.button(name)
    world.quiz.actualQuestionNumber++
})
