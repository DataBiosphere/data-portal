import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import * as C from "../../../../../../../../..";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { splitFileName } from "../../../../../../../../../../utils/trackerNetwork";

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
 * Uses the pre-built datasetAsset from static props.
 * @param ctx - Cell context.
 * @returns TrackerDownloadCell component, or null if asset unavailable.
 */
export function renderDownload(
  ctx: CellContext<TrackerSourceDataset, unknown>
): JSX.Element | null {
  const { baseFileName, datasetAsset, revision } = ctx.row.original;
  if (!datasetAsset) return null;
  const { ext: format, stem } = splitFileName(baseFileName);
  return C.TrackerDownloadCell({
    downloadUrl: datasetAsset.downloadURL,
    fileName: `${stem}-r${revision}`,
    fileSize: datasetAsset.fileSize,
    format,
  });
}
