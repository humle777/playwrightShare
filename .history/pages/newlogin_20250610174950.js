// pages/NewLogin.js
const { expect } = require('@playwright/test');

class NewLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Здесь определяем наши селекторы
    this.url = 'https://dev.id3.expertus.com.ua/login';
    this.searchInput = 'textarea[name="q"]'; // Используем name атрибут, он достаточно стабилен
    this.searchButton = 'input[name="btnK"]'; // Кнопка "Поиск в Google"
    this.acceptCookiesButton = 'button div:has-text("Принять все")'; // Селектор для кнопки "Принять все" в cookie-баннере
  }

  async navigate() {
    await this.page.goto(this.url);
    // Добавляем проверку на cookie-баннер и его закрытие
    // Это важно, так как cookie-баннеры могут блокировать взаимодействие
    const acceptCookiesButtonLocator = this.page.locator(this.acceptCookiesButton);
    if (await acceptCookiesButtonLocator.isVisible()) {
      await acceptCookiesButtonLocator.click();
      // Дополнительно можно дождаться исчезновения баннера, если он анимирован
      await expect(acceptCookiesButtonLocator).toBeHidden({ timeout: 5000 });
    }
  }

  async search(text) {
    await this.page.fill(this.searchInput, text);
    // Playwright автоматически нажимает Enter после fill,
    // но для явного нажатия кнопки поиска (если нужно)
    // можно использовать: await this.page.click(this.searchButton);
    // Однако для Google обычно достаточно нажать Enter.
    await this.page.press(this.searchInput, 'Enter'); // Нажимаем Enter после ввода текста
  }

  async verifySearchResultsPage(text) {
    // Проверяем, что заголовок страницы содержит поисковый запрос
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }
}

module.exports = { NewLoginPage };