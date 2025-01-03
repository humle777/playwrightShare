/*const {test,expect}= require('@playwright/test')
//const {ff1,ff2} = require('./demo/archive')
//import {ff1,ff2} from './demo/archive'

//console.log (ff1());
//console.log(ff2());
test('My first test', async({page})=>{
    await page.goto('https://www.google.com/')
    await expect (page).toHaveTitle('Google')
    //await expect (page).toHaveText('Мова')
})
*/
// launch browser
import { test, expect, chromium } from '@playwright/test'
test('slowmo', async () => {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });
    // create a context for browser
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: { width: 800, height: 600 }
        }
    });
    // Create a new page inside context.
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/')
    //await page.pause()
    await page.click('id=user-name')
    await page.locator('id=user-name').fill('John Doe')
    await page.locator('[id="user-name"]').fill('Einstein')
    // using text
    await page.locator('text=LOGIN').click()
    await page.waitForSelector('.error-message-container', { state: 'visible'/*,timeout: 10000*/ })
    await expect(page.textContent('.error-message-container h3')).resolves.toContain('Epic sadface: Password is required')
    // Dispose context once it's no longer needed.
    await context.close();
})