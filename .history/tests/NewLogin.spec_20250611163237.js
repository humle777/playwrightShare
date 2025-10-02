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
       // 1. Проверка некорректного email формата
        await page.pause();
        await loginPage.clickEmailOrPhoneLabel(); // Клик по лейблу, если это активирует поле
        await loginPage.fillEmailOrPhone('12121');
        await loginPage.clickContinueButton();
        await loginPage.verifyInvalidEmailError();

        // 2. Проверка несуществующего email
        // await loginPage.emailOrPhoneInput.click(); // Кликаем по полю, чтобы снова активировать его
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

        await loginPage.PasswordText();
        await loginPage.clickPasswordBackButton();

        // await page.locator('span').filter({ hasText: 'Вхід' }).click();
        // await page.locator('div').filter({ hasText: /^Вхід$/ }).getByRole('button').click();

        
        // await page.getByText('Ел.пошта або телефон').click();


        // await expect(page.getByRole('textbox')).toBeEmpty();

        // Проверяем, что поле ввода email/телефона пустое
        await expect(loginPage.emailOrPhoneInput).toBeEmpty();

        // 6. Ввод некорректного пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        await loginPage.fillPassword('12345');
        await page.waitForTimeout(1000); // Задержка для ожидания появления кнопки
        await loginPage.signInButton.click();
        await loginPage.verifyIncorrectPasswordError();

    // 7. Проверка успешного входа
        await loginPage.fillPassword(authData.password);
        await loginPage.signInButton.click();
        await loginPage.verifyUserLoggedIn(authData.user_name);

    });
});