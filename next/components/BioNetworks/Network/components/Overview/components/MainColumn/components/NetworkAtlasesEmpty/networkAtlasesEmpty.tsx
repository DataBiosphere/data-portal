import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  PRIORITY,
  StatusIcon,
} from "@clevercanary/data-explorer-ui/lib/components/common/StatusIcon/statusIcon";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_400_2_LINES } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import { Network } from "../../../../../../../../../@types/network";
import { NETWORKS_ROUTE } from "../../../../../../../../../constants/routes";
import { getBioNetworkName } from "../../../../../../../../../viewModelBuilders/viewModelBuilders";
import { BiotechIcon } from "../../../../../../../../common/CustomIcon/components/BiotechIcon/biotechIcon";
import { Section, SectionContent } from "./networkAtlasesEmpty.styles";

export interface NetworkAtlasesEmptyProps {
  network: Network;
}

export const NetworkAtlasesEmpty = ({
  network,
}: NetworkAtlasesEmptyProps): JSX.Element => {
  const { name, path: networkPath } = network;
  const bioNetworkName = getBioNetworkName(name);
  return (
    <FluidPaper>
      <Section>
        <StatusIcon priority={PRIORITY.LOW} StatusIcon={BiotechIcon} />
        <SectionContent>
          <SectionTitle
            title={`${bioNetworkName} Network atlases are still under development.`}
          />
          <Typography variant={TEXT_BODY_400_2_LINES}>
            Meanwhile, individual{" "}
            <Link
              label={`HCA ${bioNetworkName} Datasets`}
              url={`${NETWORKS_ROUTE}/${networkPath}/datasets`}
            />{" "}
            are available as potential source datasets for integrated atlases.
          </Typography>
        </SectionContent>
      </Section>
    </FluidPaper>
  );
};
