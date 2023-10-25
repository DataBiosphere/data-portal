import {
  FluidPaper,
  GridPaper,
} from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionContent,
} from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import {
  useNetwork,
  useNetworkContent,
} from "../../../../../../../contexts/networkContext";
import {
  getAtlasesTableColumns,
  rollUpAtlases,
} from "../../../../../../../viewModelBuilders/viewModelBuilders";
import { EllipsisContent } from "../../../../../../common/EllipsisContent/ellipsisContent";
import {
  Table,
  TableToolbar,
} from "../../../../../../common/Table/table.styles";
import { NetworkAtlasesEmpty } from "./components/NetworkAtlasesEmpty/networkAtlasesEmpty";

const MAX_LINE_COUNT = 4;

export const MainColumn = (): JSX.Element => {
  const { network } = useNetwork();
  const { atlases, path: networkPath } = network;
  const { Description } = useNetworkContent();
  return (
    <>
      {/* Network Description */}
      <FluidPaper>
        <Section>
          <SectionContent>
            <SectionTitle title="Network Description" />
            <EllipsisContent maxLineCount={MAX_LINE_COUNT}>
              <Description />
            </EllipsisContent>
          </SectionContent>
        </Section>
      </FluidPaper>
      {/* Atlases Table */}
      {atlases.length > 0 ? (
        <FluidPaper>
          <GridPaper>
            <TableToolbar>
              <Typography variant={TEXT_BODY_LARGE_500}>Atlases</Typography>
            </TableToolbar>
            <Table
              columns={getAtlasesTableColumns(networkPath)}
              gridTemplateColumns="minmax(256px, 1fr) repeat(3, minmax(124px, 1fr)) max-content"
              items={rollUpAtlases(atlases, true)}
            />
          </GridPaper>
        </FluidPaper>
      ) : (
        <NetworkAtlasesEmpty network={network} />
      )}
    </>
  );
};
