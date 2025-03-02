// import { expect, test } from "@playwright/test";

// test.describe("Home Page", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.addInitScript(() => {
//       window.localStorage.setItem(
//         "auth",
//         JSON.stringify({
//           jobSeekerId: "null", // Or any other appropriate value
//           role: "User", // Ensure the role is set to "User"
//         })
//       );
//     });
//     await page.goto("http://localhost:5173/user");
//     await page.route("http://localhost:3000/api/job/getall", (route) => {
//       route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify([
//           {
//             _id: "67c420a9481149437dae166e",
//             title: "Web Developer",
//             employer: {
//               companyName: "Company 2",
//               companyLogo:
//                 "http://localhost:3000/uploads/companylogo_images/Simon Stålenhag.jpg",
//             },
//             location: "Dillibazar, Kathmandu",
//             jobType: "Part-time",
//             salary: "$100,000",
//             description: "Design and build web apps for clients",
//             experienceLevel: "Mid",
//           },

//           {
//             _id: "67c432741f4f64faea83cdae",
//             title: "Software Engineer",
//             employer: {
//               companyName: "ABCD Corp",
//               companyLogo:
//                 "http://localhost:3000/uploads/companylogo_images/Unsplash.jpg",
//             },
//             location: "Kathmandu",
//             jobType: "Full-time",
//             salary: "$150,000",
//             description: "Develop software applications.",
//             experienceLevel: "Senior",
//           },
//         ]),
//       });
//     });

//     await page.route(
//       "http://localhost:3000/api/job/getrecommended",
//       (route) => {
//         route.fulfill({
//           status: 200,
//           contentType: "application/json",
//           body: JSON.stringify([
//             {
//               _id: "67c420a9481149437dae166e",
//               title: "Frontend Developer",
//               employer: {
//                 companyName: "TechCompany",
//                 companyLogo:
//                   "http://localhost:3000/uploads/companylogo_images/TechCompany.jpg",
//               },
//               location: "Patan",
//               jobType: "Full-time",
//               salary: "$120,000",
//               description: "Build modern web applications.",
//               experienceLevel: "Junior",
//             },
//           ]),
//         });
//       }
//     );
//   });

//   test("should redirect unauthenticated users", async ({ page }) => {
//     await page.addInitScript(() => {
//       window.localStorage.setItem(
//         "auth",
//         JSON.stringify({
//           jobSeekerId: "null",
//         })
//       );
//     });

//     await page.goto("http://localhost:5173");
//     await expect(page).toHaveURL("http://localhost:5173");
//   });

//   test("should load basic elements", async ({ page }) => {
//     await page.goto("http://localhost:5173/user");

//     // Verify page structure
//     await expect(page.getByRole("main")).toBeVisible();
//     await expect(page.getByText("Recommended Jobs")).toBeVisible();
//     await expect(page.getByText("Recent Jobs")).toBeVisible();
//   });

//   test("should display job cards for recommended jobs", async ({ page }) => {
//     const recommendedJobCards = page.locator(".w-auto.p-6.bg-base-100");
//     await expect(recommendedJobCards.first()).toBeVisible();

//     // Verify recommended job card content
//     await expect(page.getByText("Frontend Developer")).toBeVisible();
//     await expect(page.getByText("TechCompany")).toBeVisible();
//     await expect(page.getByText("Patan")).toBeVisible();
//   });

//   test("should display job cards for recent jobs", async ({ page }) => {
//     const recentJobCards = page.locator(".w-auto.p-6.bg-base-100");
//     await expect(recentJobCards.first()).toBeVisible();

//     // Verify recent job card content
//     await expect(page.getByText("Web Developer")).toBeVisible();
//     await expect(page.getByText("Company 2")).toBeVisible();
//     await expect(page.getByText("Dillibazar, Kathmandu")).toBeVisible();
//   });

//   test("should display loading spinner", async ({ page }) => {
//     await page.route("http://localhost:3000/api/job/getall", (route) =>
//       route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify([]),
//         delay: 1000,
//       })
//     );

//     await page.goto("http://localhost:5173/user");
//     await expect(page.getByTestId("loading-spinner")).toBeVisible();
//   });
// });
//======================
import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          jobSeekerId: "12367c36b4fefd9755a494ee1de45", // Set a valid jobSeekerId here
          role: "User",
        })
      );
    });
    await page.goto("http://localhost:5173/user");

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
                "http://localhost:3000/uploads/companylogo_images/Simon Stålenhag.jpg",
            },
            location: "Dillibazar, Kathmandu",
            jobType: "Part-time",
            salary: "$100,000",
            description: "Design and build web apps for clients",
            experienceLevel: "Mid",
          },
          {
            _id: "67c432741f4f64faea83cdae",
            title: "Software Engineer",
            employer: {
              companyName: "ABCD Corp",
              companyLogo:
                "http://localhost:3000/uploads/companylogo_images/Unsplash.jpg",
            },
            location: "Kathmandu",
            jobType: "Full-time",
            salary: "$150,000",
            description: "Develop software applications.",
            experienceLevel: "Senior",
          },
        ]),
      });
    });

    await page.route(
      "http://localhost:3000/api/job/getrecommended",
      (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([
            {
              _id: "67c420a9481149437dae166e",
              title: "Frontend Developer",
              employer: {
                companyName: "TechCompany",
                companyLogo:
                  "http://localhost:3000/uploads/companylogo_images/TechCompany.jpg",
              },
              location: "Patan",
              jobType: "Full-time",
              salary: "$120,000",
              description: "Build modern web applications.",
              experienceLevel: "Junior",
            },
          ]),
        });
      }
    );
  });

  test("should redirect unauthenticated users", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          jobSeekerId: "null",
        })
      );
    });

    await page.goto("http://localhost:5173");
    await expect(page).toHaveURL("http://localhost:5173");
  });

  test("should display job cards for recent jobs", async ({ page }) => {
    const recentJobCards = page.locator(".w-auto.p-6.bg-base-100");
    await expect(recentJobCards.first()).toBeVisible();

    await expect(page.getByText("Web Developer")).toBeVisible();
    await expect(page.getByText("Company 2")).toBeVisible();
    await expect(page.getByText("Dillibazar, Kathmandu")).toBeVisible();
  });
});
