import type {
  DatasetAsset,
  TrackerSourceDataset,
} from "../../../../../../../@types/network";
import { buildTrackerSourceDatasetAsset } from "../../../../../../../utils/trackerNetwork";

/**
 * Builds dataset assets for a tracker source dataset download.
 * @param sourceDataset - Tracker source dataset.
 * @param networkKey - Network key (e.g., "gut").
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns dataset assets array.
 */
export function buildDatasetAssets(
  sourceDataset: TrackerSourceDataset,
  networkKey: string,
  shortNameSlug: string,
  version: string
): DatasetAsset[] {
  return [
    buildTrackerSourceDatasetAsset(
      sourceDataset,
      networkKey,
      shortNameSlug,
      version
    ),
  ];
}
