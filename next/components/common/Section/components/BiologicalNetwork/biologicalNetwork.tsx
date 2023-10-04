import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import React from "react";
import { Network } from "../../../../../@types/network";
import { NETWORK_ICONS } from "../../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../../constants/routes";
import { IconLink } from "./biologicalNetwork.styles";

export interface GridPaperSectionProps {
  network: Network;
}

export const BiologicalNetwork = ({
  network,
}: GridPaperSectionProps): JSX.Element => {
  const { key, name: label, path } = network;
  return (
    <GridPaperSection>
      <SectionTitle title="Biological Network" />
      <IconLink
        icon={NETWORK_ICONS[key]}
        label={label}
        url={`${NETWORKS_ROUTE}/${path}`}
      />
    </GridPaperSection>
  );
};
