import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../viewModelBuilders/dataDictionaryMapper/types";

/**
 * Returns a partial CellContext for the given value.
 * This utility is used by TableCell components that require the column object with id property and getValue function
 * from the CellContext.
 * @param value - Value.
 * @param columnId - Column identifier.
 * @returns Partial CellContext.
 */
export function getPartialCellContext<TValue>(
  value: TValue,
  columnId: string = ""
): CellContext<Attribute, TValue> {
  return {
    column: { id: columnId },
    getValue: () => value,
  } as CellContext<Attribute, TValue>;
}
