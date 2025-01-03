import { test, expect } from '@playwright/test';

test.describe('All testes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    //await page.pause()
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html')

  });
  /*
  test.afterAll(async ({ page }) => {
    await context.close()
  });
  */
  test('AddToCard', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('#item_0_img_link').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  });
  test('LogOut', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.locator('[data-test="login-button"]').click();
  });
})


