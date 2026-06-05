import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";

/**
 * Returns the names of the integrated objects (sourced from the legacy
 * `componentAtlases` field on the tracker API) for a source dataset.
 * @param row - Tracker source dataset.
 * @returns array of integrated-object names.
 */
export function buildIntegratedObjects(row: TrackerSourceDataset): string[] {
  return row.componentAtlases?.map(({ name }) => name) ?? [];
}
