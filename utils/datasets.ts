import {
  AggregatedCellSuspensionResponse,
  AggregatedDonorOrganismResponse,
  AggregatedFileTypeSummaryResponse,
  AggregatedSampleResponse,
  AggregatedSpecimenResponse,
} from "../apis/azul/hca-dcp/common/aggregatedEntities";
import {
  ProjectResponse,
  PublicationResponse,
} from "../apis/azul/hca-dcp/common/entities";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";

const initCellSuspension: AggregatedCellSuspensionResponse = {
  selectedCellType: [],
  totalCells: null,
};

const initDonorOrganism: AggregatedDonorOrganismResponse = {
  biologicalSex: [],
  developmentStage: [],
  disease: [],
  donorCount: 0,
  genusSpecies: [],
};

const initFileTypeSummary: AggregatedFileTypeSummaryResponse = {
  contentDescription: [],
  count: 0,
  fileSource: [],
  format: "",
  isIntermediate: null,
  matrixCellCount: null,
  totalSize: 0,
};

const initProject: ProjectResponse = {
  accessible: true,
  accessions: [],
  contributedAnalyses: {},
  contributors: [],
  estimatedCellCount: null,
  laboratory: [],
  matrices: {},
  projectDescription: "",
  projectId: "",
  projectShortname: "",
  projectTitle: "I am COOL",
  publications: [],
  supplementaryLinks: [],
};

const initSample: AggregatedSampleResponse = {
  id: [],
  sampleEntityType: [],
};

const initSpecimen: AggregatedSpecimenResponse = {
  disease: [],
  id: [],
  organ: [],
  organPart: [],
  preservationMethod: [],
  source: [],
};

const initProjectResponse: ProjectsResponse = {
  cellSuspensions: [initCellSuspension],
  donorOrganisms: [initDonorOrganism],
  fileTypeSummaries: [initFileTypeSummary],
  projects: [initProject],
  protocols: [],
  samples: [initSample],
  specimens: [initSpecimen],
};

/**
 * Returns dataset shaped as projects response.
 * @param disease - Disease.
 * @param estimatedCellCount - Estimated cell count.
 * @param genusSpecies - Genus species.
 * @param libraryConstructionApproach - Library construction approach.
 * @param organ - Organ.
 * @param projectTitle - Project title.
 * @param publication - Publication.
 * @returns projects response.
 */
export function buildDataset(
  disease: string[],
  estimatedCellCount: number,
  genusSpecies: string[],
  libraryConstructionApproach: string[],
  organ: string[],
  projectTitle: string,
  publication?: PublicationResponse
): ProjectsResponse {
  return {
    ...initProjectResponse,
    donorOrganisms: [
      {
        ...initDonorOrganism,
        disease,
        genusSpecies,
      },
    ],
    projects: [
      {
        ...initProject,
        estimatedCellCount,
        projectTitle,
        publications: publication ? [publication] : [],
      },
    ],
    protocols: [{ libraryConstructionApproach }],
    specimens: [{ ...initSpecimen, organ }],
  };
}
