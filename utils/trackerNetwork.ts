import { CXG_DATASET_FILE_TYPE } from "../@types/network";
import type {
  DatasetAsset,
  IntegratedAtlas,
  TrackerComponentAtlas,
  TrackerSourceDataset,
} from "../@types/network";
import { processNullElements } from "../apis/azul/hca-dcp/common/utils";

const S3_BASE_URL = "https://humancellatlas.s3.amazonaws.com/temp/atlases";

const TRACKER_FOLDER_TYPE = {
  INTEGRATED_OBJECTS: "integrated-objects",
  SOURCE_DATASETS: "source-datasets",
} as const;

type TrackerFolderType =
  (typeof TRACKER_FOLDER_TYPE)[keyof typeof TRACKER_FOLDER_TYPE];

/**
 * Builds a DatasetAsset for a tracker source dataset.
 * @param sourceDataset - Tracker source dataset.
 * @param network - Network key.
 * @param shortNameSlug - Atlas short name slug.
 * @param version - Atlas version.
 * @returns dataset asset.
 */
export function buildTrackerSourceDatasetAsset(
  sourceDataset: TrackerSourceDataset,
  network: string,
  shortNameSlug: string,
  version: string
): DatasetAsset {
  return buildTrackerDatasetAsset(
    network,
    shortNameSlug,
    version,
    TRACKER_FOLDER_TYPE.SOURCE_DATASETS,
    sourceDataset.baseFileName,
    sourceDataset.revision,
    sourceDataset.sizeBytes
  );
}

/**
 * Builds the S3 download URL for a tracker file.
 * @param network - Network key (e.g., "gut").
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @param folderType - Folder type.
 * @param baseFileName - Base file name.
 * @param revision - File revision number.
 * @returns full S3 download URL.
 */
function buildTrackerDownloadUrl(
  network: string,
  shortNameSlug: string,
  version: string,
  folderType: TrackerFolderType,
  baseFileName: string,
  revision: number
): string {
  // S3 bucket paths use only the major version number (e.g., v1.0 → 1).
  const generation = version.replace(/^v(\d+).*/, "$1");
  const fileName = buildVersionedFileName(baseFileName, revision);
  return `${S3_BASE_URL}/${network}/${shortNameSlug}-v${generation}/${folderType}/${fileName}`;
}

/**
 * Maps a tracker component atlas to the IntegratedAtlas type.
 * @param component - Tracker component atlas.
 * @param network - Network key.
 * @param shortNameSlug - Atlas short name slug.
 * @param version - Atlas version.
 * @returns integrated atlas.
 */
export function mapTrackerComponentAtlasToIntegratedAtlas(
  component: TrackerComponentAtlas,
  network: string,
  shortNameSlug: string,
  version: string
): IntegratedAtlas {
  return {
    analysisPortals: [],
    assay: processStringArray(component.assay),
    cellCount: component.cellCount,
    datasetAssets: [
      buildTrackerDatasetAsset(
        network,
        shortNameSlug,
        version,
        TRACKER_FOLDER_TYPE.INTEGRATED_OBJECTS,
        component.baseFileName,
        component.revision,
        component.sizeBytes
      ),
    ],
    disease: processStringArray(component.disease),
    name: component.title,
    // Tracker API does not provide organism data.
    organism: [],
    tissue: processStringArray(component.tissue),
  };
}

/**
 * Builds a DatasetAsset from tracker file metadata.
 */
function buildTrackerDatasetAsset(
  network: string,
  shortNameSlug: string,
  version: string,
  folderType: TrackerFolderType,
  baseFileName: string,
  revision: number,
  sizeBytes: number
): DatasetAsset {
  return {
    downloadURL: buildTrackerDownloadUrl(
      network,
      shortNameSlug,
      version,
      folderType,
      baseFileName,
      revision
    ),
    fileSize: sizeBytes,
    fileType: CXG_DATASET_FILE_TYPE.H5AD,
  };
}

/**
 * Splits a filename into stem and extension.
 * @param fileName - File name (e.g., "myeloid_cap_250923.h5ad").
 * @returns stem and extension (e.g., { stem: "myeloid_cap_250923", ext: ".h5ad" }).
 */
export function splitFileName(fileName: string): {
  ext: string;
  stem: string;
} {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) {
    return { ext: "", stem: fileName };
  }
  return {
    ext: fileName.slice(lastDot),
    stem: fileName.slice(0, lastDot),
  };
}

/**
 * Inserts `-r{revision}` before the file extension.
 * E.g., "myeloid_cap_250923.h5ad" with revision 1 → "myeloid_cap_250923-r1.h5ad".
 */
function buildVersionedFileName(
  baseFileName: string,
  revision: number
): string {
  const { ext, stem } = splitFileName(baseFileName);
  return `${stem}-r${revision}${ext}`;
}

/**
 * Deduplicates, sorts (locale-aware), and handles empty arrays
 * consistently with the CXG path's processArrayValue.
 */
function processStringArray(values: string[]): string[] {
  const unique = [...new Set(values)].sort((a, b) => a.localeCompare(b));
  return processNullElements(unique);
}
