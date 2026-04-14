import { CellContext } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";

/**
 * Returns the cell count.
 * @param ctx - Cell context.
 * @returns cell count as a formatted string.
 */
export function renderCellCount(
  ctx: CellContext<TrackerSourceDataset, string>
): string {
  const { row } = ctx;
  const { original } = row;
  const { cellCount } = original;
  return cellCount.toLocaleString();
}
