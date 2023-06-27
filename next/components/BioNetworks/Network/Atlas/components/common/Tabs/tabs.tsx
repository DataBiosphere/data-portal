import {
  Tabs as DXTabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import {
  NETWORKS_ATLAS_PATTERN,
  NETWORK_ATLAS_DATASETS_PATTERN,
} from "constants/routes";
import { useAtlas } from "contexts/atlasContext";
import { useRouter } from "next/router";
import React from "react";

const TABS = [
  {
    label: "Overview",
    value: NETWORKS_ATLAS_PATTERN,
  },
  {
    label: "Source Datasets",
    value: NETWORK_ATLAS_DATASETS_PATTERN,
  },
];

export const Tabs = (): JSX.Element => {
  const router = useRouter();
  const {
    atlas: { path: atlasPath },
    network: { path: networkPath },
  } = useAtlas();

  const handleTabChanged = (value: TabValue): void => {
    router.push({
      pathname: value,
      query: { atlas: atlasPath, network: networkPath },
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
