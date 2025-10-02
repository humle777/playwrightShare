/*
export function getAuthData(){
    const filePath = "login-data.json";
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return {
        email: jsonData.email as string,
        password: jsonData.password as string,
    };
}
*/
// рабочая версия
/*
const fs = require('fs');
const filePath = "login-data.json";
function getAuthData() {
    
    const rawData = fs.readFileSync(filePath); 
    return JSON.parse(rawData.toString());

}
function updateAuthData(newData) {
    const currentData = getAuthData();
    const updatedData = { ...currentData, ...newData }; // Обновляем только изменённые поля
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
}
module.exports = { getAuthData, updateAuthData };
*/
import fs from 'fs'; // Используем импорт ES6 для fs

const filePath = "login-data.json";

export function getAuthData() {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData.toString());
}

export function updateAuthData(newData) {
    const currentData = getAuthData();
    const updatedData = { ...currentData, ...newData }; // Обновляем только изменённые поля
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
}

/* это простой способ использовать и хранить селекторы в одном месте.
export const selectors = {
    loginInput: 'input[name="login"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    emailPlaceholder: 'input[placeholder="Ел. пошта"]',
    // Добавьте другие селекторы по мере необходимости
  };
  */
  export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailTextbox = page.getByPlaceholder('Ел. пошта');
        this.passwordTextbox = page.getByPlaceholder('Пароль');
        this.submitButton = page.getByRole('button', { name: 'Увійти' });
        this.ProMene = page.getByRole('link', { name: 'Про мене' });
    }

    async login(email, password) {
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.submitButton.click();
    }
}

// функция логина
export async function login(page, authData) {


    // Проверяем начальный текст кнопки
    await expect(page.locator('#auth-btn')).toHaveText('Вхід та реєстрація');
    
    // Ожидаем открытия нового окна (popup)
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Вхід та реєстрація' }).click();

    // Получаем новую страницу
    const page1 = await page1Promise;

    // Заполняем поля формы
    await page1.getByPlaceholder('Ел. пошта').fill(authData.email);
    await page1.getByPlaceholder('Пароль').fill(authData.password);
    await page1.getByRole('button', { name: 'Увійти' }).click();

    // Проверяем, что имя пользователя обновилось
    await expect(page.locator('#auth-btn')).toHaveText(authData.user_name);
}