import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';
import { NewLoginPage } from '../pages/newlogin.js';

const authData = getAuthData();

test.describe.serial('New Login Tests', () => {
    let loginPage;
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new NewLoginPage(page);
        
        
        await loginPage.navigateTo(authData.new_login);
    });
    test.afterAll(async () => {
        await context.close();
    });


    test('1. should handle various login attempts and error messages', async () => {
        // 1. Проверка некорректного email формата
        // await page.pause();
        await loginPage.fillEmailOrPhone('12121');
        await loginPage.clickContinueButton();
        await loginPage.verifyInvalidEmailError();
    });
    test('2. should handle various login attempts and error messages', async () => {
        // 2. Проверка несуществующего email

        await loginPage.fillEmailOrPhone('yevhenii.davydenko@lasoft.orgg');
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundEmailError();
    });
    test('3. should handle various login attempts and error messages', async () => {
        // 3. Проверка несуществующего телефона
        await loginPage.fillEmailOrPhone('0661111111')
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundPhoneError();
    });
    test('4. should handle various login attempts and error messages', async () => {
        // 4. Ввод существующего email и проверка перехода к вводу пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
    });
    test('5. should handle various login attempts and error messages', async () => {
        // 5. Переход на шаг назад и проверка пустого поля
        // await page.goBack();

        await loginPage.verifyPasswordText();
        await loginPage.clickPasswordBackButton();
        await expect(loginPage.emailOrPhoneInput).toBeEmpty();
    });
    test('6. should handle various login attempts and error messages', async () => {
        // 6. Ввод некорректного пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        await loginPage.fillPassword('12345');
        await loginPage.signInButton.click();
        await loginPage.verifyIncorrectPasswordError();
    });
    test('7. should handle various login attempts and error messages', async () => {
        // 7. Проверка успешного входа
        await loginPage.attemptLoginWithPassword(authData.password);
        await loginPage.verifyUserLoggedIn(authData.user_name);

    });
});