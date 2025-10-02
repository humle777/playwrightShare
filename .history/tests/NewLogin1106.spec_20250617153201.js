import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';
import { NewLoginPage } from '../pages/newlogin.js';

const authData = getAuthData();

test.describe('New Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new NewLoginPage(page);
        await loginPage.navigateTo(authData.new_login);
    });


    test('should handle various login attempts and error messages', async ({ page }) => {
        // await page.pause();
        // 1. Проверка некорректного email формата
        await loginPage.disabledContinueButton();
        await loginPage.fillEmailOrPhone('12121');
        await loginPage.clickContinueButton();
        await loginPage.verifyInvalidEmailError();
        await loginPage.disabledContinueButton();

        // 2. Проверка несуществующего email
        await loginPage.fillEmailOrPhone('yevhenii.davydenko@lasoft.orgg');
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundEmailError();
        await loginPage.disabledContinueButton();

        // 3. Проверка несуществующего телефона
        await loginPage.fillEmailOrPhone('0661111111')
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundPhoneError();
        await loginPage.disabledContinueButton();

        // 4. Ввод существующего email и проверка перехода к вводу пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();

        // 5. Переход на шаг назад и проверка пустого поля

        await loginPage.disabledSinginButton();
        await loginPage.verifyPasswordText();
        await loginPage.clickPasswordBackButton();

        // Проверяем, что поле ввода email/телефона пустое
        await expect(loginPage.emailOrPhoneInput).toBeEmpty();

        // 6. Ввод некорректного пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        await loginPage.fillPassword(authData.password_fake);

        await loginPage.verifyPasswordIsHidden();
        await loginPage.togglePasswordVisibility(); // Кликаем на глазик
        await loginPage.verifyPasswordIsVisibleByValue(authData.password_fake); // Убеждаемся, что пароль стал виден (type='text')
        await loginPage.togglePasswordVisibility(); // Кликаем на глазик еще раз
        await loginPage.verifyPasswordIsHidden();

        await loginPage.signInButton.click();
        await loginPage.verifyIncorrectPasswordError();

        // 7. Проверка успешного входа

        await loginPage.attemptLoginWithPassword(authData.password);
        await loginPage.verifyUserLoggedIn(authData.user_name);

    });
});