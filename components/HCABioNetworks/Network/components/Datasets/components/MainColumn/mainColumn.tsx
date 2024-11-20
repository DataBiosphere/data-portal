import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { DatasetsDescription } from "../../../../../../../content";
import { useNetwork } from "../../../../../../../contexts/networkContext";
import { useSiteConfig } from "../../../../../../../hooks/useSiteConfig";
import { getProjectsTableColumns } from "../../../../../../../viewModelBuilders/viewModelBuilders";
import { MDXSection } from "../../../../../../common/Section/section.styles";
import { DetailViewTable } from "../../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const { browserURL } = useSiteConfig();
  const { projectsResponses } = useNetwork();
  return (
    <BackPageContentSingleColumn>
      {/* Network Datasets Description */}
      <FluidPaper>
        <MDXSection>
          <DatasetsDescription />
        </MDXSection>
      </FluidPaper>
      {/* Network Datasets */}
      <DetailViewTable
        columns={getProjectsTableColumns(browserURL)}
        gridTemplateColumns="minmax(484px, 1fr) repeat(4, minmax(152px, 1fr)) max-content"
        items={projectsResponses}
        noResultsTitle={"No Datasets"}
        Paper={FluidPaper}
        tools={null}
      />
    </BackPageContentSingleColumn>
  );
};
