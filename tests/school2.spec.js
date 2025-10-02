import { test, expect } from '@playwright/test';
import {getAuthData, login} from '../auth_exp';
const authData = getAuthData();

test.describe('school22', () => {
  test.describe.configure({ mode: 'serial' }); // Устанавливаем последовательный режим

  test('school2', async ({ page }) => {
    await page.goto(authData.schoolb);
   await login(page, authData);
   await expect(page.locator('#auth-btn')).toHaveText(authData.user_name);
    await page.pause();
    
    await page.getByRole('link', { name: 'автотест2025-01-20 09:04:50' }).click();
    await page.goto('https://devschool.buhplatforma.com.ua/');
    await page.getByRole('link', { name: 'автотест2025-01-20 10:35:13' }).click();
    await page.getByText('Хочу сертифікат').click();
    await page.locator('div:nth-child(2) > div:nth-child(3) > .laiCyIbKKdVtojOtpNxS').click();
    await page.locator('div:nth-child(2) > div:nth-child(3) > .laiCyIbKKdVtojOtpNxS').fill('ТестовеПризвище');
    await page.locator('div:nth-child(2) > div:nth-child(5) > .laiCyIbKKdVtojOtpNxS').click();
    await page.locator('div:nth-child(2) > div:nth-child(5) > .laiCyIbKKdVtojOtpNxS').fill('ТестовеИмя');
    await page.locator('div:nth-child(2) > div:nth-child(7) > .laiCyIbKKdVtojOtpNxS').click();
    await page.locator('div:nth-child(2) > div:nth-child(7) > .laiCyIbKKdVtojOtpNxS').fill('ПоБатьку');
    await page.getByPlaceholder('+380 ХХ ХХХ ХХ ХХ').click();
    await page.getByPlaceholder('+380 ХХ ХХХ ХХ ХХ').fill('+380 66 666 66 66');
    await page.getByText('Введіть свій населений пункт').click();
    await page.locator('input[type="search"]').fill('сум');
    await page.getByRole('treeitem', { name: 'Суми' }).click();
    await page.locator('div:nth-child(13) > .y6lpHaHyQrPaBBXS3hI6 > .select2 > .selection > .select2-selection > .select2-selection__rendered').click();
    await page.locator('input[type="search"]').nth(1).fill('4');
    await page.getByRole('treeitem', { name: 'Відділення №4 (до 30' }).click();
    await page.getByText('Зберегти').click();
    await page.getByText('Дані для сертифіката').click();
    await page.locator('svg').first().click();
    await page.getByRole('link', { name: 'Тема 1 · 22 години' }).click();
    await page.getByRole('link', { name: 'Тема 1 · 22 години' }).click();
    await page.getByRole('link', { name: 'Скласти' }).first().click();
    await page.getByText('Это будет правильный ответ').click();
    await page.getByText('Этот ответ приведет к провалу теста').click();
    await page.getByRole('button', { name: 'Відповісти та продовжити' }).click();
    await page.getByText('не пройдено').click();
    await page.locator('#test__progress-item-2156').click();
    await page.getByText('Неправильна відповідь').click();
    await page.getByRole('heading', { name: 'итання' }).click();
    await page.locator('#test__progress-question-info-modal').getByRole('button').click();
    await page.getByText('Пройти тест ще раз').click();
    await page.getByText('Это будет правильный ответ').click();
    await page.getByRole('button', { name: 'Відповісти та продовжити' }).click();
    await page.getByText('успiшно пройдено').click();
    await page.getByText('1', { exact: true }).click();
    await page.getByText('Правильна відповідь').click();
    await page.getByRole('heading', { name: 'итання' }).click();
    await page.locator('#test__progress-question-info-modal').getByRole('button').click();
    await page.getByRole('link', { name: 'Продовжити навчання' }).click();
    await page.getByRole('heading', { name: 'автотест2025-01-20 10:35:' }).click();
    await page.getByRole('link', { name: 'Скласти' }).click();



  });
});


