import {
  Tabs,
  TabValue,
} from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import {
  NETWORKS_ATLAS_PATTERN,
  NETWORK_ATLAS_DATASETS_PATTERN,
  NETWORK_ATLAS_PUBLICATIONS_PATTERN,
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
    label: "Datasets",
    value: NETWORK_ATLAS_DATASETS_PATTERN,
  },
  {
    label: "Publications",
    value: NETWORK_ATLAS_PUBLICATIONS_PATTERN,
  },
];

export const AtlasDetailTabs = (): JSX.Element => {
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
    <Tabs onTabChange={handleTabChanged} value={router.pathname} tabs={TABS} />
  );
};
