import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { getProjectsTableColumns } from "../../../../../../viewModelBuilders/viewModelBuilders";
import { DetailViewTable } from "../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const { network, projectsResponses } = useNetwork();
  const { path } = network;
  return (
    <DetailViewTable
      columns={getProjectsTableColumns(path)}
      gridTemplateColumns="minmax(522px, 1fr) repeat(4, minmax(124px, 1fr)) max-content" // TODO review gridTemplateColumns.
      items={projectsResponses}
      noResultsTitle={"No projects"}
      Paper={FluidPaper}
      tools={null}
    />
  );
};
