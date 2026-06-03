import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import * as C from "../../../../../../../../../..";
import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";
import { splitFileName } from "../../../../../../../../../../../utils/trackerNetwork";

const DOI_BASE_URL = "https://doi.org/";

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

/**
 * Renders the source study shorthand citation as a link to the DOI.
 * @param ctx - Cell context with publicationString from accessorKey.
 * @returns Link component, or null if no citation.
 */
export function renderSourceStudy(
  ctx: CellContext<TrackerSourceDataset, string | null>
): JSX.Element | null {
  const label = ctx.getValue();
  if (!label) return null;
  const { doi } = ctx.row.original;
  return C.Link({
    label,
    rel: REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
    target: ANCHOR_TARGET.BLANK,
    url: doi ? `${DOI_BASE_URL}${doi}` : "",
  });
}
