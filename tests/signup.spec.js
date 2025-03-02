// tests/signup.spec.js
import { expect, test } from "@playwright/test";

test.describe("SignUpPage Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/signup"); // Adjust the URL if needed
  });

  test("Validation errors for empty fields and mismatched passwords", async ({
    page,
  }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Full Name is required.")).toBeVisible();
    await expect(page.locator("text=Email is required.")).toBeVisible();
    await expect(page.locator("text=Password is required.")).toBeVisible();
    await expect(page.locator("text=Role is required.")).toBeVisible();

    await page.fill('input[placeholder="Full Name"]', "Test User");
    await page.fill('input[placeholder="Email"]', "test@example.com");
    await page.fill('input[placeholder="Enter password"]', "password123");
    await page.fill('input[placeholder="Confirm password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Passwords do not match.")).toBeVisible();

    await page.fill('input[placeholder="Enter password"]', "short");
    await page.fill('input[placeholder="Confirm password"]', "short");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=Password must be at least 8 characters long.")
    ).toBeVisible();

    await page.fill('input[placeholder="Email"]', "invalidemail");
    await page.fill('input[placeholder="Enter password"]', "password123");
    await page.fill('input[placeholder="Confirm password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=Please enter a valid email address.")
    ).toBeVisible();
  });

  test("Password visibility toggle works", async ({ page }) => {
    const passwordInput = page.locator('input[placeholder="Enter password"]');
    const toggleButton = page.locator('button[aria-label="Show password"]');

    await page.fill('input[placeholder="Enter password"]', "Password123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    const confirmPasswordInput = page.locator(
      'input[placeholder="Confirm password"]'
    );
    const confirmToggleButton = page.locator(
      'button[aria-label="Show confirm password"]'
    );

    await page.fill('input[placeholder="Confirm password"]', "Password123");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
    await confirmToggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "text");
    await confirmToggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("Successful signup redirects to sign-in page", async ({ page }) => {
    // Mock the registerUser API call to simulate a successful response.
    await page.route("**/api/register", (route) => {
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
    await page.locator("select").selectOption({ label: "Job Seeker" });
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:5173/signin");
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
