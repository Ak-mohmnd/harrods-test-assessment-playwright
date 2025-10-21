import { Page } from "@playwright/test";

export default class LoginPage {
  constructor(public page: Page) {}

  // Selectors for login page
  url = "https://www.saucedemo.com/";
  usernameInput = "//input[@id='user-name']";
  passwordInput = "//input[@id='password']";
  loginButton = "//input[@id='login-button']";
  burgerMenu = "//button[text()='Open Menu']";
  logoutLink = "//a[@id='logout_sidebar_link']";
  title = "//span[@class='title']";

  async open() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async logout() {
    await this.page.click(this.burgerMenu);
    await this.page.click(this.logoutLink);
  }

  async isLoginSuccessful() {
    return this.page.isVisible(this.title);
  }
}
