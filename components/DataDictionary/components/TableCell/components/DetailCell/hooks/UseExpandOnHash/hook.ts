import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { Row, Table } from "@tanstack/react-table";
import { useCallback, useEffect } from "react";
import type { UseExpandOnHash } from "./types";
import {
  markHashHandled,
  scrollToRowIfHashUnhandled,
  subscribeToHashExpansion,
} from "./utils";

/**
 * Expands the row when the URL hash matches its id: on mount, when the page opens at the row's anchor, and on every
 * later hash change, such as an in-page link to the row. A row expanded this way is scrolled into view once it has
 * expanded. Each hash is handled once per table, so a row the user collapsed stays collapsed when its cell remounts.
 * @param row - Row.
 * @param table - Table.
 * @returns Callbacks to invoke once the row has expanded and once it has collapsed, e.g. the row's Collapse
 * `onEntered` and `onExited`.
 */
export const useExpandOnHash = (
  row: Row<Attribute>,
  table: Table<Attribute>
): UseExpandOnHash => {
  useEffect(() => subscribeToHashExpansion(row, table), [row, table]);

  const onCollapsed = useCallback(
    (): void => markHashHandled(row, table),
    [row, table]
  );

  const onExpanded = useCallback(
    (): void => scrollToRowIfHashUnhandled(row, table),
    [row, table]
  );

  return { onCollapsed, onExpanded };
};
