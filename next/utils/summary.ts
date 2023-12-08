import { SummaryResponse } from "../apis/azul/hca-dcp/common/responses";
import { Summary } from "../contexts/summaryContext";

/**
 * Binds the summary response to the summary model.
 * @param summaryResponse - Summary response.
 * @returns summary.
 */
export function bindSummaryResponse(summaryResponse: SummaryResponse): Summary {
  const cellCount = calculateSummaryTotalCellCount(summaryResponse);
  const donorCount = summaryResponse.donorCount;
  const labCount = summaryResponse.labCount;
  const projectCount = summaryResponse.projectCount;
  return {
    cellCount,
    donorCount,
    labCount,
    projectCount,
  };
}

/**
 * Calculates the summary total cell count using the estimatedCellCount and totalCells values fom the summary response.
 * @param summaryResponse - Summary response.
 * @returns count of total cell count.
 */
function calculateSummaryTotalCellCount(
  summaryResponse: SummaryResponse
): number {
  return (summaryResponse.projects ?? []).reduce(
    (accum, { cellSuspensions, projects }) => {
      if (
        projects &&
        (projects.estimatedCellCount || projects.estimatedCellCount === 0)
      ) {
        accum += projects.estimatedCellCount;
      } else if (
        cellSuspensions &&
        (cellSuspensions.totalCells || cellSuspensions.totalCells === 0)
      ) {
        accum += cellSuspensions.totalCells;
      }
      return accum;
    },
    0
  );
}
