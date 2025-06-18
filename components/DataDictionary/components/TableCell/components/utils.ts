import { CellContext, Row, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../../viewModelBuilders/dataDictionaryMapper/types";

/**
 * Build partial cell context for rationale.
 * @param table - Table.
 * @param row - Row.
 * @param columnId - Column ID.
 * @param value - Value.
 * @returns Model to be used as props for the RankedCell component.
 */
export function buildRankedCellContext(
  table: Table<Attribute>,
  row: Row<Attribute>,
  columnId: string,
  value: string | undefined | null
): CellContext<Attribute, string | undefined | null> {
  return {
    column: { id: columnId },
    getValue: () => value,
    row,
    table,
  } as CellContext<Attribute, string | undefined | null>;
}
