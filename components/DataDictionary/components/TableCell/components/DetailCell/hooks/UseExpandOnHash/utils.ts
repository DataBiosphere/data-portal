import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { Row } from "@tanstack/react-table";
import Router from "next/router";
import { SCROLL_SETTLE_MS } from "./constants";

/**
 * Expands the row when the URL's hash matches its id.
 * Never collapses the row, so "Show less" still collapses it.
 * @param row - Row.
 * @param url - URL, absolute or relative to the current URL; defaults to the current URL.
 */
function expandRowIfHashMatches(
  row: Row<Attribute>,
  url = window.location.href
): void {
  if (getHash(url) !== row.id) return;
  row.toggleExpanded(true);
}

/**
 * Returns the given URL's hash without its leading "#".
 * The hash is compared to row ids as is: no current dictionary row id has a character that a URL hash percent-encodes.
 * @param url - URL, absolute or relative to the current URL; defaults to the current URL.
 * @returns The hash.
 */
function getHash(url = window.location.href): string {
  return new URL(url, window.location.href).hash.slice(1);
}

/**
 * Scrolls the element into view now, and again each time it resizes in the next SCROLL_SETTLE_MS.
 * Below the "sm" breakpoint, findable-ui's row is still animating open after the cell's Collapse has entered, so a
 * single scroll stops short. Stops once the URL hash no longer matches the element's id, so it never overrides a later
 * navigation.
 * @param element - Element.
 */
function scrollIntoViewUntilSettled(element: HTMLElement): void {
  element.scrollIntoView();
  const observer = new ResizeObserver(() => {
    if (getHash() !== element.id) return observer.disconnect();
    element.scrollIntoView();
  });
  observer.observe(element);
  setTimeout(() => observer.disconnect(), SCROLL_SETTLE_MS);
}

/**
 * Scrolls the row into view once it has expanded, when the URL hash matches its id.
 * The browser's jump to the hash runs while the row is still collapsed, and stops short when the page is too short to
 * scroll the row to the top, e.g. for a row near the end of the page.
 * @param row - Row.
 */
export function scrollToRowIfHashMatches(row: Row<Attribute>): void {
  if (getHash() !== row.id) return;
  const element = document.getElementById(row.id);
  if (element) scrollIntoViewUntilSettled(element);
}

/**
 * Expands the row on mount if the URL hash matches its id, and again on every in-page link to it.
 * The expand on mount is queued as a microtask, so it runs after findable-ui's CollapsableRows (below the "sm"
 * breakpoint) collapses every row on mount, in its parent effect.
 * Next.js's `hashChangeStart` router event fires before the URL changes, so the hash is read from the URL it gives;
 * unlike `hashChangeComplete`, it also fires for a link to the current hash.
 * @param row - Row.
 * @returns Function that removes the listener.
 */
export function subscribeToHashExpansion(row: Row<Attribute>): () => void {
  queueMicrotask(() => expandRowIfHashMatches(row));
  const onHashChangeStart = (url: string): void =>
    expandRowIfHashMatches(row, url);
  Router.events.on("hashChangeStart", onHashChangeStart);
  return (): void => Router.events.off("hashChangeStart", onHashChangeStart);
}
