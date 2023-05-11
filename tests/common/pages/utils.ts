import {
  BLACK_RGB,
  FONT_BLACK_RBG,
  PRIMARY_RGB,
  TEST_ID_PAGE_NAVIGATION,
  TEST_ID_PAGE_OUTLINE,
  TEST_ID_PAGE_TAB,
} from "../contants";
import { expect, Page } from "@playwright/test";
import { PageNavigation, PageOutline, PageTab } from "../entities";

/**
 * Tests page has h1 heading.
 * @param page - Page to test.
 * @param heading - Page heading.
 */
export async function testPageHasHeading(
  page: Page,
  heading: string
): Promise<void> {
  const titleEl = page.locator("h1");
  await expect(titleEl).toHaveText(heading);
}

/**
 * Tests page first navigation has text and route.
 * @param page - Page to test.
 * @param navigations - Navigations to test.
 * @param color - Color of navigation.
 */
export async function testPageFirstNavigationHasTextAndRoute(
  page: Page,
  navigations: PageNavigation[],
  color: string = PRIMARY_RGB
): Promise<void> {
  const ulEl = page.getByTestId(TEST_ID_PAGE_NAVIGATION);
  const liLinkEl = ulEl.locator("li").first().locator("a");
  await expect(liLinkEl).toHaveText(navigations[0].name);
  await expect(liLinkEl).toHaveAttribute("href", navigations[0].path);
  await expect(liLinkEl).toHaveCSS("color", color);
  await liLinkEl.click();
  await page.waitForURL("**" + navigations[0].path);
  await expect(page).toHaveURL(navigations[0].path);
}

/**
 * Tests page first outline has text and route.
 * @param page - Page to test.
 * @param outlines - Outlines to test.
 */
export async function testPageFirstOutlineHasTextAndRoute(
  page: Page,
  outlines: PageOutline[]
): Promise<void> {
  const ulEl = page.getByTestId(TEST_ID_PAGE_OUTLINE);
  const buttonEl = ulEl.locator("button").first();
  await expect(buttonEl).toHaveText(outlines[0].name);
  await expect(buttonEl).toHaveCSS("color", FONT_BLACK_RBG);
  await buttonEl.click();
  await expect(buttonEl).toHaveCSS("color", BLACK_RGB);
  const url = new URL(page.url());
  expect(url.hash).toEqual(outlines[0].hash);
}

/**
 * Tests page navigation is visible.
 * @param page - Page to test.
 * @param count - Count of navigation.
 */
export async function testPageNavigationIsVisible(
  page: Page,
  count: number
): Promise<void> {
  const ulEl = page.getByTestId(TEST_ID_PAGE_NAVIGATION);
  const liEls = ulEl.locator("li");
  await expect(liEls).toHaveCount(count);
}

/**
 * Tests page outline is visible.
 * A count of 0 means there is no outline rendered.
 * @param page - Page to test.
 * @param count - Count of outline.
 */
export async function testPageOutlineIsVisible(
  page: Page,
  count: number
): Promise<void> {
  const ulEl = page.getByTestId(TEST_ID_PAGE_OUTLINE);
  const buttonEls = await ulEl.locator("button");
  await expect(buttonEls).toHaveCount(count);
}

/**
 * Tests page tabs are visible.
 * A count of 0 means there are no tabs rendered.
 * @param page - Page to test.
 * @param count - Count of tabs.
 */
export async function testPageTabsAreVisible(
  page: Page,
  count: number
): Promise<void> {
  const tabEls = page.getByTestId(TEST_ID_PAGE_TAB);
  await expect(tabEls).toHaveCount(count);
}

/**
 * Tests page tabs have text and route.
 * @param page - Page to test.
 * @param tabs - Tabs to test.
 */
export async function testPageTabsHaveTextAndRoute(
  page: Page,
  tabs: PageTab[]
): Promise<void> {
  const tabEls = page.getByTestId(TEST_ID_PAGE_TAB);
  const count = await tabEls.count();
  for (let i = 0; i < count; ++i) {
    const anchorEl = tabEls.nth(i).locator("a");
    await expect(anchorEl).toHaveText(tabs[i].name);
    await expect(anchorEl).toHaveAttribute("href", tabs[i].path);
  }
}
