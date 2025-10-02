// pages/NewLogin.js
import { expect } from '@playwright/test';

export class NewLoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // этап ввода мыла или телефона
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
        // this.passwordInput = page.locator('input[type="password"]');
        this.passwordInput = page.locator('input.hxokSw'); 

        this.signInButton = page.getByRole('button', { name: 'Увійти в акаунт' });
        this.PasswordText = page.locator('span').filter({ hasText: 'Вхід' });
        this.PasswordBackButton = page.locator('div').filter({ hasText: /^Вхід$/ }).getByRole('button');
        this.passwordVisibilityToggle = page.locator('div').filter({ hasText: /^Пароль$/ }).getByRole('img');

        // Элементы для проверки перехода на главную страницу (после успешного входа)

        this.userNameLinkOnHomePage = (userName) => page.getByRole('link', { name: userName }); // Функция для получения ссылки с именем пользователя

    }

    // --- Методы для навигации ---
    async navigateTo(url) {
        this.url = url; // Устанавливаем URL для навигации
        await this.page.goto(this.url);
    }

    // --- Методы для взаимодействия с элементами ---

    async clickEmailOrPhoneLabel() {
        await this.emailOrPhoneLabel.click();
    }

    async fillEmailOrPhone(text) {
        await this.emailOrPhoneInput.fill(text);
    }

    async clickContinueButton() {
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
    }

    async fillPassword(password) {
        await expect(this.passwordInput).toBeVisible(); 
        await this.passwordInput.click(); 
        await this.passwordInput.fill(password);
    }

    async clickSignInButton() {
        await expect(this.signInButton).toBeEnabled();
        await this.signInButton.click();
    }

    async clickPasswordBackButton() {
        await this.PasswordBackButton.click();
    }


    // --- Методы для проверок (ассертов) ---

    async verifyInvalidEmailError() {
        await expect.soft(this.invalidEmailError).toBeVisible();
    }

    async verifyAccountNotFoundEmailError() {
        await expect(this.accountNotFoundEmailError).toBeVisible();
    }

    async verifyAccountNotFoundPhoneError() {
        await expect(this.accountNotFoundPhoneError).toBeVisible();
    }
    async verifyPasswordText() {
        await expect(this.PasswordText).toBeVisible();
    }
    async verifyIncorrectPasswordError() {
        await expect(this.incorrectPasswordError).toBeVisible();
    }

    async verifyEmailOrPhoneInputIsEmpty() {
        await expect(this.emailOrPhoneInput).toBeEmpty();
    }

    async verifyUserLoggedIn(userName) {
        await expect(this.userNameLinkOnHomePage(userName)).toBeVisible(); // Проверяем, что ссылка с именем пользователя видна
        
        // await expect(this.page).not.toHaveURL(/login/);
    }
      // НОВЫЙ МЕТОД ДЛЯ ПЕРЕКЛЮЧЕНИЯ ВИДИМОСТИ ПАРОЛЯ


  async togglePasswordVisibility() {
    await expect(this.passwordVisibilityToggle).toBeVisible(); // Убеждаемся, что глазик виден
    await this.passwordVisibilityToggle.click();
  }

 // НОВЫЕ МЕТОДЫ ДЛЯ ПРОВЕРКИ ЗНАЧЕНИЯ ПОЛЯ
  async verifyPasswordIsVisibleByValue(expectedPassword) {
    // await expect.soft(this.passwordInput).toHaveValue(expectedPassword);
    await expect.soft(this.passwordInput).toHaveAttribute('type', 'text'); 
  }
  async verifyPasswordIsHidden() {
    await expect.soft(this.passwordInput).toHaveAttribute('type', 'password'); 
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