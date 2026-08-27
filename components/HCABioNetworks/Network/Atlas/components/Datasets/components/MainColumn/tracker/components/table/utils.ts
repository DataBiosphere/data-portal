import type { VisibilityState } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";

/**
 * Returns the column visibility state for the tracker source datasets table.
 * The "Integrated Object" column is filter-only, and the "Explore" column is
 * displayed only when at least one dataset has a CAP link.
 * @param data - Tracker source datasets.
 * @returns column visibility state.
 */
export function getColumnVisibility(
  data: TrackerSourceDataset[]
): VisibilityState {
  return {
    explore: data.some(({ capUrl }) => Boolean(capUrl)),
    integratedObject: false,
  };
}
