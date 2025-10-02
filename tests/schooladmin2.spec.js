import { test, expect } from '@playwright/test';
import { getAuthData, selectors } from '../auth_exp.js';
const text = "автотест";
const now = new Date();
const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' '); // Формат: YYYY-MM-DD HH:MM:SS
let NameTest;
NameTest = text + formattedDateTime;
const moduleName = 'модуль1';

const authData = getAuthData();

test.describe('Total', () => {
    test.describe.configure({ mode: 'serial' });
    test('login_admin', async ({ page }) => {

        await page.goto(authData.dev_schoolb_admin);
        // await page.pause();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(authData.email);
        await page.getByPlaceholder('Пароль').click();
        await page.getByPlaceholder('Пароль').fill(authData.password_dev_school_admin);
        await page.getByRole('button', { name: 'Увійти' }).click();
        await page.context().storageState({ path: 'state4.json' });

    });
    test.describe('Sub_Total', () => {
        test.describe.configure({ mode: 'serial' });
        test.use({ storageState: 'state4.json' })


        test('create_course', async ({ page, context }) => {
            // await context.storageState({ path: 'state2.json' })
            // await page.pause();
            await page.goto('https://devschool.buhplatforma.com.ua/admin/courses/');
            await page.getByRole('link', { name: ' Додати програму' }).click();
            await page.getByLabel('Коди програми').click();
            await page.getByLabel('Коди програми').fill(NameTest);
            await page.locator('#title2').click();
            await page.locator('#title2').fill('New second name');
            await page.getByLabel('Назва програми HTML').click();
            await page.getByLabel('Назва програми HTML').fill('me of the HTML');
            await page.getByLabel('Короткий опис програми').click();
            await page.getByLabel('Короткий опис програми').fill('loe ipsum quiqe test');
            await page.getByLabel('Повний опис програми').click();
            await page.getByLabel('Повний опис програми').fill('ful descripion а the procourese');
            await page.locator('#productVersionsMain').click();
            await page.locator('#productVersionsMain').fill('30001');
            await page.locator('#productVersions').click();
            await page.locator('#productVersions').fill('30001');
            await page.locator('#productVersions2').click();
            await page.locator('#productVersions2').fill('33333');
            await page.getByLabel('Видавати сертифікат').check();
            await page.locator('#typecert').selectOption('1');
            await page.getByLabel('Скільки днів відображати кнопку “Дані для сертифікату”').selectOption('start');
            await page.locator('input[name="display_days_for_certificate_button"]').click();
            await page.locator('input[name="display_days_for_certificate_button"]').fill('222');
            await page.locator('#product_main_code').click();
            await page.locator('#product_main_code').fill('33333');
            await page.getByLabel('Видавати сертифікат').check();
            await page.getByRole('button', { name: 'Зберегти' }).click();

            console.log(NameTest);
            await expect(page.getByText('Нова програма успішно створена!')).toBeVisible();

            await page.getByRole('link', { name: 'Програми' }).click();
            await expect(page.getByRole('cell', { name: NameTest })).toBeVisible(); // Проверка, что строка отображается
            await page.getByRole('cell', { name: NameTest }).click();
            await page.locator(`tr:has(td:text("${NameTest}")) td a.btn-info[title="Модулі"]`).click();
            // await page.locator('td:nth-child(5) > .btn').first().click();
            await page.getByRole('link', { name: ' Додати модуль' }).click();
            await page.getByLabel('Назва модуля').click();
            await page.getByLabel('Назва модуля').fill(moduleName);
            await page.getByLabel('Опис модуля').click();
            await page.getByLabel('Опис модуля').fill('опис одуля один');
            await page.getByRole('button', { name: 'Зберегти' }).click();
            await expect(page.getByText('× Новий модуль успішно створений!')).toBeVisible(); // ?
            await page.getByText('× Новий модуль успішно створений!').click();

            await page.getByRole('link', { name: 'Програми' }).click();
            await page.locator(`tr:has(td:text("${NameTest}")) td a.btn-info[title="Модулі"]`).click();
            // await page.locator('tr', { has: page.locator('td', { hasText: moduleName }) }).locator('a', { hasText: 'Теми модуля' }).click(); // подумать как сократить строку  

            await page.locator('tr', { hasText: moduleName }).locator('a[title="Теми модуля"]').click();


            await page.getByRole('link', { name: ' Додати тему' }).click();
            await page.getByLabel('Назва теми').click();
            await page.getByLabel('Назва теми').fill('Тема 1');
            await page.getByLabel('Тривалість теми (годин)').click();
            await page.getByLabel('Тривалість теми (годин)').fill('22');
            await page.getByLabel('Опис теми').click();
            await page.getByLabel('Опис теми').fill('опис теми модуля один');
            await page.getByRole('button', { name: 'Зберегти' }).click();
            await expect(page.getByText(/Тема успішно створена!/)).toBeVisible();// Проверка, что появилось сообщение об успешном создании
            await expect(page.locator('.alert.alert-success')).toHaveText(/Тема успішно створена!/);
            await page.getByText('× Тема успішно створена!').click();

            await page.getByRole('link', { name: 'Програми' }).click();
            await page.locator(`tr:has(td:text("${NameTest}")) td a.btn-info[title="Модулі"]`).click();
            await page.locator('tr', { hasText: moduleName }).locator('a[title="Питання модуля"]').click();
            // await page.getByRole('link', { name: ' Питання (0)' }).click(); // поправить под конкретную строку
            await page.getByRole('link', { name: ' Додати питання' }).click();
            await page.getByLabel('Текст питання').click();
            await page.getByLabel('Текст питання').fill('итання1');
            await page.getByLabel('Тема до якої належить питання').click();
            await page.selectOption('#theme_id', { label: 'Тема 1' });

            await page.getByRole('button', { name: 'Зберегти' }).click();
            await expect.soft(page.locator('.alert.alert-success')).toHaveText(/Нове питання успішно створено!/);


            // await page.getByRole('link', { name: ' Відповіді на питання (0)' }).click(); //поправить под конкретную строку
            await page.locator('tr', { hasText: 'итання1' }).locator('a[title="Відповіді"]').click();
            await expect(page.locator('.box-header')).toHaveText('итання1');// или убрать или сделать проверу на видимость
            await page.getByRole('link', { name: ' Додати відповідь' }).click();
            await page.getByLabel('Текст відповіді').click();
            await page.getByLabel('Текст відповіді').fill('Это будет правильный ответ');
            await page.getByLabel('Відповідь вірна?').selectOption('1');
            await page.getByRole('button', { name: 'Зберегти' }).click();
            await page.getByRole('link', { name: ' Додати відповідь' }).click();
            await page.getByLabel('Текст відповіді').click();
            await page.getByLabel('Текст відповіді').fill('Этот ответ приведет к провалу теста');
            await page.getByRole('button', { name: 'Зберегти' }).click();

            await page.getByRole('link', { name: ' Список питань модуля' }).click();
            await page.getByRole('link', { name: ' Список модулів' }).click();
            await page.getByRole('link', { name: ' Назад' }).click();

        });

        test.skip('delete_course', async ({ page }) => {
            //  await page.pause();
            await page.goto(authData.dev_schoolb_admin);
            await page.getByRole('row', { name: new RegExp(`${NameTest}`) }).getByRole('button').click();
            // await page.getByRole('row', { name: /NameTest/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Видалити', exact: true }).click();

            try {
                await expect(page.locator('.alert.alert-success')).toHaveText(new RegExp(`\\s*Програма\\s*"${NameTest}"\\s*успішно\\s*видалено\\s*`));

            } catch (error) {
                console.warn(`Warning: Program deletion message verification failed: ${error.message}`);
                await page.screenshot({ path: `screenshots/deletion_error_${Date.now()}.png` });
            }


            await expect(page.getByRole('cell', { name: NameTest })).not.toBeVisible(); // Проверка, что строка больше не отображается

        });


    });
    
});