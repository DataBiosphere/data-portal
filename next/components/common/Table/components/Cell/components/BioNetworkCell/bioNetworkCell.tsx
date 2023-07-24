import { StaticImage } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Network } from "../../../../../../../@types/network";
import { NETWORK_ICONS } from "../../../../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../../../../constants/routes";
import { getBioNetworkName } from "../../../../../../../viewModelBuilders/viewModelBuilders";
import { Cell } from "./bioNetworkCell.styles";

export interface BioNetworkCellProps {
  network: Network;
}

export const BioNetworkCell = ({
  network,
}: BioNetworkCellProps): JSX.Element => {
  const { key, name, path } = network;
  return (
    <Cell>
      <StaticImage alt={name} height={24} src={NETWORK_ICONS[key]} />
      <Link label={getBioNetworkName(name)} url={`${NETWORKS_ROUTE}/${path}`} />
    </Cell>
  );
};
