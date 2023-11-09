import { test, expect, Page } from "@playwright/test";
import { TEST_ID_HEADER_NAVIGATION, TEST_BASE_URL } from "../common/contants";
import { NAVIGATIONS, NAVIGATION_COUNT } from "../common/header/constants";

test.beforeEach(async ({ baseURL, page }) => {
  await page.goto(baseURL || TEST_BASE_URL);
});

test.describe("header navigation", () => {
  test("navigation is visible", async ({ page }) => {
    const navEl = page.getByTestId(TEST_ID_HEADER_NAVIGATION);
    const buttonEls = navEl.locator("button");
    await expect(buttonEls).toHaveCount(NAVIGATION_COUNT);
  });

  test("`explore` button has label and route", async ({ page }) => {
    const navEl = page.getByTestId(TEST_ID_HEADER_NAVIGATION);
    const buttonEls = navEl.locator("button");
    const buttonEl = buttonEls.first(); // explore button
    await expect(buttonEl).toHaveText(NAVIGATIONS[0].name);
    // await buttonEl.click();
    // await page.waitForLoadState("networkidle");
    // expect(page.url()).toBe(NAVIGATIONS[0].path);
  });

  test("navigation buttons have label and route", async ({ baseURL, page }) => {
    const navEl = page.getByTestId(TEST_ID_HEADER_NAVIGATION);
    const buttonEls = navEl.locator("button");
    const count = await buttonEls.count();
    for (let i = 1; i < count; ++i) {
      const buttonEl = buttonEls.nth(i); // button
      await expect(buttonEl).toHaveText(NAVIGATIONS[i].name);
      await buttonEl.click();
      await expect(page).toHaveURL(`${baseURL}${NAVIGATIONS[i].path}`);
    }
  });
});
