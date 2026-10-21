import type { ProjectsResponse } from "@/apis/azul/hca-dcp/common/responses";
import {
  processAggregatedOrArrayValue,
  processEntityValue,
} from "@/apis/azul/hca-dcp/common/utils";
import type { SourceStudyRow } from "@/types/network";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { buildHCADataExplorerProjectUrl } from "./network";

/**
 * Builds the Source Studies table row for an HCA project, keeping only the
 * values the table renders so the page payload doesn't carry the full Azul
 * response.
 * @param projectsResponse - Azul project response.
 * @param browserURL - Data browser URL, for the project link.
 * @returns source study row.
 */
export function buildSourceStudyRow(
  projectsResponse: ProjectsResponse,
  browserURL: string
): SourceStudyRow {
  return {
    cellCount: formatCellCount(
      calculateEstimatedCellCount(projectsResponse),
      LABEL.UNSPECIFIED
    ),
    diseases: processAggregatedOrArrayValue(
      projectsResponse.donorOrganisms,
      "disease"
    ),
    libraryConstructionMethods: processAggregatedOrArrayValue(
      projectsResponse.protocols,
      "libraryConstructionApproach"
    ),
    organs: processAggregatedOrArrayValue(projectsResponse.specimens, "organ"),
    species: processAggregatedOrArrayValue(
      projectsResponse.donorOrganisms,
      "genusSpecies"
    ),
    title: processEntityValue(projectsResponse.projects, "projectTitle"),
    url: buildHCADataExplorerProjectUrl(
      browserURL,
      processEntityValue(projectsResponse.projects, "projectId")
    ),
  };
}

/**
 * Calculate the estimated cell count from the given projects response.
 * Returns the estimated cell count, if any, otherwise the totalCell value from cellSuspensions.
 * @param projectsResponse - Response model return from projects API.
 * @returns estimated cell count.
 */
function calculateEstimatedCellCount(
  projectsResponse: ProjectsResponse
): number | null {
  const estimatedCellCount = projectsResponse.projects[0]?.estimatedCellCount;
  // If there's an estimated cell count for the project, return it as the cell count.
  if (estimatedCellCount) {
    return estimatedCellCount;
  }
  // Otherwise, return the cell suspension total count.
  return rollUpTotalCells(projectsResponse);
}

/**
 * Formats a source study cell count for the table. Rows are built at build
 * time, so the locale is fixed rather than the build machine's.
 * @param cellCount - Cell count, or null when unknown.
 * @param emptyLabel - Label shown when there is no cell count.
 * @returns formatted cell count.
 */
export function formatCellCount(
  cellCount: number | null,
  emptyLabel: string
): string {
  return cellCount ? cellCount.toLocaleString("en-US") : emptyLabel;
}

/**
 * Returns the aggregated total cells from cellSuspensions for the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns total cells from cellSuspensions.
 */
function rollUpTotalCells(entityResponse: ProjectsResponse): number | null {
  return entityResponse.cellSuspensions.reduce(
    (acc, { totalCells }) => {
      if (totalCells) {
        acc = (acc ?? 0) + totalCells;
      }
      return acc;
    },
    null as null | number
  );
}
