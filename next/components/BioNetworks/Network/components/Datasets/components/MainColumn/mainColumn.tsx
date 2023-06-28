import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";
import { DatasetsDescription } from "../../../../../../../content";
import { useNetwork } from "../../../../../../../contexts/networkContext";
import { getProjectsTableColumns } from "../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const { network, projectsResponses } = useNetwork();
  const { path } = network;
  return (
    <>
      {/* Network Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <DatasetsDescription />
        </MDXSection>
      </FluidPaper>
      {/* Network Datasets */}
      <DetailViewTable
        columns={getProjectsTableColumns(path)}
        gridTemplateColumns="minmax(484px, 1fr) repeat(4, minmax(152px, 1fr)) max-content"
        items={projectsResponses}
        noResultsTitle={"No Datasets"}
        Paper={FluidPaper}
        tools={null}
      />
    </>
  );
};
