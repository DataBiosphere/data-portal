import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { JSX } from "react";
import { SourceStudiesDescription } from "../../../../../../../../content";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { useSiteConfig } from "../../../../../../../../hooks/useSiteConfig";
import { getProjectsTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../../common/Table/table.styles";
import { TABLE_OPTIONS } from "./projects/components/Table/options";

export const MainColumn = (): JSX.Element => {
  const { browserURL } = useSiteConfig();
  const { projectsResponses } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      <FluidPaper>
        <MDXSection>
          <SourceStudiesDescription />
        </MDXSection>
      </FluidPaper>
      <DetailViewTable
        columns={getProjectsTableColumns(browserURL)}
        gridTemplateColumns="minmax(484px, 1fr) repeat(4, minmax(152px, 1fr)) max-content"
        items={projectsResponses}
        noResultsTitle={"No Source Studies"}
        Paper={FluidPaper}
        tableOptions={TABLE_OPTIONS}
        tools={null}
      />
    </BackPageContentSingleColumn>
  );
};
