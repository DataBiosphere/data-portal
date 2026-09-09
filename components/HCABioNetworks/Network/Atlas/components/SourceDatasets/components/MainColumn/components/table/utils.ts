import type { VisibilityState } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";

/**
 * Returns the column visibility state for the tracker source datasets table.
 * The "Integrated Object", "Journal", "Reference Author" and "Source Study"
 * columns are filter-only. The "Explore" column is displayed only when at
 * least one dataset has a CAP link, and "Primary Data" only when at least one
 * source study has an HCA project.
 * @param data - Tracker source datasets.
 * @returns column visibility state.
 */
export function getColumnVisibility(
  data: TrackerSourceDataset[]
): VisibilityState {
  return {
    explore: data.some(({ capUrl }) => Boolean(capUrl)),
    integratedObject: false,
    journal: false,
    primaryData: data.some(({ hcaProjectId }) => Boolean(hcaProjectId)),
    referenceAuthor: false,
    sourceStudy: false,
  };
}
