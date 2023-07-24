import {
  AggregatedCellSuspensionsResponse,
  AggregatedDonorOrganismsResponse,
  AggregatedFileTypeSummariesResponse,
  AggregatedProtocolsResponse,
  AggregatedSamplesResponse,
  AggregatedSpecimensResponse,
} from "./aggregatedEntities";
import { ProjectsEntityResponse } from "./entities";

/**
 * Model of response returned from /index/projects API endpoint.
 */
export type ProjectsResponse = ProjectsEntityResponse &
  AggregatedCellSuspensionsResponse &
  AggregatedDonorOrganismsResponse &
  AggregatedFileTypeSummariesResponse &
  AggregatedProtocolsResponse &
  AggregatedSamplesResponse &
  AggregatedSpecimensResponse;
