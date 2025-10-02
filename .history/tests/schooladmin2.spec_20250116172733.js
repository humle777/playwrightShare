import { test, expect } from '@playwright/test';
import { getAuthData, selectors } from '../auth_exp.js';

const authData = getAuthData();

test.describe('total', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(authData.dev_schoolb_admin);
    await page.getByPlaceholder('Email').fill('yevhenii.davydenko@lasoft.org');
    await page.getByPlaceholder('Пароль').fill(authData.password_dev_school_admin);
    await page.getByRole('button', { name: 'Увійти' }).click();
  });

  test('create program', async () => {
    await page.goto('https://devschool.buhplatforma.com.ua/admin/courses/');
    await page.getByRole('link', { name: ' Додати програму' }).click();
    await page.getByLabel('Коди програми').fill('NewAutoTest');
    await page.getByLabel('Назва програми HTML').fill('me of the HTML');
    await page.getByLabel('Короткий опис програми').fill('loe ipsum quiqe test');
    await page.getByLabel('Повний опис програми').fill('ful descripion а the procourese');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByRole('cell', { name: 'NewAutoTest' })).toBeVisible();
  });

  test('add module', async () => {
    await page.getByRole('cell', { name: 'NewAutoTest' }).click();
    await page.getByRole('link', { name: ' Додати модуль' }).click();
    await page.getByLabel('Назва модуля').fill('модуль1');
    await page.getByLabel('Опис модуля').fill('опис модуля один');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await expect(page.getByText('Новий модуль успішно створений!')).toBeVisible();
  });

  test('delete program', async () => {
    await page.goto('https://devschool.buhplatforma.com.ua/admin/courses/');
    await page.getByRole('row', { name: /NewAutoTest/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Видалити', exact: true }).click();
    await expect(page.getByRole('row', { name: /NewAutoTest/ })).not.toBeVisible();
  });

  test.afterAll(async () => {
    await page.close();
  });
});
