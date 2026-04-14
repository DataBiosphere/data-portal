import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { JSX } from "react";
import { AtlasDatasetsDescription } from "../../../../../../../../content";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { useSiteConfig } from "../../../../../../../../hooks/useSiteConfig";
import { getProjectsTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../../common/Table/table.styles";
import { TABLE_OPTIONS } from "./Table/project/options";
import { Table as TrackerSourceDatasetsTable } from "./Table/tracker/table";

export const MainColumn = (): JSX.Element => {
  const { browserURL } = useSiteConfig();
  const { atlas, projectsResponses, trackerSourceDatasets = [] } = useAtlas();
  const isTracker = Boolean(atlas.tracker);
  return (
    <BackPageContentSingleColumn>
      {/* Atlas Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <AtlasDatasetsDescription />
        </MDXSection>
      </FluidPaper>
      {/* Atlas Datasets */}
      {isTracker ? (
        <TrackerSourceDatasetsTable data={trackerSourceDatasets} />
      ) : (
        <DetailViewTable
          columns={getProjectsTableColumns(browserURL)}
          gridTemplateColumns="minmax(484px, 1fr) repeat(4, minmax(152px, 1fr)) max-content"
          items={projectsResponses}
          noResultsTitle={"No Source Datasets"}
          Paper={FluidPaper}
          tableOptions={TABLE_OPTIONS}
          tools={null}
        />
      )}
    </BackPageContentSingleColumn>
  );
};
