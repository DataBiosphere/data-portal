import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import React from "react";
import { AtlasDatasetsDescription } from "../../../../../../../../content";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { useConfig } from "../../../../../../../../hooks/useConfig";
import { getProjectsTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const {
    config: { browserURL },
  } = useConfig();
  const { projectsResponses } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      {/* Atlas Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <AtlasDatasetsDescription />
        </MDXSection>
      </FluidPaper>
      {/* Atlas Datasets */}
      <DetailViewTable
        columns={getProjectsTableColumns(browserURL)}
        gridTemplateColumns="minmax(484px, 1fr) repeat(4, minmax(152px, 1fr)) max-content"
        items={projectsResponses}
        noResultsTitle={"No Source Datasets"}
        Paper={FluidPaper}
        tools={null}
      />
    </BackPageContentSingleColumn>
  );
};
