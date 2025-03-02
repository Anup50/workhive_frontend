// tests/home.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route("**/api/jobs*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "1",
            title: "Test Job",
            employer: { companyName: "Test Corp", companyLogo: "/logo.png" },
            location: "Remote",
            jobType: "Full-time",
            salary: "$100k",
            description: "Test description",
            experienceLevel: "Mid-level",
          },
        ]),
      })
    );
  });

  test("should redirect unauthenticated users", async ({ page }) => {
    // Mock null jobSeekerId
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          jobSeekerId: "null",
        })
      );
    });

    await page.goto("/");
    await expect(page).toHaveURL("/user/form");
  });

  test("should load basic elements", async ({ page }) => {
    await page.goto("/");

    // Verify page structure
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByText("Recommended Jobs")).toBeVisible();
    await expect(page.getByText("Recent Jobs")).toBeVisible();
  });

  test("should display loading spinner", async ({ page }) => {
    // Delay API response to test loading state
    await page.route("**/api/jobs*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
        delay: 1000,
      })
    );

    await page.goto("/");
    await expect(page.getByTestId("loading-spinner")).toBeVisible();
  });

  test("should show error state", async ({ page }) => {
    // Mock error response
    await page.route("**/api/jobs*", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "API Error" }),
      })
    );

    await page.goto("/");
    await expect(page.getByText(/failed to load jobs/i)).toBeVisible();
    await expect(page.getByText("API Error")).toBeVisible();
  });

  test("should display job cards", async ({ page }) => {
    await page.goto("/");

    // Verify job cards render
    const jobCards = page.getByTestId("job-card");
    await expect(jobCards.first()).toBeVisible();
    await expect(jobCards).toHaveCount(2); // 1 recommended + 1 recent

    // Verify job card content
    await expect(page.getByText("Test Job")).toBeVisible();
    await expect(page.getByText("Test Corp")).toBeVisible();
    await expect(page.getByText("Remote")).toBeVisible();
  });
});
