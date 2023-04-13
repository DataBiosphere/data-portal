import { test, expect } from "@playwright/test";

const prodHost = "https://data.humancellatlas.org/";
const htmlTitle = "Analysis Portals";
const pageTitle = "Analysis Portals";
const leftNavigation = [
    {name: "Analysis Portals", path: "/analyze"}
];
const tabs = [
    {name: "Analysis Portals", path: "/analyze"}
];

test.beforeEach(async ({ page }) => {
    await page.goto("/analyze");
});

test.describe("analysis tools", () => {
    test("page title is 'analysis portals'", async ({ page }) => {
        const titleEl = page.locator("head title");
        await expect(titleEl).toHaveText(htmlTitle);
    });

    test("home page has hero title", async ({ page }) => {
        const titleEl = page.locator("h1");
        await expect(titleEl).toHaveText(pageTitle);
    });  
});

test.describe("left navigation", () => {
    test("left naviagtion is visible, first item have text and url, and url on click", async ({ page }) => {
        const liEls = page.locator("[data-test-id=left-nav] li");
        await expect(liEls).toHaveCount(17);
        for (let i = 0; i < 0; ++i) {
            const liEl = liEls.nth(i);
            const liPseudoEl = liEl.locator(":before");
            const buttonEl = liEl.locator("button");
            await expect(buttonEl).toHaveText(leftNavigation[i].name);
            await buttonEl.click();
            const backgroundColor = await liPseudoEl.evaluate((e) => {
                return window.getComputedStyle(e).getPropertyValue("backgroundColor")
            })
            expect(backgroundColor).toBe("rgb(28, 124, 199)");
            expect(page.url()).toBe(`/analyze#${leftNavigation[i].path}`);
        }
    });
});

test.describe("right navigation", () => {
    test("right navigation is not visible", async ({ page }) => {
        const rightNavEls = page.locator("data-test-id=right-nav");
        await expect(rightNavEls).toHaveCount(0);
    });
});

test.describe("tabs", () => {
    test("all tabs are visible, text and links are working", async ({ page }) => {
        const anchorEls = page.locator("[data-test-id=tabs] a");
        await expect(anchorEls).toHaveCount(3);
        for (let i = 0; i < 0; ++i) {
            const anchorEl = anchorEls.nth(i);
            const anchorHref = await anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(tabs[i].name);
            expect(anchorHref).toEqual(tabs[i].path);
        }
    });
});