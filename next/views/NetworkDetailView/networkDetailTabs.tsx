import {
  Tabs,
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

export const NetworkDetailTabs = () => {
  const router = useRouter();
  const { path } = useNetwork();

  const handleTabChanged = (value: TabValue) => {
    router.push({
      pathname: value,
      query: { network: path },
    });
  };

  return (
    <Tabs onTabChange={handleTabChanged} value={router.pathname} tabs={TABS} />
  );
};
