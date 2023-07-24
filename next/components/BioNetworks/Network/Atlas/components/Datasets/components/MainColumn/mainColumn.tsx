import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";
import { AtlasDatasetsDescription } from "../../../../../../../../content";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { getProjectsTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const { network, projectsResponses } = useAtlas();
  const { path } = network;
  return (
    <>
      {/* Atlas Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <AtlasDatasetsDescription />
        </MDXSection>
      </FluidPaper>
      {/* Atlas Datasets */}
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
