import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";

/**
 * Returns the names of the integrated objects for a source dataset.
 * @param row - Tracker source dataset.
 * @returns array of integrated-object names.
 */
export function buildIntegratedObjects(row: TrackerSourceDataset): string[] {
  return row.integratedObjects?.map(({ name }) => name) ?? [];
}
