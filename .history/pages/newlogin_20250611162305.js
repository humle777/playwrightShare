// pages/NewLogin.js
import { expect } from '@playwright/test';

export class NewLoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // этам ввода мыла или телефона
        //this.url = 'https://dev.id3.expertus.com.ua/login';
        this.url = ''; // Этот URL будет передан из authData в тесте
        this.emailOrPhoneInput = page.getByRole('textbox'); // Поле для ввода email или телефона
        this.emailOrPhoneLabel = page.getByText('Ел.пошта або телефон'); // Лейбл для поля ввода email или телефона

        this.continueButton = page.getByRole('button', { name: 'Продовжити' }); // Кнопка "Продовжити"


        // Сообщения об ошибках
        this.invalidEmailError = page.getByText('Некоректний email');
        this.accountNotFoundEmailError = page.getByText('Акаунт із такою ел.поштою не знайдено. Введіть іншу ел.пошту або номер телефона');
        this.accountNotFoundPhoneError = page.getByText('Акаунт із таким телефоном не знайдено. Введіть інший телефон або ел.пошту');
        this.incorrectPasswordError = page.getByText('Неправильний пароль');

        // Поле ввода пароля (после ввода email/телефона)
        this.passwordInput = page.locator('input[type="password"]'); // Это локатор Playwright

        this.signInButton = page.getByRole('button', { name: 'Увійти в акаунт' });
        this.PasswordText = page.locator('span').filter({ hasText: 'Вхід' });
        this.PasswordBackButton = page.locator('div').filter({ hasText: /^Вхід$/ }).getByRole('button');

        // Элементы для проверки перехода на главную страницу (после успешного входа)

        this.userNameLinkOnHomePage = (userName) => page.getByRole('link', { name: userName }); // Функция для получения ссылки с именем пользователя

    }

    // --- Методы для навигации ---
    async navigateTo(url) {
        this.url = url; // Устанавливаем URL для навигации
        await this.page.goto(this.url);
        // await this.page.pause(); // Убрали pause, используйте его только для отладки
        // Здесь может быть логика обработки cookie-баннера, если он есть
    }

    // --- Методы для взаимодействия с элементами ---

    async clickEmailOrPhoneLabel() {
        await this.emailOrPhoneLabel.click();
    }

    async fillEmailOrPhone(text) {
        await this.emailOrPhoneInput.fill(text);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }
    async clickPasswordText() {
        await this.PasswordText.click();
    }

    // --- Методы для проверок (ассертов) ---

    async verifyInvalidEmailError() {
        await expect(this.invalidEmailError).toBeVisible();
    }

    async verifyAccountNotFoundEmailError() {
        await expect(this.accountNotFoundEmailError).toBeVisible();
    }

    async verifyAccountNotFoundPhoneError() {
        await expect(this.accountNotFoundPhoneError).toBeVisible();
    }

    async verifyIncorrectPasswordError() {
        await expect(this.incorrectPasswordError).toBeVisible();
    }

    async verifyEmailOrPhoneInputIsEmpty() {
        await expect(this.emailOrPhoneInput).toBeEmpty();
    }

    async verifyUserLoggedIn(userName) {
        await expect(this.userNameLinkOnHomePage(userName)).toBeVisible(); // Проверяем, что ссылка с именем пользователя видна
        // Если нужно, можно добавить другие проверки на успешный вход
        // await expect(this.page).not.toHaveURL(/login/);
    }

    // --- Комбинированные методы (флоу) ---

    async attemptLoginWithEmailOrPhone(emailOrPhone) {
        await this.fillEmailOrPhone(emailOrPhone);
        await this.clickContinueButton();
    }

    async attemptLoginWithPassword(password) {
        await this.fillPassword(password);
        await this.clickSignInButton();
    }
}