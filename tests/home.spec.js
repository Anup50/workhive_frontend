// import { expect, test } from "@playwright/test";

// test.describe("HomePage", () => {
//   test("should display required sections on homepage", async ({ page }) => {
//     await page.goto("http://localhost:5173");

//     await expect(page.locator("text=WorkHive")).toBeVisible();
//   });
// });
// test("displays Hero component", async ({ page }) => {
//   const heroSection = page.locator(".hero-section");

//   await expect(heroSection).toBeVisible();

//   const heroHeading = heroSection.locator("h1");
//   await expect(heroHeading).toBeVisible();

//   const getStartedButton = heroSection.locator("button.btn-primary");
//   await expect(getStartedButton).toBeVisible();
// });
import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.route("http://localhost:3000/api/job/getall", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "67c420a9481149437dae166e",
            title: "Web Developer",
            employer: {
              companyName: "Company 2",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Simon StÃ¥lenhag Wallpapers-THE LABYRINTH -2020- - l_fb_11.jpg",
            },
            location: "Dillibazar, Kathmandu",
            jobType: "Part-time",
            salary: "$100,000",
            description: "TO design and build webapps for clients",
            experienceLevel: "Mid",
          },
          {
            _id: "67c4226b481149437dae16aa",
            title: "Mobile App Tester",
            employer: {
              companyName: "Company 1",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Simon StÃ¥lenhag Wallpapers-THE LABYRINTH -2020- - l_fb_11.jpg",
            },
            location: "Kathmandu",
            jobType: "Part-time",
            salary: "$1,000,000",
            description: "To test mobile apps for external clients",
            experienceLevel: "Entry",
          },
          {
            _id: "67c432741f4f64faea83cdae",
            title: "Web Developer",
            employer: {
              companyName: "ABCD Comp",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Unsplash Wallpapers-Thu Jan 18 2024.jpg",
            },
            location: "Kathmandu",
            jobType: "Full-time",
            salary: "$200,000",
            description:
              "Web developer Web developer Web developer Web developer ",
            experienceLevel: "Mid",
          },
          {
            _id: "67c44777b6e8e6f4f3d6376e",
            title: "Web App Developer",
            employer: {
              companyName: "ABCD Company",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Unsplash Wallpapers-Thu Jan 18 2024.jpg",
            },
            location: "Dillibazar, Kathmandu",
            jobType: "Full-time",
            salary: "$3,000,000",
            description:
              "Web App Developer Web App Developer Web App Developer Web App Developer",
            experienceLevel: "Entry",
          },
          {
            _id: "67c4496eb6e8e6f4f3d63824",
            title: "Mobile App Developer",
            employer: {
              companyName: "ABCDE Company",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Unsplash Wallpapers-Thu Jan 18 2024.jpg",
            },
            location: "Kathmandu",
            jobType: "Full-time",
            salary: "$1,000,000",
            description: "Developer required to design and build mobile apps",
            experienceLevel: "Mid",
          },
          {
            _id: "67c44c8ab6e8e6f4f3d6393f",
            title: "Web App Developer",
            employer: {
              companyName: "Andy Company",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Unsplash Wallpapers-Thu Jan 18 2024.jpg",
            },
            location: "Kathmandu",
            jobType: "Full-time",
            salary: "$200,000",
            description: "Developer needed for deploying websites",
            experienceLevel: "Mid",
          },
        ]),
      });
    });
  });

  test("displays Hero component", async ({ page }) => {
    const heroSection = page.locator(".hero-section");
    await expect(heroSection).toBeVisible();

    const heroHeading = heroSection.locator("h1");
    await expect(heroHeading).toBeVisible();

    const getStartedButton = heroSection.locator("button.btn-primary");
    await expect(getStartedButton).toBeVisible();
  });

  test("displays 'Recent Jobs' heading", async ({ page }) => {
    const recentJobsHeading = page.locator('h2:text("Recent Jobs")');
    await expect(recentJobsHeading).toBeVisible();
  });

  test("displays JobCard components", async ({ page }) => {
    const jobCardLocator = page.locator(".w-auto.p-6.bg-base-100");
    await jobCardLocator.first().waitFor({ state: "visible" });

    const jobCardCount = await jobCardLocator.count();
    expect(jobCardCount).toBeGreaterThan(0);
  });
});
