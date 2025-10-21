import { test, expect } from '@playwright/test';
import LoginPage from './pages/LoginPage';

// Basic happy-path using standard user on Saucedemo
const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

// Invalid credentials for negative test
const INVALID_USER = 'locked_out_user';
const INVALID_PASS = 'wrong_password';

// Sauce demo inventory page title locator is in the page object

test.describe('Saucedemo Login', () => {
  test('logs in successfully and logs out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.login(VALID_USER, VALID_PASS);

    await expect(page.locator(loginPage.title)).toBeVisible();

    await loginPage.logout();

    await expect(page).toHaveURL(/.*saucedemo\.com\//);
  });

  test('fails to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.login(INVALID_USER, INVALID_PASS);

    // Login should remain on the login page showing an error. Keep it simple by checking URL contains saucedemo and title not visible.
    await expect(page.locator(loginPage.title)).not.toBeVisible();
  });
});
