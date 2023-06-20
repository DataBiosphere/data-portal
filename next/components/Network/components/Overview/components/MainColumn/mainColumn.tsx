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
import React from "react";
import {
  useNetwork,
  useNetworkDescription,
} from "../../../../../../contexts/networkContext";
import { getAtlasesTableColumns } from "../../../../../../viewModelBuilders/viewModelBuilders";
import { Table, TableToolbar } from "../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  const { atlases, path: networkPath } = useNetwork();
  const Description = useNetworkDescription();
  return (
    <>
      {/* Network Description */}
      <FluidPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Network Description" />
            <Description />
          </SectionContent>
        </Section>
      </FluidPaper>
      {/* Atlases Table */}
      <FluidPaper>
        <GridPaper>
          <TableToolbar>
            <Typography variant={TEXT_BODY_LARGE_500}>Atlases</Typography>
          </TableToolbar>
          {atlases.length > 0 ? (
            <Table
              columns={getAtlasesTableColumns(networkPath)}
              gridTemplateColumns="minmax(388px, 1fr) repeat(2, minmax(124px, 1fr)) max-content"
              items={atlases}
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
