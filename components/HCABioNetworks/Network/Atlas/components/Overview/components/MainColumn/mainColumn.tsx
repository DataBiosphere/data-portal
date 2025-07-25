import {
  FluidPaper,
  GridPaper,
} from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  GridPaperSection,
  Section,
  SectionContent,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import {
  TEXT_BODY_400,
  TEXT_BODY_LARGE_500,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { useAtlas, useAtlasContent } from "contexts/atlasContext";
import { getIntegratedAtlasesTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import {
  Table,
  StyledToolbar,
} from "../../../../../../../common/Table/table.styles";
import { SectionText } from "../../../../../../components/Section/section.styles";
import { TABLE_OPTIONS } from "./constants";

export const MainColumn = (): JSX.Element => {
  const { Description } = useAtlasContent() || {};
  const { atlas } = useAtlas();
  const { integratedAtlases } = atlas;
  return (
    <>
      {/* Atlas Description */}
      <FluidPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Atlas Description" />
            <SectionText>
              {Description ? (
                <Description />
              ) : (
                "No atlas description available."
              )}
            </SectionText>
          </SectionContent>
        </Section>
      </FluidPaper>
      {/* Atlases Table */}
      <FluidPaper>
        <GridPaper>
          <StyledToolbar>
            <Typography variant={TEXT_BODY_LARGE_500}>
              Component Atlases
            </Typography>
          </StyledToolbar>
          {integratedAtlases.length > 0 ? (
            <Table
              columns={getIntegratedAtlasesTableColumns()}
              gridTemplateColumns="minmax(208px, 1fr) minmax(112px, 0.6fr) minmax(112px, 0.6fr) max-content max-content auto"
              items={integratedAtlases}
              tableOptions={TABLE_OPTIONS}
            />
          ) : (
            <GridPaperSection>
              <Typography variant={TEXT_BODY_400}>None</Typography>
            </GridPaperSection>
          )}
        </GridPaper>
      </FluidPaper>
    </>
  );
};
