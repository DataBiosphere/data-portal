import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { Row } from "@tanstack/react-table";
import { useCallback, useEffect } from "react";
import type { UseExpandOnHash } from "./types";
import { scrollToRowIfHashMatches, subscribeToHashExpansion } from "./utils";

/**
 * Expands the row when the URL hash matches its id: on mount, when the page opens at the row's anchor, and on every
 * in-page link to the row. The row is scrolled into view once it has expanded.
 * @param row - Row.
 * @returns Callback to invoke once the row has expanded, e.g. the row's Collapse `onEntered`.
 */
export const useExpandOnHash = (row: Row<Attribute>): UseExpandOnHash => {
  useEffect(() => subscribeToHashExpansion(row), [row]);

  const onExpanded = useCallback(
    (): void => scrollToRowIfHashMatches(row),
    [row]
  );

  return { onExpanded };
};
