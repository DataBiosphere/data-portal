import { test, expect, Page } from "@playwright/test";

const prodHost = "https://data.humancellatlas.org/";
const navItems = [
    {path:"https://dev.singlecell.gi.ucsc.edu/explore/", name:"Explore", description:"Search for data in the HCA"},
    {path:"/guides", name:"Guides", description:"Find user guides and how-to’s here"},
    {path:"/metadata", name:"Metadata", description:"Fields used to describe datasets in the Human Cell Atlas"},
    {path:"/pipelines", name:"Pipelines", description:"Pipelines"},
    {path:"/analyze", name:"Analysis Tools", description:"Find a list of Apps"},
    {path:"/contribute", name:"Contribute", description:"Submit your data to the HCA"},
    {path:"/apis", name:"APIs", description:"APIs"},
    {path:"/dcp-updates", name:"Updates", description:"DCP Platform Updates"}
  ];
  
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("toolbar nav", () => {
  test("toolbar nav has path and displayable nav", async ({ page }) => {
    const navEl = page.locator("data-test-id=toolbar-nav"); // ul
    const toolbarNavItemEls = navEl.locator("li"); // li tag
    await expect(toolbarNavItemEls).toHaveCount(8);
    const count = await toolbarNavItemEls.count();
    for (let i = 0; i < count; ++i) {
      const toolbarNavItemEl = toolbarNavItemEls.nth(i); // li
      const pathEl = toolbarNavItemEl.locator("a"); // a tag
      const pathLink = await pathEl.getAttribute("href");
      const nameEl = pathEl.locator("span").nth(0);
      const descriptionEl = pathEl.locator("span").nth(1);
      await expect(nameEl).toHaveText(navItems[i].name);
      await expect(descriptionEl).toHaveText(navItems[i].description);
      expect(pathLink).toEqual(navItems[i].path);
    }
  });
});
