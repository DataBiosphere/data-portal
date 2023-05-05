import { test, expect, Page } from "@playwright/test";
import {
  PAGE_HEADING,
  PAGE_NAVIGATION_COUNT,
  PAGE_NAVIGATIONS,
  PAGE_OUTLINE_COUNT,
  PAGE_OUTLINES,
  PAGE_TITLE,
  PAGE_PATH,
  PAGE_TAB_COUNT,
  PAGE_TABS,
} from "../common/pages/metadata";
import {
  testPageFirstNavigationHasTextAndRoute,
  testPageFirstOutlineHasTextAndRoute,
  testPageHasHeading,
  testPageNavigationIsVisible,
  testPageOutlineIsVisible,
  testPageTabsAreVisible,
  testPageTabsHaveTextAndRoute,
} from "../common/pages/utils";
import { BLACK_RGB } from "../common/contants";

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_PATH);
});

test.describe("metadata", () => {
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
    await testPageFirstNavigationHasTextAndRoute(
      page,
      PAGE_NAVIGATIONS,
      BLACK_RGB
    );
  });

  test("outline is visible, showing required fields only", async ({ page }) => {
    await testPageOutlineIsVisible(page, PAGE_OUTLINE_COUNT);
  });

  test("outline has text and route", async ({ page }) => {
    await testPageFirstOutlineHasTextAndRoute(page, PAGE_OUTLINES);
  });

  test("tabs are visible", async ({ page }) => {
    await testPageTabsAreVisible(page, PAGE_TAB_COUNT);
  });

  test("tabs have text and route", async ({ page }) => {
    await testPageTabsHaveTextAndRoute(page, PAGE_TABS);
  });
});
