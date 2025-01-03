import { test, expect } from '@playwright/test';
import getAuthData from '../auth_exp';
const authData = getAuthData();

test.describe('school22', () => {
  test.describe.configure({ mode: 'serial' }); // Устанавливаем последовательный режим

  test('school2', async ({ page }) => {
  await page.goto(authData.schoolk);
 //  await page.pause();  
  



const LoginButton = page.locator('#auth-btn');
  await expect(LoginButton).toHaveText('Вхід та реєстрація');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Вхід та реєстрація' }).click();

  const page1 = await page1Promise;

  
  await page1.getByPlaceholder('Ел. пошта').fill(authData.email);
  await page1.getByPlaceholder('Пароль').fill(authData.password);
  await page1.getByRole('button', { name: 'Увійти' }).click();

  await expect(LoginButton).toHaveText(authData.user_name);






  await page.getByRole('link', { name: 'ТЕСТ 070320244 Короткий опис програми4\nКороткий опис програми\nКороткий опис програми', exact: true }).click();
  await page.getByRole('link', { name: 'Курс 9. Ведемо табель · 2' }).click();
  await page.frameLocator('iframe[title="Презентація програми \\"Професійна сертифікація за МСФЗ\\""]').getByLabel('Play', { exact: true }).click();
  await page.getByRole('link', { name: 'Наступний урок Як відображати у табелі робочий час' }).click();
  await page.goto('https://devschool.prokadry.com.ua/courses/36/98/280/1226/');
  await page.goto('https://devschool.prokadry.com.ua/courses/36/');
  await page.locator('.header__logo').click();
  await page.getByRole('link', { name: 'Мінікурс ДСОП: Безпечна експлуатація ТТЗ і місць їхнього обслуговування Тільки д' }).click();
  await page.getByText('Хочу сертифікат').click();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .laiCyIbKKdVtojOtpNxS').click();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .laiCyIbKKdVtojOtpNxS').fill('ТестПризв');
  await page.locator('div:nth-child(2) > div:nth-child(5) > .laiCyIbKKdVtojOtpNxS').click();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .laiCyIbKKdVtojOtpNxS').fill('ТестИмя');
  await page.locator('div:nth-child(2) > div:nth-child(7) > .laiCyIbKKdVtojOtpNxS').click();
  await page.locator('div:nth-child(2) > div:nth-child(7) > .laiCyIbKKdVtojOtpNxS').fill('ТестБатько');
  await page.getByPlaceholder('+380 ХХ ХХХ ХХ ХХ').click();
  await page.getByPlaceholder('+380 ХХ ХХХ ХХ ХХ').fill('666666666');
  await page.getByText('Введіть свій населений пункт').click();
  await page.locator('input[type="search"]').fill('конот');
  await page.getByRole('treeitem', { name: 'Конотоп' }).click();
  await page.locator('div:nth-child(13) > .y6lpHaHyQrPaBBXS3hI6 > .select2 > .selection > .select2-selection > .select2-selection__rendered').click();
  await page.getByRole('treeitem', { name: 'Поштомат "Нова Пошта" №36237' }).click();
  await page.getByText('Зберегти').click();
  await page.getByRole('link', { name: 'Скласти' }).click();
  await page.getByText('ні', { exact: true }).click();
  await page.getByRole('button', { name: 'Відповісти та продовжити' }).click();
  await page.getByText('1', { exact: true }).first().click();
  await page.locator('#test__progress-item-273').click();
  await page.getByText('Неправильна відповідь').click();
  await page.locator('#test__progress-question-info-modal').getByRole('button').click();
  await page.getByText('Пройти тест ще раз').click();
  await page.getByText('так').click();
  await page.getByRole('button', { name: 'Відповісти та продовжити' }).click();
  await page.getByText('2', { exact: true }).click();
  await page.getByText('1', { exact: true }).click();
  await page.getByText('Правильна відповідь').click();
  await page.locator('#test__progress-question-info-modal').getByRole('button').click();
  await page.getByText('Завершити навчання').click();
  await page.getByRole('heading', { name: 'Вітаємо Вас з успішним завершенням навчання!' }).click();
  await page.locator('#success-end').getByRole('button').click();
  await page.getByRole('link', { name: 'Мінікурс ДСОП: Безпечна експлуатація ТТЗ і місць їхнього обслуговування Тільки д' }).click();


});
});


