import { test, expect } from '@playwright/test';
import { getAuthData, updateAuthData, LoginPage } from '../auth_exp.js';
//  import { getAuthData, updateAuthData } from '../auth_exp';
const authData = getAuthData();


test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
    await page.goto(authData.id3_prod);
     await page.pause();
     await loginPage.emailTextbox.click();
     await loginPage.emailTextbox.fill(authData.email);
     await loginPage.passwordTextbox.fill(authData.password);
     await loginPage.submitButton.click();
    //  await loginPage.login(authData.email, authData.password);
    // await page.locator(selectors.emailPlaceholder).click();
    // await page.locator(selectors.emailPlaceholder).fill(authData.email);
    // await page.getByPlaceholder('Ел. пошта').click();
    // await page.getByPlaceholder('Ел. пошта').fill(authData.email);
    
    // await page.getByPlaceholder('Пароль').click();
    // await page.getByPlaceholder('Пароль').fill(authData.password);
    // await page.getByRole('button', { name: 'Увійти' }).click();

    await page.getByRole('link', { name: 'Про мене' }).click();

    const newFName = 'ВильгельминаАБВГ';
    await page.locator('div').filter({ hasText: /^Ім’я$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Ім’я$/ }).getByRole('textbox').fill(newFName);
    /*
      const newSName = 'Константинова';
      await page.locator('div').filter({ hasText: /^Прізвище$/ }).getByRole('textbox').click();
      await page.locator('div').filter({ hasText: /^Прізвище$/ }).getByRole('textbox').fill(newSName);
    */
    const lastName = await page.locator('div').filter({ hasText: /^Прізвище$/ }).getByRole('textbox').inputValue();
    console.log('Значение в текстовом поле:', lastName);

    await page.getByRole('button', { name: 'Зберегти зміни' }).click();
    await expect(page.getByText('Дані збережено')).toBeVisible();

    await page.getByRole('link', { name: `${newFName} ${lastName}` }).click();


    let newFullName = newFName + ' ' + lastName;


    console.log('Полное фи:', newFullName);
    updateAuthData({ user_name: newFullName }); // Обновляем JSON через функцию

});
// ..изменения 