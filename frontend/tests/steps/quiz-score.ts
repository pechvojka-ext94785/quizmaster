import { Before, Given, Then, When } from '@cucumber/cucumber'
import { type World, worldAs, expectTextToBe } from './common'
import { QuizScorePage } from '../pages/quiz-score-page'

interface QuizScoreWorld {
    QuizScorePage: QuizScorePage
}

const world = worldAs<QuizScoreWorld>()
Before(() => {
    world.QuizScorePage = new QuizScorePage(world.page)
})

Given('I visit the Fake last question', async function (this: World) {
    await this.page.goto('/quiz/fakeLast')
})

Given(
    'I visit the Fake last question with {int} correct answers out of {int} questions',
    async function (this: World, correct: number, count: number) {
        await this.page.goto(`/quiz/fakeLast?correct=${correct}&count=${count}`)
    },
)

When('I click the submit button', async function (this: World) {
    await world.QuizScorePage.submit()
})

Then('I should see heading "Quiz Score"', async function (this: World) {
    await expectTextToBe(world.QuizScorePage.headerLocator(), 'Quiz Score')
})

Then('I should see the text {string}', async function (this: World, score: string) {
    await expectTextToBe(world.QuizScorePage.paragraphLocator(), score)
})
