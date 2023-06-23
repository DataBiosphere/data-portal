import { ColumnDef } from "@tanstack/react-table";
import { Atlas } from "../@types/network";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";
import { processEntityValue } from "../apis/azul/hca-dcp/common/utils";
import * as C from "../components";
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
): ColumnDef<ProjectsResponse>[] {
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
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getProjectTitleColumnDef(
  networkPath: string
): ColumnDef<ProjectsResponse> {
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
  projectsResponse: ProjectsResponse
): string {
  return `/${networkPath}/datasets/${processEntityValue(
    projectsResponse.projects,
    "projectId"
  )}`;
}

/**
 * Build props for the project title Link component from the given entity response.
 * @param networkPath - Network path.
 * @param projectsResponse - Response model return from the entity response API.
 * @returns model to be used as props for the project title Link component.
 */
export const buildProjectTitle = (
  networkPath: string,
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: processEntityValue(projectsResponse.projects, "projectTitle"),
    url: getProjectTitleUrl(networkPath, projectsResponse),
  };
};

/**
 * Returns projects cell count column def.
 * @returns cell count column def.
 */
function getProjectsCellCountColumnDef(): ColumnDef<ProjectsResponse> {
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
function getProjectsSpeciesColumnDef(): ColumnDef<ProjectsResponse> {
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
function getProjectsMethodColumnDef(): ColumnDef<ProjectsResponse> {
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
function getProjectsAnatomicalEntityColumnDef(): ColumnDef<ProjectsResponse> {
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
function getProjectsDiseaseDonorColumnDef(): ColumnDef<ProjectsResponse> {
  return {
    accessorKey: "diseaseDonor",
    cell: "TBD",
    header: "Disease (Donor)",
  };
}
