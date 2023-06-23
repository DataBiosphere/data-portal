import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";
import { ProjectResponse } from "../../../../../../apis/azul/hca-dcp/common/entities";
import { getProjectsTableColumns } from "../../../../../../viewModelBuilders/viewModelBuilders";
import { DetailViewTable } from "../../../../../common/Table/table.styles";

interface ProjectsTableProps {
  networkPath: string;
  projects: ProjectResponse[];
}

export const ProjectsTable = ({
  networkPath,
  projects,
}: ProjectsTableProps): JSX.Element => {
  return (
    <DetailViewTable
      columns={getProjectsTableColumns(networkPath)}
      gridTemplateColumns="minmax(522px, 1fr) repeat(4, minmax(124px, 1fr)) max-content" // TODO review gridTemplateColumns.
      items={projects}
      noResultsTitle={"No projects"}
      Paper={FluidPaper}
      tools={null}
    />
  );
};
