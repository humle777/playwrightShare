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
    }

    async login(email, password) {
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.submitButton.click();
    }
}