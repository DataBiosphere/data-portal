import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  PRIORITY,
  StatusIcon,
} from "@databiosphere/findable-ui/lib/components/common/StatusIcon/statusIcon";
import { Network } from "../../../../../../../../../@types/network";
import { getBioNetworkName } from "../../../../../../../../../viewModelBuilders/viewModelBuilders";
import { BiotechIcon } from "../../../../../../../../common/CustomIcon/components/BiotechIcon/biotechIcon";
import { Section, SectionContent } from "./networkAtlasesEmpty.styles";

export interface NetworkAtlasesEmptyProps {
  network: Network;
}

export const NetworkAtlasesEmpty = ({
  network,
}: NetworkAtlasesEmptyProps): JSX.Element => {
  const { name } = network;
  const bioNetworkName = getBioNetworkName(name);
  return (
    <FluidPaper>
      <Section>
        <StatusIcon priority={PRIORITY.LOW} StatusIcon={BiotechIcon} />
        <SectionContent>
          <SectionTitle
            title={`${bioNetworkName} Network atlases are still under development.`}
          />
        </SectionContent>
      </Section>
    </FluidPaper>
  );
};
