import { test, expect } from '@playwright/test';
import getAuthData from '../auth_exp';

const text = "автотест";
const now = new Date();
const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
const NameTest = `${text} ${formattedDateTime}`;
const authData = getAuthData();

console.log(`Generated test name: ${NameTest}`);

// Вспомогательная функция для заполнения формы теста
async function fillTestForm(page, testName) {
  await page.locator('.select2-selection').click();
  await page.getByRole('option', { name: 'Вища школа Кадровика' }).click();

  await page.locator('input[name="name"]').fill(testName);
  await page.locator('.switch-slider').click();

  const descriptions = [
    'Тестовий опис',
    'Вы успешно сдали тест.',
    'в следущий раз получится'
  ];

  for (let i = 0; i < descriptions.length; i++) {
    await page.getByRole('textbox').nth(i + 2).fill(descriptions[i]);
  }
}

// Группировка тестов
test.describe('Test creation and deletion', () => {
  let page;

  // Инициализация перед тестами
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    page = await context.newPage();
  await page.pause(); 
    await page.goto(authData.service_admin_dev);
    await page.getByLabel('Email').fill(authData.email);
    await page.getByLabel('Пароль').fill(authData.password_service);
    await page.getByRole('button', { name: 'Увійти' }).click();
  });

  // Создание теста
  test('Create', async () => {
    await page.getByRole('link', { name: ' Тести' }).click();
    await page.getByRole('link', { name: ' Додати Тест' }).click();
    await page.getByRole('button', { name: 'Зберегти і вийти' }).click();

    // Проверка обязательных полей
    const requiredFieldErrors = [
      {
        locator: '.form-group.col-sm-12.required.text-danger[bp-field-name="product_id"] .invalid-feedback',
        message: "Поле є обов'язковим для заповнення."
      },
      {
        locator: '.form-group.col-sm-12.required.text-danger[bp-field-name="name"] .invalid-feedback.d-block',
        message: "Поле є обов'язковим для заповнення."
      }
    ];

    for (const error of requiredFieldErrors) {
      await expect(page.locator(error.locator)).toHaveText(error.message);
    }

    await fillTestForm(page, NameTest);
    await page.getByRole('button', { name: 'Зберегти і вийти' }).click();

    // Проверка создания теста
    await expect(page.locator(`table#crudTable td:has-text("${NameTest}")`)).toBeVisible();
    console.log(`Test "${NameTest}" successfully created.`);
  });

  // Удаление теста
  test('Delete', async () => {
    const row = page.locator(`table#crudTable td:has-text("${NameTest}")`).locator('..');
    await row.locator('a.btn.btn-sm.btn-danger:has-text("Видалити")').click();

    await page.getByRole('button', { name: 'Видалити' }).click();

    await expect(page.locator(`table#crudTable td:has-text("${NameTest}")`)).not.toBeVisible();
    console.log(`Test "${NameTest}" successfully deleted.`);
  });

  // Завершение работы
  test.afterAll(async () => {
    await page.close();
  });
});
