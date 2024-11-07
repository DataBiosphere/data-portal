import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
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
  const { network, projectsResponses } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      {/* Atlas Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <AtlasDatasetsDescription
            networkName={network.name.toLowerCase()}
            datasetURL={network.datasetURL}
          />
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
