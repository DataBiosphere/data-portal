import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { Network } from "../../../../../@types/network";
import { NETWORK_ICONS } from "../../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../../constants/routes";
import { StyledIconLink } from "./HCABiologicalNetwork.styles";

export interface HCABiologicalNetworkProps {
  network: Network;
}

export const HCABiologicalNetwork = ({
  network,
}: HCABiologicalNetworkProps): JSX.Element => {
  const { key, name: label, path } = network;
  return (
    <GridPaperSection>
      <SectionTitle title="HCA Biological Network Atlases" />
      <StyledIconLink
        icon={NETWORK_ICONS[key]}
        label={label}
        url={`${NETWORKS_ROUTE}/${path}`}
      />
    </GridPaperSection>
  );
};
