import { test, expect, chromium } from '@playwright/test'


test('expectus', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await context.newPage()

    await page1.goto('https://gb.expertus.com.ua/')
    //await page1.pause()
    const pagePropise = context.waitForEvent('page')
    await page1.click('id=auth-btn')
    const newPage = await pagePropise;
    //await page1.waitForTimeout(4000)
    //await newPage.waitForTimeout(4000)

    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div/input').click()
    //await newPage.locator('#root > div > div.sc-ciEjBl.duosNi > div > div.sc-gGfaQS.dBmuWZ > div.sc-ehkVkK.cotSTt > div.sc-hGglLj.kBEhuw > div:nth-child(3) > div > input').click()
    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div/input').fill('yevhenii.davydenko@lasoft.org')
    //await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[3]/div/input').click
    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[3]/div/input').fill('qwe11')
    await newPage.click('//*[@id="root"]/div/div[2]/div/div[1]/div[3]/button')
    //await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[3]/button').click()
    //await expect(page1.get('auth-btn')).toHaveText('Вильгельмина');
    await expect(page1.locator('id=auth-btn')).toHaveText(/Вильгельмина/);
    await page1.waitForSelector('//*[@id="search-text"]', { timeout: 5000 })
    await page1.locator('//*[@id="search-text"]').fill('бухгалтер года')

    await page1.click('//*[@id="header"]/div[2]/div/div/div/div/form/button')
    //await page1.waitForTimeout(3000)
    //await page1.waitForSelector('[data-position="1"]', {timeout: 5000})
    await expect(page1.locator('[data-position="1"]')).toHaveText(/Чому ви/);
    //await page1.pause()


});

test('recodru', async ({ page }) => {

    await page.pause()
    await page.goto('https://shop.expertus.media/');
    await page.getByRole('link', { name: 'Кадри' }).first().click();
    await page.locator('#bx_3966226736_2611 > .inner-product > .name-product').click();
    await page.locator('a').filter({ hasText: 'Національна сертифікація кадровиків —' }).click();
    //await page.getByLabel('грн.\n                                                \n                                            \n                                            9 280').check();
    await page.getByRole('link', { name: 'Замовити' }).click();
    await page.getByText('+').click();
    await page.getByText('+').click();
    await page.getByRole('link', { name: 'Оформити замовлення' }).click();
    await page.getByPlaceholder('Ім\'я *').click();
    await page.getByPlaceholder('Ім\'я *').fill('тест');
    await page.getByPlaceholder('Прізвище *').click();
    await page.getByPlaceholder('Прізвище *').fill('куа');
    await page.getByPlaceholder('Email *').click();
    await page.getByPlaceholder('Email *').fill('qq@qq.qq');
    await page.getByRole('button', { name: 'Далі' }).click();
    await page.getByPlaceholder('Назва організації').click();
    await page.getByPlaceholder('Назва організації').fill('BOSH');
    await page.getByPlaceholder('ЄДРПОУ').click();
    await page.getByPlaceholder('ЄДРПОУ').fill('666666');
    await page.getByRole('button', { name: 'Отримати рахунок' }).click();
    await page.getByText('Код ЄДРПОУ повинен складатися з 8 або 10 цифр').click();
    await page.getByPlaceholder('ЄДРПОУ').click();
    await page.getByPlaceholder('ЄДРПОУ').fill('66666666');
    await page.getByRole('button', { name: 'Отримати рахунок' }).click();
});



test.only('onlineChat', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await context.newPage()

    await page1.goto('https://dev.helper-api.expertus.com.ua/')
    //await page1.pause()
    const pagePropise = context.waitForEvent('page')
    await page1.click('id=auth-btn')
    const newPage = await pagePropise;

    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div/input').click()
    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[1]/div/input').fill('yevhenii.davydenko@lasoft.org')
    await newPage.locator('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div[1]/div[3]/div/input').fill('qwe11')
    await newPage.click('//*[@id="root"]/div/div[2]/div/div[1]/div[3]/button')
    await expect(page1.locator('id=auth-btn')).toHaveText(/Вильгельмина/);
    //await page1.pause()
    await page1.getByText('Продавець-консультант').click();
    for (let i = 116; i <= 150; i++) {
        
        //await page1.getByPlaceholder('Повідомлення').click();
        await page1.locator('//*[@id="expertus-widget"]/div/div/div[2]/div[2]/div/div[2]/textarea[1]').fill(i.toString(),{timeout:600000});
        

        await page1.locator('//*[@id="expertus-widget"]/div/div/div[2]/div[2]/div/div[2]/button').click({timeout:600000});
        //await page1.pause(2000);
        //await new Promise(resolve => setTimeout(resolve, 2000));
    }
},120000);
/*
const delayBetweenMessages = 1000; // Задержка между сообщениями (в миллисекундах)

// Цикл от 1 до 50
for (let i = 1; i <= 30; i++) {
    // Находим поле ввода по XPath
    const inputXPath = '//*[@id="expertus-widget"]/div/div/div[2]/div[2]/div/div[2]/textarea[1]';
    const inputElement = document.evaluate(inputXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Проверяем, найдено ли поле ввода
    if (inputElement) {
        // Вводим текст в поле
        inputElement.focus();
        document.execCommand('insertText', false, i.toString());
        console.log(`Текст ${i} введен`);

        // Находим кнопку по XPath
        const buttonXPath = '//*[@id="expertus-widget"]/div/div/div[2]/div[2]/div/div[2]/button';
        const buttonElement = document.evaluate(buttonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        // Проверяем, видима ли кнопка
        const isButtonVisible = !!(buttonElement && buttonElement.offsetWidth || buttonElement.offsetHeight || buttonElement.getClientRects().length);

        if (isButtonVisible) {
            // Кликаем на кнопку
            buttonElement.click();
            console.log('Клик выполнен');
        } else {
            console.log('Кнопка не видна');
        }
    } else {
        console.log('Поле ввода не найдено');
    }

    // Ждем указанное время перед отправкой следующего сообщения
    await new Promise(resolve => setTimeout(resolve, delayBetweenMessages));
}
*/