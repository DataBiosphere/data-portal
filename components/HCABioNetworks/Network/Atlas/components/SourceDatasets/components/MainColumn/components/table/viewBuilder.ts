import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import * as C from "../../../../../../../../..";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import {
  buildTrackerAnalysisPortals,
  buildTrackerDownloadCellProps,
} from "../../../../../../../../../../utils/trackerNetwork";
import { FileNameCell } from "./components/FileNameCell/fileNameCell";

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
  const props = buildTrackerDownloadCellProps(ctx.row.original.datasetAsset);
  if (!props) return null;
  return C.TrackerDownloadCell(props);
}

/**
 * Renders the analysis portal links for a source dataset.
 * @param ctx - Cell context.
 * @returns AnalysisPortalCell component, or null when the dataset has no CAP link.
 */
export function renderExplore(
  ctx: CellContext<TrackerSourceDataset, unknown>
): JSX.Element | null {
  const analysisPortals = buildTrackerAnalysisPortals(ctx.row.original.capUrl);
  if (analysisPortals.length === 0) return null;
  return C.AnalysisPortalCell({ analysisPortals });
}

/**
 * Renders the pinned cell stacking the published file name over the source
 * study citation.
 * @param ctx - Cell context.
 * @returns FileNameCell component.
 */
export function renderFileName(
  ctx: CellContext<TrackerSourceDataset, unknown>
): JSX.Element {
  return FileNameCell({ row: ctx.row.original });
}
