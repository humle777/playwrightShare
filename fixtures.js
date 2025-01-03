const { test: base } = require('@playwright/test');
const getAuthData = require('./auth_exp'); // Импорт функции для данных авторизации

// Получаем данные из JSON
const authData = getAuthData();

// Расширяем базовый `test`, добавляя `authData` в контекст
const test = base.extend({
  authData: async ({}, use) => {
    await use(authData); // Делаем данные доступными для всех тестов
  },
});

module.exports = { test };
