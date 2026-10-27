import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { Row, Table } from "@tanstack/react-table";
import Router from "next/router";

/**
 * The hash each table has finished handling: its row has expanded and scrolled into view, or the user collapsed it
 * first. A cell that mounts again, e.g. when a filter hides and shows its row or the table changes layout at the "sm"
 * breakpoint, does not expand its row again for a hash its table has handled.
 */
const HANDLED_HASHES = new WeakMap<Table<Attribute>, string>();

/**
 * Expands the row when the given URL's hash matches its id.
 * Never collapses the row, so "Show less" still collapses it.
 * @param row - Row.
 * @param url - URL, absolute or relative to the current URL; defaults to the current URL.
 */
function expandRowIfHashMatches(row: Row<Attribute>, url?: string): void {
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
  if (!isHashUnhandled(row, table)) return;
  HANDLED_HASHES.set(table, row.id);
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
  if (!isHashUnhandled(row, table)) return;
  HANDLED_HASHES.set(table, row.id);
  document.getElementById(row.id)?.scrollIntoView();
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
 * from the URL each event gives. A hash change clears the table's handled hash, so a link to a row the user collapsed
 * expands it again.
 * @param row - Row.
 * @param table - Table.
 * @returns Function that removes the listeners.
 */
export function subscribeToHashExpansion(
  row: Row<Attribute>,
  table: Table<Attribute>
): () => void {
  if (isHashUnhandled(row, table)) {
    // A row already expanded on mount, e.g. after the switch to CollapsableRows, does not animate open, so its Collapse
    // never calls onEntered: scroll to it after the next paint instead.
    if (row.getIsExpanded())
      requestAnimationFrame(() => scrollToRowIfHashUnhandled(row, table));
    queueMicrotask(() => expandRowIfHashMatches(row));
  }
  const onHashChange = (url: string): void => {
    HANDLED_HASHES.delete(table);
    expandRowIfHashMatches(row, url);
  };
  const onWindowHashChange = (event: HashChangeEvent): void =>
    onHashChange(event.newURL);
  Router.events.on("hashChangeStart", onHashChange);
  window.addEventListener("hashchange", onWindowHashChange);
  return (): void => {
    Router.events.off("hashChangeStart", onHashChange);
    window.removeEventListener("hashchange", onWindowHashChange);
  };
}
