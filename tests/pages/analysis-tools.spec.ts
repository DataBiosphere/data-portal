import { test, expect } from "@playwright/test";
import {
  PAGE_HEADING,
  PAGE_NAVIGATION_COUNT,
  PAGE_NAVIGATIONS,
  PAGE_TAB_COUNT,
  PAGE_TABS,
  PAGE_TITLE,
  PAGE_PATH,
} from "../common/pages/analysisTools";
import {
  testPageFirstNavigationHasTextAndRoute,
  testPageHasHeading,
  testPageNavigationIsVisible,
  testPageOutlineIsVisible,
  testPageTabsAreVisible,
  testPageTabsHaveTextAndRoute,
} from "../common/pages/utils";

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_PATH);
});

test.describe("analysis tools", () => {
  test("page has title", async ({ page }) => {
    await expect(page).toHaveTitle(PAGE_TITLE);
  });

  test("page has heading", async ({ page }) => {
    await testPageHasHeading(page, PAGE_HEADING);
  });

  test("navigation is visible", async ({ page }) => {
    await testPageNavigationIsVisible(page, PAGE_NAVIGATION_COUNT);
  });

  test("first navigation has text and route", async ({ page }) => {
    await testPageFirstNavigationHasTextAndRoute(page, PAGE_NAVIGATIONS);
  });

  test("outline is not visible", async ({ page }) => {
    await testPageOutlineIsVisible(page, 0);
  });

  test("tabs are visible", async ({ page }) => {
    await testPageTabsAreVisible(page, PAGE_TAB_COUNT);
  });

  test("tabs have text and route", async ({ page }) => {
    await testPageTabsHaveTextAndRoute(page, PAGE_TABS);
  });
});
