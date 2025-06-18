import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../viewModelBuilders/dataDictionaryMapper/types";

/**
 * Returns a partial CellContext for the given value.
 * This utility is used by TableCell components that only require the getValue function
 * from the CellContext.
 * @param value - Value.
 * @returns Partial CellContext.
 */
export function getPartialCellContext<TValue>(
  value: TValue
): CellContext<Attribute, TValue> {
  return {
    getValue: () => value,
  } as CellContext<Attribute, TValue>;
}
