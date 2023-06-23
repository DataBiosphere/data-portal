import { ColumnDef } from "@tanstack/react-table";
import { ProjectResponse } from "apis/azul/hca-dcp/common/entities";
import { Atlas, Network } from "../@types/network";
import * as C from "../components";
import { NETWORK_ICONS } from "../constants/networks";
import { NETWORKS_ROUTE } from "../constants/routes";

/**
 * Returns the table column definition model for the atlases table.
 * @param networkPath - Network path.
 * @returns atlases table column definition.
 */
export function getAtlasesTableColumns(
  networkPath: string
): ColumnDef<Atlas>[] {
  return [
    getAtlasesAtlasNameColumnDef(networkPath),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesCellCountColumnDef(),
  ];
}

/**
 * Returns the table column definition model for the projects table.
 * @param networkPath - Network path.
 * @returns projects table column definition.
 */
export function getProjectsTableColumns(
  networkPath: string
): ColumnDef<ProjectResponse>[] {
  return [
    getProjectTitleColumnDef(networkPath),
    getProjectsSpeciesColumnDef(),
    getProjectsMethodColumnDef(),
    getProjectsAnatomicalEntityColumnDef(),
    getProjectsDiseaseDonorColumnDef(),
    getProjectsCellCountColumnDef(),
  ];
}

/**
 * Returns the table column definition model for the networks table.
 * @returns networks table column definition.
 */
export function getNetworksTableColumns(): ColumnDef<Network>[] {
  return [getNetworkTitleColumnDef(), getNetworkAtlasesColumnDef()];
}

/**
 * Returns network title column def.
 * @returns atlas name column def.
 */
function getNetworkTitleColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "networkName",
    cell: ({ row }) =>
      C.KeyValuePairs({
        keyValuePairs: new Map([
          [
            C.StaticImage({
              alt: row.original.name,
              src: NETWORK_ICONS[row.original.key],
            }),
            C.Link({
              label: row.original.name.replace(/(\sNetwork.*)/gi, ""),
              url: `${NETWORKS_ROUTE}/${row.original.path}`,
            }),
          ],
        ]),
      }),

    header: "Biological Network",
  };
}

/**
 * Returns network atlases column def.
 * @returns tissue column def.
 */
function getNetworkAtlasesColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "atlases",
    cell: ({ row }) => C.Cell({ value: row.original.atlases.length }),
    header: "Atlases",
  };
}

/**
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getProjectTitleColumnDef(
  networkPath: string
): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "projectTitle",
    cell: ({ row }) => C.Link(buildProjectTitle(networkPath, row.original)),
    header: "Project Title",
  };
}

/**
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getAtlasesAtlasNameColumnDef(networkPath: string): ColumnDef<Atlas> {
  return {
    accessorKey: "name",
    cell: ({ row }) =>
      C.Link({
        label: row.original.name,
        url: `${NETWORKS_ROUTE}/${networkPath}/${row.original.path}`,
      }),
    header: "Atlas name",
  };
}

/**
 * Returns atlases cell count column def.
 * @returns cell count column def.
 */
function getAtlasesCellCountColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "count",
    cell: "TBD",
    header: "Cell Count Est.",
  };
}

/**
 * Returns atlases disease column def.
 * @returns disease column def.
 */
function getAtlasesDiseaseColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "disease",
    cell: () => C.NTagCell({ label: "diseases", values: ["TBD"] }),
    header: "Disease",
  };
}

/**
 * Returns atlases tissue column def.
 * @returns tissue column def.
 */
function getAtlasesTissueColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "tissue",
    cell: () => C.NTagCell({ label: "tissues", values: ["TBD"] }),
    header: "Tissue",
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
  projectsResponse: ProjectResponse
): string {
  return `/${networkPath}/datasets/${projectsResponse.projectId}`;
}

/**
 * Build props for the project title Link component from the given entity response.
 * @param networkPath - Network path.
 * @param projectsResponse - Response model return from the entity response API.
 * @returns model to be used as props for the project title Link component.
 */
export const buildProjectTitle = (
  networkPath: string,
  projectsResponse: ProjectResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: projectsResponse.projectTitle,
    url: getProjectTitleUrl(networkPath, projectsResponse),
  };
};

/**
 * Returns projects cell count column def.
 * @returns cell count column def.
 */
function getProjectsCellCountColumnDef(): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "count",
    cell: "Project-TBD",
    header: "Cell Count Est.",
  };
}

/**
 * Returns projects species column def.
 * @returns species column def.
 */
function getProjectsSpeciesColumnDef(): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "species",
    cell: "TBD",
    header: "Species",
  };
}

/**
 * Returns projects method column def.
 * @returns method column def.
 */
function getProjectsMethodColumnDef(): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "method",
    cell: "TBD",
    header: "Method",
  };
}

/**
 * Returns projects anatomical entity column def.
 * @returns anatomical entity column def.
 */
function getProjectsAnatomicalEntityColumnDef(): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "anatomicalEntity",
    cell: "TBD",
    header: "Anatomical Entity",
  };
}

/**
 * Returns projects disease donor column def.
 * @returns disease donor column def.
 */
function getProjectsDiseaseDonorColumnDef(): ColumnDef<ProjectResponse> {
  return {
    accessorKey: "diseaseDonor",
    cell: "TBD",
    header: "Disease (Donor)",
  };
}
