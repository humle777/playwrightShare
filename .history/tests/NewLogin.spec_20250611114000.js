import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';
import { NewLoginPage } from '../pages/newlogin.js';

const authData = getAuthData();

test.describe ('New Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new NewLoginPage(page);
        await loginPage.navigateTo(authData.new_login);
    });


test('should handle various login attempts and error messages', async ({ page }) => {
//    await page.goto(authData.new_login);
    //  await page.pause();
      await loginPage.clickEmailOrPhoneLabel(); // Клик по лейблу, если это активирует поле
    await loginPage.fillEmailOrPhone('12121');
    await loginPage.clickContinueButton();
await loginPage.verifyInvalidEmailError();
  
    // 2. Проверка несуществующего email
    await loginPage.emailOrPhoneInput.click(); // Кликаем по полю, чтобы снова активировать его
    await loginPage.fillEmailOrPhone('yevhenii.davydenko@lasoft.orgg');
    await loginPage.clickContinueButton();
    await loginPage.verifyAccountNotFoundEmailError();
//   await page.getByRole('button', { name: 'Продовжити' }).click();
//   await page.getByText('Акаунт із такою ел.поштою не знайдено. Введіть іншу ел.пошту або номер телефона').click();
await loginPage.fillEmailOrPhone('0661111111')
//   await page.getByRole('textbox').fill('0661111111');
    await loginPage.clickContinueButton();

    await loginPage.verifyAccountNotFoundPhoneError();

//   await page.getByRole('button', { name: 'Продовжити' }).click();
//   await page.getByText('Акаунт із таким телефоном не знайдено. Введіть інший телефон або ел.пошту').click();
await loginPage.fillEmailOrPhone(authData.email);

    await loginPage.clickContinueButton();

//   await page.getByRole('textbox').click();
//   await page.getByRole('textbox').fill(authData.email);
//   await page.getByRole('button', { name: 'Продовжити' }).click();
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