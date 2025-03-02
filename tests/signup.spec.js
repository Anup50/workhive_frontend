import { expect, test } from "@playwright/test";

test.describe("SignUpPage Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/signup"); // Adjust the URL if needed
  });

  test("Password visibility toggle works", async ({ page }) => {
    await page.waitForSelector("div.relative >> button", { timeout: 5000 });

    const passwordInput = page.locator('input[placeholder="Enter password"]');

    const toggleButton = page.locator("div.relative").first().locator("button");

    await page.fill('input[placeholder="Enter password"]', "Password123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    const confirmPasswordInput = page.locator(
      'input[placeholder="Confirm password"]'
    );

    const confirmToggleButton = page
      .locator("div.relative")
      .nth(1)
      .locator("button");

    await page.fill('input[placeholder="Confirm password"]', "Password123");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
    await confirmToggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "text");
    await confirmToggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("Successful signup redirects to sign-in page", async ({ page }) => {
    await page.route("**/api/user/register", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "User registered successfully",
        }),
      });
    });

    await page.fill('input[placeholder="Full Name"]', "Test User");
    await page.fill('input[placeholder="Email"]', "test@example.com");
    await page.fill('input[placeholder="Enter password"]', "Password123");
    await page.fill('input[placeholder="Confirm password"]', "Password123");

    await page.waitForSelector('button:has-text("Job Seeker")', {
      timeout: 5000,
    });
    await page.click('button:has-text("Job Seeker")');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:5173/signin", {
      timeout: 10000,
    });
  });

  test("Navigates to sign in page when the link is clicked", async ({
    page,
  }) => {
    await page.click('a:text("Sign in here")');
    await expect(page).toHaveURL("http://localhost:5173/signin");
  });

  test("Displays google sign up button", async ({ page }) => {
    await expect(
      page.locator('button:has-text("Sign up with Google")')
    ).toBeVisible();
  });
});
