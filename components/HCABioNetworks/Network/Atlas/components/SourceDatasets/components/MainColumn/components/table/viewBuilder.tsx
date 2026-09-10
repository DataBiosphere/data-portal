import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { buildHCADataExplorerProjectUrl } from "../../../../../../../../../../utils/network";
import {
  buildTrackerAnalysisPortals,
  buildTrackerDownloadCellProps,
} from "../../../../../../../../../../utils/trackerNetwork";
import { NewTabCue } from "../../../../../../../../../common/NewTabCue/newTabCue";
import { TrackerDownloadCell } from "../../../../../../../../../common/Table/components/Cell/components/TrackerDownloadCell/trackerDownloadCell";
import { AnalysisPortalCell } from "../../../../../Overview/components/MainColumn/components/AnalysisPortalCell/analysisPortalCell";
import { FileNameCell } from "./components/FileNameCell/fileNameCell";
import { HCA_EXPLORER_LABEL } from "./constants";

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
 * Returns a renderer for the source study's primary data link, closing over
 * the environment's browser URL so it is carried in a typed closure rather
 * than through untyped table meta. Text only - `Link` sends external URLs to a
 * new tab with noopener/noreferrer.
 * @param browserUrl - Environment's HCA Data Explorer browser URL.
 * @returns cell renderer producing a Link, or null when the source study has
 * no HCA project.
 */
export function buildRenderPrimaryData(
  browserUrl: string
): (ctx: CellContext<TrackerSourceDataset, unknown>) => JSX.Element | null {
  return function renderPrimaryData(ctx) {
    const { hcaProjectId } = ctx.row.original;
    if (!hcaProjectId) return null;
    const url = buildHCADataExplorerProjectUrl(browserUrl, hcaProjectId);
    return (
      <Link
        label={
          <>
            {HCA_EXPLORER_LABEL}
            <NewTabCue url={url} />
          </>
        }
        url={url}
      />
    );
  };
}
