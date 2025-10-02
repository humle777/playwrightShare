import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';
import { NewLogin } from '../pages/newlogin.js';

const authData = getAuthData();

test.describe ('New Login Tests', () => {
    let newLoginPage;

    test.beforeEach(async ({ page }) => {
        newLoginPage = new NewLogin(page);
        await newLoginPage.navigateTo(authData.new_login);
    });


test('should handle various login attempts and error messages', async ({ page }) => {
   await page.goto(authData.new_login);
    // await page.pause();
      await newLoginPage.clickEmailOrPhoneLabel(); // Клик по лейблу, если это активирует поле
    await newLoginPage.fillEmailOrPhone('12121');
    // await page.getByText('Ел.пошта або телефон').click();
//   await page.getByText('Наприклад: email@gmail.com або').click();
//   await page.getByRole('textbox').fill('12121');
  await page.getByRole('button', { name: 'Продовжити' }).click();
  await page.getByText('Некоректний email').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('yevhenii.davydenko@lasoft.orgg');
  await page.getByRole('button', { name: 'Продовжити' }).click();
  await page.getByText('Акаунт із такою ел.поштою не знайдено. Введіть іншу ел.пошту або номер телефона').click();
  await page.getByRole('textbox').fill('0661111111');
  await page.getByRole('button', { name: 'Продовжити' }).click();
  await page.getByText('Акаунт із таким телефоном не знайдено. Введіть інший телефон або ел.пошту').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(authData.email);
  await page.getByRole('button', { name: 'Продовжити' }).click();
  await page.locator('span').filter({ hasText: 'Вхід' }).click();
  await page.locator('div').filter({ hasText: /^Вхід$/ }).getByRole('button').click();
  await page.getByText('Ел.пошта або телефон').click();
  await expect(page.getByRole('textbox')).toBeEmpty();
  await page.getByRole('textbox').fill(authData.email);
  await page.getByRole('button', { name: 'Продовжити' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('12345');
  await page.waitForTimeout(1000); // Задержка для ожидания появления кнопки
  await page.getByRole('button', { name: 'Увійти в акаунт' }).click();
  await page.getByText('Неправильний пароль').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(authData.password);
  await page.getByRole('button', { name: 'Увійти в акаунт' }).click();
  await page.getByRole('link', { name: authData.user_name}).click();
});
});