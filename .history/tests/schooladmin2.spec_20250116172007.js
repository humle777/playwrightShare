import { test, expect } from '@playwright/test';
import { getAuthData } from '../auth_exp.js';

const authData = getAuthData();

// Общие функции
async function login(page) {
    await page.goto(authData.dev_schoolb_admin);
    await page.getByPlaceholder('Email').fill('yevhenii.davydenko@lasoft.org');
    await page.getByPlaceholder('Пароль').fill(authData.password_dev_school_admin);
    await page.getByRole('button', { name: 'Увійти' }).click();
    await expect(page).toHaveURL(/dashboard|admin/); // Проверяем, что мы вошли
}

async function createProgram(page) {
    await page.getByRole('link', { name: ' Додати програму' }).click();
    await page.getByLabel('Коди програми').fill('NewAutoTest');
    await page.locator('#title2').fill('New second name');
    await page.getByLabel('Назва програми HTML').fill('HTML Program Name');
    await page.getByLabel('Короткий опис програми').fill('Short description');
    await page.getByLabel('Повний опис програми').fill('Full description of the program');
    await page.locator('#productVersionsMain').fill('30001');
    await page.locator('#productVersions').fill('30001');
    await page.locator('#productVersions2').fill('33333');
    await page.getByLabel('Видавати сертифікат').check();
    await page.locator('#typecert').selectOption('1');
    await page.locator('input[name="display_days_for_certificate_button"]').fill('222');
    await page.locator('#product_main_code').fill('33333');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByRole('link', { name: 'Програми' })).toBeVisible(); // Убедимся, что программа сохранена
}

async function addModule(page) {
    await page.getByRole('link', { name: 'Програми' }).click();
    await page.getByRole('cell', { name: 'NewAutoTest' }).click();
    await page.getByRole('link', { name: ' Додати модуль' }).click();
    await page.getByLabel('Назва модуля').fill('модуль1');
    await page.getByLabel('Опис модуля').fill('опис одуля один');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByText('Новий модуль успішно створений!')).toBeVisible();
}

async function addTopic(page) {
    await page.getByRole('link', { name: ' Теми модуля' }).click();
    await page.getByRole('link', { name: ' Додати тему' }).click();
    await page.getByLabel('Назва теми').fill('Тема 1');
    await page.getByLabel('Тривалість теми (годин)').fill('22');
    await page.getByLabel('Опис теми').fill('опис теми модуля один');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByText('Тема успішно створена!')).toBeVisible();
}

async function addQuestion(page) {
    await page.getByRole('link', { name: ' Додати питання' }).click();
    await page.getByLabel('Текст питання').fill('Питання 1');
    await page.selectOption('#theme_id', { label: 'Тема 1' });
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByRole('link', { name: ' Відповіді на питання (0)' })).toBeVisible();
}

async function addAnswer(page) {
    await page.getByRole('link', { name: ' Додати відповідь' }).click();
    await page.getByLabel('Текст відповіді').fill('Это будет правильный ответ');
    await page.getByLabel('Відповідь вірна?').selectOption('1');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await page.getByRole('link', { name: ' Додати відповідь' }).click();
    await page.getByLabel('Текст відповіді').fill('Этот ответ приведет к провалу теста');
    await page.getByRole('button', { name: 'Зберегти' }).click();
}

async function deleteProgram(page) {
    await page.getByRole('row', { name: /NewAutoTest/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Видалити', exact: true }).click();
}

// Основной сценарий
test.describe('Total Flow', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('Create Program', async ({ page }) => {
        await createProgram(page);
        await addModule(page);
        await addTopic(page);
        await addQuestion(page);
        await addAnswer(page);
    });

    test('Delete Program', async ({ page }) => {
        await deleteProgram(page);
    });
});