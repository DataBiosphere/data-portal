import {
  Tabs as DXTabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import { useRouter } from "next/router";
import React from "react";
import {
  NETWORKS_PATTERN,
  NETWORK_DATASETS_PATTERN,
} from "../../../../../../constants/routes";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { getBioNetworkName } from "../../../../../../viewModelBuilders/viewModelBuilders";

export const Tabs = (): JSX.Element => {
  const router = useRouter();
  const { network } = useNetwork();
  const { name, path } = network;

  const TABS = [
    {
      label: "Network Overview",
      value: NETWORKS_PATTERN,
    },
    {
      label: `HCA ${getBioNetworkName(name)} Datasets`,
      value: NETWORK_DATASETS_PATTERN,
    },
  ];

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
      tabs={TABS}
    />
  );
};
