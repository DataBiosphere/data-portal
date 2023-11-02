import { StaticImage } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import {
  Tab,
  Tabs as DXTabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import { useRouter } from "next/router";
import React from "react";
import { Network } from "../../../../../../@types/network";
import {
  NETWORKS_PATTERN,
  NETWORK_DATASETS_PATTERN,
  NETWORK_PUBLICATIONS_PATTERN,
} from "../../../../../../constants/routes";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { getBioNetworkName } from "../../../../../../viewModelBuilders/viewModelBuilders";

export const Tabs = (): JSX.Element => {
  const router = useRouter();
  const { network } = useNetwork();
  const { path } = network;
  const tabs = buildTabs(network);

  const handleTabChanged = (value: TabValue): void => {
    router.push({
      pathname: value,
      query: { network: path },
    });
  };

  return (
    <DXTabs
      onTabChange={handleTabChanged}
      value={router.pathname}
      tabs={tabs}
    />
  );
};

/**
 * Returns the tabs for the network.
 * @param network - Network.
 * @returns network tabs.
 */
function buildTabs(network: Network): Tab[] {
  const { atlases, BICCNPublications, name } = network;
  const tabs = [];
  tabs.push({
    label: "Network Overview",
    value: NETWORKS_PATTERN,
  });
  if (atlases.length === 0) {
    tabs.push({
      label: `HCA ${getBioNetworkName(name)} Datasets`,
      value: NETWORK_DATASETS_PATTERN,
    });
  }
  if (BICCNPublications && BICCNPublications.length > 0) {
    tabs.push({
      icon: (
        <StaticImage
          alt="BICCN"
          height={20}
          src="/bio-networks/network/biccn.png"
        />
      ),
      label: "BICCN Publications",
      value: NETWORK_PUBLICATIONS_PATTERN,
    });
  }
  return tabs;
}
