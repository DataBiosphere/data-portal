import { test, expect } from "@playwright/test";
import { SOCIAL_COUNT, SOCIALS } from "../common/header/constants";
import { TEST_ID_HEADER_SOCIALS, TEST_BASE_URL } from "../common/contants";

test.beforeEach(async ({ baseURL, page }) => {
  await page.goto(baseURL || TEST_BASE_URL);
});

test.describe("header socials", () => {
  test("socials have a path and a svg", async ({ page }) => {
    const socialsEl = page.getByTestId(TEST_ID_HEADER_SOCIALS);
    const socialEls = socialsEl.locator("a");
    await expect(socialEls).toHaveCount(SOCIAL_COUNT);
    const count = await socialEls.count();
    for (let i = 0; i < count; ++i) {
      const socialEl = socialEls.nth(i);
      const svgPathEl = socialEl.locator("path");
      await expect(socialEl).toHaveAttribute("href", SOCIALS[i].path);
      await expect(svgPathEl).toHaveAttribute("d", SOCIALS[i].svgPath);
    }
  });
});
