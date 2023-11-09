import { test, expect } from "@playwright/test";
import { TEST_ID_HOMEPAGE_METRIC, TEST_BASE_URL } from "../common/contants";
import {
  HOMEPAGE_METRICS,
  HERO_TITLE,
  PAGE_TITLE,
  HOMEPAGE_METRIC_COUNT,
} from "../common/homepage/constants";

test.beforeEach(async ({ baseURL, page }) => {
  await page.goto(baseURL || TEST_BASE_URL);
});

test.describe("home page", () => {
  test("app has title", async ({ page }) => {
    await expect(page).toHaveTitle(PAGE_TITLE);
  });

  // Homepage Hero Title
  test("home page has hero title", async ({ page }) => {
    const titleEl = page.locator("h1");
    await expect(titleEl).toHaveText(HERO_TITLE);
  });
});

test.describe("home page metrics", () => {
  test("metrics have a count and a label", async ({ page }) => {
    const metricEls = page.getByTestId(TEST_ID_HOMEPAGE_METRIC);
    await expect(metricEls).toHaveCount(HOMEPAGE_METRIC_COUNT);
    const count = await metricEls.count();
    for (let i = 0; i < count; ++i) {
      const metricEl = metricEls.nth(i);
      const labelEl = metricEl.locator("span").nth(2);
      const countEl = metricEl.locator("span").nth(1);
      const imageEl = metricEl.locator("img");
      await expect(labelEl).toHaveText(HOMEPAGE_METRICS[i].label);
      await expect(countEl).toHaveText(/^([0-9]+(\.[0-9]+)?)[k|M|G|T|P|E]?$/);
      await expect(imageEl).toHaveAttribute("src", HOMEPAGE_METRICS[i].src);
    }
  });
});
