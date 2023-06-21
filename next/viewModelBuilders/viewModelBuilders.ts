import { ColumnDef } from "@tanstack/react-table";
import { ProjectsEntityResponse } from "apis/azul/hca-dcp/common/entities";
import { processEntityValue } from "apis/azul/hca-dcp/common/utils";
import { HCA_DCP_CATEGORY_KEY } from "constants/category";
import { Atlas } from "../@types/network";
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
 * @returns projecst table column definition.
 */
export function getProjectsTableColumns(
  networkPath: string
): ColumnDef<ProjectsEntityResponse>[] {
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
): ColumnDef<ProjectsEntityResponse> {
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
  projectsResponse: ProjectsEntityResponse
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
  projectsResponse: ProjectsEntityResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: processEntityValue(
      projectsResponse.projects,
      HCA_DCP_CATEGORY_KEY.PROJECT_TITLE
    ),
    url: getProjectTitleUrl(networkPath, projectsResponse),
  };
};

/**
 * Returns projecst cell count column def.
 * @returns cell count column def.
 */
function getProjectsCellCountColumnDef(): ColumnDef<ProjectsEntityResponse> {
  return {
    accessorKey: "count",
    cell: "Project-TBD",
    header: "Cell Count Est.",
  };
}

/**
 * Returns projecst species column def.
 * @returns species column def.
 */
function getProjectsSpeciesColumnDef(): ColumnDef<ProjectsEntityResponse> {
  return {
    accessorKey: "species",
    cell: "TBD",
    header: "Species",
  };
}

/**
 * Returns projecst method column def.
 * @returns method column def.
 */
function getProjectsMethodColumnDef(): ColumnDef<ProjectsEntityResponse> {
  return {
    accessorKey: "method",
    cell: "TBD",
    header: "Method",
  };
}

/**
 * Returns projecst anatomical entity column def.
 * @returns anatomical entity column def.
 */
function getProjectsAnatomicalEntityColumnDef(): ColumnDef<ProjectsEntityResponse> {
  return {
    accessorKey: "anatomicalEntity",
    cell: "TBD",
    header: "Anatomical Entity",
  };
}

/**
 * Returns projecst disease donor column def.
 * @returns disease donor column def.
 */
function getProjectsDiseaseDonorColumnDef(): ColumnDef<ProjectsEntityResponse> {
  return {
    accessorKey: "diseaseDonor",
    cell: "TBD",
    header: "Disease (Donor)",
  };
}
