import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { buildHCADataExplorerAnalysisPortal } from "../../../../../../../../../../utils/network";
import {
  buildTrackerAnalysisPortals,
  buildTrackerDownloadCellProps,
} from "../../../../../../../../../../utils/trackerNetwork";
import { TrackerDownloadCell } from "../../../../../../../../../common/Table/components/Cell/components/TrackerDownloadCell/trackerDownloadCell";
import { AnalysisPortalCell } from "../../../../../Overview/components/MainColumn/components/AnalysisPortalCell/analysisPortalCell";
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
  return <TrackerDownloadCell {...props} />;
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
  return <AnalysisPortalCell analysisPortals={analysisPortals} />;
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
  return <FileNameCell row={ctx.row.original} />;
}

/**
 * Renders a link to the source study's primary data in the HCA Data Explorer.
 * @param ctx - Cell context.
 * @returns AnalysisPortalCell, or null when the source study has no HCA
 * project or the environment has no configured browser URL.
 */
export function renderPrimaryData(
  ctx: CellContext<TrackerSourceDataset, unknown>
): JSX.Element | null {
  const { hcaProjectId } = ctx.row.original;
  if (!hcaProjectId) return null;
  const { browserUrl } = ctx.table.options.meta as { browserUrl?: string };
  if (!browserUrl) return null;
  const analysisPortal = buildHCADataExplorerAnalysisPortal(
    `${browserUrl}/projects/${hcaProjectId}`
  );
  return <AnalysisPortalCell analysisPortals={[analysisPortal]} />;
}
