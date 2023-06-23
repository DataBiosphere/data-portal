import {
  Tabs as DXTabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import { NETWORKS_PATTERN, NETWORK_DATASETS_PATTERN } from "constants/routes";
import { useNetwork } from "contexts/networkContext";
import { useRouter } from "next/router";
import React from "react";

const TABS = [
  {
    label: "Overview",
    value: NETWORKS_PATTERN,
  },
  {
    label: "Datasets",
    value: NETWORK_DATASETS_PATTERN,
  },
];

export const Tabs = (): JSX.Element => {
  const router = useRouter();
  const { network } = useNetwork();
  const { path } = network;

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
