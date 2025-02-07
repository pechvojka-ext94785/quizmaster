import { Then, When, Before } from '@cucumber/cucumber'
import { type World, worldAs, expectTextToBe } from './common'
import { QuizScorePage } from '../pages/quiz-score-page'

interface QuizScoreWorld {
    QuizScorePage: QuizScorePage
}

const world = worldAs<QuizScoreWorld>()
Before(() => {
    world.QuizScorePage = new QuizScorePage(world.page)
})

When('I open the page', async function (this: World) {
    await this.page.goto('/quiz/fakeCreate')
})

Then('I should see heading "Quiz start"', async function (this: World) {
    await expectTextToBe(world.QuizScorePage.headerLocator(), 'Quiz start')
})
