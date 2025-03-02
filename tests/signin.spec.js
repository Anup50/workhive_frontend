import { expect, test } from "@playwright/test";

test.describe("SignInPage Validation, Password Toggle, and Navigation", () => {
  test("Password visibility toggle works", async ({ page }) => {
    await page.goto("http://localhost:5173/signin");

    // Use more specific selectors based on your component structure
    const passwordInput = page.getByPlaceholder("Enter password");
    const toggleButton = page.locator(".relative button").first(); // Target first toggle button in password field

    // Verify initial state
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Toggle visibility
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle back
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
  test("Validation errors for invalid email and password", async ({ page }) => {
    await page.goto("http://localhost:5173/signin");

    // Leave the fields empty and submit
    await page.click('button[type="submit"]');

    // Validate the error messages
    await expect(page.locator('p:text("Email is required")')).toBeVisible();
    await expect(page.locator('p:text("Password is required")')).toBeVisible();
  });
  test("Toast notification for invalid credentials", async ({ page }) => {
    // Mock API response
    await page.route("**/api/user/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    });

    await page.goto("http://localhost:5173/signin");

    const emailInput = page.getByPlaceholder("Email");
    const passwordInput = page.getByPlaceholder("Enter password");

    await emailInput.waitFor({ state: "visible" });
    await emailInput.fill("invalid@example.com");
    await passwordInput.fill("WRongpassword@123");

    // Submit and verify
    await page.click('button[type="submit"]');
    const toast = page.getByText("Invalid credentials");
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test("Toast notification for successful login", async ({ page }) => {
    await page.route("**/api/user/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mock-token",
          role: "User",
          message: "Login successful!",
        }),
      });
    });

    await page.goto("http://localhost:5173/signin");

    await page.getByPlaceholder("Email").fill("test@example.com");
    await page.getByPlaceholder("Enter password").fill("ValidPassword123");

    await page.click('button[type="submit"]');
    const toast = page.getByText("Login successful!");
    await expect(toast).toBeVisible({ timeout: 5000 });
  });
});
