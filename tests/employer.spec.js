import { expect, test } from "@playwright/test";

test.describe("CompleteEmployerProfile", () => {
  test.beforeEach(async ({ page }) => {
    // Mock localStorage
    await page.evaluate(() => {
      localStorage.setItem("userId", "testUserId");
    });
    await page.goto("http://localhost:5173/complete-employer-profile"); // Adjust the URL if needed
  });

  test("Validation errors for empty fields", async ({ page }) => {
    await page.click('button:has-text("Complete Profile")');
    await expect(
      page.locator("text=Company name must be at least 3 characters")
    ).toBeVisible();
    await expect(
      page.locator("text=Location must be at least 3 characters")
    ).toBeVisible();
    await expect(
      page.locator("text=Description must be at least 50 characters")
    ).toBeVisible();
  });

  test("Validation error for invalid website URL", async ({ page }) => {
    await page.fill('input[name="companyWebsite"]', "invalid-url");
    await page.click('button:has-text("Complete Profile")');
    await expect(page.locator("text=Invalid website URL")).toBeVisible();
  });

  test("Validation error for invalid logo file type", async ({ page }) => {
    // Create a mock non-image file
    const buffer = Buffer.from("This is a test file");
    const mockFile = {
      name: "test.txt",
      buffer: buffer,
      mimeType: "text/plain",
    };

    await page.setInputFiles('input[type="file"]', {
      name: mockFile.name,
      mimeType: mockFile.mimeType,
      buffer: mockFile.buffer,
    });

    await page.click('button:has-text("Complete Profile")');
    await expect(page.locator("text=Must be an image file")).toBeVisible();
  });

  test("Successful profile creation", async ({ page }) => {
    // Mock the createEmployer API call to simulate a successful response.
    await page.route("**/api/employer", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { _id: "newEmployerId" },
        }),
      });
    });

    await page.fill('input[name="companyName"]', "Test Company");
    await page.fill('input[name="location"]', "Test Location");
    await page.fill(
      'input[name="companyDescription"]',
      "This is a test company description with at least 50 characters."
    );
    await page.fill('input[name="companyWebsite"]', "http://www.test.com");

    // Mock an image file upload
    const buffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "base64"
    );
    const mockFile = {
      name: "test.png",
      buffer: buffer,
      mimeType: "image/png",
    };

    await page.setInputFiles('input[type="file"]', {
      name: mockFile.name,
      mimeType: mockFile.mimeType,
      buffer: mockFile.buffer,
    });

    await page.click('button:has-text("Complete Profile")');
    await expect(page).toHaveURL("http://localhost:5173/employer");

    // Check localStorage and context update
    const employerId = await page.evaluate(() =>
      localStorage.getItem("employerId")
    );
    expect(employerId).toBe("newEmployerId");
  });

  test("Loading spinner during submission", async ({ page }) => {
    // Mock the createEmployer API call to simulate a delayed response.
    await page.route("**/api/employer", (route) => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: { _id: "newEmployerId" },
          }),
        });
      }, 1000); // Delay for 1 second
    });

    await page.fill('input[name="companyName"]', "Test Company");
    await page.fill('input[name="location"]', "Test Location");
    await page.fill(
      'input[name="companyDescription"]',
      "This is a test company description with at least 50 characters."
    );

    await page.click('button:has-text("Complete Profile")');
    await expect(page.locator(".loading-spinner")).toBeVisible();
    await expect(page).toHaveURL("http://localhost:5173/employer");
  });

  test("Navigates to /employer if employerId is already set", async ({
    page,
  }) => {
    // Mock localStorage and context to simulate an existing employerId
    await page.evaluate(() => {
      localStorage.setItem("employerId", "existingEmployerId");
    });
    await page.reload();
    await expect(page).toHaveURL("http://localhost:5173/employer");
  });
});
