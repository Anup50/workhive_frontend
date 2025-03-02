import { expect, test } from "@playwright/test";

test.describe("CompleteEmployerProfile", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/employer/getEmployerId", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ employerId: null }),
      });
    });

    await page.route("**/api/auth/check*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ isValid: true }),
      });
    });

    await page.context().addInitScript(() => {
      localStorage.setItem("role", "Employer");
      localStorage.setItem("userId", "mockUserId");
      localStorage.setItem("token", "valid-token");
      localStorage.setItem("user", JSON.stringify({ name: "Test User" }));
    });

    await page.goto("http://localhost:5173/employer/form");
    await page.waitForSelector('button:has-text("Complete Profile")');
  });

  test("Navigates to employer page if profile exists", async ({ page }) => {
    await page.route("**/api/employer/getEmployerId", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ employerId: "existing-123" }),
      });
    });

    await page.evaluate(() => {
      localStorage.setItem("employerId", "existing-123");
    });

    await page.reload();
    await page.waitForURL("http://localhost:5173/employer", { timeout: 5000 });
  });

  test("Validation errors show for empty form", async ({ page }) => {
    await page.click('button:has-text("Complete Profile")');
    await expect(
      page.locator("text=Company name must be at least 3 characters")
    ).toBeVisible({ timeout: 5000 });
  });

  test("Validation error for invalid logo file type", async ({ page }) => {
    const buffer = Buffer.from("This is a test file");
    await page.setInputFiles('input[type="file"]', {
      name: "test.txt",
      mimeType: "text/plain",
      buffer: buffer,
    });
    await page.click('button:has-text("Complete Profile")');
    await expect(page.locator("text=Must be an image file")).toBeVisible();
  });

  test("Validation error for invalid website URL", async ({ page }) => {
    await page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) {
        form.setAttribute("novalidate", "true");
      }
    });

    await page.fill('input[name="companyWebsite"]', "invalid-url");
    await page.click('button:has-text("Complete Profile")');

    await expect(page.locator("text=Invalid website URL")).toBeVisible({
      timeout: 5000,
    });
  });
});
