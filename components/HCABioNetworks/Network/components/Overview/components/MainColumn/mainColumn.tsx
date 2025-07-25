import {
  FluidPaper,
  GridPaper,
} from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionContent,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { TEXT_BODY_LARGE_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import {
  useNetwork,
  useNetworkContent,
} from "../../../../../../../contexts/networkContext";
import {
  getAtlasesTableColumns,
  rollUpAtlases,
} from "../../../../../../../viewModelBuilders/viewModelBuilders";
import {
  Table,
  StyledToolbar,
} from "../../../../../../common/Table/table.styles";
import { SectionText } from "../../../../../components/Section/section.styles";
import { NetworkAtlasesEmpty } from "./components/NetworkAtlasesEmpty/networkAtlasesEmpty";
import { TABLE_OPTIONS } from "./constants";

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
            <SectionText>
              <Description />
            </SectionText>
          </SectionContent>
        </Section>
      </FluidPaper>
      {/* Atlases Table */}
      {atlases.length > 0 ? (
        <FluidPaper>
          <GridPaper>
            <StyledToolbar>
              <Typography variant={TEXT_BODY_LARGE_500}>Atlases</Typography>
            </StyledToolbar>
            <Table
              columns={getAtlasesTableColumns(networkPath)}
              gridTemplateColumns="minmax(256px, 1fr) repeat(3, minmax(124px, 1fr)) max-content"
              items={rollUpAtlases(atlases, true)}
              tableOptions={TABLE_OPTIONS}
            />
          </GridPaper>
        </FluidPaper>
      ) : (
        <NetworkAtlasesEmpty network={network} />
      )}
    </>
  );
};
