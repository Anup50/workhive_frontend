// tests/home.spec.js
import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/"); // Adjust the URL if needed
  });

  test('displays "Recent Jobs" heading', async ({ page }) => {
    const recentJobsHeading = page.locator('h2:text("Recent Jobs")');
    await expect(recentJobsHeading).toBeVisible();
  });

  test("displays JobCard components", async ({ page }) => {
    // Mocking the API response is ideal here, but for a basic test:
    // This assumes that the API will return at least one job.
    const JobCard = page.locator(".job-card"); // Assuming your JobCard component has a class "job-card"
    await expect(JobCard).toBeVisible();
  });

  test("JobCard components have correct data", async ({ page }) => {
    // Again, mocking the API response is ideal.
    // This is a basic example and might need adjustments based on your actual data.

    const jobCard = page.locator(".job-card").first(); // Get the first job card

    // Example assertions (adjust based on your JobCard content)
    const title = await jobCard.locator(".job-title").textContent(); // Assuming a class "job-title"
    const company = await jobCard.locator(".company-name").textContent(); // Assuming a class "company-name"
    const location = await jobCard.locator(".job-location").textContent(); // Assuming a class "job-location"

    // Example checks, replace with actual checks based on how your backend works.
    expect(title).not.toBeNull();
    expect(company).not.toBeNull();
    expect(location).not.toBeNull();
  });

  test("JobCard apply link is correct", async ({ page }) => {
    const jobCard = page.locator(".job-card").first();
    const applyLink = await jobCard.locator("a").getAttribute("href");
    expect(applyLink).toMatch(/\/job\//); // Check if the link contains /job/
  });

  test("error state is handled correctly", async ({ page }) => {
    // Implement a way to simulate error state (e.g., mock the API to return an error).
    // Example (requires mocking):
    // await page.route('**/api/jobs', route => {
    //   route.fulfill({
    //     status: 500,
    //     contentType: 'application/json',
    //     body: JSON.stringify({ error: 'Internal Server Error' }),
    //   });
    // });
    // const errorIndicator = page.locator('.error-indicator'); // Assuming you have an error indicator
    // await expect(errorIndicator).toBeVisible();
  });
});
