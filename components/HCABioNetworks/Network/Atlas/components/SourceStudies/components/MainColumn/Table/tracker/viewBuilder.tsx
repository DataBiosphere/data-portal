import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import type { CellContext } from "@tanstack/react-table";
import type { JSX } from "react";
import * as C from "../../../../../../../../..";
import type { TrackerSourceStudy } from "../../../../../../../../../../@types/network";

const DOI_BASE_URL = "https://doi.org/";

/**
 * Renders an HCA Data Repository link for the source study's HCA project.
 * @param ctx - Cell context.
 * @returns Link component if hcaProjectId exists, otherwise empty string.
 */
export function renderHCADataRepository(
  ctx: CellContext<TrackerSourceStudy, unknown>
): JSX.Element | null {
  const { hcaProjectId } = ctx.row.original;

  if (!hcaProjectId) return null;

  const { browserUrl } = ctx.table.options.meta as { browserUrl?: string };

  if (!browserUrl) return null;

  return C.Link({
    label: C.OpenInNewIcon({}),
    rel: REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
    target: ANCHOR_TARGET.BLANK,
    url: `${browserUrl}/projects/${hcaProjectId}`,
  });
}

/**
 * Renders the source study citation as a link to the DOI.
 * Uses getValue() to get the formatted citation from the accessorFn.
 * @param ctx - Cell context with string value from buildSourceStudy accessor.
 * @returns Link component with DOI URL, or plain label if no DOI.
 */
export function renderSourceStudy(
  ctx: CellContext<TrackerSourceStudy, string>
): JSX.Element | null {
  const label = ctx.getValue();
  const { doi } = ctx.row.original;
  return C.Link({
    label,
    rel: REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
    target: ANCHOR_TARGET.BLANK,
    url: doi ? `${DOI_BASE_URL}${doi}` : "",
  });
}
