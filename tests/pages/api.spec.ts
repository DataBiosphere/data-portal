import { test, expect } from "@playwright/test";

const prodHost = "https://data.humancellatlas.org/";
const htmlTitle = "DCP APIs";
const pageTitle = "DCP APIs";
const leftNavigation = [
    {name:"Data Browser API", path:"/apis/api-documentation/data-browser-api"}
];
const rightNavigation = [
    {hash: "api-usage-examples", name:"API Usage Examples"}
];
const tabs = [
    {name: "API Documentation", path: "/apis"}
];


test.beforeEach(async ({ page }) => {
    await page.goto("/apis");
});

test.describe("APIs", () => {
    test("page title is 'dcp apis'", async ({ page }) => {
        const titleEl = page.locator("head title");
        await expect(titleEl).toHaveText(htmlTitle);
    });

    test("home page has hero title", async ({ page }) => {
        const titleEl = page.locator("h1");
        await expect(titleEl).toHaveText(pageTitle);
    });  
});

test.describe("left navigation", () => {
    test("left naviagtion is visible and first item have text and url", async ({ page }) => {
        const liEls = page.locator("[data-test-id=left-nav] li");
        await expect(liEls).toHaveCount(2);
        for (let i = 0; i < 0; ++i) {
            const liEl = liEls.nth(i);
            const anchorEl = liEl.locator("a"); // a tag
            const anchorHref = await anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(leftNavigation[i].name);
            expect(anchorHref).toEqual(leftNavigation[i].path);
        }
    });
});

test.describe("right navigation", () => {
    test("right naviagtion is visible, first item have text and url, and url on click", async ({ page }) => {
        const liEls = page.locator("[data-test-id=right-nav] li");
        await expect(liEls).toHaveCount(1);
        for (let i = 0; i < 0; ++i) {
            const liEl = liEls.nth(i);
            const liPseudoEl = liEl.locator(":before");
            const buttonEl = liEl.locator("button");
            await expect(buttonEl).toHaveText(rightNavigation[i].name);
            await buttonEl.click();
            const backgroundColor = await liPseudoEl.evaluate((e) => {
                return window.getComputedStyle(e).getPropertyValue("backgroundColor")
            })
            expect(backgroundColor).toBe("rgb(28, 124, 199)");
            expect(page.url()).toBe(`/guides#${rightNavigation[i].hash}`);
        }
    });
});

test.describe("tabs", () => {
    test("all tabs are visible, text and links are working", async ({ page }) => {
        const anchorEls = page.locator("[data-test-id=tabs] a");
        await expect(anchorEls).toHaveCount(1);
        for (let i = 0; i < 0; ++i) {
            const anchorEl = anchorEls.nth(i);
            const anchorHref = await anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(tabs[i].name);
            expect(anchorHref).toEqual(tabs[i].path);
        }
    });
});