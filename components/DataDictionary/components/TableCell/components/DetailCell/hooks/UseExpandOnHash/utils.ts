import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { Row, Table } from "@tanstack/react-table";
import Router from "next/router";
import { SCROLL_SETTLE_MS } from "./constants";

/**
 * The hash each table has finished handling: its row has expanded and scrolled into view, or the user collapsed it
 * first. A cell that mounts again, e.g. when a filter hides and shows its row or the table changes layout at the "sm"
 * breakpoint, does not expand its row again for a hash its table has handled.
 */
const HANDLED_HASHES = new WeakMap<Table<Attribute>, string>();

/**
 * The row each table is expanding for the URL hash, on mount or on a hash change, until the row has expanded or
 * collapsed. A later event for the same hash can find the row already expanded by this hook, e.g. back/forward fires
 * both Next.js's `hashChangeStart` and the window's `hashchange`; it must not mark the hash as handled before the row
 * has been scrolled into view.
 */
const EXPANDING_ROW_IDS = new WeakMap<Table<Attribute>, string>();

/**
 * Clears the table's expanding row when it is the given row, once the row has expanded or collapsed.
 * @param row - Row.
 * @param table - Table.
 */
function clearExpandingRow(row: Row<Attribute>, table: Table<Attribute>): void {
  if (EXPANDING_ROW_IDS.get(table) !== row.id) return;
  EXPANDING_ROW_IDS.delete(table);
}

/**
 * Expands the row when the URL hash matches its id.
 * Never collapses the row, so "Show less" still collapses it.
 * @param row - Row.
 */
function expandRowIfHashMatches(row: Row<Attribute>): void {
  if (getHash() !== row.id) return;
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
 * Handles a hash change for the row, when the new URL's hash matches its id: a collapsed row clears the table's
 * handled hash and expands, so a link to a row the user collapsed expands it again, and the row is scrolled into view
 * and marked handled once it has expanded; a row the user already expanded marks the hash as handled, since it does
 * not animate open and so never calls onEntered. Rows the hash does not match leave the table's handled hash as it is.
 * @param row - Row.
 * @param table - Table.
 * @param url - New URL, absolute or relative to the current URL.
 */
function handleHashChange(
  row: Row<Attribute>,
  table: Table<Attribute>,
  url: string
): void {
  if (getHash(url) !== row.id) return;
  if (!row.getIsExpanded()) {
    HANDLED_HASHES.delete(table);
    EXPANDING_ROW_IDS.set(table, row.id);
    row.toggleExpanded(true);
    return;
  }
  if (EXPANDING_ROW_IDS.get(table) === row.id) return;
  HANDLED_HASHES.set(table, row.id);
}

/**
 * Returns true when the URL hash matches the row's id and the row's table has not yet handled the hash.
 * @param row - Row.
 * @param table - Table.
 * @returns True when the hash is the row's and is still to be handled.
 */
function isHashUnhandled(
  row: Row<Attribute>,
  table: Table<Attribute>
): boolean {
  const hash = getHash();
  return hash === row.id && HANDLED_HASHES.get(table) !== hash;
}

/**
 * Marks the URL hash as handled when the row collapses before the hash was handled, e.g. the user clicks "Show less"
 * while the row is still expanding, so a later "Show more" does not scroll.
 * @param row - Row.
 * @param table - Table.
 */
export function markHashHandled(
  row: Row<Attribute>,
  table: Table<Attribute>
): void {
  clearExpandingRow(row, table);
  if (!isHashUnhandled(row, table)) return;
  HANDLED_HASHES.set(table, row.id);
}

/**
 * Scrolls the element into view now, and again each time it resizes in the next SCROLL_SETTLE_MS, so it ends up in
 * view once it has stopped growing, e.g. while findable-ui's row below the "sm" breakpoint is still animating open.
 * @param element - Element.
 */
function scrollIntoViewUntilSettled(element: HTMLElement): void {
  element.scrollIntoView();
  const observer = new ResizeObserver(() => element.scrollIntoView());
  observer.observe(element);
  setTimeout(() => observer.disconnect(), SCROLL_SETTLE_MS);
}

/**
 * Scrolls the row into view once it has expanded, when the URL hash matches its id and the hash is not yet handled,
 * then marks the hash as handled.
 * The browser's jump to the hash runs while the row is still collapsed, and stops short when the page is too short to
 * scroll the row to the top, e.g. for a row near the end of the page. Scrolling again once the row has expanded puts
 * the row below the sticky filters, using the page's scroll-padding-top.
 * @param row - Row.
 * @param table - Table.
 */
export function scrollToRowIfHashUnhandled(
  row: Row<Attribute>,
  table: Table<Attribute>
): void {
  clearExpandingRow(row, table);
  if (!isHashUnhandled(row, table)) return;
  HANDLED_HASHES.set(table, row.id);
  const element = document.getElementById(row.id);
  if (element) scrollIntoViewUntilSettled(element);
}

/**
 * Expands the row on mount if the URL hash matches its id and its table has not handled the hash, and again on every
 * later hash change.
 * The expand on mount is queued as a microtask, so it runs after findable-ui's CollapsableRows (below the "sm"
 * breakpoint) collapses every row on mount, in its parent effect. A row already expanded on mount is scrolled into view
 * after the next paint.
 * Next.js link navigation changes the hash with `pushState`, which fires no `hashchange` event, so both Next.js's
 * `hashChangeStart` router event and the window's `hashchange` event are listened to. `hashChangeStart` also fires for
 * a link to the current hash, which `hashChangeComplete` does not, but before the URL changes, so the hash is read
 * from the URL each event gives.
 * @param row - Row.
 * @param table - Table.
 * @returns Function that removes the listeners.
 */
export function subscribeToHashExpansion(
  row: Row<Attribute>,
  table: Table<Attribute>
): () => void {
  if (isHashUnhandled(row, table)) {
    EXPANDING_ROW_IDS.set(table, row.id);
    // A row already expanded on mount, e.g. after the switch to CollapsableRows, does not animate open, so its Collapse
    // never calls onEntered: scroll to it after the next paint instead.
    if (row.getIsExpanded())
      requestAnimationFrame(() => scrollToRowIfHashUnhandled(row, table));
    queueMicrotask(() => expandRowIfHashMatches(row));
  }
  const onHashChange = (url: string): void => handleHashChange(row, table, url);
  const onWindowHashChange = (event: HashChangeEvent): void =>
    onHashChange(event.newURL);
  Router.events.on("hashChangeStart", onHashChange);
  window.addEventListener("hashchange", onWindowHashChange);
  return (): void => {
    Router.events.off("hashChangeStart", onHashChange);
    window.removeEventListener("hashchange", onWindowHashChange);
  };
}
