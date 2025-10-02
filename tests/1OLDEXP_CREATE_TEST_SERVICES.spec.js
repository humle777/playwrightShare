import { test, expect } from '@playwright/test';

test('ServiceTests', async ({ page }) => {
  // let NameTest='Autotest7';
  const text = "автотест";
  const now = new Date();
  const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' '); // Формат: YYYY-MM-DD HH:MM:SS
  const NameTest = text + formattedDateTime;
  
  console.log(NameTest); // Выведет: Мой отчет за 2023-11-23 13:37:05



  await page.goto('https://dev.service.exp.com.ua/admin/login');
  //  await page.pause(); 
  // await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('yevhenii.davydenko@lasoft.org');
  // await page.getByLabel('Пароль').click();
  await page.getByLabel('Пароль').fill('K1x64PGLaiEc0pz');
  await page.getByRole('button', { name: 'Увійти' }).click();
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
  // await page.waitForSelector('table#crudTable td:has-text("Autotest4")');
  // await expect(page.locator(`table#crudTable td:has-text('Autotest5')`)).toBeVisible();
  await expect(page.locator(`table#crudTable td:has-text("${NameTest}")`)).toBeVisible();
  console.log(`table#crudTable td:has-text("${NameTest}")`);
 
});

/*test('LoginErrors', async ({ page }) => {
  await page.goto('https://gb.expertus.com.ua/');
//   await page.pause();  
  const LoginButton = page.locator('#auth-btn');
  await expect(LoginButton).toHaveText('Вхід та реєстрація');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Вхід та реєстрація' }).click();

  const page1 = await page1Promise;

  await page1.getByRole('button', { name: 'Увійти' }).click();
  const errorElement = page1.locator('.sc-dkcEsn.fFMskR');

  await expect(errorElement).toHaveText('Поле пошта обов’язкове');

  await page1.getByPlaceholder('Ел. пошта').type("yevhenii.davydenko@lasoft.org", { delay: 50});
  await page1.getByRole('button', { name: 'Увійти' }).click();

  await expect(errorElement).toHaveText('Поле пароль обов’язкове');
  await page1.getByPlaceholder('Ел. пошта').t
  await page1.getByPlaceholder('Ел. пошта').fill('323yevhenii.davydenko@lasoft.org');
  await page1.getByPlaceholder('Пароль').fill('qwe111');
  await page1.getByRole('button', { name: 'Увійти' }).click();

  await expect(errorElement).toHaveText('Користувача з таким e-mail не знайдено. Уведіть іншу адресу або зареєструйтеся');

  await page1.getByPlaceholder('Ел. пошта').fill('yevhenii.davydenko@lasoft.org');
  await page1.getByPlaceholder('Пароль').fill('qwe1111');
  await page1.getByRole('button', { name: 'Увійти' }).click();

  await expect(errorElement).toHaveText('Неправильна ел. пошта або пароль, уведіть свої дані правильно. Маєте труднощі — тисніть «нагадати» у стрічці поля з паролем');
  
  await page1.getByPlaceholder('Пароль').fill('qwe11');
  await page1.getByRole('button', { name: 'Увійти' }).click();
  await expect(LoginButton).toHaveText('Вильгельмина Константинова');
//   await page.waitForTimeout(10000);
  await page.context().storageState({ path: 'state.json' });
});

test('Search', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();
//   await page.waitForTimeout(5000);
  await page.goto('https://gb.expertus.com.ua/'); // Возможно, потребуется добавить для проверки контекста
  await page.waitForTimeout(5000);

//   await page.pause();

  await expect (page.locator('#auth-btn')).toHaveText('Вильгельмина Константинова');
  await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').click();
  await page.getByPlaceholder('Введіть запит українською, щоб шукати у робочих ситуаціях').fill('пдв');
  await page.getByRole('link', { name: 'пдв', exact: true }).first().click();

  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Калькулятор ПДВ' }).click();
  const page2 = await page2Promise;

  await page2.getByRole('heading', { name: 'Калькулятор ПДВ' }).click();
  await expect (page.locator('#auth-btn')).toHaveText('Вильгельмина Константинова');
});
*/