import { expect, test } from "@playwright/test";

test.describe("SignInPage Validation, Password Toggle, and Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/signin");
  });

  test("Validation errors for invalid email and password", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('p:text("Email is required")')).toBeVisible();
    await expect(page.locator('p:text("Password is required")')).toBeVisible();

    await page.fill('input[type="email"]', "invalid-email");
    await page.fill('input[type="password"]', "short");
    await page.click('button[type="submit"]');
    await expect(
      page.locator('p:text("Please enter an email address")')
    ).toBeVisible();
    await expect(
      page.locator('p:text("Password must be at least 8 characters long")')
    ).toBeVisible();

    await page.fill('input[type="password"]', "lowercase");
    await page.click('button[type="submit"]');
    await expect(
      page.locator(
        'p:text("Password must contain at least one uppercase letter")'
      )
    ).toBeVisible();

    await page.fill('input[type="password"]', "NoNumbers");
    await page.click('button[type="submit"]');
    await expect(
      page.locator('p:text("Password must contain at least one number")')
    ).toBeVisible();
  });

  test("Password visibility toggle works", async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    const toggleButton = page.locator('button[type="button"]');

    await page.fill('input[type="password"]', "Password123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleButton.click();
    await expect(page.locator('input[type="text"]')).toHaveValue("Password123");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("Redirects to signup page when link is clicked", async ({ page }) => {
    await page.click('a:text("Sign up here")');
    await expect(page).toHaveURL("http://localhost:5173/signup#");
  });
});
