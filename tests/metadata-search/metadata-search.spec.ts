import { test, expect, Page } from "@playwright/test";
import { PAGE_PATH } from "../common/pages/metadata";
import {
  testPageFirstNavigationHasTextAndRoute,
  testPageFirstOutlineHasTextAndRoute,
  testPageNavigationIsVisible,
  testPageOutlineIsVisible,
} from "../common/pages/utils";
import {
  FONT_BLACK_RBG,
  PRIMARY_RGB,
  TEST_ID_METADATA_SEARCH_INPUT,
  TEST_ID_METADATA_SEARCH_RESULTS,
  TEST_ID_SHOW_REQUIRED_FIELDS,
} from "../common/contants";
import {
  PAGE_NAVIGATION_COUNT,
  PAGE_NAVIGATIONS,
  PAGE_OUTLINE_COUNT,
  PAGE_OUTLINES,
  SEARCH_RESULT_PATH,
  SEARCH_RESULTS,
  SEARCH_STRING,
} from "../common/metadata-search/constants";

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_PATH);
});

test.describe("metadata search", () => {
  test("search bar is visible", async ({ page }) => {
    const inputEl = page.getByTestId(TEST_ID_METADATA_SEARCH_INPUT);
    await expect(inputEl).toHaveCount(1);
  });

  test("search 'cell' inside search bar, results have entity, ontology ID and description", async ({
    page,
  }) => {
    await page.getByTestId(TEST_ID_METADATA_SEARCH_INPUT).fill(SEARCH_STRING);
    const resultsEl = page.getByTestId(TEST_ID_METADATA_SEARCH_RESULTS);
    await expect(resultsEl).toHaveCount(1);
    const resultEls = resultsEl.locator("div");
    const firstResultEl = resultEls.first();
    const resultLeftSideEl = firstResultEl.locator("> span").nth(0);
    await expect(resultLeftSideEl).toHaveText(SEARCH_RESULTS[0].entity);
    const resultRightSideEl = firstResultEl.locator("> span").nth(2);
    const ontologyIdEl = resultRightSideEl.locator("> span").nth(0);
    await expect(ontologyIdEl).toHaveText(SEARCH_RESULTS[0].ontologyId);
    const descriptionEl = resultRightSideEl.locator("> span").nth(1);
    await expect(descriptionEl).toHaveText(SEARCH_RESULTS[0].description);
  });
});

test.describe("select first search result", () => {
  test("resultant metadata page should display title", async ({ page }) => {
    await page.getByTestId(TEST_ID_METADATA_SEARCH_INPUT).fill(SEARCH_STRING);
    const resultsEl = page.getByTestId(TEST_ID_METADATA_SEARCH_RESULTS);
    resultsEl.locator("div").first().click();
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    const h2El = page.locator("h2").first();
    await expect(h2El).toHaveText(SEARCH_RESULTS[0].entity);
  });

  test("resultant metadata page navigation is visible", async ({ page }) => {
    await page.goto(SEARCH_RESULT_PATH);
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    await testPageNavigationIsVisible(page, PAGE_NAVIGATION_COUNT);
  });

  test("resultant metadata page first navigation has text and route", async ({
    page,
  }) => {
    await page.goto(SEARCH_RESULT_PATH);
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    await testPageFirstNavigationHasTextAndRoute(
      page,
      PAGE_NAVIGATIONS,
      FONT_BLACK_RBG
    );
  });

  test("resultant metadata page shows all fields", async ({ page }) => {
    await page.goto(SEARCH_RESULT_PATH);
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    await page.context().clearCookies();
    const showAllFieldsEl = page.getByTestId(TEST_ID_SHOW_REQUIRED_FIELDS);
    const checkboxEl = showAllFieldsEl.locator("> span").first();
    await expect(checkboxEl).toHaveCSS("background-color", PRIMARY_RGB);
    showAllFieldsEl.click();
    await expect(checkboxEl).not.toHaveCSS("background-color", PRIMARY_RGB);
  });

  test("resultant metadata page outline is visible, showing all fields", async ({
    page,
  }) => {
    await page.goto(SEARCH_RESULT_PATH);
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    await page.context().clearCookies();
    await page.getByTestId(TEST_ID_SHOW_REQUIRED_FIELDS).click();
    await testPageOutlineIsVisible(page, PAGE_OUTLINE_COUNT);
  });

  test("resultant metadata page outline has text and route, showing all fields", async ({
    page,
  }) => {
    await page.goto(SEARCH_RESULT_PATH);
    await page.waitForURL("**" + SEARCH_RESULT_PATH);
    await page.context().clearCookies();
    await page.getByTestId(TEST_ID_SHOW_REQUIRED_FIELDS).click();
    await testPageFirstOutlineHasTextAndRoute(page, PAGE_OUTLINES);
  });
});
