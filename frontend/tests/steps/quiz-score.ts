import { Given, Then, When } from '@cucumber/cucumber'
import { type World, worldAs, expectTextToBe } from './common.ts'

const world = worldAs()

Given('I visit the Fake last question', async function (this: World) {
    await this.page.goto('/quiz/fakeLast')
})

When('I click the submit button', async function (this: World) {
    await this.page.locator('input[type="submit"]').click()
})

Then('I should see heading "Quiz Score"', async function (this: World) {
    await expectTextToBe(this.page.locator('h1'), 'Quiz Score')
})

Then('I should see the text {string}', async score => {
    await expectTextToBe(world.page.locator('p'), score)
})
