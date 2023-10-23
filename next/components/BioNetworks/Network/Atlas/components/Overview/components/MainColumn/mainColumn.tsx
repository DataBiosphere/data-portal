import {
  FluidPaper,
  GridPaper,
} from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  GridPaperSection,
  Section,
  SectionContent,
} from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import {
  TEXT_BODY_400,
  TEXT_BODY_LARGE_500,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { useAtlas, useAtlasContent } from "contexts/atlasContext";
import React from "react";
import { getIntegratedAtlasesTableColumns } from "../../../../../../../../viewModelBuilders/viewModelBuilders";
import { EllipsisContent } from "../../../../../../../common/EllipsisContent/ellipsisContent";
import {
  Table,
  TableToolbar,
} from "../../../../../../../common/Table/table.styles";

const MAX_LINE_COUNT = 4;

export const MainColumn = (): JSX.Element => {
  const { Description } = useAtlasContent();
  const { atlas } = useAtlas();
  const { integratedAtlases } = atlas;
  return (
    <>
      {/* Atlas Description */}
      <FluidPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Atlas Description" />
            <EllipsisContent maxLineCount={MAX_LINE_COUNT}>
              <Description />
            </EllipsisContent>
          </SectionContent>
        </Section>
      </FluidPaper>
      {/* Atlases Table */}
      <FluidPaper>
        <GridPaper>
          <TableToolbar>
            <Typography variant={TEXT_BODY_LARGE_500}>
              Component Atlases
            </Typography>
          </TableToolbar>
          {integratedAtlases.length > 0 ? (
            <Table
              columns={getIntegratedAtlasesTableColumns()}
              gridTemplateColumns="minmax(258px, 1fr) minmax(112px, 0.6fr) minmax(120px, 0.6fr) max-content auto auto"
              items={integratedAtlases}
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
