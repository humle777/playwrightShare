import { test, expect } from '@playwright/test';
import {getAuthData} from '../auth_exp.js';
const text = "автотест";
const now = new Date();
const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' '); // Формат: YYYY-MM-DD HH:MM:SS
let page; // Переменная для хранения страницы
let NameTest;
NameTest = text + formattedDateTime;
console.log(NameTest); 
const authData = getAuthData();
/*
test('ServiceTests', async ({ page }) => {
  // let NameTest='Autotest7';

  */
  test.describe('Test creation and deletion', () => {
    test.describe.configure({ mode: 'serial' }); // Устанавливаем последовательный режим

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext({
        viewport: {width: 1920, height: 930},
      });
      page = await context.newPage();

      await page.goto(authData.service_admin_dev);
    await page.pause(); 
      await page.getByLabel('Email').fill(authData.email);
      await page.getByLabel('Пароль').fill(authData.password_service);
      await page.getByRole('button', { name: 'Увійти' }).click();
    });

    test('Create', async()=>{
      await page.getByRole('link', { name: ' Тести' }).click();
      await page.getByRole('link', { name: ' Додати Тест' }).click();
      await page.getByRole('button', { name: 'Зберегти і вийти' }).click();
      await expect(page.locator('.form-group.col-sm-12.required.text-danger[bp-field-name="product_id"] .invalid-feedback')).toHaveText('Поле є обов\'язковим для заповнення.');
      await expect(page.locator('.form-group.col-sm-12.required.text-danger[bp-field-name="name"] .invalid-feedback.d-block')).toHaveText('Поле є обов\'язковим для заповнення.');
      await page.locator('.select2-selection').click();
      await page.getByRole('option', { name: 'Вища школа Кадровика' }).click();
      await page.locator('input[name="name"]').click();
      await page.locator('input[name="name"]').fill(NameTest);
      await page.locator('.switch-slider').click();
      await page.getByRole('textbox').nth(2).click();
      await page.getByRole('textbox').nth(2).fill('Тестовий опис');
      await page.getByRole('textbox').nth(3).click();
      await page.getByRole('textbox').nth(3).fill('Вы успешно сдали тест.');
      await page.getByRole('textbox').nth(4).click();
      await page.getByRole('textbox').nth(4).fill('в следущий раз получится');
      await page.getByRole('button', { name: 'Зберегти і вийти' }).click();
      await expect(page.locator(`table#crudTable td:has-text("${NameTest}")`)).toBeVisible();
      console.log(`table#crudTable td:has-text("${NameTest}")`);
    });

 

  test('Delete the created test', async () => {
    // await page.pause(); 

    // Найти строку и нажать кнопку удаления
    const row = page.locator(`table#crudTable td:has-text("${NameTest}")`).locator('..'); // Переход на родительский элемент строки
    await row.locator('a.btn.btn-sm.btn-danger:has-text("Видалити")').click();

    // Подтверждение удаления
    await page.getByRole('button', { name: 'Видалити' }).click();

    // Проверка, что строка больше не отображается
    await expect(page.locator(`table#crudTable td:has-text("${NameTest}")`)).not.toBeVisible();
    console.log(`Тест ${NameTest} успешно удален.`);
  });

  test.afterAll(async () => {
    // Закрываем страницу
    await page.close();
  });
});