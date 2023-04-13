import { test, expect } from "@playwright/test";

const prodHost = "https://data.humancellatlas.org/";
const htmlTitle = "Overview of Data Processing Pipelines";
const pageTitle = "Overview of Data Processing Pipelines";
const leftNavigation = [
    {name: "Data Processing Pipelines", path: "/pipelines"}
];
const rightNavigation = [
    {hash: "what-is-data-processing", name: "What is Data Processing?"}
];

test.beforeEach(async ({ page }) => {
    await page.goto("/pipelines");
});

test.describe("pipelines", () => {
    test("page title is 'overview of data processing pipelines'", async ({ page }) => {
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
        await expect(liEls).toHaveCount(6);
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
        await expect(liEls).toHaveCount(3);
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
            expect(page.url()).toBe(`/pipelines#${rightNavigation[i].hash}`);
        }
    });
});
