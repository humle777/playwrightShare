const { test, expect } = require('@playwright/test');
const getAuthData = require('../auth_exp');
const authData = getAuthData();


test('Login', async ({ page }) => {
  await page.goto(authData.golovbuh);
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
/*
test('Search', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();
//   await page.waitForTimeout(5000);
  await page.goto('https://gb.expertus.com.ua/'); // Возможно, потребуется добавить для проверки контекста
  await page.waitForTimeout(5000);

//   await page.pause();

  await expect (page.locator('#auth-btn')).toHaveText('Вильгельмина Константинова');
  await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').click();
  await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').fill('пдв');
  await page.getByRole('link', { name: 'пдв', exact: true }).first().click();

  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Калькулятор ПДВ' }).click();
  const page2 = await page2Promise;

  await page2.getByRole('heading', { name: 'Калькулятор ПДВ' }).click();
  await expect (page.locator('#auth-btn')).toHaveText('Вильгельмина Константинова');
});
*/