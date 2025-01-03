import { test, expect } from '@playwright/test';
// const { getAuthData } = require('../auth_exp.js');
 import {getAuthData} from '../auth_exp';

const authData = getAuthData();


test.describe('total', () => {
  let context;
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
  });

  test.afterAll(async () => {
    await context.close(); 
  });
  async function verifyUserIsLoggedIn(page) {
    await expect(page.locator('#auth-btn')).toHaveText(authData.user_name);
  }

  test('Login', async () => {
    const page = await context.newPage();
    await page.goto(authData.golovbuh);
    await page.pause(); 
    const LoginButton = page.locator('#auth-btn');
    await expect(LoginButton).toHaveText('Вхід та реєстрація');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Вхід та реєстрація' }).click();

    const page1 = await page1Promise;

    await page1.getByRole('button', { name: 'Увійти' }).click();
    const errorElement = page1.locator('.sc-dkcEsn.fFMskR');

    await expect(errorElement).toHaveText('Поле пошта обов’язкове');

    await page1.getByPlaceholder('Ел. пошта').fill('yevhenii.davydenko@lasoft.org');
    await page1.getByRole('button', { name: 'Увійти' }).click();

    await expect(errorElement).toHaveText('Поле пароль обов’язкове');

    await page1.getByPlaceholder('Ел. пошта').fill('323yevhenii.davydenko@lasoft.org');
    await page1.getByPlaceholder('Пароль').fill('qwe111');
    await page1.getByRole('button', { name: 'Увійти' }).click();

    await expect(errorElement).toHaveText('Користувача з таким e-mail не знайдено. Уведіть іншу адресу або зареєструйтеся');

    await page1.getByPlaceholder('Ел. пошта').fill(authData.email);
    await page1.getByPlaceholder('Пароль').fill('qwe1111');
    await page1.getByRole('button', { name: 'Увійти' }).click();

    await expect(errorElement).toHaveText('Неправильна ел. пошта або пароль, уведіть свої дані правильно. Маєте труднощі — тисніть «нагадати» у стрічці поля з паролем');
    await page1.getByPlaceholder('Пароль').fill(authData.password);
    await page1.getByRole('button', { name: 'Увійти' }).click();
    await verifyUserIsLoggedIn(page);
    await context.storageState({ path: 'state.json' });
    await page.close();
  });

  test('Search', async () => {
    const page = await context.newPage({ storageState: 'state.json' });
    // await page.pause();  
  
    await page.goto(authData.golovbuh);
    await expect(page.locator('#auth-btn')).toHaveText(authData.user_name);
    await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').click();
    await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').fill('пдв');

    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'пдв', exact: true }).first().click();
    const page2 = await page2Promise;

    const page3Promise = page2.waitForEvent('popup');
    await page2.getByRole('link', { name: 'Калькулятор ПДВ' }).click();
    const page3 = await page3Promise;

    await expect.soft (page3.getByRole('heading', { name: 'ККалькулятор ПДВ' })).toBeVisible();
    await expect.soft (page3.getByRole('heading', { name: 'Калькулятор ПДВ' })).toBeVisible();
    await verifyUserIsLoggedIn(page);
   
  });
});
