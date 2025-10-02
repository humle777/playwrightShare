import { test, expect } from '@playwright/test';
import { getAuthData, updateAuthData, selectors } from '../auth_exp.js';
const authData = getAuthData();


test('test', async () => {
    await page.goto(authData.dev_schoolb_admin);
    await page.pause();


});
