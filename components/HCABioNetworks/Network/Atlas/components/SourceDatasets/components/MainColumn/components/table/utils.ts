import type { VisibilityState } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";

/**
 * Returns the column visibility state for the tracker source datasets table.
 * The "Integrated Object", "Journal", "Reference Author" and "Source Study"
 * columns are filter-only. The "Explore" column is displayed only when at
 * least one dataset has a CAP link, and "Primary Data" only when at least one
 * source study has an HCA project and the environment has a browser URL to
 * link to - matching the conditions `renderPrimaryData` renders under, so the
 * column is never shown with every cell empty.
 * @param data - Tracker source datasets.
 * @param browserUrl - Environment's HCA Data Explorer browser URL.
 * @returns column visibility state.
 */
export function getColumnVisibility(
  data: TrackerSourceDataset[],
  browserUrl: string
): VisibilityState {
  return {
    explore: data.some(({ capUrl }) => Boolean(capUrl)),
    integratedObject: false,
    journal: false,
    primaryData:
      Boolean(browserUrl) &&
      data.some(({ hcaProjectId }) => Boolean(hcaProjectId)),
    referenceAuthor: false,
    sourceStudy: false,
  };
}
