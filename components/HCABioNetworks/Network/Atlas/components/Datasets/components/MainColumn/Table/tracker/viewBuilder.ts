import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import * as C from "../../../../../../../../..";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import {
  buildTrackerSourceDatasetAsset,
  splitFileName,
} from "../../../../../../../../../../utils/trackerNetwork";

/**
 * Returns the download info for a tracker source dataset.
 * @param sourceDataset - Tracker source dataset.
 * @param networkKey - Network key (e.g., "gut").
 * @param shortNameSlug - Atlas short name slug.
 * @param version - Atlas version.
 * @returns file name (without extension), file size, format, and download URL.
 */
function getDownloadInfo(
  sourceDataset: TrackerSourceDataset,
  networkKey: string,
  shortNameSlug: string,
  version: string
): {
  downloadUrl: string;
  fileName: string;
  fileSize: number;
  format: string;
} {
  const asset = buildTrackerSourceDatasetAsset(
    sourceDataset,
    networkKey,
    shortNameSlug,
    version
  );
  const { ext, stem } = splitFileName(sourceDataset.baseFileName);
  return {
    downloadUrl: asset.downloadURL,
    fileName: `${stem}-r${sourceDataset.revision}`,
    fileSize: sourceDataset.sizeBytes,
    format: ext,
  };
}

/**
 * Renders the cell count as a locale-formatted string.
 * @param ctx - Cell context.
 * @returns cell count as a formatted string.
 */
export function renderCellCount(
  ctx: CellContext<TrackerSourceDataset, number>
): string {
  return ctx.row.original.cellCount.toLocaleString();
}

/**
 * Renders a tracker download cell for a source dataset.
 * Reads tracker config from table meta to build the S3 download URL.
 * @param ctx - Cell context.
 * @returns TrackerDownloadCell component, or null if tracker config unavailable.
 */
export function renderDownload(
  ctx: CellContext<TrackerSourceDataset, unknown>
): JSX.Element | null {
  const meta = ctx.table.options.meta as {
    networkKey?: string;
    shortNameSlug?: string;
    version?: string;
  };
  if (!meta.networkKey || !meta.shortNameSlug || !meta.version) return null;
  const { downloadUrl, fileName, fileSize, format } = getDownloadInfo(
    ctx.row.original,
    meta.networkKey,
    meta.shortNameSlug,
    meta.version
  );
  return C.TrackerDownloadCell({
    downloadUrl,
    fileName,
    fileSize,
    format,
  });
}
