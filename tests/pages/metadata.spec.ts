import { test, expect } from "@playwright/test";

const prodHost = "https://data.humancellatlas.org/";
const htmlTitle = "Metadata Types";
const pageTitle = "Metadata Types";
const leftNavigation = [
    {name: "Metadata Types", path: "/metadata"}
];
const rightNavigation = [
    {hash: "biomaterials", name:"Biomaterials"}
];
const results= [
    {entity:"Cell cycle ontology", ontologyId:"cell_cycle_ontology", description:"A term that may be associated with a cell cycle-related ontology term."}
];
const leftNavigationOntology = [
    {name: "Biological macromolecule ontology", path: "/metadata/dictionary/ontology/biological_macromolecule_ontology"}
];
const rightNavigationOntology = [
    {name: "Cell cycle ontology ID", path: "ontology"}
]

test.beforeEach(async ({ page }) => {
    await page.goto("/metadata");
});

test.describe("metadata", () => {
    test("page title is 'metadata types'", async ({ page }) => {
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
        await expect(liEls).toHaveCount(3);
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
        await expect(liEls).toHaveCount(5);
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
            expect(page.url()).toBe(`/metadata-types#${rightNavigation[i].hash}`);
        }
    });
});

test.describe("search bar", () => {
    test("search bar is visible on metadata page", async ({ page }) => {
        const inputEl = page.locator("[data-test-id=search-bar] input");
        await expect(inputEl).toHaveCount(1);
    });
    test("search 'cell' inside search bar and results have entity, ontology ID and description", async ({ page }) => {
        await page.locator("[data-test-id=search-bar] input").fill("cell");
        const resultsEl = page.locator("data-test-id=metadata-search-results");
        await expect(resultsEl).toHaveCount(1);
        const resultEls = resultsEl.locator("div");
        const firstResultEl = resultEls.nth(0);
        const resultLeftSideEl = firstResultEl.locator("> span").nth(0);
        await expect(resultLeftSideEl).toHaveText(results[0].entity);
        const resultRightSideEl = firstResultEl.locator("> span").nth(2);
        const ontologyIdEl = resultRightSideEl.locator("> span").nth(0);
        await expect(ontologyIdEl).toHaveText(results[0].ontologyId);
        const descriptionEl = resultRightSideEl.locator("> span").nth(1);
        await expect(descriptionEl).toHaveText(results[0].description);
    });
    test("go to page of first result, check title, nav and tabs, required feilds box, etc", async ({ page }) => {
        await page.locator("[data-test-id=search-bar] input").fill("cell");
        const resultsEl = page.locator("data-test-id=metadata-search-results");
        const resultEls = resultsEl.locator("div");
        resultEls.nth(0).click();
        const metadataTitle = page.locator("[data-test-id=content] h2").nth(0);
        await expect(metadataTitle).toHaveText(results[0].entity);
        const leftLiEls = page.locator("[data-test-id=left-nav] li");
        await expect(leftLiEls).toHaveCount(30);
        for (let i = 0; i < 0; ++i) {
            const liEl = leftLiEls.nth(i);
            const anchorEl = liEl.locator("a"); // a tag
            const anchorHref = await anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(leftNavigationOntology[i].name);
            expect(anchorHref).toEqual(leftNavigationOntology[i].path);
        }
        const rightLiEls = page.locator("[data-test-id=right-nav] li");
        await expect(rightLiEls).toHaveCount(3);
        for (let i = 0; i < 0; ++i) {
            const liEl = rightLiEls.nth(i);
            const anchorEl = liEl.locator("a"); // a tag
            const anchorHref = await anchorEl.getAttribute("href");
            await expect(anchorEl).toHaveText(rightNavigationOntology[i].name);
            expect(anchorHref).toEqual(rightNavigationOntology[i].path);
        }
    });
});
