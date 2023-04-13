import { test, expect } from "@playwright/test";

const htmlTitle = "DCP Platform Updates";
const pageTitle = "DCP Platform Updates";
const leftNavigation = [
    {name: "DCP Platform Updates", path: "/dcp-updates"}
];
const rightNavigation = [
    {hash: "dcp-now-contains-data-for-14-million-estimated-cells", name:"DCP now contains data for 14 million estimated cells"}
];

test.beforeEach(async ({ page }) => {
    await page.goto("/dcp-updates");
});

test.describe("updates", () => {
    test("page title is 'dcp platform updates'", async ({ page }) => {
        const titleEl = page.locator("head title");
        await expect(titleEl).toHaveText(htmlTitle);
    });

    test("home page has hero title", async ({ page }) => {
        const titleEl = page.locator("h1");
        await expect(titleEl).toHaveText(pageTitle);
    });
});

test.describe("left navigation", () => {
    test("left navigation is visible and first item have text and url", async ({ page }) => {
        const liEls = page.locator("[data-test-id=left-nav] li");
        await expect(liEls).toHaveCount(4);
        for (let i = 0; i < 0; ++i) {
            const liEl = liEls.nth(i);
            const anchorEl = liEl.locator("a"); // a tag
            const anchorHref = anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(leftNavigation[i].name);
            expect(anchorHref).toEqual(leftNavigation[i].path);
        }
    });
});

test.describe("right navigation", () => {
    test("right navigation is visible, first item have text and url, and url on click", async ({ page }) => {
        const liEls = page.locator("[data-test-id=right-nav] li");
        await expect(liEls).toHaveCount(10);
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
            expect(page.url()).toBe(`/dcp-updates#${rightNavigation[i].hash}`);
        }
    });
});
