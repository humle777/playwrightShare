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


    test('1. Verify incorrect email', async () => {
        //  await page.pause();
        await loginPage.disabledContinueButton();
        await loginPage.fillEmailOrPhone('12121');
        await loginPage.clickContinueButton();
        await loginPage.verifyInvalidEmailError();
        await loginPage.disabledContinueButton();
    });
    test('2. Verify not existing email', async () => {

        await loginPage.fillEmailOrPhone('yevhenii.davydenko@lasoft.orgg');
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundEmailError();
        await loginPage.disabledContinueButton();
    });
    test('3. 2. Verify not existing phone', async () => {

        await loginPage.fillEmailOrPhone('0661111111')
        await loginPage.clickContinueButton();
        await loginPage.verifyAccountNotFoundPhoneError();
        await loginPage.disabledContinueButton();
    });
    test('4. Verify valid email', async () => {
        // 4. Ввод существующего email и проверка перехода к вводу пароля
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        
    });
    test('5. Verify back button', async () => {
        // 5. Переход на шаг назад и проверка пустого поля
        // await page.goBack();
        await loginPage.disabledSinginButton();
        await loginPage.verifyPasswordText();
        await loginPage.clickPasswordBackButton();
        await expect(loginPage.emailOrPhoneInput).toBeEmpty();
    });

    test('6. Verify password is shownHidden', async () => {
        
        await loginPage.fillEmailOrPhone(authData.email);
        await loginPage.clickContinueButton();
        await loginPage.disabledSinginButton();
        
        await loginPage.fillPassword(authData.password_fake);
     
        await loginPage.verifyPasswordIsHidden(); 
        await loginPage.togglePasswordVisibility(); // Кликаем на глазик
        await loginPage.verifyPasswordIsVisibleByValue(authData.password_fake); // Убеждаемся, что пароль стал виден (type='text')
        await loginPage.togglePasswordVisibility(); // Кликаем на глазик еще раз
        await loginPage.verifyPasswordIsHidden();
    });

    test('7. Verify incorrect password', async () => {
        await loginPage.fillPassword(authData.password_fake);
        await loginPage.signInButton.click();
        await loginPage.verifyIncorrectPasswordError();
    });
    test('8. Verify success', async () => {
        // 7. Проверка успешного входа
        await loginPage.attemptLoginWithPassword(authData.password);
        await loginPage.verifyUserLoggedIn(authData.user_name);

    });
});