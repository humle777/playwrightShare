const { test, expect } = require('@playwright/test');
const getAuthData = require('../auth_exp');
const authData = getAuthData();

/*
// шапка 
const { test } = require('../fixtures.js');
const { expect } = require('@playwright/test');


..первая строка теста
test('LoginErrors', async ({ page, authData }) => {
  */

test('Login', async ({ page }) => {
  await page.goto('https://gb.expertus.com.ua/');
   await page.pause();  
  const LoginButton = page.locator('#auth-btn');
  await expect(LoginButton).toHaveText('Вхід та реєстрація');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Вхід та реєстрація' }).click();

  const page1 = await page1Promise;



  await page1.getByPlaceholder('Ел. пошта').fill(authData.email);
  await page1.getByPlaceholder('Пароль').fill(authData.password);
  await page1.getByRole('button', { name: 'Увійти' }).click();

 
  await expect(LoginButton).toHaveText('ВильгельминаАБ Константинова');
//   await page.waitForTimeout(10000);
  await page.context().storageState({ path: 'state.json' });
});
