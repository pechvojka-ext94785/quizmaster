import { Given, Then } from '@cucumber/cucumber'
import { type World, worldAs, expectTextToBe } from './common.ts'

const world = worldAs()

Given('I visit the quiz score page', async function (this: World) {
    await this.page.goto('/quiz/score')
})

Then('I should see heading "Quiz Score"', async function (this: World) {
    await expectTextToBe(this.page.locator('h1'), 'Quiz Score')
})

Then('I should see the text {string}', async score => {
    await expectTextToBe(world.page.locator('p'), score)
})
