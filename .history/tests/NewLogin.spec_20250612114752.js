import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';
import { NewLoginPage } from '../pages/newlogin.js';

const authData = getAuthData();

test.describe.serial('New Login Tests', () => {
    let loginPage;
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        loginPage = new NewLoginPage(page);
        context = await browser.newContext();
        page = await context.newPage();
        await loginPage.navigateTo(authData.new_login);
    });
    test.afterAll(async () => {
        await context.close();
    });


    test('should handle various login attempts and error messages', async ({ page }) => {
        // 1. Проверка некорректного email формата
        // await page.pause();
        await loginPage.fillEmailOrPhone('12121');
        await loginPage.clickContinueButton();
        await loginPage.verifyInvalidEmailError();

        // 2. Проверка несуществующего email

        await loginPage.fillEmailOrPhone('yevhenii.davydenko@lasoft.orgg');
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundEmailError();

        // 3. Проверка несуществующего телефона
        await loginPage.fillEmailOrPhone('0661111111')
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundPhoneError();

        // 4. Ввод существующего email и проверка перехода к вводу пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();

        // 5. Переход на шаг назад и проверка пустого поля
        // await page.goBack();

        await loginPage.verifyPasswordText();
        await loginPage.clickPasswordBackButton();
        await expect(loginPage.emailOrPhoneInput).toBeEmpty();

        // 6. Ввод некорректного пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        await loginPage.fillPassword('12345');
        await loginPage.signInButton.click();
        await loginPage.verifyIncorrectPasswordError();

        // 7. Проверка успешного входа
        await loginPage.attemptLoginWithPassword(authData.password);
        await loginPage.verifyUserLoggedIn(authData.user_name);

    });
});