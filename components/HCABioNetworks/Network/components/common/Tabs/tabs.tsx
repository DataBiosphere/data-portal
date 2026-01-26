import { JSX } from "react";
import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import {
  Tabs as DXTabs,
  Tab,
  TabValue,
} from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import { useRouter } from "next/router";
import { Network } from "../../../../../../@types/network";
import {
  NETWORKS_PATTERN,
  NETWORK_PUBLICATIONS_PATTERN,
} from "../../../../../../constants/routes";
import { useNetwork } from "../../../../../../contexts/networkContext";

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
  const { BICCNPublications } = network;
  const tabs = [];
  tabs.push({
    label: "Network Overview",
    value: NETWORKS_PATTERN,
  });
  if (BICCNPublications && BICCNPublications.length > 0) {
    tabs.push({
      icon: (
        <StaticImage
          alt="BICCN"
          height={20}
          src="/hca-bio-networks/network/biccn.png"
        />
      ),
      label: "BICCN Publications",
      value: NETWORK_PUBLICATIONS_PATTERN,
    });
  }
  return tabs;
}
