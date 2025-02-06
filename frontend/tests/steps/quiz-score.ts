import { Given, Then } from '@cucumber/cucumber'
import { type World, expectTextToBe } from './common.ts'

Given('I visit the quiz score page', async function (this: World) {
    await this.page.goto('/quiz/score')
})

Then('I should see heading "Quiz Score"', async function (this: World) {
    await expectTextToBe(this.page.locator('h1'), 'Quiz Score')
})

Then(
    'I should see the text "Your score is 3 correctly answered questions out of 10 which is 30%"',
    async function (this: World) {
        await expectTextToBe(
            this.page.locator('p'),
            'Your score is 3 correctly answered questions out of 10 which is 30%',
        )
    },
)
