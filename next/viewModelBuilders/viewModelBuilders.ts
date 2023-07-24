import { LABEL } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { KeyValues } from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { MetadataValue } from "@clevercanary/data-explorer-ui/lib/components/Index/components/NTagCell/nTagCell";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { ColumnDef } from "@tanstack/react-table";
import {
  Atlas,
  AtlasesRow,
  AtlasRow,
  IntegratedAtlasRow,
  Network,
} from "../@types/network";
import { ProjectResponse } from "../apis/azul/hca-dcp/common/entities";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";
import {
  processAggregatedNumberEntityValue,
  processAggregatedOrArrayValue,
  processEntityValue,
} from "../apis/azul/hca-dcp/common/utils";
import * as C from "../components";
import { MetadataValueTuple } from "../components/common/NTagCell/components/PinnedNTagCell/pinnedNTagCell";
import { NETWORKS_ROUTE } from "../constants/routes";
import { formatCountSize } from "../utils/formatCountSize";
import { DISEASE } from "./entities";

const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

/**
 * Merges two arrays of values and returns a list of distinct values.
 * @param values01 - Distinct list of values.
 * @param values02 - Additional list of values to be concatenated.
 * @returns List of distinct values.
 */
export function accumulateValues(
  values01 = [] as string[],
  values02: string[]
): string[] {
  const concatenatedValues = values01.concat(values02).sort();
  const setOfAccumulatedValues = new Set(concatenatedValues);
  return [...setOfAccumulatedValues];
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
  const estimatedCellCount =
    getProjectResponse(projectsResponse).estimatedCellCount;
  // If there's an estimated cell count for the project, return it as the cell count.
  if (estimatedCellCount) {
    return estimatedCellCount;
  }
  // Otherwise, return the cell suspension total count.
  return rollUpTotalCells(projectsResponse);
}

/**
 * Returns atlases actions column def.
 * @returns actions column def.
 */
function getAtlasesActionsColumnDef(): ColumnDef<IntegratedAtlasRow> {
  return {
    accessorKey: "actions",
    cell: ({ row }) =>
      C.ButtonPrimary({
        children: "CELLxGENE",
        href: row.original.cxgURL,
        size: "small",
        target: ANCHOR_TARGET.BLANK,
      }),
    header: "Explore",
  };
}

/**
 * Returns atlases assay column def.
 * @returns assay column def.
 */
function getAtlasesAssayColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "assay",
    cell: ({ row }) =>
      C.NTagCell({ label: "assays", values: row.original.assay }),
    header: "Assay",
  };
}

/**
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getAtlasesAtlasNameColumnDef(
  networkPath: string
): ColumnDef<AtlasesRow> {
  return {
    accessorKey: "atlasName",
    cell: ({ row }) =>
      C.Link({
        label: row.original.atlasName,
        url: `${NETWORKS_ROUTE}/${networkPath}/${row.original.path}`,
      }),
    header: "Atlas Name",
  };
}

/**
 * Returns atlases cell count column def.
 * @returns cell count column def.
 */
function getAtlasesCellCountColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "cellCount",
    cell: ({ row }) => formatCountSize(row.original.cellCount),
    header: "Cells",
  };
}

/**
 * Returns atlases disease column def.
 * @returns disease column def.
 */
function getAtlasesDiseaseColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "disease",
    cell: ({ row }) =>
      C.PinnedNTagCell({
        label: "diseases",
        values: partitionMetadataValues(
          [...row.original.disease],
          [DISEASE.NORMAL]
        ),
      }),
    header: "Disease",
  };
}

/**
 * Returns the table column definition model for the atlases table.
 * @param networkPath - Network path.
 * @returns atlases table column definition.
 */
export function getAtlasesTableColumns(
  networkPath: string
): ColumnDef<AtlasesRow>[] {
  return [
    getAtlasesAtlasNameColumnDef(networkPath),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesAssayColumnDef(),
    getAtlasesCellCountColumnDef(),
  ];
}

/**
 * Returns atlases tissue column def.
 * @returns tissue column def.
 */
function getAtlasesTissueColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "tissue",
    cell: ({ row }) =>
      C.NTagCell({ label: "tissues", values: row.original.tissue }),
    header: "Tissue",
  };
}

/**
 * Returns the bio network name, without the suffix "Network".
 * @param name - Bio network name.
 * @returns name of the bio network.
 */
export function getBioNetworkName(name: string): string {
  return name.replace(/(\sNetwork.*)/gi, "");
}

/**
 * Returns bio network atlases column def.
 * @returns atlases column def.
 */
function getBioNetworksAtlasesColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "atlases",
    cell: ({ row }) => C.Cell({ value: row.original.atlases.length }),
    header: "Atlases",
  };
}

/**
 * Returns bio network name column def.
 * @returns network name column def.
 */
function getBioNetworksNetworkNameColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "networkName",
    cell: ({ row }) => C.BioNetworkCell({ network: row.original }),
    header: "Biological Network",
  };
}

/**
 * Returns the table column definition model for the bio networks table.
 * @returns bio networks table column definition.
 */
export function getBioNetworksTableColumns(): ColumnDef<Network>[] {
  return [
    getBioNetworksNetworkNameColumnDef(),
    getBioNetworksAtlasesColumnDef(),
  ];
}

/**
 * Returns donor disease column def.
 * @returns donor disease column def.
 */
function getDonorDiseaseColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "disease",
    cell: ({ row }) =>
      C.PinnedNTagCell({
        label: "diseases",
        values: partitionMetadataValues(
          processAggregatedOrArrayValue(row.original.donorOrganisms, "disease"),
          [DISEASE.NORMAL]
        ),
      }),
    header: "Disease (Donor)",
  };
}

/**
 * Returns formatted estimated cell count from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @param formatFn - Function to format count (optional, e.g. formatCountSize, default is locale string).
 * @returns formatted estimated cell count.
 */
export function getEstimatedCellCount(
  projectsResponse: ProjectsResponse,
  formatFn?: (value: number) => string
): string {
  const estimatedCellCount = calculateEstimatedCellCount(projectsResponse);
  if (!estimatedCellCount) {
    return LABEL.UNSPECIFIED;
  }
  if (formatFn) {
    return formatFn(estimatedCellCount);
  }
  return estimatedCellCount.toLocaleString();
}

/**
 * Returns estimate cell count column def.
 * @returns estimate cell count column def.
 */
function getEstimateCellCountColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "estimatedCellCount",
    cell: ({ row }) => C.Cell({ value: getEstimatedCellCount(row.original) }),
    header: "Cell Count Est.",
  };
}

/**
 * Returns genus species column def.
 * @returns genus species column def.
 */
function getGenusSpeciesColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "genusSpecies",
    cell: ({ row }) =>
      C.NTagCell({
        label: "species",
        values: processAggregatedOrArrayValue(
          row.original.donorOrganisms,
          "genusSpecies"
        ),
      }),
    header: "Species",
  };
}

/**
 * Returns integrated atlases atlas name column def.
 * @returns atlas name column def.
 */
function getIntegratedAtlasesAtlasNameColumnDef(): ColumnDef<IntegratedAtlasRow> {
  return {
    accessorKey: "name",
    cell: ({ row }) => C.Cell({ value: row.original.name }),
    header: "Atlas Name",
  };
}

/**
 * Returns the table column definition model for the integrated atlases table.
 * @returns integrated atlases table column definition.
 */
export function getIntegratedAtlasesTableColumns(): ColumnDef<IntegratedAtlasRow>[] {
  return [
    getIntegratedAtlasesAtlasNameColumnDef(),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesCellCountColumnDef(),
    getAtlasesActionsColumnDef(),
  ];
}

/**
 * Returns library construction method column def.
 * @returns library construction method column def.
 */
function getLibraryConstructionMethodColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "libraryConstructionApproach",
    cell: ({ row }) =>
      C.NTagCell({
        label: "library construction methods",
        values: processAggregatedOrArrayValue(
          row.original.protocols,
          "libraryConstructionApproach"
        ),
      }),
    header: "Method",
  };
}

/**
 * Returns the network summary.
 * @param network - Network.
 * @returns network summary.
 */
function getNetworkSummary(network: Network): Record<string, number> {
  const atlases = rollUpAtlases(network.atlases);
  if (atlases.length === 0) {
    return {
      atlases: 0,
      cells: 0,
      diseases: 0,
      tissues: 0,
    };
  }
  return {
    atlases: atlases.length,
    cells: processAggregatedNumberEntityValue(atlases, "cellCount"),
    diseases: processDiseaseSummary(
      processAggregatedOrArrayValue(atlases, "disease")
    ).length,
    tissues: processAggregatedOrArrayValue(atlases, "tissue").length,
  };
}

/**
 * Returns the key value pairs for the network summary key value pairs component.
 * @param network - Network.
 * @returns key value pairs for the key value pairs component.
 */
export function getNetworkSummaryKeyValuePairs(network: Network): KeyValues {
  const summary = getNetworkSummary(network);
  const keyValues: KeyValues = new Map();
  keyValues.set("Atlases", summary.atlases.toLocaleString());
  keyValues.set("Diseases", summary.diseases.toLocaleString());
  keyValues.set("Tissues", summary.tissues.toLocaleString());
  keyValues.set("Cells", formatCountSize(summary.cells));
  return keyValues;
}

/**
 * Returns the project value from the projects API response.
 * @param projectsResponse - Response returned from projects API response.
 * @returns The core project value from the API response.
 */
export function getProjectResponse(
  projectsResponse: ProjectsResponse
): ProjectResponse {
  return projectsResponse.projects[0];
}

/**
 * Returns the table column definition model for the projects table.
 * @param networkPath - Network path.
 * @returns projects table column definition.
 */
export function getProjectsTableColumns(
  networkPath: string
): ColumnDef<ProjectsResponse>[] {
  return [
    getProjectTitleColumnDef(networkPath),
    getGenusSpeciesColumnDef(),
    getLibraryConstructionMethodColumnDef(),
    getSpecimenOrganColumnDef(),
    getDonorDiseaseColumnDef(),
    getEstimateCellCountColumnDef(),
  ];
}

/**
 * Returns project title column def.
 * @param networkPath - Network path.
 * @returns project title column def.
 */
function getProjectTitleColumnDef(
  networkPath: string
): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "projectTitle",
    cell: ({ row }) =>
      C.Link({
        label: processEntityValue(row.original.projects, "projectTitle"),
        target: ANCHOR_TARGET.SELF,
        url: getProjectTitleUrl(networkPath, row.original),
      }),
    header: "Project Title",
  };
}

/**
 * Returns the project detailed page url.
 * @param networkPath - Network path.
 * @param projectsResponse - Response model return from entity API.
 * @returns project detail page url.
 */
function getProjectTitleUrl(
  networkPath: string,
  projectsResponse: ProjectsResponse
): string {
  return `${PORTAL_URL}/explore/projects/${processEntityValue(
    projectsResponse.projects,
    "projectId"
  )}`;
}

/**
 * Returns specimen organ "Anatomical Entity" column def.
 * @returns anatomical entity column def.
 */
function getSpecimenOrganColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "organ",
    cell: ({ row }) =>
      C.NTagCell({
        label: "anatomical entities",
        values: processAggregatedOrArrayValue(row.original.specimens, "organ"),
      }),
    header: "Anatomical Entity",
  };
}

/**
 * Initialize atlases row.
 * @returns initialized atlases row.
 */
function initAtlasRow(): AtlasesRow {
  return {
    assay: [],
    atlasName: "",
    cellCount: 0,
    disease: [],
    organism: [],
    path: "",
    tissue: [],
  };
}

/**
 * Returns metadata values partitioned into pinned values and non-pinned values.
 * @param values - Values to partition.
 * @param pinned - Values to pin.
 * @returns metadata tuple containing pinned values and non-pinned values.
 */
function partitionMetadataValues(
  values: MetadataValue[],
  pinned: MetadataValue[]
): MetadataValueTuple {
  const partitionedValues: MetadataValueTuple = [[], []];
  return values.reduce((acc, value) => {
    if (pinned.includes(value)) {
      acc[0].push(value);
    } else {
      acc[1].push(value);
    }
    return acc;
  }, partitionedValues);
}

/**
 * Returns the summary of diseases with "normal" filtered.
 * @param diseases - Diseases.
 * @returns a summary of diseases.
 */
function processDiseaseSummary(diseases: string[]): string[] {
  return diseases.filter((disease) => disease !== DISEASE.NORMAL);
}

/**
 * Rolls up integrated atlases for each atlas.
 * @param atlases - Atlases.
 * @returns rolled up atlases.
 */
export function rollUpAtlases(atlases: Atlas[]): AtlasesRow[] {
  const rolledUpAtlasMap: Map<string, AtlasesRow> = new Map();
  for (const { integratedAtlases, name, path, summaryCellCount } of atlases) {
    rolledUpAtlasMap.set(name, {
      ...initAtlasRow(),
      atlasName: name,
      path,
    });
    if (rolledUpAtlasMap.has(name)) {
      const rolledUpAtlas = rolledUpAtlasMap.get(name) as AtlasesRow;
      for (const {
        assay,
        cellCount,
        disease,
        organism,
        tissue,
      } of integratedAtlases) {
        rolledUpAtlas.assay = accumulateValues(rolledUpAtlas.assay, assay);
        rolledUpAtlas.cellCount += cellCount;
        rolledUpAtlas.disease = accumulateValues(
          rolledUpAtlas.disease,
          disease
        );
        rolledUpAtlas.organism = accumulateValues(
          rolledUpAtlas.organism,
          organism
        );
        rolledUpAtlas.tissue = accumulateValues(rolledUpAtlas.tissue, tissue);
      }
      // If summary cell count is available, use that instead of rolling up cell count.
      if (summaryCellCount) {
        rolledUpAtlas.cellCount = summaryCellCount;
      }
    }
  }
  return [...rolledUpAtlasMap].map(([, atlasRow]) => atlasRow);
}

/**
 * Returns the aggregated total cells from cellSuspensions for the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns total cells from cellSuspensions.
 */
function rollUpTotalCells(entityResponse: ProjectsResponse): number | null {
  return entityResponse.cellSuspensions.reduce((acc, { totalCells }) => {
    if (totalCells) {
      acc = (acc ?? 0) + totalCells;
    }
    return acc;
  }, null as null | number);
}
