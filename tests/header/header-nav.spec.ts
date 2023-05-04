import { test, expect, Page } from "@playwright/test";
import exp from "constants";

const navItems = [
    {path:"https://dev.singlecell.gi.ucsc.edu/explore/projects", name:"Explore"},
    {path:"guides", name:"Guides"},
    {path:"metadata", name:"Metadata"},
    {path:"pipelines", name:"Pipelines"},
    {path:"analyze", name:"Analysis Tools"},
    {path:"contribute", name:"Contribute"},
    {path:"apis", name:"APIs", description:"APIs"},
    {path:"dcp-updates", name:"Updates"}
  ];
  
test.beforeEach(async ({ baseURL, page }) => {
  await page.goto(baseURL);
});

test.describe("header navigation", () => {
    test("header nav has eight navigation buttons", async ({ baseURL, page }) => {
    const navEl = page.locator("data-test-id=nav-links");
    const buttonEls = navEl.locator("button");
    await expect(buttonEls).toHaveCount(8);
  });

  test("header nav `Explore` button has a label and route", async ({ page }) => {
    const navEl = page.locator("data-test-id=nav-links");
    const buttonEls = navEl.locator("button");
    const buttonEl = buttonEls.nth(0); // explore button
      await expect(buttonEl).toHaveText(navItems[0].name);
      await buttonEl.click();
      await page.waitForLoadState("networkidle");
      expect(page.url()).toBe(navItems[0].path);
  });

  test("header nav buttons have a label and route", async ({ baseURL, page }) => {
    const navEl = page.locator("data-test-id=nav-links");
    const buttonEls = navEl.locator("button");
    const count = await buttonEls.count();
    for (let i = 1; i < count; ++i) {
      const buttonEl = buttonEls.nth(i); // button
      await expect(buttonEl).toHaveText(navItems[i].name);
      await buttonEl.click();
      await expect(page).toHaveURL(`${baseURL}${navItems[i].path}`);
    }
  });
});
