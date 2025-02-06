import {  Given, Then,  } from '@cucumber/cucumber'
// import { expect } from '@playwright/test'
import {  World, expectTextToBe } from './common.ts'

Given('I visit the quiz page', async function(this: World) {
    await this.page.goto('/quiz')
})

Then('I should see heading "Quiz"', async function(this: World) {
    await expectTextToBe(this.page.locator('h1'), 'Quiz')
})
