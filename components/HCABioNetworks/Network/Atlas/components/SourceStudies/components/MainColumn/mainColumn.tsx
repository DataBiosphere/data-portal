import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { JSX } from "react";
import { SourceStudiesDescription } from "../../../../../../../../content";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { MDXSection } from "../../../../../../../common/Section/section.styles";
import { SourceStudies } from "./tracker/sourceStudies";

/**
 * Main column for the Source Studies tab.
 * @returns source studies content.
 */
export const MainColumn = (): JSX.Element => {
  const { trackerSourceStudies = [] } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      <FluidPaper>
        <MDXSection>
          <SourceStudiesDescription />
        </MDXSection>
      </FluidPaper>
      <SourceStudies data={trackerSourceStudies} />
    </BackPageContentSingleColumn>
  );
};
